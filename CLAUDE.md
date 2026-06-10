# Uxuaria — Guía de proyecto para Claude

## Descripción del proyecto

Sitio web principal de **Uxuaria**, el estudio/práctica freelance de **Luis Carlos Romero León**, UX Designer con base en Argentina.  
URL de producción: **uxuaria.com**  
Propósito: página de captación de clientes para servicios de Experience Design dirigidos a empresas en crecimiento de Latinoamérica.

---

## Stack técnico

| Capa | Tecnología |
|---|---|
| Markup | HTML5 semántico, sin frameworks |
| Estilos | CSS3 vanilla con custom properties (variables en `:root`) |
| Scripts | JavaScript vanilla (ES6+), sin bundler |
| Fuentes | Google Fonts — Inter (300, 400, 500, 600, 700) |
| Deploy | **Cloudflare Pages** (rama `main` → producción) |
| Assets | Imágenes estáticas en `/assets/` (por definir) |

No hay build step, no hay node_modules, no hay frameworks de JS. Un push a `main` es un deploy.

---

## Convenciones de código

### CSS — metodología BEM

Todos los nombres de clase siguen la convención **BEM**: `bloque__elemento--modificador`.

```css
/* CORRECTO */
.service-card { }
.service-card__title { }
.service-card__list { }
.service-card--highlighted { }

/* INCORRECTO — no agregar */
.serviceCardTitle { }
.service_card { }
.cardTitle { }
```

Las clases de utilidad globales (`.container`, `.btn`, `.section-title`) son la excepción: no llevan bloque porque son helpers de layout.

### Variables CSS

Todos los colores, sombras, radios y tipografía **deben declararse en `:root`** antes de usarse. Prohibido hardcodear valores visuales fuera de `:root`.  
Archivo: `styles.css`, líneas 4–27.

### Idioma del código

- **Copy / texto visible al usuario** → español (es-CR como locale base)
- **Código** (clases CSS, IDs, variables JS, comentarios de código) → inglés
- **Comentarios de sección en CSS/HTML** → inglés o español, consistente dentro del archivo

### HTML

- Usar elementos semánticos: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`, `<blockquote>`.
- Cada sección debe tener un `id` descriptivo en inglés si es ancla de navegación, en español si es ancla visible en la URL (ej: `#portafolio`, `#sobre-mi`).
- Atributos `alt` en todas las `<img>`. Atributos `aria-label` en iconos sin texto.

### JavaScript

- Sin librerías externas. Vanilla ES6+.
- El script se carga al final del `<body>` (no `defer`, no módulos).
- Progressive enhancement: el sitio debe ser funcional sin JS activado.

---

## Estructura de archivos

```
website/
├── index.html          # Única página (single-page)
├── styles.css          # Todos los estilos
├── script.js           # Toda la lógica de UI
├── images/
│   └── portfolio/      # Screenshots de proyectos del portafolio
│       ├── dineflows-1.png
│       ├── fans-ia.png
│       ├── mongepay.png
│       ├── striano.png
│       ├── weezy-towels.png
│       ├── tsg-presentation.png
│       ├── Events-services.png
│       └── ...         # Archivos adicionales por proyecto
├── docs/
│   └── specs/          # Especificaciones de cada sección/feature
│       ├── 00-overview.md
│       └── ...
└── CLAUDE.md           # Este archivo
```

---

## Lo que NO se debe tocar sin un spec aprobado

Los siguientes elementos **requieren aprobación explícita del cliente** antes de modificarse:

1. **Copy del hero** — El título, subtítulo y badge de urgencia son el mensaje central de conversión. Cualquier cambio de copy necesita revisión.
2. **Lista de proyectos del portafolio** — Agregar, quitar o reordenar proyectos afecta la narrativa de experiencia. Requiere spec `01-portfolio.md`.
3. **Testimonios** — Nombres, roles y citas deben ser aprobados por las personas mencionadas. No inventar ni cambiar sin autorización.
4. **Links a redes sociales** — URL de Instagram y LinkedIn deben ser provistas por el cliente, no inferidas.
5. **Email de contacto** — `info@uxuaria.com` es el email de contacto oficial. Confirmado por el cliente (2026-05-27). No cambiar sin confirmación explícita.
6. **Color brand** — La variable `--color-highlight: #C8F135` está reservada como posible color de acento. No aplicar a producción sin decisión de diseño aprobada.
7. **Métricas del proof bar** — "8+", "4+", "100%", "CR → MX" son afirmaciones públicas. Cambiarlas tiene implicancias de credibilidad.

---

## Flujo de trabajo esperado

1. Toda nueva sección o cambio estructural → crear spec en `docs/specs/`.
2. Claude lee el spec antes de modificar código.
3. Claude no modifica código de app sin spec o instrucción explícita del cliente en el chat.
4. Los archivos `docs/specs/*.md` son el contrato de verdad para cada feature.
