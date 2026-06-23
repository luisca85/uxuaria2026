# 05 — AI MVP Rescue

**Estado:** ✅ Implementado  
**Archivos:** `ai-mvp-rescue.html` (landing page) · sección `#ux-checkup` en `index.html` · modal `#checkup-modal` en `index.html`  
**Última actualización:** 2026-06-22

---

## Propósito

Captar founders cuyo MVP (construido con herramientas de IA como Cursor, Lovable, Bolt, v0, Replit) está estancado. El servicio antes se llamaba "UX Checkup" — fue rebrandeado a "AI MVP Rescue".

**Funnel:** Ad o navbar → `ai-mvp-rescue.html` → Typeform (diagnóstico) → llamada 15 min → propuesta cerrada

---

## Typeform

```
URL: https://8aqt6k328lv.typeform.com/to/lDjbMOFd
```

Se abre en `target="_blank"`. Es el destino de todos los CTAs de conversión de esta landing page.

---

## Landing page — `ai-mvp-rescue.html`

### Stack técnico

- CSS **embebido** en `<style>` (no usa `styles.css`)
- Los tokens del `:root` están espejados del sitio principal
- Acento especial: `--ochre: #D9A441` (no existe en el sitio principal)
- Colores semánticos: `--critical: #d94040`, `--warning: #c47a1a`, `--ok: #2d7a4f`
- Navbar copiado del sitio principal (sin importar `styles.css`)
- `<meta name="robots" content="noindex, nofollow">` — no indexable
- GA4 comentado — reemplazar `G-XXXXXXXXXX` con el Measurement ID real cuando se active

### Relación con el resto del sitio

| Dónde | Cómo apunta a la landing |
|---|---|
| Navbar (desktop + mobile) | `<a href="ai-mvp-rescue.html">AI MVP Rescue</a>` |
| Sección `#ux-checkup` de homepage | CTA "Rescatá tu MVP ahora" → `ai-mvp-rescue.html` |
| CTA Final de homepage | Link secundario "Conocé AI MVP Rescue →" |
| Footer columna Servicios | `AI MVP Rescue` → `#ux-checkup` (ancla en homepage) |

---

### Secciones de la landing (en orden)

#### 1. Navbar

Réplica del navbar del sitio principal. Links: logo → `index.html`, hamburger mobile.

#### 2. Hero (fondo oscuro)

```
[scarcity]  ● Queda 1 cupo de 2 este mes

[h1]        Tu MVP se estancó. Rescatémoslo.
            (la palabra "Rescatémoslo." en ochre + itálica)

[lead]      Para fundadores cuyo MVP hecho con IA no escala,
            cuyo freelancer desapareció sin dejar rastro, o cuyo
            proyecto se estancó a mitad de lanzamiento.
            Recuperación con alcance definido y entregables claros.
            Sin contratos de retención ni consultoría indefinida.
            Diagnóstico inicial sin costo.  ← en ochre/italic

[CTA primario]   Rescatá tu MVP ahora →
[href]           https://8aqt6k328lv.typeform.com/to/lDjbMOFd (target _blank)

[CTA ghost]      ¿Cómo funciona?
[href]           #como-funciona

[link]           Ver casos de éxito →  → #casos
```

Visual columna derecha: "Visual contextual · reservado" — pendiente de definir.

#### 3. "Esto es para vos si…" (fondo oscuro)

```
[eyebrow]  Esto es para vos si…
[h2]       Creaste un proyecto con IA, y se quedó corto en el camino con los usuarios.

[grid 2 cols, 5 items]
  — Lanzaste rápido con Cursor, Lovable o Claude Code, y ahora los usuarios reales
    rompen lo que antes andaba.
  — Estás a punto de contratar a tu sobrino diseñador para que te ponga "bonitas
    las pantallas".
  — No sabés por qué: tu proyecto es único, a nadie más se le ocurrió, y aun así
    la gente simplemente no se registra.
  — Cada feature nuevo rompe algo de lo anterior y las inconsistencias se acumulan.
  — Un freelancer desapareció a mitad del proyecto y tenés que dejarlo listo para
    producción.

[cierre]   Si dos o más de estas te describen, este rescate es para vos.
```

#### 4. Proceso — "Cómo rescatamos tu MVP" (fondo blanco, `id="como-funciona"`)

5 pasos en pipeline visual:

| # | Título | Descripción |
|---|---|---|
| 1 | Evaluamos (gratis) | Charla de 15 min — contexto, qué está roto, hacia dónde quieren ir |
| 2 | Diagnóstico | Diagnóstico general: negocio, usuarios, bloqueos del stack |
| 3 | Priorizamos | Identificamos el problema correcto a resolver |
| 4 | Alcance | Proyecto con presupuesto, alcance y precio cerrados |
| 5 | Rescate | Implementación del rescate con entregables definidos |

CTA al final: "Empezá el rescate →" → Typeform

#### 5. Proof / Casos de éxito (fondo oscuro, `id="casos"`)

```
[h2]  Productos reales, resultados reales.
```

Cards con proyectos reales (ver HTML para contenido actual).

#### 6. FAQ (fondo blanco)

Accordion de preguntas frecuentes (ver HTML para lista completa).

#### 7. CTA Final (fondo oscuro)

```
[CTA]  Rescatá tu MVP ahora →  → Typeform
```

---

## Sección homepage — `#ux-checkup` en `index.html`

Sección de homepage que promueve el servicio. No es la landing page completa — es el punto de entrada desde el sitio principal.

### Copy

```
[eyebrow]  Rescatá tu MVP
[scarcity] Queda 1 cupo de 2 este mes
[título]   ¿Tu MVP se estancó?
           Rescatémoslo ahora
[desc]     Para fundadores cuyo MVP basado en IA no alcanza la escala necesaria,
           cuyo freelancer desapareció sin dejar rastro o cuyo proyecto se estancó
           a mitad de lanzamiento. Recuperación de proyectos con alcance definido
           y entregables claros. Sin contratos de retención ni consultoría
           indefinida. Diagnóstico inicial sin costo.

[CTA]      Rescatá tu MVP ahora →   → ai-mvp-rescue.html
```

### Mock visual (lado derecho)

Ventana retro oscura con título `AI_MVP_RESCUE: HALLAZGOS.PDF`:
- 🔴 Onboarding tiene 6 pasos que no necesita
- 🟡 CTA principal desaparece en mobile
- 🟢 Jerarquía tipográfica correcta

---

## Modal `#checkup-modal` en `index.html`

El modal con el Typeform existe en el HTML de `index.html` (`class="ckm-overlay"`). Contiene:
- `.ckm-view--info`: vista informativa con checklist + CTA
- `.ckm-view--form`: iframe del Typeform `https://8aqt6k328lv.typeform.com/to/lDjbMOFd`

**Estado actual:** el modal existe pero ningún botón de la sección `#ux-checkup` lo abre — el CTA va directo a `ai-mvp-rescue.html`.

**Decisión pendiente:** mantener el modal en el HTML, eliminarlo, o agregar un segundo CTA que lo abra.

---

## Pendientes

- [ ] Visual del hero en `ai-mvp-rescue.html` (columna derecha — "Visual contextual · reservado")
- [ ] Activar GA4 — reemplazar `G-XXXXXXXXXX` con Measurement ID real
- [ ] Decidir si `ai-mvp-rescue.html` se indexa en el futuro (actualmente `noindex`)
- [ ] Decidir qué hacer con el modal `#checkup-modal` (mantener / eliminar / conectar CTA)
