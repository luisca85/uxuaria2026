# 04 — Página de Contacto

**Estado:** Spec aprobado — pendiente de implementación  
**Archivo de destino:** `contacto.html`  
**Creado:** 2026-06-04  
**Depende de:** `00-overview.md`, `01-content.md`

---

## Objetivo

Dar al visitante dos caminos claros para iniciar contacto:
1. **Agenda una llamada** — vía Calendly, sin fricción, cita confirmada inmediatamente
2. **Enviame un mensaje** — formulario simple para quien prefiere escribir primero

El objetivo de conversión es lograr que el visitante tome acción en esta página. No es una página de FAQ ni de información — es una página de acción.

---

## URL

```
https://uxuaria.com/contacto.html
```

---

## Estructura de la página

```
[navbar fijo]
[breadcrumb: Home › Contacto]
[hero de contacto — título + descripción breve]
[sección de dos métodos de contacto]
  [Método A — Agenda una llamada (Calendly)]
  [Método B — Enviame un mensaje (formulario)]
[footer]
```

---

## Hero de contacto

```
[eyebrow]  Contacto
[h1]       Hablemos
[desc]     Elegí cómo querés iniciar la conversación.
           Sin compromiso — primero entendemos si tiene sentido trabajar juntos.
```

`padding: 124px 0 56px`, `border-bottom: 3px solid` — mismo patrón que blog-hero y services-hero.

---

## Sección de métodos — layout

Dos bloques en columnas iguales (`grid-template-columns: 1fr 1fr`, `gap: 40px`), con borde 3px y sombra 6px entre ellos. En mobile: columna única.

```
┌───────────────────────────────┐  ┌───────────────────────────────┐
│  [ÍCONO CALENDARIO]           │  │  [ÍCONO MENSAJE]               │
│                               │  │                                │
│  Agenda una llamada           │  │  Enviame un mensaje            │
│                               │  │                                │
│  30 minutos, sin costo.       │  │  Contame en qué estás          │
│  Seleccioná el horario que    │  │  trabajando y te respondo en   │
│  mejor te quede.              │  │  menos de 24 horas por el      │
│                               │  │  medio que prefieras.          │
│  [Calendly embed o botón]     │  │  [Formulario]                  │
└───────────────────────────────┘  └───────────────────────────────┘
```

---

## Método A — Agenda una llamada (Calendly)

### Implementación recomendada

Dos opciones según preferencia:

**Opción A1 — Embed inline (recomendada)**
```html
<!-- Calendly inline widget -->
<div class="calendly-inline-widget"
     data-url="https://calendly.com/[handle]/30min"
     style="min-width:320px;height:700px;">
</div>
<script type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"
        async>
</script>
```
El calendario aparece directamente en la página. Mayor fricción visual pero máxima conversión.

**Opción A2 — Botón que abre popup de Calendly**
```html
<a href=""
   onclick="Calendly.initPopupWidget({url:'https://calendly.com/[handle]/30min'});return false;"
   class="btn btn--primary">
  Elegir horario →
</a>
<link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet">
<script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
```
Más limpio visualmente. El calendario abre en un overlay.

> **Decisión pendiente:** ¿Embed inline o popup? **Recomendación:** popup (opción A2) — mantiene la estética del sitio sin que el iframe de Calendly rompa el layout.

> **Pendiente:** URL real de Calendly (`https://calendly.com/[handle]/30min`).

### Copy del bloque

```
[eyebrow / badge]  LLAMADA GRATUITA
[título]           Agenda una llamada de 30 min
[descripción]      Seleccioná el horario que mejor te quede.
                   Charlamos sobre tu proyecto y vemos
                   si tiene sentido trabajar juntos.
[sub-info]         ▸ Videollamada por Google Meet o Zoom
                   ▸ Sin compromiso
                   ▸ Respuesta confirmada al instante
[btn]              [Elegir horario →]
```

---

## Método B — Enviame un mensaje (formulario)

### Campos del formulario

| Campo | Tipo | Obligatorio | Placeholder / Label |
|---|---|---|---|
| Nombre | `text` | ✅ | "Tu nombre" |
| Email | `email` | ✅ | "tu@email.com" |
| Medio de respuesta preferido | `radio` | ✅ | Email / WhatsApp / No tengo preferencia |
| Número de WhatsApp | `tel` | Condicional (si selecciona WhatsApp) | "+54 9 11 XXXX XXXX" |
| Mensaje | `textarea` | ✅ | "Contame en qué estás trabajando..." |
| **Newsletter opt-in** | `radio` (SÍ / NO) | ✅ | Ver sección "Newsletter opt-in" abajo |

