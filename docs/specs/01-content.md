# 01 — Copy definitivo por sección

**Basado en:** `00-overview.md` + respuestas del cliente (2026-05-27) + análisis SEO sesión `uxuaria.com SEO analysis`  
**Estado:** Listo para implementar, salvo ítems marcados `[PENDIENTE]`

**Decisiones de voz aplicadas en todo el documento:**
- Primera persona singular: "yo", "mi", "me", "trabajo", "diseño", "ayudo"
- Sin "nosotros", "ofrecemos", "ayudamos" ni corporate speak
- Tono: directo, específico, sin adjetivos vacíos ("innovador", "apasionado", "holístico")
- Especialización visible: UX para productos financieros en LATAM + evaluación de proyectos con IA

**Principio SEO aplicado:**  
Las keywords de intención **educativa** ("diseño de experiencia de usuario") ranquean sitios de formación, no de servicios. Todo el copy de la homepage usa keywords de **intención comercial** ("consultor UX", "diseñador UX freelance", "auditoría UX") que los fundadores y PMs usan cuando quieren contratar.

---

## 0. SEO / Meta

> Esta sección no es copy visible. Es la capa técnica que el HTML necesita antes de ir a producción. Spec técnico completo en `04-seo-meta.md` (pendiente). Lo esencial está aquí.

### `<title>`
```
Diseñador UX freelance para startups en LATAM | Uxuaria
```
> Máximo 60 caracteres. Contiene keyword primaria de intención comercial ("diseñador UX freelance"), segmento ("startups"), región ("LATAM") y marca ("Uxuaria").

### `<meta name="description">`
```
Consultoría UX con más de 15 años de experiencia con startups y productos
digitales en Argentina y LATAM. Especialización en fintech y productos
construidos con IA. Agendá una llamada gratuita.
```
> Máximo 155 caracteres. Incluye keywords secundarias, diferenciadores y CTA implícito. Reemplaza cualquier descripción genérica.

### H1 — SEO (elemento oculto visualmente, visible para Google)
```html
<h1 class="visually-hidden">
  Diseñador UX freelance en LATAM · Consultoría UX para startups
  y productos digitales
</h1>
```
> El H1 real que indexa Google. Oculto con `.visually-hidden` (clip-path, no `display:none`). Los H2 del hero son los visibles para el usuario. Un solo H1 por página — no agregar más en otras secciones.

### Schema.org (JSON-LD en `<head>`)
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
og:image       → [PENDIENTE: imagen 1200×630 — ver spec 04-seo-meta.md]
twitter:card   → summary_large_image
```

### Keywords objetivo por grupo de intención

**Grupo 1 — Contratación directa (homepage, hero, servicios):**
- `diseñador UX freelance Buenos Aires / LATAM`
- `consultor UX Argentina`
- `contratar diseñador UX startup`
- `diseñador UX UI Argentina`

**Grupo 2 — Servicios específicos (títulos de sección y cards):**
- `auditoría UX` · `UX Audit`
- `diseño de producto digital`
- `UX para startups`
- `prototipo UX alta fidelidad`
- `user research startup`

**Grupo 3 — Problema del cliente (subtítulos, about, footer tagline):**
- `mejorar conversión app startup`
- `UX MVP discovery`
- `consultoría diseño producto digital LATAM`
- `UX para productos fintech`

**Grupo 4 — Blog (intención educativa → no en homepage):**
- `qué es UX design para mi startup`
- `cómo mejorar la experiencia de usuario`
- `cuánto cuesta diseñador UX Argentina`

---

## 1. Navbar

### Logotipo
```
uxuaria
```
Tipografía: en minúsculas, peso 700, sin símbolo adicional.

### Links de navegación (orden)
```
Blog   |   Sobre mí   |   Contáctame   |   EN
```

> **Nota sobre "Blog":** El link apunta a la URL del blog real (artículos existentes confirmados). Destino a definir en spec de blog: ¿URL interna `/blog`, subdominio, Substack, etc.? Por ahora mantener href como `[PENDIENTE: URL del blog]`.

> **Nota sobre "EN":** El toggle de idioma se mantiene. La versión en inglés está confirmada pero no tiene spec todavía. Por ahora `href="#"` con nota de que es funcionalidad futura.

### CTA principal del navbar
```
Contáctame
```
> Al hacer clic abre `mailto:info@uxuaria.com`. Unificado con el nav link — elimina redundancia, refuerza acción directa.

---

## 2. Hero

### Badge de urgencia
```
Cupos limitados para nuevos proyectos este trimestre
```
> El punto verde animado y el texto crean urgencia real. Mantener.

### H1 invisible (SEO) — ver sección 0
```html
<h1 class="visually-hidden">
  Diseñador UX freelance en LATAM · Consultoría UX para startups
  y productos digitales hechos con IA
