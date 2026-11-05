# 14 — Página de contacto en Astro

**id:** `contacto`
**Estado:** 🚧 En construcción en la rama `astro` · hecho: página, agenda, formulario y layout adaptado a mobile · pendiente: A CONFIRMAR 5 a 7 y prueba real de envío en producción
**Última actualización:** 2026-11-02
**Relacionada con:** 04-contact-page, 10-astro, 11-home

---

## Historia de usuario

**Como** founder o responsable de producto que quiere conversar sobre su producto,
**quiero** elegir entre agendar una llamada o escribir un mensaje,
**para** empezar la conversación de la forma que me resulte más cómoda.

> Redactada a partir de la spec 04 y del diseño. **A CONFIRMAR** por Luis.

## Objetivo

Pasar `/contacto/` al diseño nuevo y a Astro, sin cambiar su URL. Ofrecer los dos caminos, agenda en Cal.com y formulario, y mantener la medición de sus conversiones.

Métrica de éxito: la medición queda como hoy, con el evento `generate_lead` en los envíos del formulario.

---

## Diseño

- **Fuente:** [Contacto — Uxuaria (nodo 93:1984)](https://www.figma.com/design/67hslCn1jUCcFDvSCzRpmP/uxuaria-Web?node-id=93-1984).
- **Componentes y tokens:** Uxuaria Library y `public/site.css`.
- **Mobile:** sin frame; se adapta al maquetar y se revisa en el navegador.

### Secciones, en orden

| # | Sección | Contenido |
|---|---|---|
| 1 | Header | El compartido, con "Contacto" marcado como página actual |
| 2 | Presentación (93:1986) | Ruta "Inicio > Contacto", "Hablemos de tu producto." e introducción |
| 3 | Agenda (93:1993) | "Elegí un momento para conversar" y módulo con embed de Cal.com |
| 4 | Contacto por escrito (93:2150) | Bloque oscuro "¿Preferís empezar por escrito?", formulario y link a info@uxuaria.com |
| 5 | Footer | El compartido |

### Diferencias aprobadas respecto de Figma

| En Figma | En la página |
|---|---|
| Módulo de reserva dibujado, con disponibilidad de ejemplo | Embed real de Cal.com, con sus textos y su disponibilidad |
| Distintivo "Disponibilidad de ejemplo" | No se muestra |
| Solo un link de email | Formulario actual con estilo nuevo, más el link de email |

---

## Criterios de aceptación

**URL y SEO**
1. Dada la URL `/contacto/`, cuando se abre, entonces responde 200 en la misma URL.
2. Dada la página, entonces conserva `title`, description, canonical, OG y JSON-LD de tipo `ContactPage`, y tiene un único `<h1>`.

**Diseño**
3. Dado un viewport de 1440 px, entonces coincide con el frame 93:1984 en estructura, tipografía, color y espaciado, salvo las diferencias aprobadas.
4. Dado el header, entonces "Contacto" se muestra como página actual, con `aria-current="page"`.
5. Dado un viewport de 375 px, entonces no hay scroll horizontal y la agenda y el formulario se pueden usar.

**Agenda**
6. Dado el módulo, cuando se abre la página con JavaScript, entonces el embed de Cal.com permite elegir fecha y horario.
7. Dado que el embed está cargando, falla o JavaScript está desactivado, entonces queda visible un link directo a Cal.com y el módulo conserva su tamaño.
8. Dado que el visitante todavía no llegó al módulo, entonces el embed no frena la carga inicial.

**Formulario**
9. Dado el formulario, entonces conserva sus campos: nombre, email, tipo de proyecto, etapa, problema y cómo llegó.
10. Dado un envío vacío o con email inválido, entonces muestra los errores junto a cada campo y no envía.
11. Dado un envío válido, cuando Web3Forms responde bien, entonces muestra el mensaje de éxito y registra `form_submit` y `generate_lead`, con los mismos parámetros que hoy.
12. Dado que Web3Forms falla, entonces conserva lo escrito, muestra un mensaje de error y deja reintentar.
13. Dado JavaScript desactivado, entonces el formulario avisa con claridad que se puede escribir a info@uxuaria.com.
14. Dado un campo o botón, entonces tiene `label` visible cuando corresponde, foco de teclado visible y tamaño táctil suficiente.

**Interacción**
15. Dado un botón, cuando paso el mouse o tiene foco de teclado, entonces invierte sus colores, también sobre fondo oscuro.
16. Dada la página, entonces no hay animaciones de aparición ni de scroll.

---

## Decisiones tomadas

| Tema | Decisión |
|---|---|
| Agenda | Embed de Cal.com, `uxuaria-luis-romero/30min`, con los detalles del evento de Cal.com |
| Formulario | Se conserva, con el envío a Web3Forms y su medición |
| URL | `/contacto/` no cambia |
| Mobile | Se adapta al maquetar y se revisa en el navegador |
| Medición | Como hoy; no se agregan eventos ni herramientas |
| Animaciones | Solo hovers, como el blog y proyectos |
| Header | Se usa el compartido, con AI MVP Rescue, aunque este frame no lo muestra |

## Alcance

- `src/pages/contacto/index.astro` y una hoja de estilos de contacto.
- Estilos nuevos del formulario y sus estados.
- Estado de página actual en el header compartido.
- Traslado del JavaScript del formulario, sin cambiar el envío ni los eventos.

## Fuera de alcance / No tocar

- Migrar la agenda a Cal.com o construir un calendario propio.
- Cambiar los campos del formulario, el servicio de envío o la clave de Web3Forms.
- `/diagnostico/`, `/api/diagnostico` y el texto de otras páginas.
- La versión de `/contacto/` publicada hoy en `main`.

## Dependencias

- **Figma:** frame 93:1984.
- **Base visual:** `public/base.css`, `public/site.css`, `Navbar`, `Footer` y `BaseLayout` con `legacyStyles={false}`.
- **Externos:** Cal.com, Web3Forms y GA4 (`script.js`, `window.uxuariaTrack`).
- **Código actual:** `contacto/index.html`, como fuente de los campos, el envío y el SEO.

## Estados (UI)

- **Vacío:** formulario sin completar, con los campos requeridos marcados.
- **Carga:** el botón dice "Enviando…" y queda deshabilitado. El embed reserva su espacio.
- **Error:** errores por campo; mensaje general si Web3Forms falla; link directo si falla Cal.com.
- **Éxito:** mensaje de confirmación en lugar del formulario.

## Definición de hecho

La general de [`AGENTS.md`](../AGENTS.md), más:

- [ ] Comparado contra el frame a 1440 px.
- [ ] Probados en local el formulario vacío, el email inválido y el error de envío.
- [ ] Envío real probado en producción (parte C del test de regresión), con un nombre que empiece con `TEST`.
- [ ] Comprobado `generate_lead` en GA4 Realtime.
- [ ] `docs/specs/04-contact-page.md` y `docs/architecture.md` actualizados.

---

## A CONFIRMAR

**Decisiones de construcción**

1. **Panel izquierdo del módulo: resuelto (2026-11-02).** Lo muestra el propio embed de Cal.com, por lo que se quita el panel replicado. Su contenido se edita en la cuenta de Cal.com.

**Bloquean la publicación**

2. **Datos que no están en Figma: resuelto (2026-11-02).** Se quitan "Disponible para nuevos proyectos", horario de respuesta, ubicación, LinkedIn de la página (sigue en el footer) y la lista "¿En qué puedo ayudarte?".
3. **WhatsApp: resuelto (2026-11-02).** No se publica, como en Figma.
4. **Promesa de respuesta: resuelto (2026-11-02).** "Te respondo en menos de 24 horas" se quita, como en Figma.
5. **Texto del mensaje de éxito:** como la agenda ahora queda arriba y Figma no define este estado, propongo: "¡Mensaje recibido! Si querés, también podés agendar una llamada en el calendario de arriba."
6. **Título del evento en Cal.com:** dice "Reunión de discovery - 15 min", pero dura 30 minutos. Se corrige desde la cuenta de Cal.com.
7. **Duración: resuelto (2026-11-03).** La reunión dura 30 minutos en todo el sitio. Falta alinear el texto de la home.

---

## Dónde vive

- Página: `src/pages/contacto/index.astro`. Estilos: `public/contact.css`. Formulario: `public/contact.js`.
- Embed y enlace de la agenda: `src/components/CalEmbed.astro` y `src/lib/booking.ts`.
- Página actual en el menú: `src/components/Navbar.astro` y `public/site.css`.

## Conocido

- **Embed de Cal.com:** muestra sus propios textos, disponibilidad y marca. Carga cuando el bloque se acerca a la pantalla.
- **Altura del embed:** en 570 px, la lista de horarios queda con scroll interno.
- **Línea inferior del módulo:** incluye el link "Abrir la agenda en Cal.com ↗", la alternativa si el embed falla.
- **Sin JavaScript:** el formulario se oculta, aparece un aviso y queda visible el email.
- **Formulario:** se probó con el envío simulado; todavía no con un envío real a Web3Forms.
