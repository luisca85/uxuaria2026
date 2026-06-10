# 02 — Design Tokens

**Generado a partir de:** `styles.css` (767 líneas, auditado 2026-05-27)  
**Estado:** Spec de referencia. No modifica `styles.css` todavía.  
**Próximo paso:** Implementar en `03-tokens-implementation.md` (pendiente).

---

## 1. Colores actuales

### 1a. Variables declaradas en `:root`

| Variable | Valor | ¿Se usa? | Observación |
|---|---|---|---|
| `--color-bg` | `#FFFFFF` | ✅ Sí | Color de fondo principal. Correcto. |
| `--color-surface` | `#F7F7F5` | ✅ Sí | Fondo de secciones alternas (services, testimonials). |
| `--color-border` | `#E8E8E4` | ✅ Sí | Bordes de cards, separadores. |
| `--color-text` | `#111111` | ✅ Sí | Texto principal y también fondo de botones primarios y la sección CTA. |
| `--color-text-muted` | `#666666` | ✅ Sí | Subtextos, descripciones, labels. |
| `--color-text-light` | `#999999` | ✅ Sí | Solo en el bullet de las listas de servicios. |
| `--color-accent` | `#1A1A1A` | ❌ Nunca | Declarada pero sin ningún uso en el CSS. Huérfana. |
| `--color-accent-hover` | `#333333` | ❌ Nunca | Declarada pero sin uso. El hover de btn--primary usa `#333` hardcodeado — mismo valor, no usa la variable. |
| `--color-tag-bg` | `#F0F0EE` | ❌ Nunca | Declarada pero sin uso. `.btn--white:hover` usa `#f0f0f0` en su lugar. |
| `--color-cta-bg` | `#111111` | ❌ Nunca | Declarada pero sin uso. La sección CTA usa `var(--color-text)` directamente (mismo valor). |
| `--color-cta-text` | `#FFFFFF` | ❌ Nunca | Declarada pero sin uso. Los elementos CTA usan `white` literal. |
| `--color-highlight` | `#C8F135` | ❌ Nunca | Verde-lima reservado como posible acento de marca. Sin decisión tomada. |

**5 de 12 variables declaradas en `:root` nunca se usan.** Las variables con `--color-text` y `--color-cta-bg` tienen el mismo valor (`#111111`) — están duplicadas.

---

### 1b. Colores hardcodeados fuera de `:root`

Estos valores aparecen directamente en selectores, sin pasar por variables:

| Valor hex / rgba | Dónde aparece | Variable propuesta |
|---|---|---|
| `#22c55e` | `.badge-dot` — punto verde del badge de urgencia | `--color-status-active` |
| `#86efac` | `.badge-dot--light` — anillo exterior del pulse | `--color-status-active-light` |
| `#FAFAF8` | `.service-card:hover` — fondo hover de tarjeta | `--color-surface-hover` |
| `#f0f0f0` | `.btn--white:hover` — fondo hover de botón blanco | `--color-bg-subtle` |
| `#333` | `.btn--primary:hover` — fondo hover de botón primario | `--color-text-hover` |
| `#F59E0B` | `.testimonial-card__stars` — color estrellas | `--color-stars` |
| `#0A0A0A` | `.footer` — fondo del footer | `--color-bg-dark` |
| `rgba(255,255,255,.92)` | `.navbar` — fondo glassmorphism | `--color-nav-bg` |
| `rgba(255,255,255,.1/.15)` | `.cta-section__badge` — fondo y borde | `--color-white-10`, `--color-white-15` |
| `rgba(255,255,255,.65/.7)` | `.cta-section__desc`, badge text | `--color-white-65`, `--color-white-70` |
| `rgba(255,255,255,.45)` | `.footer__tagline` | `--color-white-45` |
| `rgba(255,255,255,.06/.1)` | `.social-link` — fondo y borde | `--color-white-06`, `--color-white-10` |
| `rgba(255,255,255,.12)` | `.social-link:hover` | `--color-white-12` |
| `rgba(255,255,255,.4/.55)` | Columnas del footer | `--color-white-40`, `--color-white-55` |
| `rgba(255,255,255,.08)` | `.footer__bottom` borde | `--color-white-08` |
| `rgba(255,255,255,.3)` | `.footer__bottom` copyright | `--color-white-30` |

