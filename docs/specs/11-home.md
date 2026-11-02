# 11 — Nueva home de Uxuaria

**id:** `home`
**Estado:** 🚧 En construcción en la rama `astro` · hecho: desktop (1280 px o más), header y footer · pendiente: frame mobile, contenido y destinos por aprobar · no se publica hasta tener todo eso y las demás páginas nuevas
**Última actualización:** 2026-11-02
**Relacionada con:** 00-overview, 01-design-system, 02-portfolio, 03-content, 05-rescue-service, 07-funnel-diagnostico, 10-astro

---

## Historia de usuario

**Como** founder de una startup en crecimiento que evalúa ayuda de UX para su producto,
**quiero** entender en pocos segundos qué hace Uxuaria, ver resultados y opiniones de clientes, y tener una forma directa de empezar,
**para** decidir si agendo una llamada o pido un diagnóstico.

> Historia redactada a partir de la propuesta del diseño y del propósito del sitio en `CLAUDE.md`. **A CONFIRMAR** por Luis.

## Objetivo

Maquetar la home según el frame "Home — Desktop 1441" de Figma: nuevo lenguaje visual, nueva estructura y nuevos componentes, sin romper los caminos de conversión que hoy mide el sitio.

Métrica de éxito: **A CONFIRMAR** (hoy se miden clicks con `data-track` y `generate_lead` en GA4).

---

## Diseño