### Newsletter opt-in

Aparece como penúltimo campo, antes del botón de envío. Usa radio buttons (no checkbox pre-marcado — opt-in explícito).

```
┌─────────────────────────────────────────────────────────────────┐
│  ¿Querés recibir contenido sobre UX, IA y desarrollo            │
│  de negocios digitales?                                          │
│                                                                  │
│  ( ) Sí, quiero recibir ese contenido                            │
│  ( ) No, solo quiero que me contactes                            │
└─────────────────────────────────────────────────────────────────┘
```

- Radio buttons estilizados en V3.1 (borde 2px, sin `border-radius`)
- Campo obligatorio (el usuario debe elegir explícitamente)
- Si selecciona SÍ: se agrega al segmento "Newsletter" en Brevo
- Si selecciona NO: se registra el contacto en Brevo pero sin suscripción

---

### Implementación del envío

Stack: HTML estático en Cloudflare Pages → necesita servicio externo para formulario + email automático + lista de contactos.

**Servicio recomendado — Brevo (ex Sendinblue, plan gratuito):**
El único servicio gratuito que cubre los tres requisitos en una sola plataforma:
- ✓ Procesa formularios vía API o JS SDK
- ✓ Envía el email de respuesta automática al remitente
- ✓ Gestiona la lista de suscriptores al newsletter
- ✓ Permite segmentar entre "contacto general" y "suscriptor newsletter"

```javascript
// Integración con Brevo via SDK JS (sin backend)
emailjs.send('brevo_service', 'template_contact', {
  nombre: form.nombre.value,
  email: form.email.value,
  mensaje: form.mensaje.value,
  newsletter: form.newsletter.value
});
```

> Ver sección "Email de respuesta automática" más abajo para el template del email.

**Pendiente:** crear cuenta en Brevo, configurar SMTP / API key, y definir listas.

**Alternativa — Formspree + Mailchimp (dos servicios):**
Formspree procesa el formulario y webhooks a Mailchimp para la lista. Más complejo de mantener.

**Alternativa — mailto: como fallback de emergencia:**
Solo usar si el servicio principal falla. No soporta respuesta automática ni lista.

### Validación del formulario

- Validación nativa HTML5 (`required`, `type="email"`)
- Campo WhatsApp se muestra/oculta con JS según selección del radio
- Mensaje de confirmación inline al enviar (sin redirección si se usa JS puro)

### Copy del bloque

```
[eyebrow / badge]  MENSAJE DIRECTO
[título]           Preferís escribir primero
[descripción]      Contame en qué estás trabajando y te respondo
                   en menos de 24 horas por el medio que prefieras.
[sub-info]         ▸ Respondo en menos de 24 horas hábiles
                   ▸ Te contacto por el canal que elijas
```

### Estado post-envío

Inline dentro del formulario (sin redirección):
```
✓ Mensaje enviado. Te voy a contactar en menos de 24 horas.
```

O redirección a `gracias.html` (página de confirmación — spec futuro):
```
[eyebrow]  MENSAJE RECIBIDO
[título]   ¡Listo, recibí tu mensaje!
[desc]     Te voy a contactar en menos de 24 horas
           por el medio que preferiste.
[btn]      Volver al inicio →
```

---

---

## Email de respuesta automática

Se envía automáticamente al email del remitente al completar cualquier formulario del sitio (contacto y UX Checkup). Diseñado en HTML simple compatible con todos los clientes de email.

### Cuándo se envía

| Formulario | Subject | Segmento Brevo |
|---|---|---|
| Formulario de contacto | "Recibí tu mensaje — Luis Carlos · Uxuaria" | Contacto general |
| Aplicación UX Checkup | "Recibí tu aplicación al UX Checkup — Uxuaria" | UX Checkup |

### Contenido del email — contacto general

```
ASUNTO: Recibí tu mensaje — Luis Carlos · Uxuaria

─────────────────────────────────────────────

  uxuaria

─────────────────────────────────────────────

  Hola [Nombre],

  Recibí tu mensaje — gracias por tomarte el tiempo
  de escribirme.

  Me voy a poner en contacto con vos pronto por el
  medio que elegiste. Si surge cualquier urgencia,
  podés escribirme directamente a info@uxuaria.com.

  Mientras tanto, si querés seguir explorando ideas
  sobre UX, IA y producto digital, te dejo el blog:

  [→ Leer los artículos del blog]
     uxuaria.com/blog.html

─────────────────────────────────────────────

  [Si elegiste recibir contenido — SOLO si opt-in = SÍ]

  También te sumé a la lista de personas que reciben
  contenido sobre diseño UX, IA y desarrollo de
  negocios digitales. Cuando haya algo nuevo y valioso,
  te aviso.

  Si cambiás de idea, podés darte de baja cuando quieras.

─────────────────────────────────────────────

  Un saludo,
  Luis Carlos Romero León
  Consultor UX · Uxuaria
  uxuaria.com · LinkedIn

─────────────────────────────────────────────
```