> **Nota sobre los `rgba(255,255,255,X)`:** Hay 10 valores distintos de opacidad blanca para el área oscura (footer + CTA). Consolidarlos todos como variables hace el código más claro y permite cambiar el tono oscuro de fondo sin tocar 15 selectores.

---

### 1c. Gradientes placeholder (reemplazar con imágenes reales)

Los siguientes gradientes son decorativos temporales. No necesitan convertirse en tokens — simplemente se eliminan cuando se carguen las imágenes reales del portafolio:

```css
/* project-card: 8 gradientes de colores */
.project-card__image--1  { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
/* ... --2 al --8 */

/* author-avatar: 3 gradientes */
.author-avatar--1  { background: linear-gradient(135deg, #667eea, #764ba2); }
/* ... --2, --3 */
```

---

## 2. Tipografía

### 2a. Familia y pesos

| Elemento | Propiedad | Valor |
|---|---|---|
| Font family principal | `var(--font)` | `'Inter'`, con fallback `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| Pesos usados | `font-weight` | `500`, `600`, `700` |
| Smoothing | `-webkit-font-smoothing` | `antialiased` — solo en `body` |

Solo hay una familia tipográfica. La variable `--font` está bien definida y se usa correctamente en `body` y `.btn`.

---

### 2b. Escala de tamaños

| Nombre semántico | Valor actual | Dónde se usa |
|---|---|---|
| `xs` | `12px` | Eyebrow, nav lang toggle, footer col titles |
| `sm` | `13px` | Badge text, proof label, service list items, author role, footer bottom |
| `base` | `14px` | Botones, nav links, project card desc, footer col links |
| `md` | `15px` | Btn--lg, service card desc, testimonial quote, mobile nav links |
| `lg` | `16px` | Section desc, about text, CTA desc |
| `xl` | `17px` | `.project-card__title` — **valor atípico, no encaja en la escala** |
| `2xl` | `18px` | Hero subtitle |
| `3xl` | `20px` | Logo text, service card title |
| `4xl` | `28px` | Proof number |
| `display-sm` | `clamp(28px, 4vw, 40px)` | Section titles (servicios, portafolio, etc.) |
| `display-md` | `clamp(32px, 4vw, 48px)` | About title |
| `display-lg` | `clamp(32px, 5vw, 52px)` | CTA section title |
| `display-xl` | `clamp(40px, 7vw, 72px)` | Hero title |

---

### 2c. Line heights usados

| Valor | Dónde |
|---|---|
| `1.08` | Hero title |
| `1.1` | CTA section title |
| `1.15` | About title |
| `1.2` | Section titles |
| `1.6` | `body` default, project card desc, footer tagline |
| `1.7` | Section desc, hero subtitle, service card desc ← **mismo valor, tres contextos** |
| `1.75` | CTA desc, testimonial quote |
| `1.8` | About body text |

---

## 3. Espaciados recurrentes

### 3a. Padding vertical de secciones

| Sección | Padding |
|---|---|
| `.services` | `100px 0` |
| `.portfolio` | `100px 0` |
| `.testimonials` | `100px 0` |
| `.about` | `100px 0` |
| `.cta-section` | `100px 0` |
| `.hero` | `148px 0 96px` (top compensa navbar de 68px) |
| `.proof-bar` | `40px 0` |
| `.footer` | `padding-top: 72px` |
| `.footer__inner` | `padding-bottom: 64px` |
| `.footer__bottom` | `24px 0` |
| Mobile (`≤768px`) | `72px 0` para secciones principales |

El patrón `100px 0` es el más repetido — candidato a `--spacing-section`.

### 3b. Gaps y margins internos

| Valor | Uso recurrente |
|---|---|
| `8px` | Gap botones de lista, gap hero actions, gap hamburger spans |
| `12px` | Margin-bottom eyebrow, footer col gap, hero actions gap |
| `14px` | Testimonial author gap |
| `16px` | Margin-bottom section-title, navbar mobile padding |
| `20px` | Testimonial card gap, project card body padding top, CTA title margin |
| `24px` | Margin-bottom hero title, container horizontal padding, card grid gap, about cta gap |
| `28px` | Footer social margin, hero subtitle mobile margin |
| `32px` | Hero badge margin, CTA badge margin, navbar gap, footer links gap mobile |
| `36px` | About CTA margin-top, testimonial card padding top |
| `40px` | Hero subtitle margin, CTA desc margin, footer links gap desktop |
| `44px` | Service card padding top |
| `48px` | Proof item horizontal padding, about gap mobile |
| `56px` | Section header margin-bottom |
| `64px` | Footer inner padding bottom |
| `72px` | Footer padding top, hero mobile padding top |
| `80px` | Footer inner gap, about grid gap |
| `96px` | Hero padding bottom |
| `100px` | Secciones principales (ver arriba) |
| `148px` | Hero padding top |

---

## 4. Inconsistencias detectadas

### 🔴 Alta prioridad — valores similares pero distintos

**I-1. `#FAFAF8` vs `--color-surface: #F7F7F5`**
`.service-card:hover` usa `#FAFAF8`. La variable `--color-surface` es `#F7F7F5`. Son prácticamente el mismo tono (warm white) pero con 3 canales distintos. En pantallas calibradas son indistinguibles. Deben ser el mismo token.