- **Fuente:** [Figma uxuaria-Web · Home — Desktop 1441 (nodo 26:2)](https://www.figma.com/design/67hslCn1jUCcFDvSCzRpmP/uxuaria-Web?node-id=26-2), página "new site". Mide 1440 × 5244 px.
- **Componentes y tokens:** tableros "Uxuaria Library" 01 a 04 (nodos 60:52, 60:402, 60:403, 60:404) en la misma página.
- **Mobile:** lo diseña Luis en Figma. Todavía no hay frame en la página "new site". La maquetación de mobile espera ese frame.

### Secciones del frame, en orden

| # | Sección | Contenido en Figma |
|---|---|---|
| 1 | Header (57:304) | Wordmark · AI MVP Rescue · Proyectos · Blog · Contacto · botón "Empecemos ahora" · ES / EN |
| 2 | Hero (28:403) | "Dirigimos a tu usuario hacia donde crece tu negocio.", lead, botón "Agenda una llamada de 15 minutos", link "o obten un diagnostico Ux gratis de tu proyecto" |
| 3 | Métricas (44:450) | 3 cards: +150K (Monge Pay, "Leer la historia"), +15 años ("Sobre nosotros"), +40 (Greenify, "Leer la historia") |
| 4 | Proceso (93:1887, 93:1897, 93:1907) | 3 bloques escalonados: "Vamos al hueso…", "Solucionamos el problema…", "Construimos, y entregamos…", con símbolos de marca |
| 5 | Clientes (57:138) | Monge Pay, Striano, Greenify, Points of You |
| 6 | Servicios (57:66) | "4 cosas en las que somos buenos": 4 filas de ancho completo con flecha, alineadas de forma alternada |
| 7 | Testimonios (49:508) | "Founders que han apostado con nosotros": 4 cards |
| 8 | Bloque oscuro (57:45) | "Tu problema de crecimiento es un problema de diseño." + "Conversemos y averiguemos…", agenda, email y un rectángulo vacío de 544 × 450 px |
| 9 | Footer (26:248) | Marca, columnas Servicios, Navegación y Contacto, copyright |

Una línea doble continua (53:13) baja desde el hero y atraviesa las métricas y el proceso.

### Tokens que define el diseño

- **Tipografía:** Space Grotesk (display, headings, cuerpo), Inter (navegación, statement, footer), Space Mono (badges y atribución).
- **Color:** blanco, negro y grises; `#111111` para texto, `#666666` para texto secundario, `#0A0A0A` para el footer. No usa `#C8F135`.
- **Forma:** cards y botones con esquinas redondeadas, a diferencia de Retro 3.1 (sin `border-radius`).

---

## Criterios de aceptación

**Fidelidad**
1. Dado un viewport de 1440 px, cuando se abre la home, entonces las 9 secciones aparecen en el orden de la tabla y coinciden con el frame 26:2 en tipografía, color, espaciado y posición.
2. Dado que la página usa tipografías y colores del diseño, entonces esos valores están declarados como variables en `:root` y las clases siguen BEM.
3. Dada la línea continua, entonces es decorativa: no recibe foco, se oculta a lectores de pantalla y no genera scroll horizontal.

**Estructura y accesibilidad**
4. Dada la página, entonces tiene un único `<h1>`, usa elementos semánticos (`header`, `main`, `section`, `blockquote`, `footer`) y todas las imágenes tienen `alt`.
5. Dado que navego con teclado, entonces puedo llegar a cada link y botón, con foco visible.
6. Dado JavaScript desactivado, entonces todo el contenido se ve y todos los links funcionan.

**Conversión**
7. Dado el CTA "Agenda una llamada…" del hero, cuando se hace click, entonces abre Calendly y se registra `cta_hero_call` en GA4.
8. Dado cualquier otro link o botón de la página, cuando se hace click, entonces lleva al destino definido en la tabla "Destinos" (hoy con varios **A CONFIRMAR**).

**Contenido**
9. Dado el texto visible, entonces es el aprobado en "Contenido a aprobar": no se publica ninguna métrica, testimonio ni logo sin aprobación explícita de Luis.
10. Dado el email de contacto, entonces es `info@uxuaria.com`.

**Responsive**
11. Dado un viewport de 375 px, entonces no hay scroll horizontal y la página coincide con el frame mobile de Figma (pendiente de Luis).

**Agenda**
13. Dado el bloque oscuro, cuando se abre la página con JavaScript, entonces el rectángulo 57:37 muestra el embed de Calendly y permite elegir una fecha.
14. Dado el embed sin cargar, con error o con JavaScript desactivado, entonces queda visible un link directo a Calendly.
15. Dado que el visitante todavía no llegó al bloque, entonces el embed no frena la carga inicial de la página.

**SEO**
12. Dada la home publicada, entonces conserva `/` como URL y canonical, con `title`, description, OG y JSON-LD presentes. Cambios en esos textos: **A CONFIRMAR**.

---

## Destinos

| Elemento | Destino |
|---|---|
| "Agenda una llamada de 15 minutos" | Calendly. El link actual es `charla-introductoria-clone`; el CTA final de hoy habla de 30 minutos. Duración real: **A CONFIRMAR** |
| "o obten un diagnostico Ux gratis…" | **A CONFIRMAR** (¿`/diagnostico/`?) |
| AI MVP Rescue (header y footer) | `/ai-mvp-rescue` |
| Blog | `/blog` |
| Contacto | `/contacto/` |
| "Empecemos ahora" | **A CONFIRMAR** |
| Proyectos | **A CONFIRMAR**. Figma tiene un frame de esa página (82:2912), pero no existe en el sitio |
| ES / EN y "Español / English" | **A CONFIRMAR**. No hay versión en inglés: `/en/*` redirige a `/` con 301 |
| "Leer la historia" (Monge Pay, Greenify) | `/portafolio/monge-pay`, `/portafolio/greenify` |
| "Sobre nosotros" | **A CONFIRMAR**. El frame no tiene sección "Sobre mí" |
| "Research y usuarios", "Diseño guiado por IA" | **A CONFIRMAR** |
| 4 filas de servicios | **A CONFIRMAR** |
| Footer: Servicios, Sobre mí | **A CONFIRMAR** |
| Footer: SAKURA 64 | `https://sakura64.uxuaria.com/` (el mismo de hoy) |
| Ícono social del footer | LinkedIn: `https://www.linkedin.com/company/uxuaria/` (el del footer actual) |

---

## Contenido a aprobar

El diseño cambia elementos que `CLAUDE.md` protege. Nada de esto se publica sin el visto bueno de Luis.

| Tema | Hoy en el sitio | En Figma | A definir |
|---|---|---|---|
| H1 | "UX para productos digitales · Buenos Aires · LATAM" | Ese texto quedó fuera del frame (nodo 26:5) | ¿Se elimina? ¿Qué texto es el `<h1>`? Afecta SEO |
| CTA del hero | "▶ Agendá…", "¿Tu app la construiste con IA? →" | "Agenda…", "o obten un diagnostico Ux…" | Texto final; desaparece el CTA de AI MVP Rescue del hero |
| Voseo y ortografía | Voseo | "Agenda", "elije", "escribeme", "obten", "diagnostico", "Ux", "practicos", "economia", "metodologia", "que tan lejos", "Projectos", "productis", "latinoamerica" | Corregir a voseo y con tildes (regla de `CLAUDE.md`), con confirmación del texto |
| Voz | Primera persona singular (decisión 2026-05-27) | Mezcla "Diseño… mi trabajo" con "nosotros", "somos", "Expertos", "Diseñadores", "Desarrolladores" | ¿Se reemplaza la decisión? Si sí, registrarla con `/decidir` |
| +150K | Caso Monge Pay: "+150K usuarios activos" | "Nuevos usuarios de crecimiento" | Qué afirmación es la correcta |
| +15 años | "Argentina y LATAM" | "latinoamerica, USA y Europa" | Confirmar alcance geográfico |
| +40 | Caso Greenify: "puntos de fricción" | "Problemas de conversión detectados" | Confirmar texto |
| Testimonios | 3: Flavio Strianese, Ireland Bender, Walter Aguilar Barahona | 4: suma a Laszlo Sandor, con la cita en inglés. La primera cita dice "Aportan" en vez de "Luis aporta". Walter figura como "Walter Aguilar", "CEO · Deoper" (hoy "Walter Aguilar Barahona", "Director y Consultor · DeOper"). Sin fotos. Badge "Testimonial" | Aprobar nombres, cargos y citas; ¿traducir la cuarta y el badge? |
| Clientes | Monge Pay, Striano, Greenify, Poy, Personal | Sale Personal; Poy aparece como Points of You | Confirmar lista |
| Servicios | Investigación, MVP, Experiencia, Crecimiento | Research, UI, Product design, "Desarrollo…" | ¿Se ofrece desarrollo? ¿Cómo se relaciona con las páginas de `servicios/`? |
| Bloque de contacto | Llamada de 30 minutos, "Cupos limitados este trimestre" | Llamada de 15 minutos, sin aviso de cupos | Confirmar |

---

## Alcance

- La home completa en desktop y mobile, con el contenido aprobado.
- Las variables y los componentes nuevos que la home necesite.
- Header y footer nuevos en todo el sitio, en los componentes compartidos `Navbar` y `Footer`.
- Embed de Calendly en el bloque oscuro.

## Fuera de alcance / No tocar

- Diseñar y construir las otras páginas nuevas de Figma: Proyectos, Blog, Artículo, Contacto, Caso de estudio.
- `ai-mvp-rescue`, `/diagnostico/`, `/contacto/`, `functions/api/*` y `lupaux/`.
- Implementar otro idioma, salvo que Luis lo pida.
- Aplicar `--color-highlight: #C8F135`.
- `Line Car.html`: es una ilustración interactiva de un auto sin commitear y no está en el frame. No se usa salvo pedido de Luis.

## Dependencias

- **Figma:** frame 26:2 y Uxuaria Library.
- **Fuentes:** Space Grotesk, Inter y Space Mono en Google Fonts.
- **Assets:** símbolos de marca y logos de clientes exportados de Figma.
- **Externos existentes:** Calendly (ahora también como embed) y GA4 (`G-6TCJ5969G7`).
- **Publicación:** las demás páginas nuevas, con sus propias specs. La home no sale a producción antes que ellas.
- **Base técnica:** rama `astro`, con `src/pages/index.astro`, `BaseLayout`, `Navbar` y `Footer` (spec 10).

## Estados (UI)

- **Vacío:** N/A; el contenido es estático.
- **Carga:** embed de Calendly: el rectángulo conserva su tamaño para no mover la página, con el link directo visible. Aspecto exacto: **A CONFIRMAR**.
- **Error:** embed de Calendly: queda el link directo a Calendly. El resto de la página es estático.

## Definición de hecho

La general de [`AGENTS.md`](../AGENTS.md), más:

- [ ] Comparada contra el frame 26:2 a 1440 px.
- [ ] Sin copy, métricas, testimonios ni logos pendientes de aprobación.
- [ ] Ningún link sin destino definido.
- [ ] El test de regresión de `AGENTS.md` se actualizó para la navegación y los CTA nuevos.
- [ ] Decisiones nuevas registradas con `/decidir` (estética, voz).

---

## A CONFIRMAR

**Decisiones de construcción**

1. **Base técnica y orden: resuelto (2026-11-02).** Se construye en la rama `astro`, en `src/pages/index.astro`. La home actual no se migra 1:1; ver `decisions.md`.
2. **Mobile: resuelto (2026-11-02).** Luis diseña el frame en Figma. Pendiente: el link del frame. Solo bloquea la parte mobile.
3. **Convivencia visual: resuelto (2026-11-02).** La home se publica junto con las demás páginas nuevas.
4. **Header y footer: resuelto (2026-11-02).** Cambian en todo el sitio.
5. **Rectángulo vacío del bloque oscuro (57:37): resuelto (2026-11-02).** Embed de Calendly.

**Bloquean la publicación**

6. Todo lo de "Contenido a aprobar".
7. Los destinos marcados en "Destinos".
8. **Contenido que sale de la home:** portafolio (destacado y carrusel), "Sobre mí", el bloque de AI MVP Rescue, los personajes pixel y el sticky CTA no están en el frame. ¿Se eliminan? Quitar proyectos requiere revisar la spec 02. Hay un bloque de AI MVP Rescue fuera del frame (26:155): ¿va en la home?
9. **Línea continua:** ¿estática o animada con el scroll? Si se anima: comportamiento con `prefers-reduced-motion`.
10. **Métrica de éxito** y nombres de eventos GA4 para los CTA nuevos.

---

## Dónde vive

- Página: `src/pages/index.astro`. Estilos: `public/home.css`.
- Tokens nuevos, header y footer: `public/site.css`, `src/components/Navbar.astro`, `src/components/Footer.astro`.
- Link con flecha: `src/components/ArrowLink.astro`. Assets de Figma: `public/images/home/`.
- `src/layouts/BaseLayout.astro` carga las fuentes nuevas y `site.css`. La prop `legacyStyles` deja afuera `styles.css`: la home la pasa en `false`; las demás páginas siguen en Retro 3.1.

## Conocido

- **Copy:** es literal de Figma, con sus erratas, hasta que se apruebe.
- **Sin destino:** lo marcado **A CONFIRMAR** en "Destinos" se muestra como texto sin link, para no inventar URLs ni generar 404.
- **Links a páginas sin migrar:** `/ai-mvp-rescue`, `/contacto/` y `/portafolio/*` dan 404 en la rama `astro` hasta completar la spec 10.
- **Navegación:** el header nuevo no tiene link a Servicios, así que `/servicios/` queda sin acceso desde el header. `ai-mvp-rescue.html` y `lupaux/` tienen navegación propia y no reciben el header nuevo.
- **Menos de 1280 px:** layout provisional, sin la línea, hasta tener el frame mobile. Entre 1280 y 1440 px la composición escala con `--home-u`, así que el texto del flujo se achica un poco.
- **Calendly en el embed:** en una ventana de 450 px de alto, el aviso de cookies de Calendly tapa buena parte del calendario hasta que se responde, y el contenido se recorre con scroll interno. Se ve también la cinta "Powered by Calendly".
- **Diferencia con Figma:** en los testimonios, autor y cargo pasan a dos líneas si no entran; en Figma se pisan o se salen de la card.
