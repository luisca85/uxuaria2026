export async function onRequestPost(context) {
  const { request } = context;

  const WEB3FORMS_KEY = '7ecf21c6-65f3-4f53-99d0-9d4257a15c6b';

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

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject:    'Nuevo contacto Uxuaria: ' + nombre,
      from_name:  'Formulario Uxuaria',
      name:       nombre,
      email:      email,
      message:    'Tipo de proyecto: ' + tipoProyecto
                + '\nEtapa: ' + etapa
                + '\nCómo llegó: ' + comoLlegaste
                + '\n\nMensaje:\n' + problema
    })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return new Response(JSON.stringify({ error: err.message || 'Error al enviar' }), {
      status: 502, headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200, headers: { 'Content-Type': 'application/json' }
  });
}