```css
/* Actual */
.service-card:hover { background: #FAFAF8; }

/* Debería ser */
.service-card:hover { background: var(--color-surface-hover); }
/* y en :root: --color-surface-hover: #FAFAF8; */
```

**I-2. `#0A0A0A` vs `--color-text: #111111`**
El footer usa `#0A0A0A` (casi negro) como fondo. El texto usa `#111111`. Son distintos — el footer debería tener su propio token `--color-bg-dark`.

```css
/* Actual */
.footer { background: #0A0A0A; }

/* Debería ser */
.footer { background: var(--color-bg-dark); }
/* y en :root: --color-bg-dark: #0A0A0A; */
```

**I-3. `#333` vs `--color-accent-hover: #333333`**
`.btn--primary:hover` usa `#333` hardcodeado. La variable `--color-accent-hover` tiene exactamente ese valor pero nunca se usa.

```css
/* Actual */
.btn--primary:hover { background: #333; }

/* Debería ser */
.btn--primary:hover { background: var(--color-text-hover); }
/* renombrar --color-accent-hover → --color-text-hover */
```

**I-4. `#f0f0f0` vs `--color-tag-bg: #F0F0EE`**
`.btn--white:hover` usa `#f0f0f0`. La variable `--color-tag-bg` es `#F0F0EE`. Difieren en 2 canales (EE vs 00 en R y B).

---

### 🟡 Media prioridad — variables huérfanas

**I-5. Variables sin usar:** `--color-accent`, `--color-accent-hover`, `--color-tag-bg`, `--color-cta-bg`, `--color-cta-text`, `--color-highlight`.
Opciones: (a) eliminarlas si no hay plan de uso, (b) usarlas reemplazando los valores hardcodeados que corresponden.

**I-6. `--color-text` hace doble trabajo**
Se usa tanto para el color del texto principal como para el fondo de `.btn--primary` y `.cta-section`. Esto hace difícil cambiar el negro del texto sin afectar los fondos oscuros. Separar en `--color-text` y `--color-bg-dark` (o reutilizar `--color-cta-bg` que ya existe con el mismo valor).

---

### 🟡 Media prioridad — tipografía

