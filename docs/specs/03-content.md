# 03 — Copy definitivo por sección

**Basado en:** análisis SEO + respuestas del cliente (2026-05-27)  
**Estado:** ✅ Implementado en `index.html` (salvo ítems marcados como pendientes)  
**Última actualización:** 2026-06-22

**Decisiones de voz aplicadas:**
- Primera persona singular: "yo", "mi", "me", "trabajo", "diseño", "ayudo"
- Sin "nosotros", "ofrecemos", "ayudamos" ni corporate speak
- Tono: directo, específico, sin adjetivos vacíos
- Copy en español (voseo rioplatense)

---

## 0. SEO / Meta — `index.html`

### `<title>`
```
Diseñador UX freelance para startups en LATAM | Uxuaria
```

### `<meta name="description">`
```
Consultoría UX con más de 15 años de experiencia con startups y productos
digitales en Argentina y LATAM. Especialización en fintech y productos
construidos con IA. Agendá una llamada gratuita.
```

### H1 invisible (SEO)
```html
<h1 class="visually-hidden">
  Diseñador UX freelance en LATAM · Consultoría UX para startups
  y productos digitales hechos con IA
</h1>
```

### Schema.org (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": ["Person", "ProfessionalService"],
  "name": "Luis Carlos Romero León",
  "alternateName": "Uxuaria",
  "jobTitle": "UX Designer freelance",
  "url": "https://uxuaria.com",
  "email": "info@uxuaria.com",
  "areaServed": ["Argentina", "Colombia", "Costa Rica", "Latinoamérica"],
  "knowsAbout": [
    "UX Design", "User Research", "Fintech UX", "MVP Discovery",
    "Auditoría UX", "Design Systems", "IA productos digitales"
  ],
  "sameAs": ["https://www.linkedin.com/company/uxuaria/"]
}
```

### Open Graph
```
og:title       → Diseñador UX freelance para startups en LATAM | Uxuaria
og:description → Consultoría UX especializada en fintech y productos digitales.
                 Más de 15 años trabajando con startups en Argentina y LATAM.
og:url         → https://uxuaria.com
og:type        → website
og:image       → [PENDIENTE: imagen 1200×630 px]
twitter:card   → summary_large_image
```

---

## 1. Navbar ✅

```
uxuaria   |   Servicios   |   AI MVP Rescue   |   Blog   |   Contacto
```

| Link | Destino |
|---|---|
| uxuaria (logo) | `index.html` |
| Servicios | `servicios/index.html` |
| AI MVP Rescue | `ai-mvp-rescue.html` |
| Blog | `blog.html` |
| Contacto | `contacto/index.html` |

No hay CTA separado en el navbar. El link "Contacto" funciona como CTA.

---

## 2. Hero ✅

### Badge de urgencia
```
Cupos limitados para nuevos proyectos este trimestre
```
Punto verde animado (`.scarcity-tag`) + texto.

### H2 visible (título principal)
```
Diseño UX
para productos que
crecen en LATAM
```

### Subtítulo
```
Diseño experiencias digitales para startups que escalan —
con especialización en productos financieros
y proyectos construidos con IA.
```

### CTAs
```
[primario]   Agendá una llamada gratuita
[href]       https://calendly.com/luisca85/charla-introductoria-clone

[secundario] Ver proyectos
[href]       #portafolio
```

---

## 3. UX Vision Strip ✅

Sección `.ux-vision`. Dos columnas: copy izquierda + stat cards derecha.

### Columna izquierda

```
[título h2]  Tu problema de crecimiento
             es un problema de diseño.

[cuerpo]     En Uxuaria concebimos el diseño como un proceso que permite
             resolver problemas profundos y estructurales dentro de una
             organización. Los problemas que tratamos de resolver son los
             que conectan la promesa de valor de tu organización con tu
             usuario: entre mayor conexión, mayor crecimiento y
             sostenibilidad.

[cuerpo]     Hacer pantallas atractivas, repensar un nuevo flujo de usuario,
             rediseñar tu landing, investigar cuál es el modelo mental de
             tus usuarios: son todas maneras en las que el diseño toma
             acción para que tu organización encuentre vías hacia el
             crecimiento.

[CTA]        Ver servicios →   → servicios/index.html
```

### Columna derecha — stat cards

**Stat card 1:**
```
[eyebrow]  Experiencia
[número]   +15 (animado)
[unidad]   años
[label]    especializándome en productos digitales en LATAM
```

**Stat card 2:**
```
[eyebrow]  Caso de éxito · Monge Pay
[número]   +150K (animado)
[unidad]   usuarios activos
[label]    en la plataforma fintech más grande de Costa Rica,
           +300% de crecimiento en 2025
```

---

## 4. Servicios ✅

### Encabezado
```
[eyebrow]  Servicios
[título]   ¿En qué puedo ayudarte?
[desc]     Trabajo con startups y equipos de producto en etapas clave —
           desde validar una idea hasta optimizar lo que ya existe.
```

### Servicio 1 — User Research
```
[título]   Te acerco a tus usuarios
[desc]     Investigo, escucho y analizo a las personas que usan tu producto
           para encontrar los problemas que realmente vale la pena resolver.
[items]    — User Research
           — Personas & Journey Mapping
           — Usability Testing
```

### Servicio 2 — MVP Discovery
```
[título]   Defino y valido tu MVP
[desc]     Reduzco el riesgo de tu producto digital prototipando rápido
           y validando con usuarios reales antes de que empiece el desarrollo.
[items]    — MVP Discovery Workshop
           — Wireframing
           — Prototipo de alta fidelidad
