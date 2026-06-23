# 00 — Estado actual del proyecto

**Última actualización:** 2026-06-22  
**Archivos principales:** `index.html` (~870 líneas), `styles.css`, `script.js`  
**Estado general:** Sitio en producción con múltiples páginas activas. Homepage con hero retro, UX Vision Strip, portafolio de 6 proyectos en carrusel + 1 destacado, sección AI MVP Rescue, testimonios, About, CTA final. Páginas de servicios implementadas. Blog con 2 artículos. Contacto implementado. 7 páginas de portafolio individuales. Landing page `ai-mvp-rescue.html`.

---

## Estructura de archivos del sitio

```
website/
├── index.html                    # Homepage principal
├── ai-mvp-rescue.html            # Landing page para ads (noindex)
├── blog.html                     # Listado del blog
├── styles.css                    # Todos los estilos del sitio
├── script.js                     # Lógica de UI (carruseles, hamburger, modal, etc.)
├── blog/
│   ├── 3-cosas-ux.html           # Artículo 1
│   └── 6-preguntas-ux.html       # Artículo 2
├── contacto/
│   └── index.html                # Página de contacto (implementada)
├── servicios/
│   ├── index.html                # Listado de servicios
│   ├── servicios.css             # Estilos específicos de servicios
│   ├── investigacion/index.html
│   ├── mvp/index.html
│   ├── experiencia/index.html
│   └── crecimiento/index.html
├── portafolio/
│   ├── monge-pay.html            # ✅ Implementado
│   ├── disney-telecom.html       # ✅ Implementado
│   ├── striano.html              # ✅ Implementado
│   ├── we-link.html              # ✅ Implementado
│   ├── ves.html                  # ✅ Implementado (Virtual Event Services)
│   ├── fans-ai.html              # ✅ Implementado
│   └── greenify.html             # ✅ Implementado
├── images/
│   ├── logos/                    # Logos de clientes para clients bar
│   ├── testimonials/             # Fotos de testimonios
│   ├── blog/                     # Imágenes de artículos
│   ├── services/                 # Imágenes de páginas de servicios
│   └── portfolio/
│       ├── mongepay/             # 4 imágenes + @2x
│       ├── disney-telecom/       # Frame 5567.png
│       ├── Striano/
│       ├── Welink/
│       ├── VES/
│       ├── Fans.ia/
│       ├── greenify/
│       ├── Dineflows/            # Imágenes disponibles, proyecto no en carrusel
│       ├── TSG/                  # Imágenes disponibles, proyecto no en carrusel
│       ├── WEEZY/                # Imágenes disponibles, proyecto no en carrusel
│       └── mymed/                # Imágenes disponibles, proyecto no en carrusel
└── docs/
    └── specs/                    # Esta carpeta
```

---

## Secciones de la homepage — estado actual (orden de aparición)

| # | Sección | ID | Estado | Descripción |
|---|---|---|---|---|
| 1 | Navbar | `#navbar` | ✅ Completo | Fijo, blur glassmorphism. Links: Servicios · AI MVP Rescue · Blog · Contacto. Sin toggle EN en navbar (solo en footer). |
| 2 | Hero | — | ✅ Completo | Diseño retro UI dos columnas (44% copy / 56% art). Fuentes Silkscreen + Press Start 2P. 6 ventanas flotantes. CTAs: Calendly + #portafolio. |
| 3 | Clients Bar | — | ✅ Completo | Fondo `#0A0A0A`. 5 logos: mongepay, strianno, greenify (invert), poy (sm), Personal. Marquee 32s infinito. |
| 4 | UX Vision Strip | `#ux-vision` | ✅ Completo | Sección de dos columnas: copy "Tu problema de crecimiento es un problema de diseño" + 2 stat cards (15+ años / +150K usuarios Monge Pay). CTA → `servicios/index.html`. |
| 5 | Portafolio | `#portafolio` | ✅ Completo | Proyecto destacado (Monge Pay) + carrusel horizontal de 6 proyectos. Todas las flechas ↗ apuntan a páginas individuales implementadas. |
| 6 | AI MVP Rescue | `#ux-checkup` | ✅ Completo | Sección lead-gen. Mock visual "AI_MVP_RESCUE: HALLAZGOS.PDF". CTA → `ai-mvp-rescue.html`. Scarcity tag "Queda 1 cupo de 2 este mes". |
| 7 | Testimonios | `#testimonios` | ✅ Completo | 3 testimonios: Flavio Strianese (CEO Striano), Ireland Bender (Weezie Towels), Walter Aguilar Barahona (Director DeOper). Fotos: flavio-strianese.png, walter-aguilar.png (fallback gradiente para Ireland). |
| 8 | Sobre mí | `#sobre-mi` | ✅ Completo | Texto real en dos párrafos. Segunda columna visual eliminada. CTAs: Calendly (primario) + #portafolio (outline). |
| 9 | CTA Final | `#contacto` | ✅ Completo | Fondo oscuro. CTA principal: Calendly. Secondary link: `ai-mvp-rescue.html`. Badge "Cupos limitados este trimestre". |
| 10 | Footer | — | ✅ Completo | LinkedIn real. © 2020–2026. Columna Servicios lista "AI MVP Rescue". Toggle idioma en footer (visual, sin lógica). |
| 11 | Sticky CTA | — | ✅ Completo | Botón "▶ Agendá una llamada" fijo en mobile, apunta a Calendly. |
| 12 | Modal Checkup | `#checkup-modal` | ✅ Completo | Modal con dos vistas: info + Typeform iframe (lazy-load). Clases `.ckm-*`. Se abre desde el botón "Aplicar al UX Checkup" — actualmente ese botón no aparece en el HTML principal (el CTA de la sección apunta a `ai-mvp-rescue.html`). |

