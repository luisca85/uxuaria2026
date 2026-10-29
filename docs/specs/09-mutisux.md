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
1. Dada la página, entonces arriba se ve el logo del ojo (recorte circular), "Mutis UX" y el botón negro "Pide tu acceso ahora" (mínimo 44 px de alto) que abre el formulario. Sin enlaces de navegación desde el 2026-10-29 (diseño de Luis en Figma). La cabecera queda fija al bajar, translúcida con desenfoque (sólida con `prefers-reduced-transparency`), y los anclajes caen debajo de ella.
2. Dada una pantalla de 360 px, entonces la cabecera entra sin scroll horizontal: los enlaces van en una fila arriba de la marca y el botón; al bajar, esa fila sale de pantalla y queda fija solo la barra de marca y botón.
3. Dado que navego con teclado, entonces el primer foco es "Saltar al contenido", que lleva a `#contenido`.

**Hero**
4. Dada la página, entonces el hero tiene la etiqueta "Mutis UX · Beta gratuita", el único `<h1>` de la página con "reportes accionables" subrayado con marcador, el párrafo, "Pide tu acceso" (a `#inscripcion`), "Mira las funciones" (a `#funciones`) y la línea de tandas.
5. Dada la lámina del hero (la quina de la Real Expedición Botánica de Mutis, desde el 2026-10-28; antes, el sol), entonces lleva cuatro pines azules numerados sobre distintas partes de la planta (flores, racimo y dos hojas), como hallazgos marcados en una pantalla, el pie "Cada hallazgo en su lugar" y la tarjeta del hallazgo H1 superpuesta. La imagen carga con `fetchpriority="high"`, sin `loading="lazy"`, con `width`/`height` y en AVIF o WebP.
6. Dada una pantalla de 760 px o menos, entonces la lámina va debajo del texto y la tarjeta del hallazgo queda debajo de la lámina, sin taparla.

**Envío de la inscripción (aislado)**

> **Se reemplaza con la spec `acc`** (`coding/Lupa-ux-lite/docs/specs/acceso-beta.md`,
> 2026-10-27): formulario de solicitud con rol, expectativa y Turnstile en una tarjeta con
> el estilo de la entrada de la app, guardado en una base propia del sitio, y ningún link a
> `mutis.uxuaria.com` en la landing. Construido el 2026-10-27: los criterios de la spec `acc`
> reemplazan a los de abajo (sin JS no se puede enviar, por Turnstile; la función solo
> responde JSON; desde el 2026-10-28 el formulario se abre en un modal). Siguen valiendo el 8 (`sendSignup()` es la única función que habla con el
> servidor), el 9 (campo trampa) y el 11 (503 `no_configurado` sin base o sin Turnstile).
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
- La app (`coding/Lupa-ux-lite`): la landing no llama a su API ni enlaza a `mutis.uxuaria.com` (spec `acc`).
- No se enlaza a reportes reales de clientes ni se publica ningún PIN.

## Dependencias

- Google Fonts: Newsreader (400 y 500, con cursiva; reemplaza a IM Fell English el 2026-10-26) y Geist (400, 500, 600).
- Destino de las inscripciones: una D1 propia del sitio (spec `acc`, 2026-10-27).

## Estados (UI)

- Envío: "Enviando…" en el botón; éxito con una confirmación que reemplaza al formulario y recibe el foco (con JS) o `gracias.html` (sin JS); errores en línea por campo y un mensaje general.
- Toque: todo lo que se presiona responde al apoyar el dedo (`:active`), y los hover van dentro de `@media (hover: hover)` para que no queden pegados en pantallas táctiles.

## Diseño

Moodboard "Moodboard Mutis UX" (5 láminas: Hero, Hallazgos, Reporte de ejemplo, Journeys, Sistema visual). El copy de las secciones marcadas "aprobado en moodboard" sale de ahí. El resto es borrador.

### Fuente de los grabados

