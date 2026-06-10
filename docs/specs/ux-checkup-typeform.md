# UX Checkup — Preguntas del Typeform

**Propósito:** Calificar leads, entender el contexto del producto y obtener los datos necesarios para hacer el diagnóstico antes de la llamada de 30 minutos.

**Audiencia:** Founders de startups que construyeron su app con IA (Cursor, Bolt, Lovable, v0, Replit, etc.)

**Lógica de elegibilidad:** Las preguntas 2, 3 y 4 son gates. Si alguna es NO, mostrar mensaje honesto y redirigir a servicios o contacto.

---

## Configuración recomendada en Typeform

- Estilo: una pregunta por pantalla (mode "one question at a time")
- Barra de progreso: visible
- Idioma: Español
- Notificaciones: email a info@uxuaria.com al recibir cada respuesta
- Respuesta automática: activar, con asunto "Recibimos tu aplicación al UX Checkup"

---

## Preguntas

### Pantalla de bienvenida (Welcome Screen)

**Título:** Aplicación al UX Checkup

**Descripción:**
> Tomá 3 minutos para completar esta aplicación. Con esta información voy a revisar tu producto antes de nuestra llamada y el diagnóstico va a ser mucho más concreto.
>
> Son 8 preguntas.

**Botón:** Empezar →

---

### Pregunta 1 — Nombre (Short Text)

**Enunciado:** ¿Cómo te llamás?

**Placeholder:** Tu nombre

**Requerido:** Sí

---

### Pregunta 2 — Herramientas de IA (Multiple Choice · elegibility gate)

**Enunciado:** ¿Cómo construiste tu app?

**Opciones:**
- Principalmente con IA (Cursor, Bolt, Lovable, v0, Replit u otras)
- Combinando IA con desarrollo tradicional
- Solo desarrollo tradicional, sin IA

**Lógica:**
- Si elige la opción 3 → mostrar pantalla de disqualification A (ver abajo)
- Opciones 1 y 2 → continuar

**Requerido:** Sí

---

### Pregunta 3 — Estado del producto (Yes/No · eligibility gate)

**Enunciado:** ¿Tu producto ya tiene usuarios reales o está en producción?

**Opciones:** Sí / No

**Lógica:**
- NO → disqualification B
- SÍ → continuar

**Requerido:** Sí

---

### Pregunta 4 — Rol del aplicante (Yes/No · eligibility gate)

**Enunciado:** ¿Sos el founder o tenés autonomía para implementar cambios en el producto?

**Descripción de ayuda:** Para que el diagnóstico sea valioso, la persona responsable de implementar los cambios tiene que estar en el proceso desde el inicio.

**Opciones:** Sí / No

**Lógica:**
- NO → disqualification C
- SÍ → continuar

**Requerido:** Sí

---

### Pregunta 5 — Problema principal (Multiple Choice)

**Enunciado:** ¿Cuál es el mayor problema de UX que te preocupa en este momento?

**Descripción de ayuda:** Elegí el que más te frena. Podemos hablar de los demás en la llamada.

**Opciones:**
- Los usuarios no completan el onboarding
- Alta tasa de abandono o churn
- Bajo engagement o uso repetido
- La interfaz genera confusión y recibo muchas preguntas de soporte
- No sé si la experiencia es clara — nadie me lo dice
- Otro (campo de texto libre)

**Requerido:** Sí

---

### Pregunta 6 — URL del producto (Website)

**Enunciado:** ¿Cuál es la URL de tu app o producto?

**Descripción de ayuda:** La necesito para revisar el producto antes de la llamada. Si todavía no es pública, podés compartirme un link de staging o un video demo en la próxima pregunta.

**Placeholder:** https://tuproducto.com

**Requerido:** Sí

---

### Pregunta 7 — Contexto adicional (Long Text · opcional)

**Enunciado:** ¿Hay algo más que quieras contarme sobre el producto o el problema?

**Placeholder:** Cualquier contexto extra que me ayude a entender mejor tu situación antes de la llamada. También podés pegar aquí un link a un video demo si el producto no es público.

**Requerido:** No

---

### Pregunta 8 — Email (Email)

**Enunciado:** ¿A qué email te aviso cuando el diagnóstico esté listo?

**Placeholder:** tu@email.com

**Requerido:** Sí

---

### Pantalla de cierre (Thank You Screen)

**Título:** Aplicación recibida ✓

**Descripción:**
> Recibí tu aplicación. Voy a revisar tu producto y me comunico con vos en menos de 48 horas para coordinar la llamada de 30 minutos.
>
> Chequeá tu bandeja de entrada — te va a llegar un email de confirmación.

**Botón:** Volver al inicio → (link a https://uxuaria.com)

---

## Pantallas de disqualification

### Disqualification A — No usó IA

**Título:** El UX Checkup no es para vos en este momento

**Mensaje:**
> El diagnóstico está optimizado para productos construidos con IA. Para proyectos de desarrollo tradicional, el camino más directo es un **UX Audit** completo.
>
> Escribime a info@uxuaria.com y lo coordinamos.

**Botón:** Conocer el UX Audit → (link a https://uxuaria.com/#servicios)

---

### Disqualification B — Producto sin usuarios

**Título:** Todavía no es el momento ideal para el Checkup

**Mensaje:**
> El diagnóstico está diseñado para productos que ya tienen usuarios reales o están en producción. Si todavía estás construyendo, el servicio que te conviene es el **MVP Discovery** — empezamos con la estructura correcta desde el inicio.

**Botón:** Ver MVP Discovery → (link a https://uxuaria.com/#servicios)

---

### Disqualification C — No es founder / sin autonomía

**Título:** Una condición importante no está cumplida

**Mensaje:**
> Para que el diagnóstico sea valioso, la persona responsable de implementar los cambios tiene que estar en el proceso desde el inicio. Si eso cambia, volvé cuando estés en posición de tomar decisiones.
>
> Si querés hablar igual, escribime directamente.

**Botón:** Escribirme → (link a mailto:info@uxuaria.com)

---

## Notas de implementación

- Crear el form en [typeform.com](https://www.typeform.com) y obtener el **embed URL** (formato: `https://form.typeform.com/to/XXXXXXXX`)
- URL del form: `https://8aqt6k328lv.typeform.com/to/lDjbMOFd` — ya configurada en el `data-src` del iframe en `index.html`
- Activar notificaciones por email en Typeform Settings → Notifications
- Opcional: conectar Typeform con una hoja de Google Sheets vía Zapier para llevar registro de aplicantes

## Changelog

> Registrar cambios una vez publicado el form.