---

## Navbar — links actuales

```html
<a href="servicios/index.html">Servicios</a>
<a href="ai-mvp-rescue.html">AI MVP Rescue</a>
<a href="blog.html">Blog</a>
<a href="contacto/index.html">Contacto</a>
```

No hay "Sobre mí" ni "EN" en el navbar. El toggle de idioma está solo en el footer (sin lógica real).

---

## CTAs — destinos actuales

| Ubicación | Label | Destino |
|---|---|---|
| Hero (primario) | Agendá una llamada gratuita | `https://calendly.com/luisca85/charla-introductoria-clone` |
| Hero (secundario) | Ver proyectos | `#portafolio` |
| UX Vision | Ver servicios | `servicios/index.html` |
| AI MVP Rescue | Rescatá tu MVP ahora | `ai-mvp-rescue.html` |
| About (primario) | ▶ Agendá una llamada | Calendly |
| About (secundario) | Ver proyectos | `#portafolio` |
| CTA Final (primario) | ▶ Agendá una llamada | Calendly |
| CTA Final (link) | Conocé AI MVP Rescue → | `ai-mvp-rescue.html` |
| Sticky (mobile) | ▶ Agendá una llamada | Calendly |

**Nota:** Se usaba `mailto:info@uxuaria.com` en las versiones anteriores. Todos los CTAs principales ahora usan Calendly.

---

## Portafolio — inventario actual

### Proyecto destacado

| Campo | Valor |
|---|---|
| Proyecto | Monge Pay |
| Tagline 1 | DE CERO A +150K USUARIOS: LA PLATAFORMA FINTECH MÁS GRANDE DE COSTA RICA |
| Número | +300% (animado) |
| Contexto | crecimiento de usuarios · 2025 |
| Carrusel | 4 imágenes: mongepay_presentation 1.png, mongepay-desktop.png, mongepay.png, mongepay_presentation.png |
| Link ↗ | `portafolio/monge-pay.html` ✅ |

### Carrusel — 6 proyectos (en orden)

| # | Proyecto | Dato ganador | Tag | Imagen | Link |
|---|---|---|---|---|---|
| 1 | Disney+ Telecom Argentina | DISEÑANDO LA ACTIVACIÓN DE DISNEY+ PARA CLIENTES DE TELECOM | Telecom · Streaming · In-house · 2023 | `disney-telecom/Frame 5567.png` | `portafolio/disney-telecom.html` ✅ |
| 2 | Striano | UNA SOFTWARE FACTORY CON IDENTIDAD PROPIA PARA EL MERCADO NORTEAMERICANO | Software Factory · UI/UX · USA · 2022 | `Striano/striano.png` | `portafolio/striano.html` ✅ |
| 3 | WeLink | 130.000 VISITANTES, DOS AUDIENCIAS OPUESTAS UNA SOLA HOME PAGE | Marketplace · Two-sided Platform · Europa · 2023 | `Welink/Frame 147.png` | `portafolio/we-link.html` ✅ |
| 4 | Virtual Event Services | +100 EVENTOS HOSPEDADOS, UNA PLATAFORMA QUE DISEÑAMOS DESDE CERO | Enterprise · Pharma · Plataforma digital · 2022 | `VES/Events-services.png` | `portafolio/ves.html` ✅ |
| 5 | Fans.ai | (ver HTML) | Social · IA · 2023 | `Fans.ia/fans-ia.png` | `portafolio/fans-ai.html` ✅ |
| 6 | Greenify | (ver HTML) | (ver HTML) | `greenify/` | `portafolio/greenify.html` ✅ |