**I-7. `17px` en `.project-card__title`**
No encaja en la escala (12, 13, 14, 15, 16, 18, 20...). Probablemente un ajuste manual que quedó. Debería ser `16px` o `18px`.

**I-8. Line height `1.7` en tres contextos**
`section-desc` (descriptiva), `hero__subtitle` (titular), `service-card__desc` (cuerpo de card) usan `1.7`. Está bien que coincidan, pero conviene nombrarlo: `--line-height-relaxed: 1.7`.

---

### 🟢 Baja prioridad — código

**I-9. `.project-card--featured { grid-column: span 1; }`**
`span 1` es el valor default de `grid-column`. La regla no tiene efecto visual. O se define un layout especial (ej: `span 2` para tarjeta destacada) o se elimina la clase del HTML y el CSS.

**I-10. `gap: 0` en `.proof-bar__inner`**
`flex` tiene `gap: 0` por defecto. La declaración explícita es redundante.

**I-11. Smooth scroll intercepta `href="#"` del toggle de idioma**
Ver `00-overview.md` §9. El guard `if (target)` previene el error pero el botón EN no hace nada visible. No es inconsistencia de CSS pero vale documentarlo junto a los tokens.

---

## 5. Sistema de tokens propuesto

> Este es el sistema de variables CSS que `styles.css` debería tener. No reemplaza los valores actuales — los organiza. La implementación va en `03-tokens-implementation.md`.

### 5a. Colores

```css
:root {
  /* === Fondos === */
  --color-bg:           #FFFFFF;   /* fondo principal */
  --color-bg-subtle:    #F7F7F5;   /* secciones alternadas (actual: --color-surface) */
  --color-bg-hover:     #FAFAF8;   /* hover de cards (actual: hardcoded) */
  --color-bg-dark:      #0A0A0A;   /* footer (actual: hardcoded) */
  --color-nav-bg:       rgba(255,255,255,.92); /* navbar glassmorphism */

  /* === Bordes === */
  --color-border:       #E8E8E4;   /* sin cambios */

  /* === Texto === */
  --color-text:         #111111;   /* texto principal */
  --color-text-muted:   #666666;   /* subtextos */
  --color-text-light:   #999999;   /* texto más tenue */
  --color-text-hover:   #333333;   /* hover de elementos oscuros (actual: --color-accent-hover) */
  --color-text-inverse: #FFFFFF;   /* texto sobre fondo oscuro (actual: --color-cta-text) */

  /* === Marca === */
  --color-highlight:    #C8F135;   /* acento verde-lima — pendiente decisión de uso */

  /* === Semánticos === */
  --color-status-active:       #22c55e;   /* badge dot online (actual: hardcoded) */
  --color-status-active-light: #86efac;   /* badge dot ring (actual: hardcoded) */
  --color-stars:               #F59E0B;   /* estrellas de testimonios (actual: hardcoded) */

  /* === Blancos con opacidad (área oscura) === */
  /* Solo para footer y CTA section */
  --color-white-06:  rgba(255,255,255,.06);
  --color-white-08:  rgba(255,255,255,.08);
  --color-white-10:  rgba(255,255,255,.10);
  --color-white-12:  rgba(255,255,255,.12);
  --color-white-15:  rgba(255,255,255,.15);
  --color-white-30:  rgba(255,255,255,.30);
  --color-white-40:  rgba(255,255,255,.40);
  --color-white-45:  rgba(255,255,255,.45);
  --color-white-55:  rgba(255,255,255,.55);
  --color-white-65:  rgba(255,255,255,.65);
  --color-white-70:  rgba(255,255,255,.70);
  --color-white-92:  rgba(255,255,255,.92);

  /* === Eliminar (reemplazar antes de borrar) === */
  /* --color-accent    → usar var(--color-text) donde sea negro oscuro */
  /* --color-tag-bg    → usar var(--color-bg-subtle) */
  /* --color-cta-bg    → usar var(--color-text) */
  /* --color-cta-text  → usar var(--color-text-inverse) o 'white' */
}
```

