# 13 — Proyectos en Astro

**id:** `proyectos`
**Estado:** 🚧 Diseño desktop de la lista y la plantilla visto y aprobado por Luis por ahora (2026-11-02), con Monge Pay · pendiente: contenido, 6 casos por migrar y frames mobile · no se publica hasta resolver A CONFIRMAR
**Última actualización:** 2026-11-02
**Relacionada con:** 02-portfolio, 10-astro, 11-home, 12-blog-redesign

---

## Historia de usuario

**Como** Luis, que publica sus proyectos,
**quiero** agregar un proyecto escribiendo un solo archivo con sus datos y sus imágenes,
**para** subir proyectos nuevos más fácil y que todos queden con la misma estructura y calidad.

**Como** founder que evalúa contratar a Uxuaria,
**quiero** recorrer los proyectos y entender el problema, el proceso y los resultados de cada uno,
**para** decidir si Uxuaria puede ayudarme.

## Objetivo

Crear la sección de proyectos en Astro, con el diseño nuevo: una lista en `/portafolio`, que hoy no existe, y una plantilla única para los casos. Los 7 casos actuales pasan a esa plantilla **sin cambiar sus URLs**.

Métrica de éxito: publicar un proyecto = crear `src/content/portfolio/<slug>.md` + sus imágenes + push. Nada más. La medición del sitio no cambia (ver "Medición").

---

## Diseño

