# 15 — Páginas de servicio

**id:** `paginas-servicio`
**Estado:** 🔎 Exploración de contenido · no se construye todavía · diagnóstico en borrador: [`docs/contenido/diagnostico-ux.md`](../contenido/diagnostico-ux.md) · el diseño espera la plantilla de Figma de Luis
**Última actualización:** 2026-11-03
**Relacionada con:** 05-rescue-service, 07-funnel-diagnostico, 10-astro, 11-home, 13-proyectos, 14-contacto

---

## Historia de usuario

**Como** founder o responsable de producto que busca ayuda con la experiencia de su producto,
**quiero** encontrar una página que explique el servicio que resuelve mi problema, qué incluye y cómo se trabaja,
**para** decidir si Uxuaria me sirve y dar el siguiente paso.

**Como** Luis, que hace crecer Uxuaria,
**quiero** una página específica por servicio, enlazada desde la landing,
**para** posicionar esos servicios en buscadores y sumar autoridad al dominio y a la marca.

> Redactada a partir del pedido de Luis. **A CONFIRMAR** por Luis.

## Objetivo

Crear 4 páginas en el diseño nuevo y en Astro que complementen la home, cada una enfocada en un servicio y una intención de búsqueda, y que le den destino a los links que hoy están pendientes en la home.

Métrica de éxito: **A CONFIRMAR** (punto 8).

---

## Páginas y URLs

URLs definidas por Luis (2026-11-03). Las existentes no cambian.

| Página | URL | Origen | CTA principal |
|---|---|---|---|
| Investigación y diagnóstico UX | `/servicios/investigacion/` | Rediseño de la página actual | `/diagnostico/` (propuesta, punto 3) |
| Diseño de MVP para startups desde cero | `/servicios/mvp/` | Rediseño de la página actual | Cal.com |
| AI MVP Rescue | `/ai-mvp-rescue` | Rediseño de la landing actual | `/diagnostico/`, como hoy (spec 07) |
| Design Systems potenciados con IA | **A CONFIRMAR** (punto 5). Propuesta: `/servicios/design-systems-ia/` | Página nueva | Cal.com |

## Mapa de palabras clave

Una intención principal por página, para que no compitan entre sí. **Son hipótesis:** salen del servicio y de una revisión de resultados de búsqueda, sin datos de volumen ni de dificultad (punto 9).

| Página | Intención principal | Secundarias |
|---|---|---|
| Investigación y diagnóstico | diagnóstico UX gratis | auditoría UX, investigación de usuarios, research UX |
| MVP | diseño de MVP para startups | diseño de producto mínimo viable, prototipo de MVP |
| AI MVP Rescue | rescate de MVP hecho con IA | arreglar app hecha con IA, vibe coding, Lovable, Cursor |
| Design Systems | design system con IA | design system AI-ready, tokens, Figma y agentes de IA |

---

## Diseño