</h1>
```

### Título principal visible (H2 estilizado como H1)
```
Diseño UX
para productos que
crecen en LATAM
```
> Visual para el usuario. Introducen el alcance regional y el servicio central. En HTML: `<h2>` con el mismo tamaño visual que antes tenía el H1 — el verdadero H1 es el invisible de arriba.

### Subtítulo
```
Diseño experiencias digitales para startups que escalan —
con especialización en productos financieros
y proyectos construidos con IA.
```
> "startups que escalan" reemplaza "empresas que escalan" — es más directo. La especialización en IA queda al final, no duplicada. Voz implícita en primera persona.

### CTA primario
```
[label]  Agendá una llamada gratuita
[href]   mailto:info@uxuaria.com
```
> Voseo para mercado argentino. Alternativa neutra LATAM: "Agenda una llamada gratuita".

### CTA secundario
```
[label]  Ver proyectos
[href]   #portafolio
```

---

## 3. Proof Bar

Cuatro métricas en línea horizontal. Cada una tiene número y etiqueta.

| Número | Etiqueta | Nota |
|---|---|---|
| `15+` | Años de experiencia | 2020 → 2026 = 6 años. |
| `50+` | Proyectos completados | **[PENDIENTE: confirmar número real]** |
| `4` | Países en LATAM | **[PENDIENTE: confirmar: CR, AR, CO, ¿cuál más?]** |

> "Países en LATAM" reemplaza "CR → MX" para reflejar el alcance real. El número exacto necesita confirmación.

---

## 4. Servicios

### Encabezado de sección
```
[eyebrow]  Servicios
[título]   ¿En qué puedo ayudarte?
[desc]     Trabajo con startups y equipos de producto en etapas clave —
           desde validar una idea hasta optimizar lo que ya existe.
```
> "startups y equipos de producto" reemplaza "empresas en etapas clave" — más específico, mejor para SEO de intención comercial.

---

### Servicio 1 — User Research

```
[título]   Te acerco a tus usuarios
[desc]     Investigo, escucho y analizo a las personas que usan tu producto
           para encontrar los problemas que realmente vale la pena resolver.
[items]
  — User Research
  — Personas & Journey Mapping
  — Usability Testing
```

---

### Servicio 2 — MVP Discovery

```
[título]   Defino y valido tu MVP
[desc]     Reduzco el riesgo de tu producto digital prototipando rápido
           y validando con usuarios reales antes de que empiece el desarrollo.
[items]
  — MVP Discovery Workshop
  — Wireframing
  — Prototipo de alta fidelidad
```

---

### Servicio 3 — UI/UX Design

```
[título]   Mejoro la experiencia de uso
[desc]     Diseño cada punto de contacto para que el producto sea claro,
           fluido y fácil de usar — sin fricciones que cuesten conversiones.
[items]
  — Interaction Design & UI
  — UX Copywriting & Microcopy
  — Design Systems
```

---

### Servicio 4 — UX Audit / Especialización

```
[título]   Audito y optimizo productos digitales
[desc]     Identifico qué está frenando el crecimiento de tu producto.
           Me especializo en productos financieros y en proyectos
           que fueron construidos con IA y necesitan una revisión de UX.
[items]
  — UX Audits (con foco en fintech)
  — Evaluación de proyectos generados con IA
  — Conversion Rate Optimization
```

> Este servicio concentra las dos especializaciones únicas: fintech + IA. El término "UX Audit" aparece en inglés intencionalmente — es como lo buscan los PMs y founders en Argentina.

---

## 5. UX Checkup *(sección nueva)*

> **Qué es:** El lead-gen mechanic principal. Un diagnóstico gratuito de 48 horas con entregable + llamada de 30 minutos. Con cupos limitados y filtro de aplicación para calificar leads y crear escasez real.
>
> **Funnel:** UX Checkup gratuito → UX Audit pago ($800–$1,500 USD) → retainer UX as a Service.
>
> **Implementación:** Esta sección puede vivir como bloque dentro del `index.html` (entre Servicios y Portafolio) y además tener una página dedicada `/checkup` o `/ux-checkup` para capturar tráfico propio con keyword `"auditoría UX gratuita"`.

### Encabezado de sección
```
[eyebrow]  UX Checkup
[título]   ¿creaste tu app con IA y ahora no sabes como seguir?
[desc]     En 48 horas te entrego un diagnóstico concreto de los problemas
           de experiencia que están frenando tu producto — y una llamada
           para explicarte cómo resolverlos.
