/**
 * POST /api/mutisux-beta
 *
 * Recibe la solicitud de acceso a la beta de Mutis UX desde /mutisux/ (spec `acc` de la
 * app: coding/Lupa-ux-lite/docs/specs/acceso-beta.md). Solo responde JSON { ok, error }:
 * el formulario necesita JS por Turnstile.
 *
 * Campos: nombre, email, rol (uno de ROLES), expectativa, consentimiento ("si"),
 * turnstile (token del widget) y website (campo trampa: si viene con valor, se responde
 * como éxito y no se guarda nada). Todos obligatorios salvo el campo trampa.
 *
 * Guarda en la D1 del sitio (binding SOLICITUDES, tabla `solicitudes`). Esta función
 * NUNCA tiene acceso a la base de la app (lupaux): Luis lista y aprueba las solicitudes
 * con scripts/autorizar.mjs de la app, que lee esta base con wrangler.
 *
 * Variables del proyecto (panel de Cloudflare, proyecto uxuaria2026):
 *   SOLICITUDES       binding D1 a la base uxuaria-solicitudes
 *   TURNSTILE_SECRET  clave secreta del widget de Turnstile
 * Sin alguna de las dos responde 503 `no_configurado`: nunca finge haber guardado.
 */

export const ROLES = ['Diseño UX/UI', 'Investigación UX', 'Producto', 'Consultoría o freelance', 'Otro'];
const LIMITES = { nombre: 80, email: 254, expectativa: 500 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Esquema de la tabla. scripts/autorizar.mjs de la app tiene una copia: si cambia acá,
// cambia allá. `acepto` es la fecha (ms) en que aceptó la política de privacidad;
// `estado` es pendiente o autorizada (lo cambia el script).
export const ESQUEMA = `CREATE TABLE IF NOT EXISTS solicitudes (
  email TEXT PRIMARY KEY, nombre TEXT NOT NULL, rol TEXT NOT NULL, expectativa TEXT NOT NULL,
  acepto INTEGER NOT NULL, creado INTEGER NOT NULL, actualizado INTEGER NOT NULL,
  estado TEXT NOT NULL DEFAULT 'pendiente')`;
let tablaLista = false;

function limpiar(valor, max) {
  return String(valor || '').replace(/\s+/g, ' ').trim().slice(0, max);
}

export function validar(form) {
  const expectativa = String(form.get('expectativa') || '').replace(/\s+/g, ' ').trim();
  const datos = {
    nombre: limpiar(form.get('nombre'), LIMITES.nombre),
    email: limpiar(form.get('email'), LIMITES.email).toLowerCase(),
    rol: limpiar(form.get('rol'), 40),
    expectativa,
    consentimiento: form.get('consentimiento') === 'si',
  };
  if (!datos.nombre) return { error: 'nombre' };
  if (!EMAIL_RE.test(datos.email)) return { error: 'email' };
  if (!ROLES.includes(datos.rol)) return { error: 'rol' };
  if (!expectativa || expectativa.length > LIMITES.expectativa) return { error: 'expectativa' };
  if (!datos.consentimiento) return { error: 'consentimiento' };
  return { datos };
}

async function verificarTurnstile(env, token, ip) {
  if (!token) return false;
  const form = new FormData();
  form.append('secret', env.TURNSTILE_SECRET);
  form.append('response', String(token).slice(0, 2048));
  if (ip) form.append('remoteip', ip);
  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
  const j = await r.json().catch(() => ({}));
  return j.success === true;
}

// Una solicitud repetida actualiza sus datos y conserva la fecha de creación y el estado:
// la respuesta es la misma, así no se revela si el email ya estaba anotado o aprobado.
async function guardarSolicitud(env, datos) {
  if (!tablaLista) {
    await env.SOLICITUDES.prepare(ESQUEMA).run();
    tablaLista = true;
  }
  const ahora = Date.now();
  await env.SOLICITUDES.prepare(
    `INSERT INTO solicitudes (email, nombre, rol, expectativa, acepto, creado, actualizado)
     VALUES (?1, ?2, ?3, ?4, ?5, ?5, ?5)
     ON CONFLICT(email) DO UPDATE SET nombre = excluded.nombre, rol = excluded.rol,
       expectativa = excluded.expectativa, acepto = excluded.acepto, actualizado = excluded.actualizado`
  ).bind(datos.email, datos.nombre, datos.rol, datos.expectativa, ahora).run();
}

function responder(status, error) {
  return new Response(JSON.stringify(error ? { ok: false, error } : { ok: true }), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

export async function onRequestPost({ request, env }) {
  if (!env.SOLICITUDES || !env.TURNSTILE_SECRET) return responder(503, 'no_configurado');

  let form;
  try {
    form = await request.formData();
  } catch {
    return responder(400, 'servidor');
  }

  // Turnstile antes de mirar cualquier otro dato.
  try {
    if (!(await verificarTurnstile(env, form.get('turnstile'), request.headers.get('cf-connecting-ip')))) {
      return responder(400, 'turnstile');
    }
  } catch (err) {
    console.error('mutisux-beta turnstile:', err && err.message);
    return responder(502, 'servidor');
  }

  // Campo trampa: los bots lo completan. Respuesta de éxito para no darles pistas.
  if (limpiar(form.get('website'), 200)) return responder(200);

  const { datos, error } = validar(form);
  if (error) return responder(400, error);

  try {
    await guardarSolicitud(env, datos);
  } catch (err) {
    console.error('mutisux-beta:', err && err.message);
    return responder(502, 'servidor');
  }
  return responder(200);
}
