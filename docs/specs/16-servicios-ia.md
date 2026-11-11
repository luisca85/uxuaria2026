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
  - Hovers de links y tarjetas.
  - Con `prefers-reduced-motion`, todo queda fijo, y sin JavaScript todo se ve.
- **Mobile:** AI Native sigue el frame `202:1546`. Design System AI Ready no tiene frame mobile y usa los mismos patrones responsive.

## Criterios de aceptación

1. Dadas las dos URLs, cuando se abren en el build, entonces responden 200.
2. Dada cada página, entonces tiene un único `<h1>`, `title` y description propios, canonical, OG e `index, follow`.
3. Dada cada página, entonces tiene JSON-LD de `Service`, `BreadcrumbList` y `FAQPage`, con las mismas preguntas que se ven en pantalla.
4. Dada cada página, entonces aparece en el sitemap.
5. Dada la home, entonces "AI Native Product Design" y "Clic para descubrir" llevan a Diseño AI Native, y "Design system AI ready" lleva a Design System AI Ready.
6. Dado el footer, entonces enlaza las dos páginas.
7. Dada cada página de servicio (diagnóstico, AI MVP Rescue, AI Native y Design System), entonces "Otros servicios" enlaza a las demás que existen.
8. Dado el build, entonces ningún link agregado por esta spec da 404.
9. Dado un CTA, entonces tiene `data-track` con un id propio. Los que van a `/diagnostico/` llevan `?cta=<id>`.
10. Dado el texto visible, entonces usa español estándar, primera persona plural y "equipo reducido de diseñadores senior". No dice "una sola persona".
11. Dados un viewport de 1440 px y uno de 375 px, entonces no hay scroll horizontal.
12. Dado JavaScript desactivado, entonces el contenido, las preguntas y los links se pueden usar.

## A CONFIRMAR

1. **URLs.** `/servicios/diseno-ai-native/` y `/servicios/design-systems-ia/`.
2. **CTA de Design System.** "Solicita tu diagnóstico gratis" lleva al funnel general de `/diagnostico/`, que hoy está pensado para productos y no para sistemas de diseño.
3. **FAQ de Design System.** Figma solo trae la respuesta de la primera pregunta. Las otras cuatro son una propuesta armada con el contenido de la propia página.
4. **Artículos relacionados de Design System.** Dos de los tres de Figma ("¿Qué es un design system AI ready?" y "Design tokens: guía para equipos de producto") no existen. Se muestran solo artículos publicados.
5. **Links de agenda y diagnóstico en AI Native.** "Agenda" va a Cal.com y "Pide tu diagnóstico" va a `/diagnostico/`.

## Dónde vive

- `src/pages/servicios/diseno-ai-native/index.astro`
- `src/pages/servicios/design-systems-ia/index.astro`
- `public/service.css` (secciones nuevas), `public/situations.js` y `public/deliverables.js` (generalizados)
- `src/components/ArrowLink.astro` y `src/components/ClosingCta.astro` (props nuevas)
- Links: `src/pages/index.astro`, `src/components/Footer.astro`, `src/pages/servicios/investigacion/index.astro`, `src/pages/ai-mvp-rescue.astro`
