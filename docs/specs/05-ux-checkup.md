# 05 — Página de aplicación al UX Checkup

**Estado:** Spec aprobado — pendiente de implementación  
**Archivo de destino:** `ux-checkup.html`  
**Creado:** 2026-06-04  
**Depende de:** `00-overview.md`, `01-content.md`, sección UX Checkup en `index.html`

---

## Objetivo

Filtrar leads de alta calidad para el servicio gratuito de UX Checkup. El formulario de aplicación hace cuatro preguntas de elegibilidad — si el candidato no cumple los requisitos, recibe un mensaje honesto y alternativas. Si los cumple, deja sus datos y espera respuesta en menos de 48 horas.

**Funnel:** UX Checkup gratuito → UX Audit pago ($800–$1,500 USD) → retainer UX as a Service.

---

## URL

```
https://uxuaria.com/ux-checkup.html
```

El link "Aplicar al UX Checkup" de la sección `#ux-checkup` en `index.html` apuntará a esta página.

---

## Estructura de la página

```
[navbar fijo]
[breadcrumb: Home › UX Checkup]
[hero del checkup — contexto y propuesta de valor]
[formulario de elegibilidad en pasos]
  [paso 1: preguntas de elegibilidad]
  [paso 2: datos de contacto — solo si es elegible]
  [resultado A: elegible — confirmación de aplicación]
  [resultado B: no elegible — mensaje honesto + alternativas]
[footer]
```

---

## Hero del checkup

```
[eyebrow]   UX Checkup
[h1]        Aplicá al diagnóstico gratuito
[desc]      En 48 horas te entrego un diagnóstico concreto de los problemas
            de experiencia que están frenando tu producto — y una llamada
            para explicarte cómo resolverlos.
[sub-info]
  ✓ Revisión completa de tu flujo principal
  ✓ Documento de hallazgos con prioridades claras
  ✓ Llamada de 30 minutos para revisar los resultados
  ✓ Sin costo · Solo 2 cupos por mes
```

---

## Paso 1 — Preguntas de elegibilidad

Cuatro preguntas de selección binaria (SÍ / NO). Se muestran todas a la vez, una debajo de la otra. El botón "Verificar elegibilidad" aparece al final.

### Diseño de cada pregunta

```
┌─────────────────────────────────────────────────────────────────┐
│  01                                                              │
│  ¿Ya tenés un proyecto desarrollado?                             │
│                                                                  │
│  [  SÍ  ]   [  NO  ]                                            │
└─────────────────────────────────────────────────────────────────┘
```

- Número de pregunta: Silkscreen, pequeño, muted
- Texto de pregunta: Inter bold, `font-size: var(--font-size-xl)`
- Botones SÍ/NO: estilo retro 3.1 — `border: 3px solid`, sin `border-radius`
  - Sin seleccionar: fondo transparente, texto oscuro
  - Seleccionado SÍ: fondo negro, texto blanco, `box-shadow: 4px 4px 0 0`
  - Seleccionado NO: fondo `var(--color-surface)`, borde muted
- La selección es mutuamente excluyente por pregunta (radio button estilizado)

### Las 4 preguntas

| # | Pregunta | Respuesta requerida para elegibilidad |
|---|---|---|
| 01 | ¿Ya tenés un proyecto desarrollado? | **SÍ** |
| 02 | ¿Usaste IA para agilizar el proceso de desarrollo? | **SÍ** |
| 03 | ¿Sos founder y tenés la facultad para hacer todos los cambios necesarios? | **SÍ** |
| 04 | ¿Contás con un presupuesto de al menos USD 2.000 para lanzar un MVP optimizado? | **SÍ** |

> **Lógica:** el candidato es elegible si responde SÍ a las 4 preguntas. Cualquier NO genera el resultado B (no elegible).

### Botón de verificación

```
[Verificar mi elegibilidad →]
```