### Contenido del email — UX Checkup

```
ASUNTO: Recibí tu aplicación al UX Checkup — Uxuaria

─────────────────────────────────────────────

  uxuaria

─────────────────────────────────────────────

  Hola [Nombre],

  Recibí tu aplicación al UX Checkup.

  Voy a revisar tu producto y me voy a comunicar con
  vos en menos de 48 horas para coordinar el diagnóstico.

  Chequeá que este email no haya caído en spam — voy
  a responderte desde info@uxuaria.com.

  Mientras esperás, si querés entrar en contexto sobre
  cómo pienso el diseño UX, te dejo algo para leer:

  [→ Leer los artículos del blog]
     uxuaria.com/blog.html

─────────────────────────────────────────────

  [Si eligió recibir contenido — SOLO si opt-in = SÍ]

  También te sumé a la lista de personas que reciben
  contenido sobre diseño UX, IA y desarrollo de negocios
  digitales. Nada de spam — solo cuando haya algo valioso.

─────────────────────────────────────────────

  Un saludo,
  Luis Carlos Romero León
  Consultor UX · Uxuaria
  uxuaria.com · LinkedIn

─────────────────────────────────────────────
```

### Diseño del email HTML

- Fondo blanco `#FFFFFF`, ancho máximo `600px`, centrado
- Header: texto "uxuaria" en Inter bold, negro, sin logo imagen (mejor compatibilidad)
- Separadores: línea `border-top: 2px solid #111111` (retro, consistente con V3.1)
- Fuente: Inter (con fallback `system-ui, sans-serif` — Google Fonts no siempre carga en email)
- Botón CTA al blog: fondo negro, texto blanco, sin `border-radius` → `border-radius: 0`
- El bloque de newsletter **solo se incluye si opt-in = SÍ** (condicional en el template de Brevo)
- Footer: texto gris claro, link de baja obligatorio (requerimiento legal Brevo)

---

## Clases CSS a crear / reutilizar

| Clase | Descripción |
|---|---|
| `.contact-hero` | Hero de la página (reutiliza estructura de `.blog-hero`) |
| `.contact-methods` | Grid de dos columnas con los dos métodos |
| `.contact-method` | Bloque individual (border 3px + shadow 6px) |
| `.contact-method__icon` | Ícono SVG del método |
| `.contact-method__title` | Título del método |
| `.contact-method__desc` | Descripción del método |
| `.contact-method__features` | Lista de bullets con ▸ |
| `.contact-form` | Contenedor del formulario |
| `.contact-form__field` | Wrapper de cada campo (label + input) |
| `.contact-form__radio-group` | Grupo de radio buttons |
| `.contact-form__submit` | Botón de envío |
| `.contact-form__success` | Mensaje de confirmación (oculto por defecto) |

Reutilizar: `.breadcrumb`, `.section-eyebrow`, `.btn--primary`, `.footer`, `.navbar`

---

## SEO

```html
<title>Contacto — Hablemos de tu proyecto | Uxuaria</title>
<meta name="description" content="Agenda una llamada gratuita de 30 min o enviame un mensaje. Trabajamos juntos en tu producto digital desde Buenos Aires para LATAM." />
<link rel="canonical" href="https://uxuaria.com/contacto.html" />
```

---

## Pendientes antes de implementar

- [ ] URL real de Calendly (`calendly.com/[handle]/30min`)
- [ ] Decidir implementación Calendly: inline embed vs popup
- [ ] Crear cuenta en Brevo — obtener API key y configurar SMTP
- [ ] Crear dos listas en Brevo: "Contactos generales" y "Newsletter UX·IA·Negocio"
- [ ] Configurar template de email automático en Brevo (uno para contacto, uno para checkup)
- [ ] Confirmar copy final de los emails con el cliente
- [ ] Decidir si hay página de confirmación `gracias.html` o mensaje inline
- [ ] Iconos SVG para cada método (calendario / mensaje)

## Changelog

> Registra cambios una vez iniciada la implementación.
