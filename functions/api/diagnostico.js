/**
 * POST /api/diagnostico
 *
 * Recibe el formulario del diagnóstico de AI MVP Rescue (ai-mvp-rescue.html),
 * calcula puntaje y nivel (A o B) y:
 *   1. crea la ficha en Notion (Funnel Uxuaria)      → si hay NOTION_TOKEN
 *   2. manda el email de bienvenida al lead (Resend) → si hay RESEND_API_KEY y MAIL_FROM
 *
 * Responde { ok, nivel, puntaje, calendly, asunto, resumen }. `calendly` solo viene
 * con valor para el nivel A: la página de gracias le muestra las condiciones y el
 * botón para agendar la primera llamada. El aviso por email a Luis lo
 * manda el navegador a Web3Forms con asunto y resumen (diagnostico/diagnostico.js):
 * el plan Free de Web3Forms rechaza los envíos server-side, como los de esta función.
 * Si Notion o Resend fallan, igual responde ok: el lead queda en el email.
 *
 * Variables de entorno (Cloudflare Pages → Settings → Variables and secrets):
 *   NOTION_TOKEN     secreto  token de la integración interna de Notion
 *   NOTION_DB_ID     opcional id de la base Funnel Uxuaria (tiene valor por defecto)
 *   RESEND_API_KEY   secreto  opcional: activa el email automático al lead
 *   MAIL_FROM        opcional ej. "Luis Carlos Romero <luis@uxuaria.com>" (dominio verificado en Resend)
 *   MAIL_REPLY_TO    opcional ej. "luisca85@gmail.com"
 *   CALENDLY_URL     opcional link de agenda para el nivel A
 */

const DEFAULTS = {
  NOTION_DB_ID: '3dc54c75015080be9a66d55233fa7afe',
  CALENDLY_URL: 'https://calendly.com/luisca85/charla-introductoria-clone',
};

/* ------------------------------------------------------------------
   Opciones del formulario y puntaje
   Las claves (value) son las que manda el HTML. Si cambiás una opción
   en la landing, cambiala acá también.
------------------------------------------------------------------ */
export const OPCIONES = {
  construccion: {
    ia: 'Principalmente con IA (Cursor, Lovable, Bolt, v0, Replit, Claude Code)',
    mixto: 'Combinando IA con desarrollo tradicional',
    tradicional: 'Solo desarrollo tradicional',
  },
  etapa: {
    prototipo: { label: 'Prototipo, todavía sin usuarios', pts: 0 },
    beta: { label: 'Beta con usuarios de prueba', pts: 8 },
    produccion: { label: 'En producción con usuarios reales', pts: 15 },
    factura: { label: 'Ya factura', pts: 20 },
  },
  usuarios: {
    '0': { label: '0', pts: 0 },
    '1-50': { label: '1 a 50', pts: 5 },
    '51-500': { label: '51 a 500', pts: 10 },
    '500+': { label: 'Más de 500', pts: 15 },
  },
  rol: {
    founder_ft: { label: 'Founder, le dedico todo mi tiempo', pts: 25 },
    founder_pt: { label: 'Founder, pero tengo otro trabajo', pts: 12 },
    empresa: { label: 'PM o equipo de una empresa', pts: 20 },
    cliente: { label: 'Lo construyo para un cliente', pts: 15 },
    personal: { label: 'Proyecto personal o de estudio', pts: 0 },
  },
  presupuesto: {
    personal: { label: 'No pienso asignarle presupuesto, es un proyecto personal', pts: 0 },
    'menos-500': { label: 'Menos de USD 500', pts: 2 },
    '500-1000': { label: 'USD 500 a 1.000', pts: 10 },
    '1000-2500': { label: 'USD 1.000 a 2.500', pts: 15 },
    '2500-5000': { label: 'USD 2.500 a 5.000', pts: 18 },
    '5000+': { label: 'Más de USD 5.000', pts: 20 },
  },
  urgencia: {
    'este-mes': { label: 'Este mes', pts: 10 },
    '1-3-meses': { label: 'En 1 a 3 meses', pts: 6 },
    'sin-fecha': { label: 'Sin fecha', pts: 0 },
  },
  problema: {
    onboarding: 'Los usuarios no completan el onboarding',
    churn: 'Alta tasa de abandono o churn',
    engagement: 'Bajo engagement o uso repetido',
    confusion: 'La interfaz genera confusión y recibo mucho soporte',
    claridad: 'No sé si la experiencia es clara, nadie me lo dice',
    otro: 'Otro',
  },
};

export const UMBRAL_A = 60;

const PUNTUADAS = ['etapa', 'usuarios', 'rol', 'presupuesto', 'urgencia'];

export function calcularNivel(d) {
  let puntaje = 0;
  for (const campo of PUNTUADAS) {
    const opt = OPCIONES[campo][d[campo]];
    if (opt) puntaje += opt.pts;
  }
  let nivel;
  if (d.presupuesto === 'personal' || d.rol === 'personal') nivel = 'B';
  else if (puntaje >= UMBRAL_A) nivel = 'A';
  else nivel = 'B';
  return { puntaje, nivel };
}