```

### Lo que incluye
```
✓ Revisión completa de tu flujo principal con metodologias de Diseño guiado por especificaciones (SDD)
✓ Documento de hallazgos con prioridades claras
✓ Llamada de 30 minutos para revisar los resultados
✓ Sin costo · 2 cupos por mes
```

### Condición de escasez
```
Solo acepto 2 proyectos por mes para garantizar la calidad del análisis.
```

### CTA
```
[label]  Aplicar al UX Checkup
[href]   mailto:info@uxuaria.com?subject=Quiero%20aplicar%20al%20UX%20Checkup
```
> El subject pre-completado en el mailto filtra las aplicaciones y confirma al remitente qué está pidiendo. Alternativa: formulario simple con 3 preguntas (nombre, URL del producto, problema principal).

### Nota de implementación
> Si el UX Checkup tiene su propia página `/checkup`, esa página necesita su propio spec (`05-checkup.md`) con: copy completo de la página, formulario de aplicación, criterios de selección (para uso interno del cliente), y meta tags SEO específicos (`<title>: Auditoría UX gratuita para startups | Uxuaria`).

---

## 6. Portafolio

### Encabezado de sección
```
[eyebrow]  Proyectos
[título]   Casos de diseño
[desc]     Trabajo real con startups y empresas reales. Desde validar un MVP
           hasta rediseñar una experiencia que no estaba convirtiendo.
```
> "startups y empresas" refuerza el target. Resto sin cambios.

### Cards de proyectos

`[PENDIENTE: contenido real para cada tarjeta]`

La estructura de cada tarjeta requiere:
- Imagen real (screenshot, mockup o cover del proyecto)
- Nombre del proyecto
- Industria y año (ej: `Fintech · 2024`)
- Descripción de 1–2 oraciones: qué problema resolvió, qué resultado tuvo
- Indicar si es confidencial (sin imagen pública, solo texto)

**Lista de proyectos conocidos — pendientes de brief individual:**

| Proyecto | Industria | Año | ¿Imagen disponible? | ¿Público? |
|---|---|---|---|---|
| Restaurant POS System | POS / Retail | 2025 | [PENDIENTE] | [PENDIENTE] |
| Farmatouch Homepage | E-commerce / Salud | 2025 | [PENDIENTE] | [PENDIENTE] |
| Fans.ai | Social / IA | 2023 | [PENDIENTE] | [PENDIENTE] |
| Monge Pay | Fintech / Pagos | 2022 | [PENDIENTE] | [PENDIENTE] |
| Striano Landing Page | Moda / Marketing | 2023 | [PENDIENTE] | [PENDIENTE] |
| Welink Homepage | SaaS / Conectividad | 2023 | [PENDIENTE] | [PENDIENTE] |
| Weezy Towels | E-commerce | 2023 | [PENDIENTE] | [PENDIENTE] |
| TSG System | Gestión / B2B | 2021 | [PENDIENTE] | [PENDIENTE] |

> Cada proyecto necesita un brief en `docs/specs/portfolio/[nombre].md` antes de implementarse en HTML.

---

## 7. Testimonios

### Encabezado de sección
```
[eyebrow]  Testimonios
[título]   Lo que dicen quienes trabajaron conmigo
```

### Cards de testimonios — implementadas (2026-05-29)

**Testimonio 1 — Flavio Strianese**
```
[cita]    "Luis aporta un enfoque creativo y orientado a los detalles para cada
           aspecto del diseño de UX, priorizando constantemente las necesidades
           del usuario para ofrecer resultados excepcionales."
[nombre]  Flavio Strianese
[rol]     CEO · Striano
[foto]    images/testimonials/flavio-strianese.jpg  ← [PENDIENTE: colocar archivo]
```

**Testimonio 2 — Ireland Bender**
```
[cita]    "Realmente disfrutamos trabajar nuestro diseñador (Luis) y lo
           recomendaríamos a cualquiera que necesite ayuda con diseño UX/UI."
[nombre]  Ireland Bender
[rol]     Weezie Towels
[foto]    Sin foto confirmada — usa gradiente de fallback
```

**Testimonio 3 — Walter Aguilar Barahona**
```
[cita]    "He tenido el placer de trabajar con Luis en varios proyectos y en
           distintas modalidades. Su habilidad para transformar ideas complejas
           en interfaces intuitivas y visualmente atractivas fue fundamental en
           cada proyecto. Su enfoque en el usuario es evidente en cada diseño
           que crea, siempre buscando soluciones que no solo sean estéticamente
           agradables, sino también funcionales y fáciles de usar."
