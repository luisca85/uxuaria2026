# 11 — Nueva home de Uxuaria

**id:** `home`
**Estado:** 🚧 Construida en la rama `explorar/home-animacion-linea-navegacion`, sin pasar a `astro` · hecho: desktop, mobile, header, footer, línea y animaciones · pendiente: aprobar contenido y destinos, y correr `/revisar` · no se publica hasta tener todo eso
**Última actualización:** 2026-11-03
**Relacionada con:** 00-overview, 01-design-system, 02-portfolio, 03-content, 05-rescue-service, 07-funnel-diagnostico, 10-astro

---

## Historia de usuario

**Como** founder de una startup en crecimiento que evalúa ayuda de UX para su producto,
**quiero** entender en pocos segundos qué hace Uxuaria, ver resultados y opiniones de clientes, y tener una forma directa de empezar,
**para** decidir si agendo una llamada o pido un diagnóstico.

> Historia redactada a partir de la propuesta del diseño y del propósito del sitio en `CLAUDE.md`. **A CONFIRMAR** por Luis.

## Objetivo

Publicar la home según los frames actuales de Figma: nuevo lenguaje visual, nueva estructura y nuevos componentes, sin romper los caminos de conversión que hoy mide el sitio.

Métrica de éxito: **A CONFIRMAR** (hoy se miden clicks con `data-track` y `generate_lead` en GA4).

---

## Diseño