- Aparece deshabilitado hasta que las 4 preguntas tengan respuesta
- Al hacer clic: evalúa las respuestas y muestra el resultado correspondiente (paso 2A o 2B)
- Sin redirección de página — transición suave con JS (scroll al resultado)

---

## Paso 2A — Elegible: formulario de contacto

Se muestra si las 4 respuestas son SÍ. Aparece debajo de las preguntas con animación de fade-in.

### Mensaje de transición

```
┌─────────────────────────────────────────────────────────────────┐
│  ✓  ¡Cumplís con los requisitos!                                 │
│                                                                  │
│  Completá tus datos y me voy a comunicar con vos                 │
│  en menos de 48 horas para coordinar el diagnóstico.             │
└─────────────────────────────────────────────────────────────────┘
```

Estilo: `border: 3px solid var(--color-text)`, fondo `var(--color-surface)`.

### Campos del formulario

| Campo | Tipo | Obligatorio | Placeholder |
|---|---|---|---|
| Nombre completo | `text` | ✅ | "Tu nombre" |
| Email | `email` | ✅ | "tu@email.com" |
| URL del producto / app | `url` | ✅ | "https://tuproducto.com" |
| ¿Qué problema querés resolver? | `textarea` | ✅ | "Contame el principal problema de UX que identificaste en tu producto..." |
| **Newsletter opt-in** | `radio` (SÍ / NO) | ✅ | Ver abajo |

> El campo de URL permite revisar el producto antes de la llamada y hacer el checkup más productivo.

### Newsletter opt-in (UX Checkup)

Mismo diseño que el formulario de contacto — radio buttons explícitos antes del botón de envío:

```
┌─────────────────────────────────────────────────────────────────┐
│  ¿Querés recibir contenido sobre UX, IA y desarrollo            │
│  de negocios digitales?                                          │
│                                                                  │
│  ( ) Sí, quiero recibir ese contenido                            │
│  ( ) No, solo quiero aplicar al Checkup                          │
└─────────────────────────────────────────────────────────────────┘
```

### Botón de envío

```
[Enviar mi aplicación →]
```

### Email de respuesta automática

Al enviar la aplicación, el usuario recibe automáticamente un email de confirmación vía **Brevo** (mismo servicio que la página de contacto). Ver template completo en `04-contact-page.md` sección "Email de respuesta automática — UX Checkup".

El email incluye:
- Confirmación de recepción y plazo de respuesta (48 horas)
- Invitación a leer el blog mientras espera
- Bloque de newsletter **solo si opt-in = SÍ**

### Implementación del envío

Misma lógica que la página de contacto (`04-contact-page.md`):
- **Recomendado:** Brevo (API JS) — maneja envío, email automático y lista de contactos
- Lista en Brevo: "UX Checkup Aplicantes" (segmento separado de contacto general)

### Estado post-envío (Resultado A confirmado)

Reemplaza el formulario con:

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ✓  APLICACIÓN RECIBIDA                                          │
│                                                                  │
│  Recibí tu aplicación. Voy a revisar tu producto                 │
│  y me voy a comunicar con vos en menos de 48 horas.             │
│                                                                  │
│  Chequeá tu bandeja de entrada — te llegará un                   │
│  email de confirmación.                                          │
│                                                                  │
│  [Volver al inicio →]                                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## Paso 2B — No elegible: mensaje honesto + alternativas

Se muestra si alguna respuesta es NO. Aparece debajo de las preguntas.

### Mensaje principal

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ✕  El UX Checkup no es para vos en este momento                │
│                                                                  │
│  El diagnóstico está diseñado para proyectos que ya están        │
│  desarrollados y listos para optimizar. Si todavía estás         │
│  en etapa de idea o validación, hay un mejor punto de            │
│  entrada.                                                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

Estilo: borde 3px, fondo blanco — tono directo pero no negativo.

### Alternativas según la respuesta NO

Mensaje adaptado según qué pregunta respondió NO:

