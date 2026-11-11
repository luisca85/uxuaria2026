# 16 — Páginas de servicio: Diseño AI Native y Design System AI Ready

**id:** `servicios-ia`
**Estado:** 🛠 En construcción · rama `explorar/diagnostico-ux`
**Última actualización:** 2026-11-11
**Relacionada con:** 11-home, 15-paginas-servicio

---

## Historia de usuario

**Como** responsable de producto o de marca en una compañía que quiere integrar IA en su proceso de diseño,
**quiero** entender cómo trabaja Uxuaria con IA y qué recibo,
**para** decidir si agendo una llamada o pido el diagnóstico UX gratuito.

> Redactada a partir del pedido de Luis (2026-11-11). **A CONFIRMAR** por Luis.

## Páginas y URLs

| Página | URL | Figma | CTA principal |
|---|---|---|---|
| Diseño de experiencia AI Native | `/servicios/diseno-ai-native/` | Desktop `199:1346`, mobile `202:1546` | Cal.com y `/diagnostico/` |
| Design System AI Ready | `/servicios/design-systems-ia/` | Desktop `187:1640`, sin mobile | `/diagnostico/` |

Las dos URLs son nuevas, así que no se rompe ninguna existente (decisions.md, 2026-11-02).

## Mapa de palabras clave

Son hipótesis sin datos de volumen (spec 15, punto 9).

| Página | Intención principal | Secundarias |
|---|---|---|
| Diseño AI Native | diseño de experiencia AI Native | diseño de producto con IA, prototipos en código, AI native product design |
| Design System AI Ready | design system con IA | design system AI ready, design tokens, reglas para agentes de IA |

## Diseño

- Plantilla, componentes y tokens de la página de diagnóstico UX (`/servicios/investigacion/`, `public/service.css`).
- **Animaciones:** las estándar de las páginas de servicio, en JavaScript vanilla y sin GSAP:
  - `headings.js`: el título, el lead y los encabezados de cada sección suben al entrar en pantalla.
  - `situations.js`: las tarjetas, listas y filas de tabla aparecen una a una con el scroll.
  - `deliverables.js`: el símbolo recorre la línea de "Qué recibes" y enciende cada entregable.
  - `audience.js`: en "Para quién" de AI Native, la columna izquierda queda fija y las situaciones de la derecha se abren una a una con el scroll. En mobile o sin JavaScript se ven todas abiertas.
  - Hovers de links y tarjetas.
  - Con `prefers-reduced-motion`, todo queda fijo, y sin JavaScript todo se ve.
- **Mobile:** AI Native sigue el frame `202:1546`. Design System AI Ready no tiene frame mobile y usa los mismos patrones responsive.

## Criterios de aceptación

1. Dadas las dos URLs, cuando se abren en el build, entonces responden 200.
2. Dada cada página, entonces tiene un único `<h1>`, `title` y description propios, canonical, OG e `index, follow`.
3. Dada cada página, entonces tiene JSON-LD de `Service`, `BreadcrumbList` y `FAQPage`, con las mismas preguntas que se ven en pantalla.
4. Dada cada página, entonces aparece en el sitemap.
5. Dada la home, entonces "AI Native Product Design", "Clic para descubrir" y la fila "Product design para escalar y crecer tu MVP" llevan a Diseño AI Native. "Design system AI ready" y la fila "Diseño de interfaz (UI) para atrapar a tus usuarios" llevan a Design System AI Ready. "Research y diagnóstico UX" lleva al diagnóstico y "Rescatamos tu MVP hecho con IA" lleva a AI MVP Rescue.
5b. Dada la navegación principal, entonces "Servicios" reemplaza a "AI MVP Rescue" y abre un menú con los cuatro servicios: con clic, con hover o con el teclado, y sin JavaScript con hover y foco. Se cierra con Escape o con un clic afuera, y marca el servicio actual. En mobile, los servicios aparecen como un grupo del menú.
6. Dado el footer, entonces enlaza las dos páginas.
7. Dada cada página de servicio (diagnóstico, AI MVP Rescue, AI Native y Design System), entonces "Otros servicios" enlaza a las demás que existen.
8. Dado el build, entonces ningún link agregado por esta spec da 404.
9. Dado un CTA, entonces tiene `data-track` con un id propio. Los que van a `/diagnostico/` llevan `?cta=<id>`.
10. Dado el texto visible, entonces usa español estándar, primera persona plural y "equipo reducido de diseñadores senior". No dice "una sola persona".
11. Dados un viewport de 1440 px y uno de 375 px, entonces no hay scroll horizontal.
12. Dado JavaScript desactivado, entonces el contenido, las preguntas y los links se pueden usar.

## Decisiones de contenido (aprobadas por Luis, 2026-11-11)

- URLs: `/servicios/diseno-ai-native/` y `/servicios/design-systems-ia/`.
- El CTA de Design System lleva al formulario general de `/diagnostico/`, con `cta=design_system_*`.
- Se aprueban las respuestas del FAQ de Design System y el copy de "Para quién" de AI Native.
- Se aprueban las tarjetas de Mutis UX (lleva a la landing `/mutisux/`, no al login) y SAKURA 64 (lleva a `sakura64.uxuaria.com`).
- La cifra +150K de Monge Pay se describe como "Usuarios activos" en todo el sitio, igual que la nota de prensa.
- "Empecemos ahora" lleva a Cal.com.
- Disney Telecom queda fuera del portafolio y su URL redirige a `/portafolio/`.
- Redirects 301 de las páginas viejas: `/servicios/` → `/#servicios`, `/servicios/mvp/` → AI Native, `/servicios/experiencia/` → Design System, `/servicios/crecimiento/` → diagnóstico UX.

## Pendiente

- Los artículos de Design System que muestra Figma y todavía no existen ("¿Qué es un design system AI ready?" y "Design tokens: guía para equipos de producto"). Por ahora solo se muestran artículos publicados.

## Dónde vive

- `src/pages/servicios/diseno-ai-native/index.astro`
- `src/pages/servicios/design-systems-ia/index.astro`
- `public/service.css` (secciones nuevas), `public/situations.js` y `public/deliverables.js` (generalizados)
- `src/components/ArrowLink.astro` y `src/components/ClosingCta.astro` (props nuevas)
- `src/lib/services.ts`: listado único de servicios que usan `Navbar`, `Footer`, la home y "Otros servicios"
- `src/components/Navbar.astro` y `public/site.css`: menú de Servicios
- Links: `src/pages/index.astro`, `src/components/Footer.astro`, `src/pages/servicios/investigacion/index.astro`, `src/pages/ai-mvp-rescue.astro`
