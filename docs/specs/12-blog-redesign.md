# 12 — Rediseño del blog

**id:** `blog-redesign`
**Estado:** 🚧 En construcción en la rama `astro` · hecho: listado y artículos en desktop, hovers y CTA con Cal.com · pendiente: frames mobile y puntos 5 a 11 de A CONFIRMAR · no se publica hasta tener todo eso
**Última actualización:** 2026-11-02
**Relacionada con:** 06-blog, 10-astro, 11-home

---

## Historia de usuario

**Como** founder o responsable de producto que llega al blog buscando criterio sobre UX e IA,
**quiero** encontrar un artículo que me interese y leerlo con comodidad,
**para** decidir si Uxuaria entiende mi problema y agendar una llamada.

> Redactada a partir del propósito de la spec 06 y del diseño. **A CONFIRMAR** por Luis.

## Objetivo

Pasar el listado y las páginas de artículo al lenguaje visual de la nueva home, según Figma, sin cambiar las URLs ni el contenido de los artículos. Publicar un artículo sigue siendo crear un Markdown (spec 10).

Métrica de éxito: **A CONFIRMAR**.

---

## Diseño

- **Listado:** [Blog — Uxuaria (nodo 64:1030)](https://www.figma.com/design/67hslCn1jUCcFDvSCzRpmP/uxuaria-Web?node-id=64-1030).
- **Artículo:** [Artículo — El instinto herramienta creativa (nodo 69:1088)](https://www.figma.com/design/67hslCn1jUCcFDvSCzRpmP/uxuaria-Web?node-id=69-1088), en la misma página de Figma. Es el único ejemplo de artículo.
- **Componentes y tokens:** Uxuaria Library y `public/site.css` (spec 11).
- **Mobile:** lo diseña Luis en Figma. Todavía no hay frames; la maquetación de mobile los espera.

### Listado, en orden

| # | Sección | Contenido |
|---|---|---|
| 1 | Header | El de la spec 11 |
| 2 | Presentación (64:1048) | Ruta "Home > Blog", "Ideas sobre UX, IA y producto digital", "Reflexiones y aprendizajes de 15 años diseñando productos en LATAM." |
| 3 | Artículo destacado (64:1057) | Imagen a la izquierda; distintivo "Artículo destacado", categoría y fecha, título, resumen y "Leer artículo completo" |
| 4 | Grid (64:1072) | 3 columnas de 355 px: imagen, categoría en badge, fecha, título, resumen y "Leer más" |
| 5 | Footer | El de la spec 11, con una diferencia (ver A CONFIRMAR #8) |

### Artículo, en orden

| # | Sección | Contenido |
|---|---|---|
| 1 | Presentación (69:1106) | Ruta, categoría en badge, título de 1114 px de ancho, fecha y tiempo de lectura, portada de 1114 × 500 px |
| 2 | Cuerpo (69:1123) | Columna de 760 px, con títulos de sección y "Fuentes" |
| 3 | Sobre el autor (69:1152) | Card con badge, "Luis Carlos Romero León" y biografía. **No existe hoy** |
| 4 | Más artículos (69:1158) | Fondo de superficie y 2 cards de 545 px |
| 5 | Asesorías disponibles (69:1192) | Bloque oscuro centrado con indicador, invitación, descripción y botón |
| 6 | Footer | El de la spec 11 |

---

## Criterios de aceptación

**Listado**
1. Dado un viewport de 1440 px, cuando se abre `/blog`, entonces coincide con el frame 64:1030 en estructura, tipografía, color y espaciado, con las portadas reales en lugar de los placeholders.
2. Dado un artículo con `featured: true`, entonces ocupa la card destacada; si ninguno lo tiene, la ocupa el más reciente.
3. Dados los demás artículos, entonces aparecen en el grid del más nuevo al más viejo; una última fila incompleta queda alineada a la izquierda.
4. Dada una card, cuando se hace click en cualquier parte, entonces abre su artículo.
5. Dados títulos y resúmenes de distinto largo, entonces los resúmenes se cortan a 3 líneas y "Leer más" queda alineado dentro de cada fila.

**Artículo**
6. Dado un viewport de 1440 px, cuando se abre `/blog/instinto-herramienta-creativa-decisiones`, entonces coincide con el frame 69:1088, con su portada real.
7. Dado cualquiera de los 6 artículos, entonces todo su contenido se ve con el estilo nuevo: títulos, listas, citas, links y fuentes. Esto incluye las 4 figuras y el botón de `metodo-harada`, que hoy usan clases de Retro 3.1.
8. Dada la portada de un artículo, entonces llena su espacio sin deformarse y no corta la parte principal de la imagen.
9. Dado el bloque final, cuando se hace click en su botón, entonces abre Cal.com y se registra el evento `cta_article_call` en GA4 (nombre provisional: **A CONFIRMAR**).

**Interacción**
10. Dada una card, cuando paso el mouse o tiene foco de teclado, entonces crece levemente y muestra una sombra sutil.
11. Dado un botón, cuando paso el mouse o tiene foco de teclado, entonces invierte sus colores, también sobre fondo oscuro.
12. Dado el listado o un artículo, entonces no hay animaciones de aparición ni de scroll.
13. Dado `prefers-reduced-motion: reduce`, entonces las cards no cambian de tamaño.

**Contenido y publicación**
14. Dado un archivo nuevo `src/content/blog/x.md` con frontmatter válido, cuando se hace build, entonces aparece en el listado, en `/blog/x` y en el sitemap, con el diseño nuevo y sin tocar otro archivo.
15. Dadas las URLs actuales del blog y el 301 de `/blog/ilusion-de-productividad-ia`, entonces siguen funcionando igual.
16. Dada una página del blog, entonces conserva `title`, description, canonical, OG y JSON-LD, y tiene un único `<h1>`.
17. Dado el texto de los 6 artículos, entonces no cambia.

**Responsive**
18. Dado un viewport de 375 px, entonces no hay scroll horizontal y la página coincide con los frames mobile de Figma (pendientes de Luis).

---

## Decisiones tomadas

| Tema | Decisión |
|---|---|
| Alcance | Listado y páginas de artículo |
| Imágenes | Portadas actuales, no placeholders |
| Animaciones | Solo hovers |
| CTA final | Abre Cal.com, en lugar del email actual y del que muestra Figma |
| Base técnica | Rama `astro`, sobre el blog ya migrado (spec 10) |
| Publicación | Progresiva, cuando esté listo (decisions.md, 2026-11-02) |

## Alcance

- `src/pages/blog.astro`, `src/pages/blog/[slug].astro` y `src/components/BlogCard.astro`.
- Una hoja de estilos del blog, con la que estas páginas dejan de cargar `styles.css`.
- Bloque "Sobre el autor" y CTA final con Cal.com.
- Estilo nuevo para el contenido de los artículos, incluido lo que Figma no muestra.
- Ajuste de portadas y recortes que hagan falta, sin cambiar las imágenes que no lo necesiten.

## Fuera de alcance / No tocar

- El texto de los artículos, sus URLs y sus metadatos SEO.
- Cambiar el formato de publicación (Markdown) o agregar MDX, RSS, búsqueda o filtros.
- Home, header y footer, salvo lo que se decida en A CONFIRMAR #8.
- La versión del blog publicada hoy en `main`, y `--color-highlight`.

## Dependencias

- **Figma:** frames 64:1030 y 69:1088, y Uxuaria Library.
- **Contenido:** colección `blog` (`src/content.config.ts`, `src/lib/blog.ts`).
- **Base visual:** `public/site.css`, `Navbar`, `Footer` y `BaseLayout` con `legacyStyles={false}` (spec 11).
- **Externos:** Cal.com y GA4.
- **Imágenes:** `public/images/blog/`.

## Estados (UI)

- **Vacío:** un listado sin artículos no debería romper el build. Mensaje visible: **A CONFIRMAR**.
- **Carga:** N/A; las páginas son estáticas y las imágenes reservan su espacio con `width` y `height`.
- **Error:** N/A. Un frontmatter inválido hace fallar el build (spec 10).

## Definición de hecho

La general de [`AGENTS.md`](../AGENTS.md), más:

- [ ] Comparado contra los dos frames a 1440 px.
- [ ] Revisados los 6 artículos, no solo el del frame, en desktop y en 375 px.
- [ ] `docs/specs/06-blog.md` y `docs/architecture.md` actualizados.
- [ ] Decisiones registradas con `/decidir`.

---

## A CONFIRMAR

**Decisiones de construcción**

1. **Mobile: resuelto (2026-11-02).** Luis diseña los frames del listado y del artículo en Figma. Pendiente: los links. Solo bloquea la parte mobile.
2. **Portada de "El instinto": resuelto (2026-11-02).** Se usa `og.jpg` (1280 px).
3. **Portada de "6 preguntas": resuelto (2026-11-02).** Se usa `articulo002.png` (724 px), con el mejor encuadre posible. Puede verse algo suave en la portada de 1114 px.
4. **Marco de las imágenes: resuelto (2026-11-02).** La imagen llena todo el espacio, sin el fondo ni el recuadro de los placeholders. Cada imagen se encuadra para conservar su parte principal.

**Bloquean la publicación**

5. **Texto del CTA final:** Figma dice "Agendá una charla honesta de 30 minutos…" y "Escribime a info@uxuaria.com"; la home dice 15 minutos. Falta definir el texto del botón y la duración real. ¿Queda también el email como alternativa?
6. **"Sobre el autor":** la biografía (nodo 69:1157) está en tercera persona y la decisión del 2026-05-27 pide primera persona singular. Hay que aprobar el texto. ¿Va en todos los artículos?
7. **Artículos relacionados:** la spec 06 y Figma muestran "prompt-ear" y "diferencias" en "El instinto", pero el código actual elige los dos más recientes, y da otro resultado. ¿Se agrega un campo opcional `related` o se mantiene automático?
8. **Footer:** en este frame, Navegación suma el ítem "Mults UX", que no está en el frame de la home. ¿Se agrega en todo el sitio? ¿A dónde lleva?
9. **Títulos en las cards:** Figma acorta "3 cosas…" sin "(aunque no quieras escucharlas) 🤑". ¿Se usa el título completo, o un campo de título corto?
10. **Links de la ruta y del listado:** "Home" y "Blog" tienen destino. El evento de GA4 del CTA y la métrica de éxito siguen sin definir.
11. **Elementos que Figma no muestra:** citas, listas, subtítulos, figuras y el botón de `metodo-harada`. Propongo resolverlos con los tokens de la biblioteca y revisarlos con vos en el navegador.

---

## Dónde vive

- Listado: `src/pages/blog.astro`. Artículo: `src/pages/blog/[slug].astro`. Cards: `src/components/BlogCard.astro`.
- Estilos: `public/blog.css`. Compartidos con la home: `public/base.css` (reset) y `public/site.css` (tokens, botón, badge y link con flecha).
- Portada de "El instinto": `og.jpg`, también en sus cards, indicado en el frontmatter del artículo.

## Conocido

- **Figuras y botón de `metodo-harada`:** el Markdown sigue usando las clases `article-figure` y `btn btn--primary`, ahora con estilo nuevo en `blog.css`, para no tocar el contenido.
- **Elementos sin frame:** citas, listas, subtítulos y figuras se resolvieron con los tokens de la biblioteca (A CONFIRMAR #11).
- **Fuentes:** el estilo más chico se aplica a la última lista de un artículo si la precede un `h3`. Un artículo nuevo que termine con otra lista también lo recibe.
- **Menos de 1100 px:** layout provisional hasta tener los frames mobile.
- **Portadas:** "El instinto" conserva márgenes crema a los costados en la portada de 1114 × 500 y se recorta arriba y abajo. "6 preguntas" se ve algo suave por su tamaño.
- **Link a Cal.com:** el botón final dice "Agendá una llamada →", texto provisional. La descripción sigue diciendo 30 minutos, tal como en Figma.