| Pregunta respondida NO | Mensaje alternativo |
|---|---|
| P1 (no tiene producto desarrollado) | "Si todavía estás construyendo tu producto, el servicio que te conviene es **MVP Discovery**. Empezamos desde cero con la estructura correcta." |
| P2 (no usó IA) | "El Checkup está optimizado para productos generados con IA. Para proyectos de desarrollo tradicional, el **UX Audit** es el camino más directo." |
| P3 (no es founder / no tiene autonomía) | "Para que el diagnóstico sea valioso, el responsable de implementar los cambios tiene que estar en el proceso desde el inicio. Si eso cambia, volvé cuando estés listo." |
| P4 (sin presupuesto) | "Si el presupuesto es una limitación ahora, podemos explorar otras opciones. Escribime directamente y buscamos un punto de entrada que tenga sentido." |

> Si hay múltiples NOs, mostrar el mensaje del primer NO encontrado (P1 tiene prioridad).

### Botones de alternativas

```
[Conocer servicios disponibles →]   →  servicios.html
[Escribirme directamente →]         →  contacto.html
```

---

## Lógica JS del formulario

```javascript
// Pseudo-código
const preguntas = [p1, p2, p3, p4];
const elegible = preguntas.every(p => p.valor === 'si');

if (elegible) {
  mostrar('#resultado-elegible');
} else {
  const primerNo = preguntas.find(p => p.valor === 'no');
  mostrar('#resultado-no-elegible');
  mostrar(`#mensaje-alternativo-${primerNo.id}`);
}
```

- El botón "Verificar" se habilita cuando las 4 preguntas tienen respuesta
- Al mostrar el resultado: scroll suave al bloque correspondiente
- El formulario del paso 2A valida en HTML5 + feedback visual antes de enviar

---

## Clases CSS a crear / reutilizar

| Clase | Descripción |
|---|---|
| `.checkup-hero` | Hero de la página |
| `.checkup-form` | Contenedor del formulario de elegibilidad |
| `.checkup-question` | Bloque de una pregunta |
| `.checkup-question__number` | Número de pregunta (Silkscreen, muted) |
| `.checkup-question__text` | Texto de la pregunta |
| `.checkup-answer` | Contenedor de botones SÍ/NO |
| `.checkup-answer__btn` | Botón SÍ o NO (estilo retro, sin shadow por defecto) |
| `.checkup-answer__btn--selected` | Estado seleccionado |
| `.checkup-result` | Bloque de resultado (oculto por defecto) |
| `.checkup-result--eligible` | Resultado elegible (verde-ish / borde positivo) |
| `.checkup-result--rejected` | Resultado no elegible |
| `.checkup-contact-form` | Formulario de contacto del paso 2A |

Reutilizar: `.breadcrumb`, `.section-eyebrow`, `.btn--primary`, `.btn--ghost`, `.footer`, `.navbar`

---

## SEO

```html
<title>Aplicá al UX Checkup gratuito — Diagnóstico de experiencia para tu producto | Uxuaria</title>
<meta name="description" content="Diagnóstico gratuito de UX para productos desarrollados con IA. En 48 horas sabés qué está frenando tu producto — y cómo solucionarlo. 2 cupos por mes." />
<link rel="canonical" href="https://uxuaria.com/ux-checkup.html" />
```

---

## Pendientes antes de implementar

- [ ] Crear cuenta en Brevo y obtener API key (compartida con `contacto.html`)
- [ ] Crear lista "UX Checkup Aplicantes" en Brevo
- [ ] Configurar template de email automático para checkup en Brevo
- [ ] Confirmar copy de los mensajes alternativos con el cliente
- [ ] Decidir si los mensajes alternativos son estáticos o se adaptan por pregunta
- [ ] Actualizar link "Aplicar al UX Checkup" en `index.html` para que apunte a `ux-checkup.html`

## Changelog

> Registra cambios una vez iniciada la implementación.
