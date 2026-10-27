# 09 — Landing de Mutis UX (`/mutisux/`)

**id:** `mutisux`
**Estado:** 🚧 En construcción · hecho: todas las secciones (Cómo funciona, Beta y FAQ en borrador) y envío aislado de la inscripción · hecho el cierre técnico: README, sitemap, `_headers`, imagen OG, JSON-LD y Lighthouse 100/100/100/100 en local (celular y escritorio, 2026-10-24) · pendiente: las decisiones abiertas (ver Conocido), medir en producción y en un celular real
**Última actualización:** 2026-10-27
**Relacionada con:** la app Mutis UX (`coding/Lupa-ux-lite`, specs `hz`, `jr`, `rpt`, `cta`, `legal`)

---

## Historia de usuario

**Como** diseñador/a UX o consultor/a independiente de Latinoamérica que entrega diagnósticos a clientes,
**quiero** entender en pocos segundos qué hace Mutis UX y anotarme a la beta,
**para** probar la herramienta cuando se abra mi tanda.

## Objetivo

Landing de una página en `https://uxuaria.com/mutisux/` que explica Mutis UX con grabados antiguos y maquetas de la app, y junta inscripciones a la beta gratuita. Luis abre los cupos por tandas.

Métrica de éxito: inscripciones válidas a la beta (envíos correctos a `/api/mutisux-beta`).

---

## Criterios de aceptación

**Cabecera**
1. Dada la página, entonces arriba se ve el logo del ojo (recorte circular), "Mutis UX", los enlaces Funciones, Cómo funciona y Beta, y el botón "Pide tu acceso" (mínimo 44 px de alto) que lleva a `#inscripcion`. La cabecera queda fija al bajar, translúcida con desenfoque (sólida con `prefers-reduced-transparency`), y los anclajes caen debajo de ella.
2. Dada una pantalla de 360 px, entonces la cabecera entra sin scroll horizontal: los enlaces van en una fila arriba de la marca y el botón; al bajar, esa fila sale de pantalla y queda fija solo la barra de marca y botón.
3. Dado que navego con teclado, entonces el primer foco es "Saltar al contenido", que lleva a `#contenido`.

**Hero**
4. Dada la página, entonces el hero tiene la etiqueta "Mutis UX · Beta gratuita", el único `<h1>` de la página con "reportes accionables" subrayado con marcador, el párrafo, "Pide tu acceso" (a `#inscripcion`), "Mira las funciones" (a `#funciones`) y la línea de tandas.
5. Dada la lámina del sol, entonces lleva dos pines azules numerados, el pie "Fig. 1 · El criterio al centro" y la tarjeta del hallazgo H1 superpuesta. La imagen carga con `fetchpriority="high"`, sin `loading="lazy"`, con `width`/`height` y en AVIF o WebP.
6. Dada una pantalla de 760 px o menos, entonces la lámina va debajo del texto y la tarjeta del hallazgo queda debajo de la lámina, sin taparla.

**Envío de la inscripción (aislado)**
7. Dado el formulario, cuando se envía sin JS, entonces es un POST nativo a `/api/mutisux-beta`, que responde 303 a `/mutisux/gracias` o, si hay un error, una página corta con el mensaje y "Volver al formulario".
8. Dado el formulario con JS, cuando se envía, entonces `sendSignup()` en `mutisux.js` es la única función que habla con el servidor y responde `{ ok, error }`.
9. Dado el campo trampa `website` con valor, cuando llega al servidor, entonces responde como si fuera un éxito y no guarda nada.
10. Dado nombre vacío, email inválido o sin aceptar la privacidad, cuando llega al servidor, entonces responde 400 con un código de error y no guarda nada.
11. Dado que el destino de los datos no está configurado, cuando llega un envío válido, entonces responde 503 `no_configurado`: no finge que guardó.

## Alcance

- `mutisux/index.html`, `mutisux/mutisux.css`, `mutisux/mutisux.js`, `mutisux/gracias.html`, `mutisux/images/`, `mutisux/README.md`.
- `functions/api/mutisux-beta.js`.
- `sitemap.xml` (+ `/mutisux/`) y `_headers` (caché de imágenes).

## Fuera de alcance / No tocar

- `styles.css` y `script.js` del sitio: la landing tiene su propia hoja (`mutisux.css`) con sus tokens.
- La app (`coding/Lupa-ux-lite`): la landing no llama a su API.
- No se enlaza a reportes reales de clientes ni se publica ningún PIN.

## Dependencias

- Google Fonts: Newsreader (400 y 500, con cursiva; reemplaza a IM Fell English el 2026-10-26) y Geist (400, 500, 600).
- Destino de las inscripciones: **pendiente** (Brevo, la app o una función propia).

## Estados (UI)

- Envío: "Enviando…" en el botón; éxito con una confirmación que reemplaza al formulario y recibe el foco (con JS) o `gracias.html` (sin JS); errores en línea por campo y un mensaje general.
- Toque: todo lo que se presiona responde al apoyar el dedo (`:active`), y los hover van dentro de `@media (hover: hover)` para que no queden pegados en pantallas táctiles.

## Diseño

Moodboard "Moodboard Mutis UX" (5 láminas: Hero, Hallazgos, Reporte de ejemplo, Journeys, Sistema visual). El copy de las secciones marcadas "aprobado en moodboard" sale de ahí. El resto es borrador.

### Fuente de los grabados