**Proyectos con imágenes disponibles pero NO en el carrusel:** Dineflows, TSG, Weezy Towels, MyMed.

---

## Otras páginas

| Página | Estado | Notas |
|---|---|---|
| `ai-mvp-rescue.html` | ✅ Implementada | Landing page para ads. `noindex`. CSS embebido (no usa styles.css). Tokens espejados del sitio principal. Usa ochre (`#D9A441`) como acento. |
| `contacto/index.html` | ✅ Implementada | Formulario de contacto. Ver spec `04-contact-page.md`. |
| `servicios/index.html` | ✅ Implementada | 4 bloques horizontales con parallax. |
| `servicios/investigacion/index.html` | ✅ Implementada | |
| `servicios/mvp/index.html` | ✅ Implementada | |
| `servicios/experiencia/index.html` | ✅ Implementada | |
| `servicios/crecimiento/index.html` | ✅ Implementada | |
| `blog.html` | ✅ Implementada | Listado con card destacada + grid. Ver `06-blog.md`. |
| `blog/3-cosas-ux.html` | ✅ Implementada | |
| `blog/6-preguntas-ux.html` | ✅ Implementada | |

---

## Specs del proyecto

| Archivo | Contenido |
|---|---|
| `00-overview.md` | Este archivo — estado general, estructura, secciones, CTAs |
| `01-design-system.md` | Tokens CSS, tipografía, colores, componentes, animaciones |
| `02-portfolio.md` | Sección homepage + páginas individuales + inventario de proyectos |
| `03-content.md` | Copy definitivo de todas las secciones de `index.html` |
| `04-contact-page.md` | Página `contacto/index.html` — layout, formulario, Calendly |
| `05-rescue-service.md` | Landing `ai-mvp-rescue.html` + sección `#ux-checkup` + modal |
| `06-blog.md` | Blog `blog.html` + artículos + template de página de artículo |

---

## Deuda técnica abierta

- [ ] **og:image** — imagen 1200×630 px para previsualizaciones sociales
- [ ] **Favicon** — `<link rel="icon">` no configurado
- [ ] **Google Analytics** — GA4 comentado en `ai-mvp-rescue.html`; sin implementar en el resto
- [ ] **Instagram** — Handle no confirmado, ícono no agregado al footer
- [ ] **Toggle EN** — presente en footer, sin lógica de i18n real
- [ ] **Sitemap** — 7 páginas de portafolio y sub-páginas de servicios no están en `sitemap.xml`

---

## Issues abiertas

| # | Issue | Urgencia |
|---|---|---|
| I-1 | Modal `#checkup-modal` existe en HTML pero no hay botón visible que lo abra en la sección actual (la sección AI MVP Rescue apunta a `ai-mvp-rescue.html`, no al modal) | 🟡 Decisión de arquitectura |
| I-2 | Footer — columna Servicios usa `#servicios` como anchor (apunta a la sección en homepage), no a `servicios/index.html` | 🟢 Nice-to-have |
| I-3 | `docs/claude-code-review-checkup-modal.md` es un prompt de revisión para Claude, no un spec de diseño — debería moverse o eliminarse | 🟢 Limpieza |

---

## Changelog

> Solo se registra a partir de 2026-06-22. El changelog detallado previo está conservado en git.

### Antes de 2026-06-22 (resumen del historial)
- Hero retro UI dos columnas (Silkscreen + Press Start 2P)
- Clients bar con 5 logos y marquee
- Portafolio rediseñado: proyecto destacado + carrusel
- UX Vision Strip agregada (stats: 15+ años, +150K usuarios)
- AI MVP Rescue: reemplazo del UX Checkup como sección de lead-gen
- `ai-mvp-rescue.html`: landing page autónoma para ads
- Portafolio: 7 páginas individuales implementadas
- CTAs migrados de `mailto:` a Calendly
- Navbar actualizado: Servicios · AI MVP Rescue · Blog · Contacto
- `contacto/index.html` implementada
- Blog: `blog.html` + 2 artículos
- Servicios: 5 páginas implementadas
