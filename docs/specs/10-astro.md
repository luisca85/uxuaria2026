# 10 — Migración del sitio a Astro

**id:** `astro`
**Estado:** 🧪 Instalación de prueba en la rama `astro` · hecho: Astro 7 (Node 24, `.nvmrc`), layout, navbar, footer y blog completo (6 artículos en `src/content/blog/`, texto idéntico al sitio actual) · pendiente: home (hoy es un placeholder), servicios, portafolio, contacto, diagnóstico, 404, `ai-mvp-rescue.html` y `lupaux/` en `public/`, sitemap con el nombre actual, CTA propio del artículo del 26 de octubre · después de esto viene el rediseño
**Última actualización:** 2026-11-02
**Relacionada con:** 00-overview, 01-design-system, 02-portfolio, 06-blog, `docs/architecture.md`

---

## Historia de usuario

**Como** Luis, que escribe en el blog y publica sus proyectos,
**quiero** agregar un artículo o un caso de estudio escribiendo un solo archivo de texto (Markdown) con sus imágenes,
**para** publicar más seguido sin copiar y pegar navbar, footer, metadatos y JSON-LD a mano en cada HTML.

## Objetivo

Pasar uxuaria.com de HTML suelto a **Astro**, sin cambiar lo que ve el visitante: mismo diseño, mismo copy y mismas URLs. El cambio es de "cómo se construye", no de "cómo se ve". El rediseño (si lo hay) viene después, sobre esta base, con su propia spec.

Métrica de éxito: publicar un artículo nuevo = crear `src/content/blog/<slug>.md` + sus imágenes + push. Nada más.

---

## Decisiones propuestas

| Tema | Propuesta | Por qué |
|---|---|---|
| Alcance | Migración 1:1 primero, rediseño después | Separa el riesgo técnico del de diseño/copy; el hero, testimonios y métricas no se tocan (CLAUDE.md) |
| Dónde | Rama `astro` en este repo | `main` sigue en producción hasta el corte; el historial queda junto |
| Render | Estático (SSG), sin adapter | El sitio no necesita servidor; Astro manda 0 JS por defecto |
| APIs | `functions/api/*` quedan como Pages Functions, sin cambios | Ya funcionan; Cloudflare Pages las sigue tomando desde la raíz del repo |
| Blog y portafolio | Content collections en Markdown con frontmatter validado (Zod) | Es el objetivo central: escribir contenido, no HTML |
| Estilos | `styles.css` se importa tal cual en el layout; BEM y tokens en `:root` se mantienen | 1:1 visual; se puede ir partiendo por componente después |
| URLs | `build.format: 'preserve'` | `blog/metodo-harada.astro` → `/blog/metodo-harada`, `servicios/mvp/index.astro` → `/servicios/mvp/`, igual que hoy |

## Estructura objetivo

```
src/
├── layouts/
│   ├── BaseLayout.astro       # <head> (GA4, favicons, fuentes, SEO, OG), navbar, footer, script.js
│   ├── ArticleLayout.astro    # artículo de blog + JSON-LD Article
│   └── CaseLayout.astro       # caso de estudio + JSON-LD
├── components/                # Navbar, Footer, StickyCta, BlogCard, CaseCard, Seo…
├── content/
│   ├── blog/<slug>.md         # frontmatter: title, description, pubDate, cover, featured…
│   └── portfolio/<slug>.md    # frontmatter: client, year, tagline, cover, order…
├── content.config.ts          # esquemas de las colecciones
└── pages/
    ├── index.astro
    ├── blog.astro             # listado (card destacada = featured o la más reciente)
    ├── blog/[slug].astro
    ├── portafolio/[slug].astro
    ├── servicios/…            # index + 4 páginas
    ├── contacto/index.astro
    ├── diagnostico/…
    └── 404.astro
public/                        # images/, favicons, robots.txt, _redirects, _headers,
                               # styles.css, script.js, ai-mvp-rescue.html y lupaux/ (ver Fase 1)
functions/api/                 # sin cambios
```

## Fases

1. **Base** — `npm create astro`, `astro.config.mjs` (site `https://uxuaria.com`, `build.format: 'preserve'`, `@astrojs/sitemap`), `BaseLayout`, Navbar y Footer. `ai-mvp-rescue.html` y `lupaux/` se copian a `public/` sin tocar (son autocontenidas). `_redirects`, `_headers`, `robots.txt` e `images/` pasan a `public/`.
2. **Blog** — colección `blog`, los 6 artículos pasados a Markdown, `blog.astro` y `blog/[slug].astro`. Es la fase que más rinde para el objetivo.
3. **Portafolio** — colección `portfolio` con los 7 casos y el carrusel de la home leyendo la colección (mismo orden que hoy; cambiar el orden sigue necesitando spec 02).
4. **Resto de páginas** — servicios, contacto, diagnóstico y 404 como `.astro`, con el mismo HTML. La home no se migra 1:1: se construye directo con la spec 11-home (decisions.md, 2026-11-02).
5. **Corte** — en Cloudflare Pages: build command `npm run build`, output `dist`, `NODE_VERSION` fijada. Preview de la rama antes de mergear a `main`.

## Criterios de aceptación

1. Dada cualquier URL del `sitemap.xml` actual, cuando se abre en el preview de la rama, entonces responde 200 con el mismo contenido visible.
2. Dados los redirects de `_redirects`, entonces siguen respondiendo 301 al mismo destino.
3. Dada una página migrada, entonces su `<title>`, meta description, canonical, OG y JSON-LD son iguales a los de hoy.
4. Dado un archivo nuevo `src/content/blog/x.md` con frontmatter válido, cuando se hace build, entonces aparece en `/blog/x`, en el listado del blog y en el sitemap, sin tocar otro archivo.
5. Dado un frontmatter sin un campo obligatorio (title, description, pubDate), cuando se hace build, entonces el build falla con un error claro.
6. Dado `/api/diagnostico` y `/api/lupaux-beta`, entonces funcionan igual en el preview.
7. Dado JS desactivado, entonces el sitio funciona igual que hoy (mismas excepciones: `/diagnostico/`).
8. Lighthouse de home y de un artículo: igual o mejor que el sitio actual.

## Fuera de alcance / No tocar

- Copy del hero, testimonios, métricas del proof bar, email y redes (CLAUDE.md).
- Orden y lista de proyectos del portafolio (spec 02).
- Rediseño visual: se hace en otra spec cuando la base esté en producción.
- Migrar `ai-mvp-rescue.html` y `lupaux/` a componentes: quedan como archivos estáticos por ahora.

## Cambios en documentación al cerrar

- `CLAUDE.md`: stack (Astro, `npm run build`, ya no "sin build step ni node_modules") y estructura de archivos.
- `docs/architecture.md` y `docs/decisions.md`: la decisión 2026-06-10 ("sin frameworks ni build") queda reemplazada.
- `docs/specs/06-blog.md`: cómo publicar un artículo nuevo.

## Preguntas abiertas

- ¿Los artículos necesitan componentes dentro del texto (galerías, callouts, embeds)? Si sí, se usa MDX en vez de Markdown.
- ¿Querés RSS del blog (`/rss.xml`) para el boletín? Es una línea con `@astrojs/rss`.
- Antes de crear la rama hay trabajo sin commitear en `main` (lupaux, recursos, sitemap): conviene commitearlo primero.