- **Lista:** [nodo 82:2912](https://www.figma.com/design/67hslCn1jUCcFDvSCzRpmP/uxuaria-Web?node-id=82-2912), llamado "Home — Desktop 1442" en Figma. Título "Nuestros Proyectos", introducción "En esto andamos" y 4 cards horizontales: texto a la izquierda y captura a la derecha.
- **Caso:** [plantilla 93:1983](https://www.figma.com/design/67hslCn1jUCcFDvSCzRpmP/uxuaria-Web?node-id=93-1983), "Uxuaria / Template / Caso de estudio de proyecto", con Monge Pay de ejemplo.
- **Mobile:** no hay frames. **A CONFIRMAR.**

### Secciones del caso, en orden

| # | Sección | Contenido | ¿Obligatoria? |
|---|---|---|---|
| 1 | Presentación | Ruta, industria · mercado · período, título | Sí |
| 2 | Evidencia externa | Medio, titular, cita, fecha y link | No: solo Monge Pay la tiene hoy |
| 3 | Resultados reales | Cifras con su detalle y notas de alcance | No: `striano` no tiene cifras con la estructura de los demás; revisar al migrar |
| 4 | Ficha y contexto | Rol, industria, entregables, herramientas, año, y el texto | Sí |
| 5 | Visual principal | Nombre del producto, tipo de evidencia y captura | Sí |
| 6 | Objetivos | Número, título y descripción | Sí |
| 7 | Proceso de diseño | Capturas con leyenda, de ancho completo o en dos columnas | Sí |
| 8 | CTA | Bloque oscuro con botón a Cal.com | Sí |

---

## Criterios de aceptación

**URLs y SEO**
1. Dadas las 7 URLs `/portafolio/<slug>` actuales, cuando se abren, entonces responden 200 en la misma URL.
2. Dado un caso migrado, entonces su `<title>`, meta description, canonical, OG y JSON-LD son iguales a los actuales.
3. Dada la lista, entonces vive en `/portafolio`, es una URL nueva con SEO propio y aparece en el sitemap junto con los casos.
4. Dado un archivo con `draft: true`, entonces no aparece en producción ni en el sitemap.

**Publicar un proyecto**
5. Dado un archivo nuevo `src/content/portfolio/x.md` válido, cuando se hace build, entonces aparece en `/portafolio/x`, en la lista y en el sitemap, sin tocar otro archivo.
6. Dado un frontmatter sin un campo obligatorio, cuando se hace build, entonces el build falla con un error claro.
7. Dado un proyecto sin una sección opcional, entonces esa sección no se muestra ni deja un espacio vacío.
8. Dado un proyecto sin página de caso, con link externo, entonces su card lleva a ese link y no se genera `/portafolio/<slug>`.

**Lista**
9. Dado un viewport de 1440 px, cuando se abre `/portafolio`, entonces coincide con el frame 82:2912 en estructura, tipografía, color y espaciado.
10. Dada la lista, entonces muestra los 9 proyectos aprobados en el orden del campo `order`.
11. Dada una card con destino, cuando se hace click en cualquier parte, entonces abre su caso o link externo.

**Caso**
12. Dado un viewport de 1440 px, cuando se abre `/portafolio/monge-pay`, entonces coincide con la plantilla 93:1983, salvo en las diferencias aprobadas.
13. Dado cualquiera de los 7 casos, entonces todo su contenido actual está presente, sin inventar ni quitar datos.
14. Dado el proceso, entonces cada captura conserva su leyenda y se ve completa, sin deformarse.
15. Dado el CTA, cuando se hace click en el botón, entonces abre Cal.com y la medición sigue funcionando como hoy (ver "Medición").

**Interacción y accesibilidad**
16. Dada una card, cuando paso el mouse o tiene foco de teclado, entonces crece levemente y muestra una sombra sutil.
17. Dado un botón, cuando paso el mouse o tiene foco de teclado, entonces invierte sus colores.
18. Dada una página, entonces tiene un único `<h1>` y todas las imágenes tienen `alt`.

**Responsive**
19. Dado un viewport de 375 px, entonces no hay scroll horizontal y coincide con el layout mobile que se defina.

**Páginas sin diseño nuevo**
20. Dada una página sin versión nueva, entonces sigue respondiendo en su URL con su diseño actual, aunque no esté en la navegación nueva.

---

## Modelo de contenido (propuesta)

Una colección `portfolio` en Markdown, con frontmatter validado. El cuerpo del archivo es el texto de contexto.

| Campo | Uso | ¿Obligatorio? |
|---|---|---|
| `title`, `seoTitle`, `description` | Título y SEO | Sí |
| `client` | Nombre en la ruta y en la card | Sí |
| `meta` | Industria · mercado · período | Sí |
| `order` | Orden en la lista | Sí |
| `card` | Distintivo, resumen e imagen de la card | Sí |
| `externalUrl` | Destino cuando no hay página de caso | No |
| `facts` | Rol, industria, entregables, herramientas y año | Sí, salvo con `externalUrl` |
| `mainImage` | Visual principal | Sí, salvo con `externalUrl` |
| `objectives` | Lista de título y descripción | Sí, salvo con `externalUrl` |
| `process` | Lista de imagen, `alt`, leyenda y ancho | Sí, salvo con `externalUrl` |
| `results`, `resultNotes` | Cifras y notas | No |
| `evidence` | Medio, titular, cita, fecha y link | No |
| `draft` | Oculta el proyecto en producción | No |

## Medición

Queda como está hoy en Uxuaria: GA4 (`G-6TCJ5969G7`), clicks con `data-track` mediante `script.js`, y `generate_lead` en los formularios. No se agregan herramientas, métricas ni eventos nuevos. Los casos actuales no llevan `data-track`, así que los nuevos tampoco.

## Decisiones tomadas

| Tema | Decisión |
|---|---|
| URLs | No se cambia ninguna URL existente. Lista en `/portafolio`; casos en `/portafolio/<slug>` |
| Proyectos | Los 7 casos actuales, más Mutis UX y Sakura 64 |
| CTA final | Abre Cal.com. El texto dice 30 minutos |
| Resumen de las cards | Sale del texto actual de cada caso; se presenta para aprobación |
| Animaciones | Solo hovers, como en el blog |
| Publicación | Progresiva, cuando esté listo |
| Páginas sin diseño nuevo | Se conservan en sus URLs, aunque queden fuera de la navegación |
| Base técnica | Astro, en la rama `astro` |

## Alcance

- Colección `portfolio`, `src/pages/portafolio/index.astro` y `src/pages/portafolio/[slug].astro`.
- Componentes y estilos de la lista y del caso.
- Migración del contenido de los 7 casos y sus imágenes.
- Entradas de Mutis UX y Sakura 64, una vez aprobado su contenido.
- Activar los links que hoy están pendientes hacia la lista: "Projectos" en el header y "Proyectos" en el footer.

## Fuera de alcance / No tocar

- Las URLs de los casos, y las de cualquier otra página.
- Mover las páginas sin diseño nuevo al build: es un requisito para publicar (spec 10), pero no parte de esta spec.
- Rediseñar servicios, contacto, diagnóstico, AI MVP Rescue, Lupa UX y 404.
- Casos de Dineflows, TSG, Weezy Towels y MyMed, que tienen imágenes pero no página: se pueden sumar después con un archivo cada uno.
- Filtros, búsqueda o paginación.

## Dependencias

- **Figma:** frames 82:2912 y 93:1983, y Uxuaria Library.
- **Contenido:** `portafolio/*.html` en esta rama, como fuente de los 7 casos, e imágenes en `public/images/portfolio/`.
- **Base visual:** `public/base.css`, `public/site.css`, `Navbar`, `Footer` y `BaseLayout` con `legacyStyles={false}`.
- **Externos:** Cal.com y GA4.

## Estados (UI)

- **Vacío:** sin proyectos publicados, la lista no debería romper el build. Mensaje visible: **A CONFIRMAR**.
- **Carga:** N/A; las páginas son estáticas y las imágenes reservan su espacio con `width` y `height`.
- **Error:** N/A. Un frontmatter inválido hace fallar el build.

## Definición de hecho

La general de [`AGENTS.md`](../AGENTS.md), más:

- [ ] Los 7 casos revisados en desktop y en 375 px, no solo Monge Pay.
- [ ] Comparación de `title`, description, canonical, OG y JSON-LD contra las páginas actuales, sin diferencias.
- [ ] Publicado un proyecto de prueba como `draft`, sin tocar otro archivo, y borrado después.
- [ ] `docs/specs/02-portfolio.md` y `docs/architecture.md` actualizados, con los pasos para publicar un proyecto.
- [ ] Decisiones registradas con `/decidir`.

---

## A CONFIRMAR

> **Orden de trabajo (2026-11-02):** primero se revisa el diseño de la plantilla, con Monge Pay como ejemplo real. El contenido se completa después, a medida que Luis lo vaya dando. Estos puntos ya no bloquean la plantilla, pero sí la publicación.

**De contenido y diseño mobile**

1. **Mobile:** ¿diseñás frames de la lista y del caso, como en la home y el blog?
2. **Mutis UX y Sakura 64:**
   - **Nombre:** el frame dice "Mutis UX" con una captura de Lupa UX, y el footer dice "Mults UX". ¿Cuál es el nombre correcto?
   - **Contenido:** los dos usan el texto de ejemplo "Una plataforma para la generación de reportes". Falta el texto real y la captura de Sakura 64.
   - **Destino:** ¿tienen caso propio o llevan a `/lupaux/` y `https://sakura64.uxuaria.com/`?
3. **Orden de los 9 proyectos.** Los cambios en esta lista requieren tu aprobación (`CLAUDE.md`).
4. **Títulos de los casos:** hoy están en mayúsculas ("DE CERO A +150K USUARIOS…") y la plantilla los muestra como oración ("De cero a +150K usuarios…"). ¿Se cambian en todos los casos?

**Bloquean la publicación**

5. **Distintivo de las cards:** ¿es "Cliente" en todos los proyectos? El resumen sale del texto actual de cada caso.
6. **Texto del CTA: resuelto en parte (2026-11-02).** Dice 30 minutos, como Figma. Pendiente: el texto del botón, que en Figma dice "Escribime a info@uxuaria.com" y ahora abre Cal.com. La home sigue diciendo 15 minutos.
7. **Resultados de `striano`:** hay que definir qué se muestra si no tiene cifras comparables.
8. **Animaciones: resuelto (2026-11-02).** Solo hovers, como en el blog.
9. **Navegación de las páginas sin diseño nuevo:** al publicar, siguen con su navegación vieja, que no lleva a `/portafolio`. Propongo dejarla así hasta rehacerlas.
10. **Página "Sobre mí": pendiente por decisión de Luis (2026-11-02).** El link de la home y el footer sigue sin destino.
11. **Medición: resuelto (2026-11-02).** Queda como hoy; ver "Medición".

---

## Dónde vive

- Contenido: `src/content/portfolio/<slug>.md`, con esquema en `src/content.config.ts`.
- Lista: `src/pages/portafolio/index.astro`. Caso: `src/pages/portafolio/[slug].astro`.
- Componentes: `src/components/ProjectCard.astro`, y `src/components/ClosingCta.astro`, compartido con el blog.
- Estilos: `public/portfolio.css`. Compartidos: `public/site.css`, ahora con breadcrumb, encabezado de página y CTA final.
- Ayudas de datos: `src/lib/portfolio.ts`.

## Conocido

- **Estado de la plantilla:** solo Monge Pay está migrado. Los otros 6 casos siguen en `portafolio/*.html` y dan 404 en esta rama hasta migrarlos.
- **Mutis UX y Sakura 64:** son borradores (`draft: true`), con el texto de ejemplo de Figma y sin destino. Se ven en desarrollo y no en producción.
- **Resumen de Monge Pay en la card:** es un borrador basado en su texto actual, pendiente de aprobación.
- **Título de Monge Pay:** va como oración, como en la plantilla; A CONFIRMAR #4 para el resto.
- **Capturas:** se muestran completas, con su proporción real. Figma recorta algunas en alturas fijas a partir de una imagen compuesta.
- **Etiqueta del visual principal:** "PLATAFORMA WEB · VISTA PRINCIPAL", leída de una captura de Figma.
- **Medición:** este CTA no lleva `data-track`, como los casos actuales.
