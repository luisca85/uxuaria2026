# 08 · Página de recursos

**id:** `recursos`
**Estado:** 📝 Spec en borrador · falta resolver los A CONFIRMAR antes de `/construir`
**Última actualización:** 2026-09-29
**Relacionada con:** [06-blog.md](06-blog.md) (el post sobre spec driven lleva a esta página) · [04-contact-page.md](04-contact-page.md) (mismo envío por Web3Forms)

---

## Historia de usuario

**Como** founder, diseñador o persona que construye productos con IA y llegó a Uxuaria por el blog o LinkedIn,
**quiero** encontrar en un solo lugar los recursos que Luis comparte y descargarlos dejando mi email,
**para** usarlos en mis proyectos sin tener que pedirlos por mensaje directo.

## Objetivo

Crear una página propia, `/recursos/`, que funcione como biblioteca de recursos personales de Luis para compartir con sus usuarios. Cada recurso se entrega a cambio de nombre y email, y esos contactos se suman a la lista de email que Luis ya tiene en Brevo.

El primer recurso es **Spec lite**, el skill de spec driven liviano que armó Luis.

La página se suma a la navegación principal, y el post del blog sobre spec driven cierra con un link a ella.

Métrica de éxito: evento **`generate_lead`** en GA4 con `form_id: 'recursos'`.

---

## Criterios de aceptación

**Página**
1. Dado que abro `/recursos/`, entonces veo un título, un texto de introducción y la lista de recursos disponibles. Copy: **A CONFIRMAR**.
2. Dado que veo un recurso, entonces tiene nombre, una descripción de dos o tres líneas, el tipo de archivo (por ejemplo "Skill · .md") y el botón para pedirlo.
3. Dado que la página tiene un solo recurso, entonces se ve completa y no parece vacía (el layout funciona con 1 recurso y con varios).
4. Dado que Luis quiere sumar un recurso nuevo, entonces le alcanza con copiar el bloque HTML de un recurso y cambiar sus datos y su archivo. No hay CMS ni base de datos.

**Primer recurso: el skill**
5. El primer recurso es el skill **Spec lite** (id `spec-lite`). Descripción: **A CONFIRMAR**.
6. El archivo que se descarga lo provee Luis. **A CONFIRMAR**: si se publica el SKILL.md tal como está o una versión preparada para compartir.

**Pedido con email**
7. Dado que hago clic en el botón de un recurso, entonces se abre un formulario corto para ese recurso. Campos: nombre y email, los dos obligatorios.
8. Dado un nombre vacío o un email inválido, cuando intento enviar, entonces veo el error en línea y no se envía. Email: "Hmm… ese email no parece válido" (mismo texto que el funnel). Nombre: "Contame tu nombre" (**A CONFIRMAR**).
8b. Dado que el formulario suma mi email a una lista de envíos, entonces veo un texto que lo aclara antes de enviar (por ejemplo, que voy a recibir novedades y me puedo dar de baja cuando quiera). Texto y si lleva casilla de consentimiento: **A CONFIRMAR**.
9. Dado un envío válido, entonces el botón pasa a "Enviando…" y queda deshabilitado hasta tener respuesta.
10. Dado un envío válido, entonces el navegador manda `POST /api/recursos` con nombre, email, id del recurso y el campo trampa.
10b. Dado que `/api/recursos` recibe un pedido válido, entonces crea o actualiza el contacto en Brevo (`POST https://api.brevo.com/v3/contacts` con `updateEnabled: true`), con el nombre en el atributo `FIRSTNAME` y dentro de la lista de Luis (`listIds`). La API key de Brevo vive solo en el servidor, nunca en el HTML.
10c. Dado un envío exitoso (`{ ok: true }`), entonces en la página aparece el mensaje de éxito y el botón **"Descargar"** del archivo.
10d. Dado un email que ya está en la lista, entonces el envío también es exitoso y puedo descargar (no se duplica el contacto).
10e. **A CONFIRMAR**: si Luis además quiere un aviso por email en cada pedido (Web3Forms, como `/contacto/`) o le alcanza con ver los contactos en Brevo.
10f. **A CONFIRMAR**: si se usa doble opt-in de Brevo (la persona confirma por email antes de entrar a la lista). Si se usa, la descarga igual se habilita al enviar.
11. Dado que el envío falla (red, error de Brevo o `ok: false`), entonces veo "No se pudo enviar. Probá de nuevo o escribime a info@uxuaria.com", el botón se reactiva y lo que escribí sigue ahí.
12. El formulario lleva un campo trampa (honeypot) oculto, como el resto de los formularios del sitio.
13. Sin JavaScript: **A CONFIRMAR**. Propuesta: igual que `/diagnostico/`, se ve un aviso para pedir el recurso a info@uxuaria.com. Si se acepta, es una excepción a progressive enhancement y va a `decisions.md`.

**Dónde quedan los contactos**
14. Los contactos quedan en la lista que Luis ya tiene en Brevo. **A CONFIRMAR**: el ID de esa lista y si se guarda también de qué recurso vino cada contacto (con un atributo de Brevo, por ejemplo `RECURSO`, que habría que crear en la cuenta).
14b. Dado un `POST /api/recursos` vacío o inválido, entonces responde `400` sin tocar Brevo (lo usa el test de regresión B).