[nombre]  Walter Aguilar Barahona
[rol]     Director y Consultor · DeOper
[foto]    images/testimonials/walter-aguilar.jpg  ← [PENDIENTE: colocar archivo]
```

> **Para agregar más testimonios:** duplicar un bloque `.testimonial-card` en el HTML.
> El grid se adapta automáticamente: 3 por fila en desktop, 2 en tablet, 1 en mobile.
>
> **Fotos pendientes:** colocar los archivos JPG en `images/testimonials/` con los nombres exactos.
> El gradiente de color sirve como fallback hasta que la foto esté disponible.

---

## 8. Sobre mí

### Eyebrow
```
Sobre mí
```

### Título
```
Hola, soy Luis Carlos
```

### Texto principal (dos párrafos)
```
Soy consultor UX con base en Buenos Aires - Argentina y más de 15 años de experiencia
trabajando con startups y empresas en crecimiento de Argentina y LATAM.
Me especializo en productos financieros digitales y en la evaluación
de experiencias construidas con IA.
```
```
Trabajo en la intersección entre la investigación de usuarios, el diseño
de interfaces y los objetivos de negocio. Mi enfoque es práctico: identifico
problemas reales, diseño soluciones validadas y colaboro con equipos de
producto y desarrollo para implementarlas.
```

> **Cambio SEO:** "UX Designer" → "consultor UX" en la primera oración. "Consultor" tiene intención comercial más fuerte en búsquedas. "startups y empresas" reemplaza solo "empresas" para alinear con el target declarado.

### CTAs de la sección About
```
[primario]    Hablemos
[href]        mailto:info@uxuaria.com

[secundario]  Ver proyectos
[href]        #portafolio
```

### Imagen / visual de la sección
`[PENDIENTE: sin foto confirmada — decisión de diseño requerida]`

> Opciones de reemplazo visual:
> 1. Elemento decorativo minimalista (líneas, forma geométrica)
> 2. Screenshot de algún proyecto como elemento de fondo
> 3. Sección de ancho completo sin columna de imagen

---

## 9. CTA Final

### Badge
```
Cupos limitados este trimestre
```

### Título
```
¿Tenés un producto que mejorar
o una idea que validar?
```
> Voseo (Argentina como mercado principal). Alternativa neutra: "¿Tienes un producto que mejorar o una idea que validar?"

### Descripción
```
Escribime y coordinamos una llamada de 30 minutos sin costo.
Te cuento cómo puedo ayudarte y si tiene sentido trabajar juntos.
```

### Botón CTA
```
[label]  Escribime a info@uxuaria.com
[href]   mailto:info@uxuaria.com
```
> Alternativa mobile: label `Escribime` con email visible debajo como texto plano.

---

## 10. Footer

### Tagline del brand
```
Consultoría UX para productos que crecen en LATAM.
```
> **Cambio SEO:** "Experience Design" → "Consultoría UX" — keyword de intención comercial (Grupo 3). El tagline ahora rankea la palabra que un founder usa cuando quiere contratar, no la que usa cuando quiere estudiar.

### Columna — Servicios
```
User Research
MVP & Prototipado
UI/UX Design
UX Audits
UX Checkup
```
> Se agrega "UX Checkup" para que sea navegable desde el footer.

### Columna — Empresa
```
Sobre mí
Proyectos
Blog
Contáctame
```

### Columna — Contacto
```
info@uxuaria.com
[toggle idioma: Español / English]
```

### Redes sociales
Solo LinkedIn confirmado:
```
[LinkedIn]  https://www.linkedin.com/company/uxuaria/

```

### Copyright
```
© 2020 – 2026 Uxuaria · Luis Carlos Romero León
```

---

## Resumen de pendientes que bloquean producción

| Ítem | Sección | Responsable |
|---|---|---|
| Brief individual de cada proyecto (imagen + descripción) | Portafolio | Cliente → spec `portfolio/*.md` |
| Nombres, roles, citas y fotos de testimonios reales | Testimonios | Cliente |
| URL del blog | Navbar, Footer | Cliente |
| Imagen Open Graph 1200×630 px | SEO / Meta | Diseño |
| Formulario o mailto para aplicación al UX Checkup | UX Checkup | Cliente + Diseño |

## Pendientes que NO bloquean producción (pueden ir en v2)

| Ítem | Sección |
|---|---|
| Spec `05-checkup.md` — página dedicada `/checkup` con copy y formulario | UX Checkup |
| Versión en inglés completa | Todo el sitio |
| Google Analytics integrado | `<head>` |
| Lógica real del toggle de idioma EN | Navbar |
| Spec `04-seo-meta.md` — sitemap, robots.txt, canonical | SEO |