- **Figma:** la página de diagnóstico tiene su diseño desktop en [`146:1115`](https://www.figma.com/design/67hslCn1jUCcFDvSCzRpmP/uxuaria-Web?node-id=146-1115), con sus gráficos, pendiente de la revisión de Luis. Las otras tres páginas siguen sin diseño, y falta el mobile.
- **Base visual:** Uxuaria Library y tokens de `public/site.css`. No se agregan colores nuevos.
- **Animaciones:** solo hovers, como blog, proyectos y contacto. La excepción es el proceso de la página de diagnóstico, que lleva ilustraciones y animaciones (decisions.md, 2026-11-03). GSAP sigue siendo exclusivo de la home hasta definir cómo se construye esa animación (A CONFIRMAR 13).

### Plantilla compartida, en orden

| # | Sección | Contenido | ¿Obligatoria? |
|---|---|---|---|
| 1 | Presentación | Ruta, H1 con la intención principal, lead y CTA | Sí |
| 2 | Para quién | Situaciones en las que se reconoce el visitante | Sí |
| 3 | El problema | Qué está costando no resolverlo | Sí |
| 4 | Qué incluye | Entregables concretos | Sí |
| 5 | Proceso | Pasos numerados | Sí |
| 6 | Evidencia | Casos y testimonios ya aprobados | No: se omite si no hay evidencia real |
| 7 | Preguntas frecuentes | Pregunta y respuesta, con `<details>` | Sí |
| 8 | Otros servicios | Links a las otras páginas de servicio | Sí |
| 9 | Artículos relacionados | Links a artículos del blog que existan | No: se omite si ninguno encaja |
| 10 | CTA de cierre | `ClosingCta` | Sí |

La ruta es "Inicio > Página". No pasa por `/servicios/`, porque el futuro de esa página no está definido.

### Contenido por página

Todo el copy es una propuesta hasta que Luis lo apruebe.

- **Investigación y diagnóstico:** ofrece primero un diagnóstico gratuito y un reporte inicial, que llevan después a un full service. Es para cualquier producto digital, no solo apps hechas con IA. Referencia: [Eleken](https://www.eleken.co/ux-audit-service), solo para extraer lo más importante, sin copiar su contenido. Fuentes: `servicios/investigacion/index.html` y `diagnostico/gracias.html`. Borrador: [`docs/contenido/diagnostico-ux.md`](../contenido/diagnostico-ux.md).
- **MVP:** de la idea al prototipo validado. Fuente: `servicios/mvp/index.html`. El ángulo "desde cero" se trabaja en H1, title y description.
- **AI MVP Rescue:** conserva la propuesta, las cinco áreas, el proceso, los casos y las preguntas de `ai-mvp-rescue.html`, en el diseño nuevo y con voseo parejo.
- **Design Systems:** no hay contenido previo más allá de la etiqueta "Design Systems" y del texto de la home. Lo que incluye el servicio lo define Luis (punto 6).

---

## Criterios de aceptación

**URLs y SEO**
1. Dadas las URLs de la tabla, cuando se abren en el build, entonces responden 200 sin redirecciones nuevas.
2. Dada cada página, entonces tiene un único `<h1>`, `title` y description propios, canonical a su URL, OG y `index, follow`.
3. Dada cada página, entonces tiene JSON-LD de `Service` y `BreadcrumbList`, y de `FAQPage` con las mismas preguntas y respuestas que se ven en pantalla.
4. Dada cada página, entonces aparece en el sitemap que genera el build.
5. Dado `/diagnostico/`, entonces sigue con `noindex` y fuera del sitemap.

**Enlaces internos**
6. Dada la home, cuando hago click en un elemento con destino definido en "Destinos", entonces llego a esa página.
7. Dado el footer, entonces enlaza las 4 páginas de servicio.
8. Dada una página de servicio, entonces enlaza las otras tres y al menos un caso o artículo relacionado que exista.
9. Dado el build, entonces ningún link agregado por esta spec da 404.

**AI MVP Rescue: funnel (spec 07)**
10. Dados los 3 CTA de conversión, entonces dicen "Agenda tu diagnóstico UX sin costo", conservan sus `cta_id` (`cta_hero`, `cta_proceso`, `cta_final`) y llevan a `/diagnostico/?cta=<id>`.
11. Dada una visita con UTM o `gclid`, cuando hago click en un CTA, entonces esos parámetros pasan a `/diagnostico/`.
12. Dado el link `/ai-mvp-rescue#diagnostico`, cuando lo abro, entonces redirige a `/diagnostico/?cta=link_directo` y conserva los UTM.
13. Dado un click en un CTA, entonces se registra `click_formulario_ai_mvp_rescue` con su `cta_id`.

**Medición**
14. Dado un CTA de cualquier página, entonces tiene `data-track` con un id propio, y se registra en GA4 con el mecanismo actual.

**Contenido**
15. Dado el texto visible, entonces usa español estándar, sin voseo, en toda la página.
16. Dada una métrica, un testimonio, un logo o un caso, entonces ya está aprobado por Luis para esa página. No se inventan datos ni precios.
16b. Dado el texto sobre el diagnóstico, entonces no menciona plazos de entrega ni cupos, y la reunión dura 30 minutos.

**Experiencia**
17. Dado un viewport de 1440 px y uno de 375 px, entonces no hay scroll horizontal y los CTA y las preguntas se pueden usar.
18. Dado JavaScript desactivado, entonces el contenido, las preguntas y los links se pueden usar.
19. Dados un link, un botón o una pregunta, entonces tienen foco de teclado visible y tamaño táctil suficiente.
20. Dado que Cal.com no carga, entonces el CTA sigue funcionando como link directo.

---

## Destinos

Propuesta para los links que hoy no tienen destino. **A CONFIRMAR** (punto 7).

| Elemento | Destino |
|---|---|
| "o obtén un diagnóstico UX gratis" (hero de la home) | `/servicios/investigacion/` |
| "Más de nuestro diagnóstico UX" | `/servicios/investigacion/` |
| "Design system AI ready" | Página de Design Systems |
| "Research y diagnóstico UX de tu producto" | `/servicios/investigacion/` |
| "Product design para escalar y crecer tu MVP" | `/servicios/mvp/` |
| "Rescatamos tu MVP hecho con IA" | `/ai-mvp-rescue` |
| "Diseño de interfaz (UI)…" y "AI Native Product Design" | Sin página: siguen sin link |
| Footer: "User Research" y "MVP & Prototipado" | `/servicios/investigacion/` y `/servicios/mvp/` |
| Footer: nuevo ítem de Design Systems | Página de Design Systems |

---

## Decisiones tomadas

| Tema | Decisión |
|---|---|
| URLs existentes | `/servicios/investigacion/`, `/servicios/mvp/` y `/ai-mvp-rescue` no cambian |
| Design Systems | URL nueva |
| Otras páginas antiguas | Luis todavía no define si las rediseña o las elimina; quedan fuera de esta spec |
| Voz | Español estándar, sin voseo |
| Diseño | Plantilla en Figma, a cargo de Luis |
| Diagnóstico | Para cualquier producto digital: diagnóstico gratuito → reporte inicial → full service. Solo lo reciben los leads que califican, y la página lo dice |
| Servicio completo | Servicio pro que puede incluir investigación con usuarios reales: entrevistas y pruebas de usabilidad |
| Reporte de ejemplo | La página de diagnóstico muestra pantallas y ejemplos de Mutis UX, sin mencionar la herramienta ni mostrar su nombre o logo |
| Proceso del diagnóstico | Sección propia, con ilustraciones y animaciones |
| Greenify | Caso de éxito real de la página de diagnóstico |
| Reunión | 30 minutos en todo el sitio |
| Plazos y cupos del diagnóstico | No se mencionan; los tiempos se ven en la llamada. Se quitan los "2 cupos por mes" |
| Autocontenida | `ai-mvp-rescue.html` deja de ser una landing aparte al pasar a Astro y al diseño nuevo |

## Alcance

- `src/pages/servicios/investigacion/index.astro`, `src/pages/servicios/mvp/index.astro`, `src/pages/ai-mvp-rescue.astro` y la página nueva de Design Systems.
- Plantilla compartida y `public/service.css`.
- JavaScript del funnel de `ai-mvp-rescue.html`, sin cambiar su comportamiento.
- Links de home y footer de la tabla "Destinos".
- Migrar a `public/images/` solo los assets que usen estas páginas, si faltan.

## Fuera de alcance / No tocar

- `/servicios/`, `/servicios/experiencia/`, `/servicios/crecimiento/` y demás páginas antiguas.
- `/api/diagnostico`. El formulario y `/diagnostico/gracias` solo cambian para alinear sus textos (punto 3).
- Calendly dentro del funnel del diagnóstico (decisions.md, 2026-11-02).
- Copy del hero, métricas, testimonios y logos de la home.
- Publicar: esta spec trabaja en la rama `astro`. No hay push a `main`.
- Versión en inglés.

## Dependencias

- **Base:** `BaseLayout` con `legacyStyles={false}`, `Navbar`, `Footer`, `ClosingCta`, `ArrowLink`, `src/lib/booking.ts`.
- **Spec 10:** `/diagnostico/` y `/api/diagnostico` tienen que existir en el build para que funcionen los CTA de Rescue. El sitemap debe seguir accesible en la URL que declara `robots.txt`.
- **Spec 13:** los casos que se enlacen tienen que existir en `/portafolio/<slug>`. Greenify todavía no está migrado.
- **Externos:** Cal.com y GA4.

## Estados (UI)

- **Vacío:** no aplica; el contenido es estático. Sin evidencia aprobada, la sección 6 no se muestra.
- **Carga:** no aplica; los CTA son links.
- **Error:** si el destino externo falla, el email `info@uxuaria.com` sigue visible en el footer.

## Definición de hecho

La general de [`AGENTS.md`](../AGENTS.md), más:

- [ ] Las 4 páginas pasan una revisión de SEO on-page y su JSON-LD es válido.
- [ ] Probados los criterios 10 a 13 con UTM en la URL.
- [ ] Copy y evidencia aprobados por Luis, página por página.
- [ ] `docs/architecture.md`, `11-home` (Destinos), `05-rescue-service` y `07-funnel-diagnostico` actualizados.

---

## A CONFIRMAR

**Bloquean la construcción**

1. **Persona gramatical.** El voseo queda descartado (decisions.md, 2026-11-03). ¿Se usan "nosotros" y "tú", como la home? La decisión del 2026-05-27 pedía primera persona singular.
2. **Figma:** revisar el diseño desktop de diagnóstico, y definir mobile y las otras tres páginas.
3. **Diagnóstico: CTA y funnel.** Propuesta: el CTA lleva a `/diagnostico/`, porque conserva la calificación A/B, Notion y `generate_lead`. El formulario y `/diagnostico/gracias` deben dejar de hablar solo de apps hechas con IA y quitar las "48 horas hábiles", lo que amplía el alcance a la spec 07. Solo los leads que califican reciben el diagnóstico y el reporte (decisions.md, 2026-11-03).
4. **Reporte inicial y full service.** Qué incluye cada uno: preguntas en [`docs/contenido/diagnostico-ux.md`](../contenido/diagnostico-ux.md).

**Bloquean la publicación**

5. **URL de Design Systems.** Propuesta: `/servicios/design-systems-ia/`.
6. **Servicio de Design Systems.** ¿Qué entrega Uxuaria (tokens, componentes, documentación, conexión con Figma y código, reglas para agentes de IA)? ¿Qué proceso sigue? ¿Hay un caso real o se puede usar Uxuaria Library como ejemplo?
7. **Destinos y textos de la home.** Confirmar la tabla "Destinos". Además, la fila del código dice "Product design para escalar y crecer tu MVP", y el frame desktop dice "Diseño de MVP para startups desde 0" (nodo 120:3515). ¿Cuál queda?
8. **Métrica de éxito.** ¿Clicks en CTA, leads, posiciones en Search Console? ¿En qué plazo?
9. **Palabras clave.** Validar el mapa con datos de volumen antes de cerrar titles y H1.
10. **Evidencia por página.** ¿Qué casos y testimonios se pueden usar en cada una? "+150K" figura como "nuevos usuarios de crecimiento" en la home y como "usuarios activos" en Rescue. Falta definir el texto correcto y si "+300%" sigue vigente.
11. **Páginas antiguas.** Luis define si `/servicios/`, `/servicios/experiencia/` y `/servicios/crecimiento/` se rediseñan o se eliminan. Hoy no existen en la rama `astro`: antes del corte a producción hay que migrarlas o redirigirlas con 301, para no perder esas URLs (decisions.md, 2026-11-02).
12. **Mutis UX.** Es el nombre nuevo de Lupa UX (decisions.md, 2026-11-03). Hay que hacer las pantallas del reporte en español estándar, sin el nombre ni el logo de la herramienta, y con un producto de ejemplo o con autorización para mostrarlo.
13. **Animación del proceso.** Diseño y técnica. Si usa GSAP, hay que ampliar la excepción de la home en `CLAUDE.md`. El texto se lee sin JS, y con reducción de movimiento las ilustraciones quedan fijas.
14. **Resultados de Greenify.** El caso publicado muestra hallazgos y entregables, no resultados posteriores a la implementación. Además dice 2025 en el encabezado y 2024 en la ficha.

---

## Dónde vive

Se completa al construir.

## Conocido

- **Investigación y diagnóstico:** una misma página combina una oferta gratuita y un servicio pago. Hay que cuidar que el visitante entienda cuál es cuál.
- **Rama `astro`:** `/ai-mvp-rescue` y `/servicios/*` hoy dan 404 en el build de esta rama.
- **Textos por alinear al construir:** la home dice "llamada de 15 minutos" y `ai-mvp-rescue.html` dice "15 minutos" y "48hs". `servicios/index.html` dice "48 horas" y "2 cupos por mes". El sitio tiene voseo en varias páginas. El título del evento en Cal.com dice 15 minutos y se corrige desde la cuenta.