**Tracking GA4**
15. Dado un envío exitoso, entonces se registra `generate_lead` con `form_id: 'recursos'` y `recurso: '<id del recurso>'`.
16. Dado un clic en "Descargar", entonces se registra `recurso_descarga` con el `id` del recurso.

**Navegación**
17. Dado cualquier página con navbar, entonces aparece el link **"Recursos"** en el menú de escritorio y en el menú mobile, apuntando a `/recursos/`. Posición: **A CONFIRMAR** (propuesta: después de Blog).
18. Son 21 archivos con la navbar copiada, incluida `ai-mvp-rescue.html` (tiene su propia copia, ver decisions.md 2026-09-29). Todos se actualizan en el mismo cambio.
19. Dado un viewport de escritorio con el ancho mínimo en que se muestra la navbar completa, entonces los cinco links y el botón "Contáctame" entran sin cortarse ni superponerse.

**Post del blog**
20. El cierre del post "Cuando el vibe coding empieza a pesar" reemplaza "mandame un MD" por un link a `/recursos/`. Hoy ese post existe como borrador fuera del sitio. **A CONFIRMAR**: si el post se publica en `blog/` (entonces aplica la spec 06) o en otro lado.

**SEO**
21. `/recursos/` tiene canonical `https://uxuaria.com/recursos/`, está en `sitemap.xml` y sigue el patrón de URL limpia. Title y meta description: **A CONFIRMAR**.

**Responsive y accesibilidad**
22. Dado un viewport de 375 px, entonces no hay scroll horizontal y el formulario se usa cómodo.
23. Dado que navego con teclado, entonces puedo abrir el formulario de un recurso, completarlo, enviarlo y llegar al botón "Descargar"; el foco va al primer campo al abrirse y al mensaje de éxito al enviar.
24. Los errores y el mensaje de éxito se anuncian a lectores de pantalla (`aria-live`).

---

## Alcance

- Página nueva `recursos/index.html` (+ `recursos/recursos.css` si hace falta, con tokens en `:root`).
- Archivo del primer recurso dentro de `recursos/` (ruta propuesta: `recursos/archivos/spec-lite.md`).
- Pages Function nueva `functions/api/recursos.js`, que valida el pedido y suma el contacto a Brevo.
- Link "Recursos" en la navbar de las 21 páginas (escritorio y mobile).
- `sitemap.xml`.
- Cierre del post sobre spec driven, cuando se publique.

## Fuera de alcance / No tocar

- El formulario de `/contacto/` y el funnel `/diagnostico/`: no cambian.
- El resto del diseño del sitio: solo se agrega el link en la navbar (pedido de Luis, 2026-09-29).
- Email automático al lead con el archivo: no hay (igual que en el funnel, ver decisions.md 2026-09-28).
- Migrar `ai-mvp-rescue.html` a `styles.css`: sigue pendiente aparte; acá solo se toca su navbar.
- Un CMS o panel para cargar recursos.

## Dependencias

- Brevo, API de contactos v3. Variables de entorno nuevas en Cloudflare Pages: `BREVO_API_KEY` y `BREVO_LIST_ID`. **A CONFIRMAR**: que la cuenta de Brevo esté activa para usar la API (en junio la activación de SMTP estaba pendiente, ver decisions.md 2026-06-15).
- Web3Forms, solo si se confirma el aviso por email (criterio 10e).
- `script.js`: `uxuariaTrack`, navbar y menú mobile.
- `styles.css`: tokens y componentes existentes (cards del blog, estilos de formulario de contacto).
- El archivo del skill, que entrega Luis.

## Estados (UI)

- **Vacío:** no aplica; la página sale con al menos un recurso.
- **Carga:** botón "Enviando…" deshabilitado.
- **Error:** validación en línea (criterio 8) y error de envío (criterio 11).
- **Éxito:** mensaje + botón "Descargar" (criterio 10).

## Diseño

N/A por ahora: sigue el estilo "Retro 3.1" con componentes existentes. **A CONFIRMAR** si hay un frame en Figma.

## Conocido

- El pedido de nombre y email es una barrera blanda: el archivo vive en una URL pública, así que quien tenga el link lo puede bajar sin dejar el email. Si eso no es aceptable, hace falta entregar el archivo desde una Pages Function o por email, fuera de este alcance. **A CONFIRMAR** si se acepta.

## Definición de hecho

La general de [AGENTS.md](../AGENTS.md), más:

- [ ] Test de regresión A en `/recursos/` y, por tocar la navbar, en la home, una página de servicios, un caso de portafolio, un artículo del blog y `ai-mvp-rescue`.
- [ ] Test B: `/recursos/` responde 200 (entra por el sitemap) y `POST /api/recursos` vacío responde 400. Se suma al bloque B de AGENTS.md.
- [ ] Test C (Luis): un pedido real con nombre `TEST` → el contacto aparece en la lista de Brevo, se ve "Descargar", el archivo baja bien y aparece `generate_lead` en Realtime. Después se borra el contacto de prueba en Brevo.
- [ ] `architecture.md` suma el módulo Recursos, `/api/recursos`, Brevo en la tabla de persistencia y las variables de entorno nuevas.
- [ ] Commits con el prefijo `[recursos]`.
