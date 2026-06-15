export async function onRequestPost(context) {
  const { request, env } = context;
  const API_KEY     = env.BREVO_API_KEY;
  const LIST_ID     = parseInt(env.BREVO_LIST_ID || '3', 10);
  const SENDER_EMAIL = env.BREVO_SENDER_EMAIL || 'info@uxuaria.com';
  const SENDER_NAME  = 'Luis · Uxuaria';
  const NOTIFY_EMAIL = env.BREVO_NOTIFY_EMAIL || 'info@uxuaria.com';
  const CALENDLY_URL = 'https://calendly.com/luisca85/charla-introductoria-clone';

  if (!API_KEY) {
    return new Response(JSON.stringify({ error: 'Servidor no configurado' }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Datos inválidos' }), {
      status: 400, headers: { 'Content-Type': 'application/json' }
    });
  }

  const { nombre, email, tipoProyecto, etapa, problema, comoLlegaste } = data;
  if (!nombre || !email || !problema) {
    return new Response(JSON.stringify({ error: 'Faltan campos requeridos' }), {
      status: 400, headers: { 'Content-Type': 'application/json' }
    });
  }

  const TIPO_LABELS = {
    'startup':              'Startup en etapa temprana',
    'producto-establecido': 'Producto digital establecido',
    'app-ia':               'App construida con IA',
    'fintech':              'Fintech / producto financiero',
    'rediseno':             'Rediseño de producto existente',
    'otro':                 'Otro'
  };
  const ETAPA_LABELS = {
    'idea':       'Es una idea, todavía no hay producto',
    'mvp':        'Tiene un MVP o prototipo',
    'produccion': 'Está en producción, necesita mejoras',
    'escalando':  'Escalando y optimizando conversión'
  };
  const FUENTE_LABELS = {
    'google':   'Google / búsqueda orgánica',
    'linkedin': 'LinkedIn',
    'referido': 'Referido por alguien',
    'redes':    'Redes sociales',
    'blog':     'Blog de Uxuaria',
    'otro':     'Otro'
  };

  function brevoPost(endpoint, body) {
    return fetch('https://api.brevo.com/v3' + endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': API_KEY
      },
      body: JSON.stringify(body)
    }).then(async res => {
      if (!res.ok && res.status !== 204) {
        const err = await res.json().catch(() => ({}));
        throw new Error('[Brevo] ' + endpoint + ' → ' + res.status + ' ' + (err.message || ''));
      }
    });
  }

  const fecha = new Date().toLocaleString('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    dateStyle: 'full', timeStyle: 'short'
  });
  const tipoLabel   = TIPO_LABELS[tipoProyecto]   || tipoProyecto   || '—';
  const etapaLabel  = ETAPA_LABELS[etapa]          || etapa          || '—';
  const fuenteLabel = FUENTE_LABELS[comoLlegaste]  || comoLlegaste   || '—';

  const confirmationHtml = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Recibí tu mensaje</title></head>