Todos vienen del **Public Domain Image Archive** de The Public Domain Review ([pdimagearchive.org](https://pdimagearchive.org/)), salvo la quina del hero (2026-10-28), que viene de la Biblioteca Digital del Real Jardín Botánico (CSIC). La fuente se tomó de la URL de descarga que macOS guardó en cada archivo de `coding/Lupa-ux-lite/imagenes/` (2026-10-26). Antes de publicar, confirmar en la página de cada imagen las condiciones de uso y si piden crédito.

| Archivo | Uso en la landing | Colección | Página de la imagen |
|---|---|---|---|
| `MUT_Fl_Exp_Bot_N_Gra_44_000188.jpg` | Quina (hero e imagen para redes `og-mutisux.jpg`, desde el 2026-10-28) | Real Jardín Botánico (CSIC), Biblioteca Digital: Flora de la Real Expedición Botánica del Nuevo Reino de Granada, *Cinchona lanceifolia*, lám. 12 (Icon VII.A, Jard. Bot. Madrid 2854). **No es del Public Domain Image Archive: confirmar condiciones de uso y crédito** | [bibdigital.rjb.csic.es/viewer/15871](https://bibdigital.rjb.csic.es/viewer/15871/) |
| `1.jpg` | Sol (miniatura de Propuestas desde el 2026-10-28; fue el hero y la imagen para redes hasta el 2026-10-27) | Grabados nuevos de octubre de 2019 | [pdimagearchive.org/images/af5782b0…](https://pdimagearchive.org/images/af5782b0-81b5-47c3-b714-e68efab9a5a9/) |
| `2.jpg` | Máquina voladora (Hallazgos) | Cycling Art | [pdimagearchive.org/images/244c515e…](https://pdimagearchive.org/images/244c515e-1ac3-4aa1-a7ec-fd7ed7e8d89d/) |
| `3.jpg` | Barco en el Sena (Recorridos) | 36 Views of the Eiffel Tower (Henri Rivière) | [pdimagearchive.org/images/a20b15cf…](https://pdimagearchive.org/images/a20b15cf-6fc4-4e75-9069-2ece292516fb/) |
| `4.jpg` | Cabeza de perfil (Personas) | Plain Home Talk | [pdimagearchive.org/images/9a3f1315…](https://pdimagearchive.org/images/9a3f1315-c164-450d-960f-96acf0dc71a2/) |
| `5.jpg` | Manuscrito con flores (Reportes) | Christening of Lady Elisabeth of Hesse | [pdimagearchive.org/images/f28f3d0f…](https://pdimagearchive.org/images/f28f3d0f-20b9-46db-a908-d4a4a65564c4/) |
| `logo.jpg` | Logo, ojo-globo (cabecera, pie y favicon) | Odilon Redon, *À Edgar Poe* | [pdimagearchive.org/images/a40d9c0b…](https://pdimagearchive.org/images/a40d9c0b-7392-4fc0-8a1c-a773885c9094/) |

## Conocido

- **Vista de la interfaz** (2026-10-24 y 25, pedidos de Luis): después de Funciones en acción va un carrusel de tres capturas reales de la app a lo ancho (Hallazgos, User Journey y Estudios), sin leyenda, con marco, un haz de luz que recorre el borde en ciclo y la base fundida con el papel. El orden es User Journey, Hallazgos y Estudios: la captura de Hallazgos muestra un estudio vacío y no conviene que sea la primera impresión. Sin JS es un riel con scroll horizontal y snap; con JS suma flechas a cada lado de la captura (en celular, sobre los bordes), que se apagan en los extremos en lugar de dar la vuelta, y un aviso para lectores de pantalla con la captura visible. En celular cada captura se muestra en un recorte legible (`--pos` en `mutisux.css`). El texto de las capturas está en voseo, como la app.
- **Capturas anonimizadas:** `interfaz-2.png` e `interfaz-3.png` muestran un estudio de cliente real (nombre, cliente y URL), otro estudio y el email personal de Luis. En la landing van las copias `interfaz-2-anon.png` e `interfaz-3-anon.png`, con "Tienda Brisa", "Marina", "Café Norte" y "Tu nombre". El contenido del journey (pasos, touchpoints y textos) sigue siendo el del estudio real: **Luis tiene que confirmar si se puede mostrar** o reemplazar la captura por una de un estudio de ejemplo.

- **Revisión con criterios de Apple (2026-10-27):** las maquetas y el haz se arman una sola vez al entrar en pantalla y quedan en su estado final (antes eran bucles de 6 y 8 s); los filtros de severidad del panel de Hallazgos y del reporte de ejemplo funcionan sin JS (radios + `:checked`); el botón "Trabajemos juntos" del reporte de ejemplo lleva a Contacto; la nota "Hecho por una persona" ya no menciona IA, para no contradecir la pregunta "¿Reemplaza mi criterio?". El botón del hero pasó de "Mira cómo funciona" a "Mira las funciones" (era copy aprobado en moodboard): el menú tiene "Cómo funciona" con otro destino.
- **Correcciones de Luis (2026-10-28):**
  - Sin numeración "Fig. N" en ninguna parte (pies, etiquetas de las tarjetas y antetítulos), porque se repetía y no seguía un orden. Las tarjetas y antetítulos dicen solo la función: Hallazgos, Recorridos, Personas, Reportes y Propuestas.
  - La sección del reporte ya no dice que es un ejemplo ni una muestra: lo ve un cliente o un posible usuario, y la idea es que, al terminar el diagnóstico, el reporte ya está armado. Sus datos siguen siendo inventados ("Tienda Brisa"); solo lo dicen los comentarios del HTML.
  - Nueva función en la grilla, **Propuestas** (spec `prop` de la app): planes con precio fijo o mensual, qué incluye y descuentos por pago adelantado, que el cliente ve en "Trabajemos juntos" y puede reservar. Ese mismo día, a pedido de Luis, sale la tarjeta de Personas (la pregunta frecuente "¿Cuándo llega Personas?" se cambió después por "¿Qué otras funciones tienen pensado desarrollar?") y quedan cuatro funciones en una fila: Hallazgos, Recorridos, Reportes y Propuestas (4 columnas desde 1201 px, 2 hasta 1200 px, 1 en celular).
  - Sale la sección "Cómo funciona" (del primer pin al reporte en cuatro pasos), que repetía las funciones. En su lugar, al final antes de la Beta, va **Propuestas** (`#propuestas`, también en el menú): la maqueta del editor de una propuesta y seis puntos verificados contra la spec `prop` (precio fijo o mensual con moneda o "A definir", qué incluye, descuentos por pago adelantado, plan recomendado y orden, preguntas frecuentes por plan, reserva desde el reporte), más una nota sobre promociones honestas y el interruptor para ocultarlas. No promete el correo de aviso de reservas: hoy va a una dirección fija del servidor (`RESERVA_TO`), no a la cuenta dueña del reporte.
  - **2026-10-29, pedido de Luis:** la sección final deja de detallar las funciones de las propuestas (plan recomendado, descuentos, preguntas frecuentes…, que van a cambiar) y pasa a hablar del reporte como herramienta de marketing para conseguir el próximo cliente: "Tu próximo cliente" / "Tu reporte es tu mejor carta de presentación" (`#clientes`, "Clientes" en el menú). Cuatro puntos: demuestra tu criterio, siempre a mano online con link y PIN, tu contacto y tu presupuesto al día (Compartir actualiza el mismo link) y la puerta de entrada a un proyecto (reserva desde el reporte). La maqueta del editor se cambió por la del reporte publicado, con contacto y propuesta. Cierra con "Pide tu acceso".
  - **2026-10-29, ajustes de Luis en Figma** (archivo "Ux Diagnostic tool", página 2, frame "Mutis UX · Landing (1440)"):
    - La cabecera pierde los enlaces y queda con el botón negro "Pide tu acceso ahora"; el botón principal del hero también es negro (`.btn--ink`).
    - Recorridos termina con el botón azul "Pide tu acceso ahora", centrado.
    - Reportes pasa a fondo oscuro (#0A0A0A) y la ventana del reporte usa los colores de la app (menú gris claro, pestaña activa negra, botón flotante negro), con los tokens `--app-*`. Los puntos clave de abajo quedaron en Figma con texto oscuro sobre negro; en el código van en claro para que se lean.
    - Tu próximo cliente: título "Tu reporte es el camino a tu próximo cliente", bajada más corta, el botón "Pide tu acceso ahora" sube debajo del encabezado y centrado (y es el destino de `#inscripcion` sin JS), y cambian los textos de los puntos 3 y 4. Sale el botón del final.
    - Sale la sección Beta. El modal del formulario sigue igual.
    - Marca de la cabecera: ojo grabado nuevo (`images/logo-ojo-96.webp` y `-192`, recortado del archivo que Luis subió a Figma) en círculo con borde negro, y "Mutis UX" en Newsreader Bold de 36 px (24 px en celular). Ese mismo día, a pedido de Luis, el ojo nuevo pasa también al pie (el nombre sigue en Geist), al favicon (`logo-ojo-32.png`, en círculo), al ícono de inicio (`logo-ojo-180.png`), a la página de gracias y a la imagen para redes (`og-mutisux.jpg?v=20261029`). Los archivos `logo-eye-*` ya no se usan. **Fuente y condiciones de uso del grabado nuevo: A CONFIRMAR.**
    - Segunda ronda de Luis en Figma (mismo día): la bajada del hero termina en "…el recorrido de las personas."; la tarjeta de Propuestas se titula "Del diagnóstico a tu próximo cliente" y su maqueta muestra "US$ 500" sin "/mes"; Hallazgos dice "una heurística" (sin "de Nielsen"); el botón de Recorridos pasa a negro; sale el botón de Tu próximo cliente. En Figma la nota del hero decía "tex escribimos": se dejó "te escribimos".
    - Botón flotante azul "Pide tu acceso" abajo a la derecha (32 px; 16 px en celular). Con JS aparece cuando el hero sale de pantalla y abre el modal; sin JS se ve siempre y lleva al aviso de `#inscripcion`.
    - Entrada animada del hero: los textos suben en cascada, la lámina aparece con un leve zoom y después caen los cuatro pines y la tarjeta del hallazgo (todo en unos 1,7 s). Con `prefers-reduced-motion` no hay animación.
    - Entrada al hacer scroll en todas las secciones (pedido de Luis): cada bloque sube 28 px y aparece una sola vez al entrar en pantalla (0,8 s); los que van en grupo (tarjetas de Funciones, puntos clave, puntos de Tu próximo cliente, preguntas frecuentes) entran en cascada cada 90 ms. Lista de bloques en `REVEAL` de `mutisux.js`. Sin JS, sin IntersectionObserver o con `prefers-reduced-motion` no se oculta nada.
    - Preguntas frecuentes (pedido de Luis): "¿Reemplaza mi criterio?" pasa a "¿Usan inteligencia artificial para generar los reportes?" (no hay reportes automáticos; el criterio humano es lo primero; más adelante, ayudas con IA para tareas puntuales) y "¿Cuándo llega Personas?" pasa a "¿Qué otras funciones tienen pensado desarrollar?" (protopersonas, flujos de interacción dentro de los user journeys, registro de pruebas de usabilidad y tests con usuarios, herramientas de IA que no reemplacen el criterio, y mejoras según lo que digan los usuarios). Las preguntas se redactaron desde quien visita ("¿Usan…?", "¿…tienen pensado…?").
    - Esquinas rectas: botones negros y de contorno, tarjeta del hallazgo del hero, tarjetas de Funciones (con borde color lámina), panel de hallazgos, mapa del journey y maqueta del reporte publicado. Los botones azules y la ventana del reporte conservan sus esquinas redondeadas.
  - El reporte suma la sección "Trabajemos juntos" con tres propuestas (los precios por defecto de la app, con "Plan mensual · Aliado" recomendado y un descuento trimestral calculado como lo muestra la app). La abre el botón flotante, como en el reporte real; antes llevaba a Contacto.
- **Renombre a Mutis UX (2026-10-27):** la app y la landing pasan de Lupa UX a Mutis UX (siempre con UX en mayúsculas) y la landing de `/lupaux/` a `/mutisux/`, sin redirección porque nunca se publicó. La app va a vivir en `mutis.uxuaria.com`. La captura de Estudios todavía muestra "Lupa Ux" bajo la marca y "Consejo de Lupa": hay que sacarla de nuevo con datos ficticios cuando la app tenga el nombre nuevo.
- **Tuteo en la landing**, mientras el sitio y la app usan voseo. Decisión abierta de Luis.
- Decisiones abiertas: política de privacidad (uxuaria.com no tiene; la tarjeta ya la enlaza en `/mutisux/privacidad`), GA4 sí o no, condiciones de la beta, confirmar las condiciones de uso de cada grabado en su página (la fuente ya está anotada en "Fuente de los grabados"), la cabeza frenológica de Personas y si se menciona la exportación.
- La app está en `mutis.uxuaria.com` con beta privada desde el 2026-10-27. La landing no la enlaza a propósito: el link va solo en el correo de invitación (spec `acc`).

## Definición de hecho

- Un solo `<h1>`, sin scroll horizontal desde 360 px, foco visible, contraste AA y la página usable sin JS.
- `prefers-reduced-motion` deja las maquetas en su estado final.
- Lighthouse medido y reportado (no estimado).