/* ------------------------------------------------------------------
   Utilidades
------------------------------------------------------------------ */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function limpiar(v, max = 500) {
  return String(v == null ? '' : v).trim().slice(0, max);
}

export function normalizarUrl(u) {
  let s = limpiar(u, 300);
  if (!s) return '';
  if (!/^https?:\/\//i.test(s)) s = 'https://' + s;
  try {
    const url = new URL(s);
    return url.hostname.includes('.') ? url.toString() : '';
  } catch {
    return '';
  }
}

export function origenDesdeUtm(source, medium) {
  const s = (source || '').toLowerCase();
  const m = (medium || '').toLowerCase();
  if (s.includes('google') || m === 'cpc' || m === 'ppc') return 'Google Ads';
  if (s.includes('linkedin')) return m === 'dm' || m === 'outbound' ? 'LinkedIn outbound' : 'LinkedIn post';
  if (s.includes('instagram')) return 'Instagram';
  if (s.includes('whatsapp')) return 'WhatsApp';
  if (s.includes('email') || m === 'email') return 'Email';
  if (s.includes('referido') || m === 'referral') return 'Referido';
  return 'Formulario web';
}

/** Suma n días hábiles (lunes a viernes) a una fecha y devuelve YYYY-MM-DD. */
export function sumarDiasHabiles(fecha, n) {
  const d = new Date(fecha.getTime());
  let sumados = 0;
  while (sumados < n) {
    d.setUTCDate(d.getUTCDate() + 1);
    const dia = d.getUTCDay();
    if (dia !== 0 && dia !== 6) sumados++;
  }
  return d.toISOString().slice(0, 10);
}

const PROXIMA_ACCION = {
  A: 'Nivel A: confirmar que agendó la reunión; si no, escribirle (email A2)',
  B: 'Nivel B: revisar el caso y responder a mano según corresponda',
};

function etiqueta(campo, valor) {
  const opt = OPCIONES[campo] && OPCIONES[campo][valor];
  if (!opt) return valor || '(sin respuesta)';
  return typeof opt === 'string' ? opt : opt.label;
}

export function resumenTexto(d, nivel, puntaje, origen) {
  return [
    `Nivel ${nivel} · ${puntaje} puntos · Origen: ${origen}`,
    '',
    `Nombre: ${d.nombre}`,
    `Email: ${d.email}`,
    `Producto: ${d.producto || '(sin nombre)'}`,
    `URL: ${d.url}`,
    '',
    `Cómo lo construyó: ${etiqueta('construccion', d.construccion)}`,
    `Etapa: ${etiqueta('etapa', d.etapa)}`,
    `Usuarios activos por mes: ${etiqueta('usuarios', d.usuarios)}`,
    `Rol: ${etiqueta('rol', d.rol)}`,
    `Presupuesto (3 meses): ${etiqueta('presupuesto', d.presupuesto)}`,
    `Urgencia: ${etiqueta('urgencia', d.urgencia)}`,
    `Mayor preocupación: ${etiqueta('problema', d.problema)}`,
    `Contexto: ${d.contexto || '(vacío)'}`,
    '',
    `UTM: source=${d.utm_source || '-'} medium=${d.utm_medium || '-'} campaign=${d.utm_campaign || '-'} gclid=${d.gclid ? 'sí' : 'no'}`,
  ].join('\n');
}

/* ------------------------------------------------------------------
   Integraciones
------------------------------------------------------------------ */
function rt(texto) {
  return [{ type: 'text', text: { content: limpiar(texto, 1900) } }];
}

async function crearFichaNotion(env, d, nivel, puntaje, origen, hoy) {
  const empresa = d.producto || (d.url ? new URL(d.url).hostname.replace(/^www\./, '') : '');
  const properties = {
    Name: { title: rt(d.nombre) },
    Email: { email: d.email },
    Etapa: { select: { name: '5 Lead nuevo' } },
    Nivel: { select: { name: nivel } },
    Puntaje: { number: puntaje },
    Origen: { select: { name: origen } },
    Empresa: { rich_text: rt(empresa) },
    'Fecha form': { date: { start: hoy.toISOString().slice(0, 10) } },
    'Próximo seguimiento': { date: { start: sumarDiasHabiles(hoy, 1) } },
    'Próxima acción': { rich_text: rt(PROXIMA_ACCION[nivel]) },
  };
  if (d.url) properties['URL producto'] = { url: d.url };

  const children = resumenTexto(d, nivel, puntaje, origen)
    .split('\n')
    .filter((l) => l.trim())
    .map((l) => ({ object: 'block', type: 'paragraph', paragraph: { rich_text: rt(l) } }));

  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.NOTION_TOKEN}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parent: { database_id: env.NOTION_DB_ID || DEFAULTS.NOTION_DB_ID },
      properties,
      children: [
        { object: 'block', type: 'heading_2', heading_2: { rich_text: rt('Respuestas del formulario') } },
        ...children,
      ],
    }),
  });
  if (!res.ok) throw new Error(`Notion ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

export function emailAlLead(nivel, nombre, producto, calendly) {
  const n = nombre.split(' ')[0];
  const p = producto || 'tu producto';
  const firma = '\n\nLuis Carlos Romero\nUxuaria · uxuaria.com';
  if (nivel === 'A') {
    return {
      subject: `Recibí tu pedido de diagnóstico para ${p}`,
      text:
        `Hola ${n},\n\nRecibí tu pedido. Por lo que me contaste, ${p} está en un punto donde un diagnóstico puede marcar la diferencia, así que avancemos.\n\n` +
        `El siguiente paso es una reunión de 20 minutos. Ahí entiendo tu producto y qué te preocupa, para que el diagnóstico sea sobre tu caso y no una lista genérica.\n\n` +
        `Agendá acá: ${calendly}\n\nSi tu app requiere login, tené a mano un usuario de prueba.` + firma,
    };
  }
  return {
    subject: `Tu diagnóstico de ${p} está en camino`,
    text:
      `Hola ${n},\n\nRecibí tu pedido. En los próximos 5 días hábiles te mando un video corto donde recorro el flujo principal de ${p} y una página con los 3 puntos que más te conviene mirar.\n\n` +
      `No necesitás agendar nada. Si tu app requiere login, respondé este email con un usuario de prueba.` + firma,
  };
}

async function mandarEmailAlLead(env, d, nivel, calendly) {
  const { subject, text } = emailAlLead(nivel, d.nombre, d.producto, calendly);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.MAIL_FROM,
      to: [d.email],
      reply_to: env.MAIL_REPLY_TO || undefined,
      subject,
      text,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

/* ------------------------------------------------------------------
   Handler
------------------------------------------------------------------ */
function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

export function validar(raw) {
  const d = {
    nombre: limpiar(raw.nombre, 120),
    email: limpiar(raw.email, 200).toLowerCase(),
    producto: limpiar(raw.producto, 120),
    url: normalizarUrl(raw.url),
    construccion: limpiar(raw.construccion, 40),
    etapa: limpiar(raw.etapa, 40),
    usuarios: limpiar(raw.usuarios, 40),
    rol: limpiar(raw.rol, 40),
    presupuesto: limpiar(raw.presupuesto, 40),
    urgencia: limpiar(raw.urgencia, 40),
    problema: limpiar(raw.problema, 40),
    contexto: limpiar(raw.contexto, 1500),
    utm_source: limpiar(raw.utm_source, 100),
    utm_medium: limpiar(raw.utm_medium, 100),
    utm_campaign: limpiar(raw.utm_campaign, 150),
    gclid: limpiar(raw.gclid, 200),
  };
  const errores = [];
  if (!d.nombre) errores.push('nombre');
  if (!EMAIL_RE.test(d.email)) errores.push('email');
  if (!d.url) errores.push('url');
  for (const campo of ['construccion', 'etapa', 'usuarios', 'rol', 'presupuesto', 'urgencia']) {
    if (!OPCIONES[campo][d[campo]]) errores.push(campo);
  }
  if (d.problema && !OPCIONES.problema[d.problema]) d.problema = '';
  return { d, errores };
}

export async function onRequestPost({ request, env }) {
  let raw;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, error: 'Datos inválidos' }, 400);
  }

  // Anti-spam: campo trampa oculto y tiempo mínimo de llenado
  const tiempo = Number(raw._t || 0);
  if (raw.website || (tiempo && tiempo < 4000)) {
    return json({ ok: true, nivel: 'B' }); // respuesta falsa sin resumen: no se guarda ni se avisa nada
  }

  const { d, errores } = validar(raw);
  if (errores.length) return json({ ok: false, error: 'Faltan datos', campos: errores }, 400);

  const { puntaje, nivel } = calcularNivel(d);
  const origen = origenDesdeUtm(d.utm_source, d.utm_medium);
  const calendly = env.CALENDLY_URL || DEFAULTS.CALENDLY_URL;
  const hoy = new Date();

  const tareas = [];
  if (env.NOTION_TOKEN) tareas.push(crearFichaNotion(env, d, nivel, puntaje, origen, hoy));
  if (env.RESEND_API_KEY && env.MAIL_FROM) tareas.push(mandarEmailAlLead(env, d, nivel, calendly));

  const resultados = await Promise.allSettled(tareas);
  resultados.forEach((r) => r.status === 'rejected' && console.error('[diagnostico]', r.reason && r.reason.message));

  return json({
    ok: true,
    nivel,
    puntaje,
    // Nivel A agenda la primera llamada desde la página de gracias (decisión 2026-09-28)
    calendly: nivel === 'A' ? calendly : '',
    asunto: `[Nivel ${nivel} · ${puntaje} pts] Nuevo lead: ${d.nombre} · ${d.producto || d.url}`,
    resumen: resumenTexto(d, nivel, puntaje, origen),
  });
}