Todos vienen del **Public Domain Image Archive** de The Public Domain Review ([pdimagearchive.org](https://pdimagearchive.org/)). La fuente se tomó de la URL de descarga que macOS guardó en cada archivo de `coding/Lupa-ux-lite/imagenes/` (2026-10-26). Antes de publicar, confirmar en la página de cada imagen las condiciones de uso y si piden crédito.

| Archivo | Uso en la landing | Colección | Página de la imagen |
|---|---|---|---|
| `1.jpg` | Fig. 1, sol (hero e imagen para redes) | Grabados nuevos de octubre de 2019 | [pdimagearchive.org/images/af5782b0…](https://pdimagearchive.org/images/af5782b0-81b5-47c3-b714-e68efab9a5a9/) |
| `2.jpg` | Fig. 2, máquina voladora (Hallazgos) | Cycling Art | [pdimagearchive.org/images/244c515e…](https://pdimagearchive.org/images/244c515e-1ac3-4aa1-a7ec-fd7ed7e8d89d/) |
| `3.jpg` | Fig. 3, barco en el Sena (Recorridos) | 36 Views of the Eiffel Tower (Henri Rivière) | [pdimagearchive.org/images/a20b15cf…](https://pdimagearchive.org/images/a20b15cf-6fc4-4e75-9069-2ece292516fb/) |
| `4.jpg` | Fig. 4, cabeza de perfil (Personas) | Plain Home Talk | [pdimagearchive.org/images/9a3f1315…](https://pdimagearchive.org/images/9a3f1315-c164-450d-960f-96acf0dc71a2/) |
| `5.jpg` | Fig. 5, manuscrito con flores (Reportes) | Christening of Lady Elisabeth of Hesse | [pdimagearchive.org/images/f28f3d0f…](https://pdimagearchive.org/images/f28f3d0f-20b9-46db-a908-d4a4a65564c4/) |
| `logo.jpg` | Logo, ojo-globo (cabecera, pie y favicon) | Odilon Redon, *À Edgar Poe* | [pdimagearchive.org/images/a40d9c0b…](https://pdimagearchive.org/images/a40d9c0b-7392-4fc0-8a1c-a773885c9094/) |

## Conocido

- **Vista de la interfaz** (2026-10-24 y 25, pedidos de Luis): después de Funciones en acción va un carrusel de tres capturas reales de la app a lo ancho (Hallazgos, User Journey y Estudios), sin leyenda, con marco, un haz de luz que recorre el borde en ciclo y la base fundida con el papel. El orden es User Journey, Hallazgos y Estudios: la captura de Hallazgos muestra un estudio vacío y no conviene que sea la primera impresión. Sin JS es un riel con scroll horizontal y snap; con JS suma flechas a cada lado de la captura (en celular, sobre los bordes), que se apagan en los extremos en lugar de dar la vuelta, y un aviso para lectores de pantalla con la captura visible. En celular cada captura se muestra en un recorte legible (`--pos` en `mutisux.css`). El texto de las capturas está en voseo, como la app.
- **Capturas anonimizadas:** `interfaz-2.png` e `interfaz-3.png` muestran un estudio de cliente real (nombre, cliente y URL), otro estudio y el email personal de Luis. En la landing van las copias `interfaz-2-anon.png` e `interfaz-3-anon.png`, con "Tienda Brisa", "Marina", "Café Norte" y "Tu nombre". El contenido del journey (pasos, touchpoints y textos) sigue siendo el del estudio real: **Luis tiene que confirmar si se puede mostrar** o reemplazar la captura por una de un estudio de ejemplo.

- **Revisión con criterios de Apple (2026-10-27):** las maquetas y el haz se arman una sola vez al entrar en pantalla y quedan en su estado final (antes eran bucles de 6 y 8 s); los filtros de severidad del panel de Hallazgos y del reporte de ejemplo funcionan sin JS (radios + `:checked`); el botón "Trabajemos juntos" del reporte de ejemplo lleva a Contacto; la nota "Hecho por una persona" ya no menciona IA, para no contradecir la pregunta "¿Reemplaza mi criterio?". El botón del hero pasó de "Mira cómo funciona" a "Mira las funciones" (era copy aprobado en moodboard): el menú tiene "Cómo funciona" con otro destino.
- **Renombre a Mutis UX (2026-10-27):** la app y la landing pasan de Lupa UX a Mutis UX (siempre con UX en mayúsculas) y la landing de `/lupaux/` a `/mutisux/`, sin redirección porque nunca se publicó. La app va a vivir en `mutis.uxuaria.com`. La captura de Estudios todavía muestra "Lupa Ux" bajo la marca y "Consejo de Lupa": hay que sacarla de nuevo con datos ficticios cuando la app tenga el nombre nuevo.
- **Tuteo en la landing**, mientras el sitio y la app usan voseo. Decisión abierta de Luis.
- Decisiones abiertas: destino de las inscripciones, política de privacidad (uxuaria.com no tiene), GA4 sí o no, condiciones de la beta, confirmar las condiciones de uso de cada grabado en su página (la fuente ya está anotada en "Fuente de los grabados"), la cabeza frenológica de Personas y si se menciona la exportación.
- La app todavía no es pública (`lupaux.uxuaria.com` sigue con Cloudflare Access y `mutis.uxuaria.com` no resuelve), así que la landing no enlaza a la app.

## Definición de hecho

- Un solo `<h1>`, sin scroll horizontal desde 360 px, foco visible, contraste AA y la página usable sin JS.
- `prefers-reduced-motion` deja las maquetas en su estado final.
- Lighthouse medido y reportado (no estimado).