```

### Servicio 3 — UI/UX Design
```
[título]   Mejoro la experiencia de uso
[desc]     Diseño cada punto de contacto para que el producto sea claro,
           fluido y fácil de usar — sin fricciones que cuesten conversiones.
[items]    — Interaction Design & UI
           — UX Copywriting & Microcopy
           — Design Systems
```

### Servicio 4 — UX Audit / Especialización
```
[título]   Audito y optimizo productos digitales
[desc]     Identifico qué está frenando el crecimiento de tu producto.
           Me especializo en productos financieros y en proyectos
           que fueron construidos con IA y necesitan una revisión de UX.
[items]    — UX Audits (con foco en fintech)
           — Evaluación de proyectos generados con IA
           — Conversion Rate Optimization
```

---

## 5. AI MVP Rescue ✅

Sección `#ux-checkup` en homepage (rebrandeada de "UX Checkup").

### Encabezado
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
```

### CTA
```
[label]  Rescatá tu MVP ahora →
[href]   ai-mvp-rescue.html
```

### Mock visual (columna derecha)

Ventana retro oscura con título `AI_MVP_RESCUE: HALLAZGOS.PDF` mostrando:
- 🔴 Onboarding tiene 6 pasos que no necesita
- 🟡 CTA principal desaparece en mobile
- 🟢 Jerarquía tipográfica correcta

---

## 6. Portafolio ✅

### Encabezado
```
[eyebrow]  Proyectos
[título]   Esto es lo que sucede cuando el diseño es una decisión de negocio.
[desc]     Trabajo real con startups y empresas reales. Desde validar un MVP
           hasta rediseñar una experiencia que no estaba convirtiendo.
```

Ver `02-portfolio.md` para el inventario completo de proyectos y contenido de cada card.

---

## 7. Testimonios ✅

### Encabezado
```
[eyebrow]  Testimonios
[título]   Lo que dicen quienes trabajaron conmigo
```

### Testimonio 1 — Flavio Strianese
```
[cita]    "Luis aporta un enfoque creativo y orientado a los detalles para cada
           aspecto del diseño de UX, priorizando constantemente las necesidades
           del usuario para ofrecer resultados excepcionales."
[nombre]  Flavio Strianese
[rol]     CEO · Striano
[foto]    images/testimonials/flavio-strianese.png
```

### Testimonio 2 — Ireland Bender
```
[cita]    "Realmente disfrutamos trabajar nuestro diseñador (Luis) y lo
           recomendaríamos a cualquiera que necesite ayuda con diseño UX/UI."
[nombre]  Ireland Bender
[rol]     Weezie Towels
[foto]    Sin foto confirmada — usa gradiente de fallback
```

### Testimonio 3 — Walter Aguilar Barahona
```
[cita]    "He tenido el placer de trabajar con Luis en varios proyectos y en
           distintas modalidades. Su habilidad para transformar ideas complejas
           en interfaces intuitivas y visualmente atractivas fue fundamental en
           cada proyecto."
[nombre]  Walter Aguilar Barahona
[rol]     Director y Consultor · DeOper
[foto]    images/testimonials/walter-aguilar.png
```

---

## 8. Sobre mí ✅

```
[eyebrow]  Sobre mí
[título]   Hola, soy Luis Carlos

[párrafo 1]
Soy consultor UX con base en Buenos Aires - Argentina y más de 15 años de experiencia
trabajando con startups y empresas en crecimiento de Argentina y LATAM.
Me especializo en productos financieros digitales y en la evaluación
de experiencias construidas con IA.

[párrafo 2]
Trabajo en la intersección entre la investigación de usuarios, el diseño
de interfaces y los objetivos de negocio. Mi enfoque es práctico: identifico
problemas reales, diseño soluciones validadas y colaboro con equipos de
producto y desarrollo para implementarlas.

[CTA primario]   ▶ Agendá una llamada
[href]           https://calendly.com/luisca85/charla-introductoria-clone

[CTA secundario] Ver proyectos
[href]           #portafolio
[clase]          btn--outline
```

No hay columna derecha con imagen. Sección de una sola columna.

---

## 9. CTA Final ✅

```
[badge]   Cupos limitados este trimestre

[título]  ¿Tenés un producto que mejorar
          o una idea que validar?

[desc]    Escribime y coordinamos una llamada de 30 minutos sin costo.
          Te cuento cómo puedo ayudarte y si tiene sentido trabajar juntos.

[primario]   ▶ Agendá una llamada
[href]       https://calendly.com/luisca85/charla-introductoria-clone

[secundario] ¿Tu app la construiste con IA? Conocé AI MVP Rescue →
[href]       ai-mvp-rescue.html
```

---

## 10. Footer ✅

### Tagline
```
Consultoría UX para productos que crecen en LATAM.
```

### Columna Servicios
```
User Research      → #servicios
MVP & Prototipado  → #servicios
UI/UX Design       → #servicios
UX Audits          → #servicios
AI MVP Rescue      → #ux-checkup
```

### Columna Empresa
```
Sobre mí
Proyectos
Blog
Contáctame
```

### Columna Contacto
```
info@uxuaria.com
[toggle idioma: Español / English]  ← visual only, sin lógica i18n
```

### Redes sociales
```
LinkedIn  → https://www.linkedin.com/company/uxuaria/
Instagram → [PENDIENTE: handle no confirmado]
```

### Copyright
```
© 2020 – 2026 Uxuaria · Luis Carlos Romero León
```

---

## Pendientes

- [ ] Imagen Open Graph 1200×630 px para `og:image`
- [ ] Instagram handle (no confirmado)
- [ ] Foto de testimonio: Ireland Bender (sin imagen actual)
