/**
 * POST /api/mutisux-beta
 *
 * Recibe la inscripción a la beta de Mutis UX desde /mutisux/ (spec 09-mutisux).
 * Acepta el formulario nativo (sin JS) y el envío con fetch:
 *   - con `Accept: application/json` responde { ok, error };
 *   - sin JS, en éxito redirige (303) a /mutisux/gracias y, en error, devuelve
 *     una página corta con el mensaje y un enlace para volver.
 *
 * Campos: nombre (obligatorio), email (obligatorio), tipo (opcional),
 * consentimiento ("si", obligatorio) y website (campo trampa: si viene con
 * valor, se responde como éxito y no se guarda nada).
 *
 * DATO DESCONOCIDO: a dónde van los datos (Brevo, la app o una función propia).
 * Mientras no se decida, `guardarInscripcion` no guarda nada y la API responde
 * 503 `no_configurado`: nunca finge haber guardado.
 */

const LIMITES = { nombre: 80, email: 254, tipo: 500 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const MENSAJES = {
  nombre: 'Escribe tu nombre.',
  email: 'Escribe un correo válido, por ejemplo nombre@estudio.com.',
  consentimiento: 'Para anotarte, acepta la política de privacidad.',
  no_configurado: 'La inscripción todavía no está abierta. Vuelve a intentarlo en unos días.',
  servidor: 'No pudimos guardar tu inscripción. Intenta de nuevo en unos minutos.',
};

/* ------------------------------------------------------------------
   Destino de los datos: el ÚNICO lugar que cambia cuando se decida.
   Devuelve true si guardó, false si no hay destino configurado, y
   lanza un error si el destino falló.
------------------------------------------------------------------ */
async function guardarInscripcion(env, datos) {
  void env; void datos;
  return false;
}

function limpiar(valor, max) {
  return String(valor || '').replace(/\s+/g, ' ').trim().slice(0, max);
}

export function validar(form) {
  const datos = {
    nombre: limpiar(form.get('nombre'), LIMITES.nombre),
    email: limpiar(form.get('email'), LIMITES.email).toLowerCase(),
    tipo: limpiar(form.get('tipo'), LIMITES.tipo),
    consentimiento: form.get('consentimiento') === 'si',
  };
  if (!datos.nombre) return { error: 'nombre' };
  if (!EMAIL_RE.test(datos.email)) return { error: 'email' };
  if (!datos.consentimiento) return { error: 'consentimiento' };
  return { datos };
}

function quiereJSON(request) {
  return (request.headers.get('Accept') || '').includes('application/json');
}

function responder(request, status, error) {
  if (quiereJSON(request)) {
    return new Response(JSON.stringify(error ? { ok: false, error } : { ok: true }), {
      status,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  }
  if (!error) {
    return new Response(null, { status: 303, headers: { Location: '/mutisux/gracias' } });
  }
  const html = `<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex"><title>No pudimos anotarte | Mutis UX</title>
<link rel="stylesheet" href="/mutisux/mutisux.css"></head>
<body><main class="notice container"><h1 class="notice__title">No pudimos anotarte</h1>
<p class="notice__text">${MENSAJES[error] || MENSAJES.servidor}</p>
<a class="btn btn--primary btn--lg" href="/mutisux/#inscripcion">Volver al formulario</a></main></body></html>`;
  return new Response(html, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

export async function onRequestPost({ request, env }) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return responder(request, 400, 'servidor');
  }

  // Campo trampa: los bots lo completan. Respuesta de éxito para no darles pistas.
  if (limpiar(form.get('website'), 200)) return responder(request, 200);

  const { datos, error } = validar(form);
  if (error) return responder(request, 400, error);

  try {
    const guardado = await guardarInscripcion(env, datos);
    if (!guardado) return responder(request, 503, 'no_configurado');
  } catch (err) {
    console.error('mutisux-beta:', err && err.message);
    return responder(request, 502, 'servidor');
  }
  return responder(request, 200);
}