<body style="margin:0;padding:0;background:#F7F7F5;font-family:Arial,Helvetica,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F7F7F5;padding:40px 16px"><tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background:#FFFFFF;border:2px solid #111111">
<tr><td style="background:#111111;padding:22px 32px"><span style="font-family:'Courier New',Courier,monospace;font-size:20px;font-weight:700;color:#C8F135;letter-spacing:3px">uxuaria</span></td></tr>
<tr><td style="padding:40px 32px 0">
<p style="font-size:24px;font-weight:700;color:#111111;margin:0 0 6px;letter-spacing:-0.5px;line-height:1.2">Hola ${nombre},<br>recib&iacute; tu mensaje.</p>
<p style="font-size:13px;color:#999999;margin:0 0 28px">En menos de 24 h te respondo con detalle.</p>
<p style="font-size:15px;color:#444444;line-height:1.75;margin:0 0 14px">Le&iacute; lo que me contaste sobre <strong style="color:#111111">${tipoLabel}</strong> y ya estoy pensando en c&oacute;mo ayudarte.</p>
<p style="font-size:15px;color:#444444;line-height:1.75;margin:0 0 28px">Suelo responder el mismo d&iacute;a. Si es urgente, pod&eacute;s agendar una llamada gratuita de 30 minutos directamente:</p>
</td></tr>
<tr><td style="padding:0 32px 32px"><table cellpadding="0" cellspacing="0" border="0"><tr><td style="background:#C8F135;border:2px solid #111111"><a href="${CALENDLY_URL}" style="display:block;padding:14px 28px;color:#111111;font-size:13px;font-weight:700;text-decoration:none;letter-spacing:0.5px">&#9654; Agend&aacute; tu UX Checkup gratuito &rarr;</a></td></tr></table></td></tr>
<tr><td style="padding:0 32px"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid #E8E8E4"></td></tr></table></td></tr>
<tr><td style="padding:28px 32px">
<p style="font-size:11px;font-weight:700;color:#999999;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 14px">Mientras tanto, algo que puede interesarte</p>
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 8px"><tr><td style="background:#F7F7F5;border-left:3px solid #C8F135;padding:11px 16px"><a href="https://uxuaria.com/blog/3-cosas-ux.html" style="color:#111111;font-size:13px;text-decoration:none;line-height:1.5;display:block">&rarr; 3 s&iacute;ntomas de que tu producto tiene un problema de UX (no de c&oacute;digo)</a></td></tr></table>
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px"><tr><td style="background:#F7F7F5;border-left:3px solid #C8F135;padding:11px 16px"><a href="https://uxuaria.com/blog/6-preguntas-ux.html" style="color:#111111;font-size:13px;text-decoration:none;line-height:1.5;display:block">&rarr; Las 6 preguntas que hacemos antes de empezar cualquier proyecto</a></td></tr></table>
<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid #E8E8E4;padding-top:24px">
<p style="font-size:14px;font-weight:700;color:#111111;margin:0 0 2px">Luis Carlos Romero Le&oacute;n</p>
<p style="font-size:13px;color:#666666;margin:0 0 8px">UX Designer &middot; Uxuaria &middot; Buenos Aires, Argentina</p>
<p style="font-size:13px;margin:0"><a href="https://uxuaria.com" style="color:#111111;text-decoration:none">uxuaria.com</a>&nbsp;&middot;&nbsp;<a href="https://www.linkedin.com/company/uxuaria/" style="color:#111111;text-decoration:none">LinkedIn</a></p>
</td></tr></table>
</td></tr>
<tr><td style="background:#F7F7F5;padding:16px 32px;border-top:1px solid #E8E8E4"><p style="font-size:11px;color:#AAAAAA;margin:0;line-height:1.6">Recibiste este email porque completaste el formulario de contacto en <a href="https://uxuaria.com" style="color:#AAAAAA">uxuaria.com</a>. No vas a recibir newsletters ni correos no solicitados.</p></td></tr>
</table></td></tr></table></body></html>`;

  const notificationHtml = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#F7F7F5;font-family:Arial,Helvetica,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:32px 16px"><tr><td align="center">
<table width="540" cellpadding="0" cellspacing="0" border="0" style="max-width:540px;width:100%;background:#FFFFFF;border:2px solid #111111">
<tr><td style="background:#111111;padding:18px 28px"><span style="font-family:'Courier New',Courier,monospace;font-size:11px;color:#C8F135;letter-spacing:2px;text-transform:uppercase">uxuaria &middot; nuevo contacto</span></td></tr>
<tr><td style="padding:28px 28px 0">
<p style="font-size:22px;font-weight:700;color:#111111;margin:0 0 2px">${nombre}</p>
<p style="font-size:14px;color:#666666;margin:0 0 22px"><a href="mailto:${email}" style="color:#666666">${email}</a></p>
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #E8E8E4;margin:0 0 20px">
<tr style="background:#F7F7F5"><td style="padding:10px 16px;font-size:11px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;width:40%">Tipo de proyecto</td><td style="padding:10px 16px;font-size:13px;color:#111">${tipoLabel}</td></tr>
<tr><td style="padding:10px 16px;font-size:11px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;border-top:1px solid #E8E8E4">Etapa</td><td style="padding:10px 16px;font-size:13px;color:#111;border-top:1px solid #E8E8E4">${etapaLabel}</td></tr>
<tr style="background:#F7F7F5"><td style="padding:10px 16px;font-size:11px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;border-top:1px solid #E8E8E4">C&oacute;mo lleg&oacute;</td><td style="padding:10px 16px;font-size:13px;color:#111;border-top:1px solid #E8E8E4">${fuenteLabel}</td></tr>
</table>
<p style="font-size:11px;font-weight:700;color:#888;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 10px">Mensaje</p>
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px"><tr><td style="background:#F7F7F5;border-left:3px solid #C8F135;padding:16px"><p style="font-size:14px;color:#111;line-height:1.75;margin:0;white-space:pre-wrap">${problema.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</p></td></tr></table>
</td></tr>
<tr><td style="padding:0 28px 28px"><a href="mailto:${email}" style="display:inline-block;background:#111111;color:#FFFFFF;font-size:12px;font-weight:700;padding:12px 20px;text-decoration:none;letter-spacing:0.3px">Responder por email &rarr;</a></td></tr>
<tr><td style="background:#F7F7F5;padding:14px 28px;border-top:1px solid #E8E8E4"><p style="font-size:11px;color:#AAAAAA;margin:0">uxuaria.com &middot; formulario de contacto &middot; ${fecha}</p></td></tr>
</table></td></tr></table></body></html>`;

  try {
    await Promise.all([
      brevoPost('/contacts', {
        email,
        firstName: nombre,
        listIds: [LIST_ID],
        updateEnabled: true,
        attributes: {
          FIRSTNAME:        nombre,
          TIPO_PROYECTO:    tipoLabel,
          ETAPA_PRODUCTO:   etapaLabel,
          COMO_LLEGO:       fuenteLabel,
          MENSAJE_CONTACTO: problema,
          FECHA_CONTACTO:   new Date().toISOString().split('T')[0]
        }
      }),
      brevoPost('/smtp/email', {
        sender:      { name: SENDER_NAME, email: SENDER_EMAIL },
        to:          [{ email, name: nombre }],
        subject:     `Recibí tu mensaje, ${nombre} — hablamos pronto`,
        htmlContent: confirmationHtml
      }),
      brevoPost('/smtp/email', {
        sender:      { name: 'Formulario Uxuaria', email: SENDER_EMAIL },
        to:          [{ email: NOTIFY_EMAIL, name: 'Luis' }],
        subject:     `Nuevo contacto: ${nombre} | ${tipoLabel}`,
        htmlContent: notificationHtml
      })
    ]);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('[Uxuaria] Brevo error:', err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