---

### 5b. Tipografía

```css
:root {
  /* === Familia === */
  --font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  /* === Escala de tamaños === */
  --font-size-xs:   12px;   /* eyebrows, labels uppercase */
  --font-size-sm:   13px;   /* badges, metadata, labels */
  --font-size-base: 14px;   /* botones, nav links, body secundario */
  --font-size-md:   15px;   /* body de cards, btn--lg */
  --font-size-lg:   16px;   /* body principal, section desc */
  --font-size-xl:   18px;   /* hero subtitle */
  --font-size-2xl:  20px;   /* logo, service titles */
  --font-size-3xl:  28px;   /* proof numbers */
  /* clamp values se definen directamente en los componentes que los usan */

  /* === Pesos === */
  --font-weight-medium:    500;
  --font-weight-semibold:  600;
  --font-weight-bold:      700;

  /* === Line heights === */
  --line-height-tight:    1.1;    /* titulares grandes */
  --line-height-snug:     1.2;    /* section titles */
  --line-height-normal:   1.6;    /* body default */
  --line-height-relaxed:  1.7;    /* descripciones de cards y secciones */
  --line-height-loose:    1.8;    /* about body text */
}
```

---

### 5c. Espaciados

```css
:root {
  /* === Escala base === */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-7:  28px;
  --space-8:  32px;
  --space-9:  36px;
  --space-10: 40px;
  --space-12: 48px;
  --space-14: 56px;
  --space-16: 64px;
  --space-18: 72px;
  --space-20: 80px;
  --space-25: 100px;

  /* === Alias semánticos === */
  --spacing-section:     100px;   /* padding vertical de secciones principales */
  --spacing-section-sm:  72px;    /* ídem en mobile */
  --spacing-hero-top:    148px;   /* compensa navbar (68px) + breathing room */
  --spacing-container:   24px;    /* padding horizontal del .container */
  --spacing-card-gap:    24px;    /* gap entre cards del grid */
  --spacing-header-mb:   56px;    /* margin-bottom del .section-header */
}
```

---

### 5d. Existentes que ya están bien

Estos tokens están correctamente declarados y usados — no requieren cambios:

```css
:root {
  --radius-sm:   8px;
  --radius-md:   12px;
  --radius-lg:   20px;
  --radius-full: 9999px;
  --shadow-sm:   0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04);
  --shadow-md:   0 4px 16px rgba(0,0,0,.08);
  --shadow-lg:   0 12px 40px rgba(0,0,0,.12);
  --transition:  0.2s ease;
  --max-w:       1160px;
}
```

---

## 6. Resumen de acciones a tomar

| Prioridad | Acción | Afecta |
|---|---|---|
| 🔴 | Unificar `#FAFAF8` y `#F7F7F5` bajo `--color-bg-hover` y `--color-bg-subtle` | styles.css L350, L350 |
| 🔴 | Mover `#0A0A0A` del footer a `--color-bg-dark` | styles.css L638 |
| 🔴 | Reemplazar `#333` en btn hover por `var(--color-text-hover)` | styles.css L101 |
| 🔴 | Agregar `--color-status-active`, `--color-stars` a `:root` y usarlos | styles.css L242, L502 |
| 🟡 | Eliminar o aplicar las 6 variables huérfanas de `:root` | styles.css L11–16 |
| 🟡 | Corregir `17px` en `.project-card__title` → `16px` o `18px` | styles.css L466 |
| 🟡 | Definir o eliminar `--color-highlight: #C8F135` | styles.css L16 |
| 🟡 | Agregar variables de blancos con opacidad para el área oscura | styles.css L638–717 |
| 🟢 | Eliminar `.project-card--featured` o darle efecto visual real | styles.css L425–427 |
| 🟢 | Eliminar `gap: 0` redundante en `.proof-bar__inner` | styles.css L297 |
| 🟢 | Agregar `@media (prefers-reduced-motion)` para pulse y fade-in | styles.css L251, L720 |