- **Desktop:** [Home — Desktop 1443 (nodo 120:3459)](https://www.figma.com/design/67hslCn1jUCcFDvSCzRpmP/uxuaria-Web?node-id=120-3459), página "new site". Mide 1440 × 5805 px. Reemplaza al frame 26:2.
- **Mobile:** [Home — Mobile 390 (nodo 130:3843)](https://www.figma.com/design/67hslCn1jUCcFDvSCzRpmP/uxuaria-Web?node-id=130-3843). Mide 390 × 7892 px.
- **Línea:** vectores 120:3504 (desktop) y 138:1055 (mobile).
- **Componentes y tokens:** tableros "Uxuaria Library" 01 a 04 (nodos 60:52, 60:402, 60:403, 60:404) en la misma página.
- **Animaciones:** Figma no las define. Las decide Luis en el navegador; ver "Animaciones" en los criterios.

### Secciones, en orden

| # | Sección | Contenido |
|---|---|---|
| 1 | Header | Wordmark · AI MVP Rescue · Proyectos · Blog · Contacto · botón "Empecemos ahora" · ES (EN oculto por ahora) |
| 2 | Hero | Fila de iconos, H1, lead, botón "Agenda una llamada de 15 minutos", "o obtén un diagnóstico UX gratis" |
| 3 | Métricas | 3 cards: +150K (Monge Pay, "Leer la historia"), +15 años ("Sobre nosotros"), +40 (Greenify, "Leer la historia") |
| 4 | Proceso | 3 bloques, cada uno con paso y contexto: "Vamos al hueso…", "Solucionamos el problema…" y "No nos quedamos en entregarte solo un Figma" |
| 5 | Clientes | Monge Pay, Striano, Greenify, Points of You |
| 6 | Servicios | Fila de iconos, título y 4 filas con flecha |
| 7 | Testimonios | Fila de iconos, "Founders que han apostado con nosotros" y 4 cards |
| 8 | Bloque oscuro | "Tu problema de crecimiento es un problema de diseño.", símbolos, "Conversemos y averiguemos…", link a la agenda, email y embed de Cal.com |
| 9 | Footer | Marca, columnas Servicios, Navegación y Contacto, copyright |

Una línea doble continua baja desde el hero y atraviesa las métricas y el proceso. Desktop y mobile tienen cada uno su propio recorrido.

### Tokens que define el diseño

- **Tipografía:** Space Grotesk (display, headings, cuerpo), Inter (navegación, statement, footer), Space Mono (badges y atribución).
- **Color:** blanco, negro y grises; `#111111` para texto, `#666666` para texto secundario, `#0A0A0A` para el footer. No usa `#C8F135`.
- **Forma:** cards y botones con esquinas redondeadas, a diferencia de Retro 3.1 (sin `border-radius`).

---

## Criterios de aceptación

**Fidelidad**
1. Dado un viewport de 1440 px, cuando se abre la home, entonces las 9 secciones aparecen en el orden de la tabla y coinciden con el frame 120:3459 en tipografía, color, espaciado y posición.
2. Dado que la página usa tipografías y colores del diseño, entonces esos valores están declarados como variables en `:root` y las clases siguen BEM.
3. Dada la línea continua, entonces es decorativa: no recibe foco, se oculta a lectores de pantalla y no genera scroll horizontal.

**Responsive**
4. Dado un viewport de 640 px o menos, entonces no hay scroll horizontal y la página sigue la estructura y los espaciados del frame 130:3843, escalados al ancho de la pantalla, con el recorrido de línea de mobile y los textos de desktop.
5. Dado un viewport de entre 641 y 1279 px, entonces el contenido se apila, sin línea y sin scroll horizontal. No hay frame para este rango.
6. Dado un viewport de más de 1440 px, entonces la composición conserva su tamaño de 1440 px y no hay scroll horizontal.

**Estructura y accesibilidad**
7. Dada la página, entonces tiene un único `<h1>`, usa elementos semánticos (`header`, `main`, `section`, `blockquote`, `footer`) y todas las imágenes tienen `alt`.
8. Dado que navego con teclado, entonces puedo llegar a cada link y botón, con foco visible.
9. Dado un lector de pantalla, cuando lee un texto animado, entonces recibe la frase completa y no letras ni palabras sueltas.
10. Dado JavaScript desactivado, entonces todo el contenido se ve y todos los links funcionan.

**Conversión**
11. Dado el CTA "Agenda una llamada…" del hero, cuando se hace click, entonces abre Cal.com y registra `cta_hero_call` en GA4.
12. Dado el link a la agenda del bloque oscuro, cuando se hace click, entonces abre Cal.com y registra `cta_final_call` en GA4.
13. Dado cualquier otro link o botón de la página, cuando se hace click, entonces lleva al destino definido en la tabla "Destinos".

**Contenido**
14. Dado el texto visible, entonces es el aprobado en "Contenido a aprobar": no se publica ninguna métrica, testimonio ni logo sin aprobación explícita de Luis.
15. Dado el email de contacto, entonces es `info@uxuaria.com`.

**Agenda**
16. Dado el bloque oscuro, cuando se abre la página con JavaScript, entonces el embed de Cal.com permite elegir una fecha.
17. Dado el embed sin cargar, con error o con JavaScript desactivado, entonces queda visible un link directo a Cal.com.
18. Dado que el visitante todavía no llegó al bloque, entonces el embed no frena la carga inicial de la página.

**Animaciones**
19. Dado que se abre la página, entonces el H1 aparece con ScrambleText, palabra por palabra y sin mover los saltos de línea, y el lead sube línea por línea desde detrás de una máscara.
20. Dada una fila de iconos que entra en pantalla, entonces cada forma pasa por las otras y termina en la suya (hero, servicios y testimonios).
21. Dado un título o texto de sección, cuando hago scroll, entonces sus palabras pasan de 15% a 100% de opacidad siguiendo el scroll, y vuelven a aclararse al subir. Cubre proceso, títulos de servicios y testimonios, y los títulos y el texto del bloque oscuro.
22. Dado que llego al final de la página, entonces ningún texto animado queda a medio camino, en ningún alto de pantalla.
23. Dado que bajo por la página, cuando hago scroll, entonces la línea de la versión visible se dibuja de arriba hacia abajo siguiendo el scroll.
24. Dado un bloque que entra en pantalla, entonces aparece con un fundido; los contadores de las métricas cuentan hasta su valor y los símbolos del proceso giran hasta su posición.
25. Dada la franja de marcas en desktop, cuando hago scroll, entonces se desplaza a la izquierda al bajar y a la derecha al subir, sin generar scroll horizontal. En 640 px o menos queda fija sobre la línea.
26. Dados los testimonios en una fila, cuando hago scroll, entonces aparecen uno a uno, en orden.
27. Dada una card de métrica, cuando paso el mouse, entonces crece levemente y muestra una sombra sutil.
28. Dado un testimonio, cuando paso el mouse, entonces crece y muestra sombra, y los demás pierden opacidad.
29. Dado un botón, incluidos los de contexto del proceso, cuando paso el mouse o tiene foco de teclado, entonces invierte sus colores.
30. Dada una fila de servicios, cuando paso el mouse, entonces un fondo negro la recorre e invierte el texto y la flecha.
31. Dado `prefers-reduced-motion: reduce` o JavaScript desactivado, entonces todo el contenido y la línea completa se ven de entrada, sin animaciones de aparición ni de scroll.
32. Dado que el script de GSAP falla, entonces los textos y los iconos se muestran igual a los 3 segundos.

**SEO**
33. Dada la home publicada, entonces conserva `/` como URL y canonical, con `title`, description, OG y JSON-LD presentes. Cambios en esos textos: **A CONFIRMAR**.

**Idioma**
34. Dado el header y el footer, entonces no se ofrece inglés hasta que exista esa versión.

---

## Destinos

| Elemento | Destino |
|---|---|
| "Agenda una llamada de 15 minutos" (hero y bloque oscuro) | Cal.com (`src/lib/booking.ts`). El evento dura 30 minutos, pero el texto dice 15: **A CONFIRMAR** |
| "o obtén un diagnóstico UX gratis" | **A CONFIRMAR** (¿`/diagnostico/`?) |
| AI MVP Rescue (header y footer) | `/ai-mvp-rescue` |
| Blog | `/blog` |
| Contacto | `/contacto/` |
| Proyectos | `/portafolio` (spec 13) |
| "Empecemos ahora" | **A CONFIRMAR** |
| ES | Sin link. EN y "Español / English" quedan ocultos hasta traducir el sitio; `/en/*` sigue redirigiendo a `/` con 301 |
| "Leer la historia" (Monge Pay, Greenify) | `/portafolio/monge-pay`, `/portafolio/greenify` |
| "Sobre nosotros" | **A CONFIRMAR**. El frame no tiene sección "Sobre mí" |
| "Clic para descubrir" (solo desktop) | **A CONFIRMAR** |
| "Más de nuestro diagnóstico UX" | **A CONFIRMAR** |
| "AI Native Product Design" | **A CONFIRMAR** |
| "Design system AI ready" | **A CONFIRMAR** |
| 4 filas de servicios | **A CONFIRMAR** |
| Footer: Servicios, Sobre mí | **A CONFIRMAR** |
| Footer: SAKURA 64 | `https://sakura64.uxuaria.com/` (el mismo de hoy) |
| Ícono social del footer | LinkedIn: `https://www.linkedin.com/company/uxuaria/` (el del footer actual) |

---

## Contenido a aprobar

El diseño cambia elementos que `CLAUDE.md` protege. Nada de esto se publica sin el visto bueno de Luis.

| Tema | Hoy en el sitio | En la home nueva | A definir |
|---|---|---|---|
| H1 | "UX para productos digitales · Buenos Aires · LATAM" | "Agencia UX que dirige a tu usuario hacia donde crece tu negocio" | Texto final. Afecta SEO |
| Lead | Texto actual del hero | "Consultoría y Agencia UX para startups que escalan, con foco en productos construidos con IA." | Texto final |
| Título de servicios | Servicios actuales | "Servicios de consultoría UX y diseño de producto" | Texto final |
| CTA del hero | "▶ Agendá…", "¿Tu app la construiste con IA? →" | "Agenda…", "o obtén un diagnóstico UX gratis" | Texto final; desaparece el CTA de AI MVP Rescue del hero |
| Voseo | Voseo | Tuteo con ortografía corregida: "Agenda", "elige", "escríbeme", "obtén", "tienes", "sabes", "quieres", "estás" | ¿Se pasa a voseo (regla de `CLAUDE.md`)? |
| Ortografía | — | Corregida en la página (2026-11-03). Figma conserva las erratas | Corregir también en Figma. "marketing y ves" en el primer paso no se entiende: confirmar qué debe decir |
| Voz | Primera persona singular (decisión 2026-05-27) | Mezcla "mi calendario" y "escribeme" con "nosotros", "Expertos", "Diseñadores" | ¿Se reemplaza la decisión? Si sí, registrarla con `/decidir` |
| Pasos del proceso | No existen | Títulos, descripciones y textos de contexto nuevos | Aprobar el texto |
| +150K | Caso Monge Pay: "+150K usuarios activos" | "Nuevos usuarios de crecimiento" | Qué afirmación es la correcta |
| +15 años | "Argentina y LATAM" | "Latinoamérica, USA y Europa" | Confirmar alcance geográfico |
| +40 | Caso Greenify: "puntos de fricción" | "Problemas de conversión detectados" | Confirmar texto |
| Testimonios | 3: Flavio Strianese, Ireland Bender, Walter Aguilar Barahona | 4: suma a Laszlo Sandor, "Project Manager", con la cita en inglés. La primera cita dice "Aportan" en vez de "Luis aporta". La de Ireland dice "trabajar nuestro diseñador", sin "con". Walter figura como "Walter Aguilar", "CEO · Deoper" (hoy "Walter Aguilar Barahona", "Director y Consultor · DeOper"). Sin fotos. Badge "Testimonial" | Aprobar nombres, cargos y citas; ¿traducir la cuarta y el badge? |
| Clientes | Monge Pay, Striano, Greenify, Poy, Personal | Sale Personal; Poy aparece como Points of You | Confirmar lista |
| Servicios | Investigación, MVP, Experiencia, Crecimiento | Research y diagnóstico, UI, Product design, "Rescatamos tu MVP hecho con IA" | ¿Cómo se relaciona con las páginas de `servicios/`? |
| Bloque de contacto | Llamada de 30 minutos, "Cupos limitados este trimestre" | Llamada de 15 minutos, sin aviso de cupos | Confirmar |

---

## Alcance

- La home completa en desktop y mobile, con el contenido aprobado.
- Las variables y los componentes nuevos que la home necesite.
- Header y footer nuevos en todo el sitio, en los componentes compartidos `Navbar` y `Footer`, con sus ajustes de mobile.
- Embed de Cal.com en el bloque oscuro.
- Animaciones de texto, iconos y línea con GSAP.

## Fuera de alcance / No tocar

- Diseñar y construir las otras páginas nuevas de Figma: Proyectos, Blog, Artículo, Contacto, Caso de estudio.
- `ai-mvp-rescue`, `/diagnostico/`, `/contacto/`, `functions/api/*` y `lupaux/`.
- Traducir el sitio al inglés: queda pendiente, por decisión de Luis (2026-11-03).
- Aplicar `--color-highlight: #C8F135`.
- Diseñar un frame para 641–1279 px.
- `Line Car.html`: es una ilustración interactiva de un auto sin commitear y no está en el frame. No se usa salvo pedido de Luis.

## Dependencias

- **Figma:** frames 120:3459 y 130:3843, y Uxuaria Library.
- **Fuentes:** Space Grotesk, Inter y Space Mono en Google Fonts.
- **Assets:** símbolos de marca, formas de la fila de iconos y logos de clientes exportados de Figma.
- **Librerías:** GSAP 3.15 con ScrollTrigger, SplitText, ScrambleTextPlugin y MorphSVGPlugin. Falta registrarla en `decisions.md` y revisar su licencia.
- **Externos existentes:** Cal.com (también como embed) y GA4 (`G-6TCJ5969G7`).
- **Publicación:** progresiva. Las páginas sin diseño nuevo deben seguir respondiendo en sus URLs (decisions.md, 2026-11-02).
- **Base técnica:** `src/pages/index.astro`, `BaseLayout`, `Navbar` y `Footer` (spec 10). Requiere Node 24.

## Estados (UI)

- **Vacío:** N/A; el contenido es estático.
- **Carga:** los textos y los iconos animados esperan a GSAP, con un máximo de 3 segundos. El embed de Cal.com conserva su tamaño, con el link directo visible.
- **Error:** si GSAP falla, el contenido se muestra sin animar. Si falla el embed, queda el link directo a Cal.com.

## Definición de hecho

La general de [`AGENTS.md`](../AGENTS.md), más:

- [ ] Comparada contra el frame 120:3459 a 1440 px y contra el 130:3843 a 390 px.
- [ ] Probada con `prefers-reduced-motion: reduce` real y en un celular físico.
- [ ] Sin copy, métricas, testimonios ni logos pendientes de aprobación.
- [ ] Ningún link sin destino definido.
- [ ] Revisadas las demás páginas con el header y el footer ajustados, y el menú mobile.
- [ ] El test de regresión de `AGENTS.md` se actualizó para la navegación, los CTA nuevos y Cal.com.
- [ ] `docs/architecture.md` y `CLAUDE.md` actualizados.
- [ ] Decisiones registradas con `/decidir` (GSAP y su licencia, efectos de texto, voz).

---

## A CONFIRMAR

**Decisiones de construcción**

1. **Base técnica y orden: resuelto (2026-11-02).** Se construye sobre la rama `astro`, en `src/pages/index.astro`. La home actual no se migra 1:1; ver `decisions.md`.
2. **Mobile: resuelto (2026-11-03).** Frame 130:3843, maquetado.
3. **Convivencia visual: resuelto (2026-11-02).** La publicación es progresiva: la home sale cuando esté lista y convive con las páginas que siguen en Retro 3.1 (reemplaza la decisión anterior de publicar todo junto).
4. **Header y footer: resuelto (2026-11-02).** Cambian en todo el sitio.
5. **Rectángulo vacío del bloque oscuro: resuelto (2026-11-02).** Embed de Cal.com.
6. **Línea continua: resuelto (2026-11-02).** Se dibuja con el scroll; ver criterios 23 y 31.
7. **Efecto de los textos de sección: resuelto (2026-11-03).** Luis elige el texto ligado al scroll; ver criterio 21.
8. **Textos de mobile: resuelto (2026-11-03).** Mobile usa los textos de desktop en H1, lead y título de servicios, aunque el frame 130:3843 tiene otros.

**Bloquean la publicación**

9. Todo lo de "Contenido a aprobar".
10. Los destinos marcados en "Destinos".
11. **Contenido que sale de la home:** portafolio (destacado y carrusel), "Sobre mí", el bloque de AI MVP Rescue, los personajes pixel y el sticky CTA no están en los frames. ¿Se eliminan? Quitar proyectos requiere revisar la spec 02.
12. **Métrica de éxito** y nombres de eventos GA4 para los CTA nuevos.
13. **Aprobación del diseño:** Luis aprobó el desktop anterior (2026-11-02). Falta su visto bueno sobre los frames actuales construidos, en desktop y mobile.
14. **Versión en inglés:** pendiente, sin fecha. Al retomarla hay que definir páginas y URLs, y quitar `/en/*` de `_redirects`.
15. **Metadatos SEO:** `title` y description no cambiaron, aunque cambió el H1. ¿Se actualizan?

---

## Dónde vive

- Página: `src/pages/index.astro`, con las animaciones de GSAP en su `<script>`. Estilos: `public/home.css`.
- Tokens nuevos, header y footer: `public/site.css`, `src/components/Navbar.astro`, `src/components/Footer.astro`.
- Línea, apariciones, contadores, franja de marcas y testimonios: `public/home.js` y el bloque MOTION de `public/home.css`.
- Componentes: `src/components/ArrowLink.astro`, `src/components/ShapeRow.astro`, `src/components/CalEmbed.astro`. Assets de Figma: `public/images/home/`.
- `src/layouts/BaseLayout.astro` carga las fuentes nuevas y `site.css`. La prop `legacyStyles` deja afuera `styles.css`: la home la pasa en `false`; las páginas sin diseño nuevo siguen en Retro 3.1.

## Conocido

- **Copy:** sale de Figma, con la ortografía corregida solo en la página, y sigue sin aprobar.
- **Testimonios:** se corrigieron solo las comillas. Las palabras siguen como en el sitio actual, incluido "trabajar nuestro diseñador", sin "con", porque cambiar una cita requiere aprobación.
- **Selector de idioma:** con EN oculto, "ES" queda solo en el header y sin función. EN y "Español / English" están comentados en `Navbar.astro` y `Footer.astro`.
- **Sin destino:** lo marcado **A CONFIRMAR** en "Destinos" se muestra como texto sin link, para no inventar URLs ni generar 404.
- **Links a páginas sin migrar:** `/ai-mvp-rescue` y `/portafolio/greenify` dan 404 en el build de esta rama hasta completar las specs 10 y 13.
- **Navegación:** el header nuevo no tiene link a Servicios, así que `/servicios/` queda sin acceso desde el header. `ai-mvp-rescue.html` y `lupaux/` tienen navegación propia y no reciben el header nuevo.
- **Escala:** los valores de la composición son los píxeles de Figma multiplicados por `--home-u`, para que la línea no se desalinee. Entre 1280 y 1440 px el texto del flujo se achica un poco.
- **Diferencia con el frame mobile (aprobada):** al usar los textos de desktop, el hero tiene espacio extra abajo y el título de servicios ocupa una línea más, así que desde ahí todo queda unos 34 px más abajo. El footer no muestra la fila "Español / English".
- **"Clic para descubrir":** solo aparece en desktop, porque el frame mobile no lo tiene.
- **Lectura de los textos de sección:** al 15% de opacidad no se pueden leer hasta scrollear. Se nota más en los párrafos largos en mobile.
- **Peso:** el script de la home pesa unos 60 KB con gzip, de los cuales ScrollTrigger suma unos 17 KB.
- **Cal.com en el embed:** en 450 px de alto, el calendario queda con scroll interno y sin la columna de horarios hasta elegir un día.
- **Hover sin destino:** "Empecemos ahora", los botones de contexto, la card de +15 años y las filas de servicios reaccionan al mouse aunque todavía no llevan a ningún lado.
- **Línea:** son SVG en la página, con dos trazos y esquinas redondeadas, para poder dibujarlos con el scroll, en lugar del asset exportado de Figma.
- **Diferencia con Figma:** en los testimonios, autor y cargo pasan a dos líneas si no entran; en Figma se pisan o se salen de la card.
- **Sin probar:** `prefers-reduced-motion` real, fluidez en un celular físico, el menú mobile y las demás páginas con el header y el footer ajustados.
