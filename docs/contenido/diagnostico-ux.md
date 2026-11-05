# Exploración de contenido: página de diagnóstico UX

**URL:** `/servicios/investigacion/`
**Estado:** borrador para revisar · diseño desktop en [Figma](https://www.figma.com/design/67hslCn1jUCcFDvSCzRpmP/uxuaria-Web?node-id=146-1115) · sin código
**Última actualización:** 2026-11-03
**Spec:** [15-paginas-servicio](../specs/15-paginas-servicio.md)

Lo marcado **[Confirmar]** es una propuesta que no sale de un dato ya definido.

---

## 1. La idea central

**Diagnóstico gratuito → reporte inicial → servicio completo.**

La página no vende una auditoría: ofrece una primera respuesta útil, sin costo. El reporte le muestra al cliente qué está frenando su producto y, si quiere llegar más hondo o resolverlo, el siguiente paso natural es el servicio completo.

Hay una diferencia de fondo con la referencia: Eleken cobra la auditoría y luego ofrece el rediseño. Nosotros regalamos la primera etapa, así que la página debe resolver una duda que ellos no tienen: **"¿por qué es gratis y cuál es la trampa?"**.

## 2. Qué tomamos de la referencia

Referencia: [Eleken, UX audit service](https://www.eleken.co/ux-audit-service).

| Lo que hace bien | Cómo lo adaptamos |
|---|---|
| Abre con el resultado: qué frena al usuario y qué corregir primero | Hero centrado en el mismo resultado, con la oferta gratuita al frente |
| Describe situaciones en las que el lector se reconoce | Sección "¿Te suena?", con nuestras situaciones |
| Promete una persona que explica, no solo un documento | El reporte se revisa juntos en una llamada |
| Muestra cómo se ve el informe | Pantallas y ejemplos de Mutis UX |
| Explica cómo trabaja, paso a paso | Proceso del diagnóstico con ilustraciones y animaciones |
| Deja claro qué pasa después y que no hay obligación | Comparación de diagnóstico y servicio completo, y "Tú decides" |
| Las preguntas frecuentes responden objeciones reales | Mismo enfoque, con las objeciones de una oferta gratuita |
| Conecta con otros servicios y artículos | Otros servicios y artículos relacionados, en secciones separadas |

**Lo que no tomamos:**

- **Precio y plazos:** el diagnóstico no habla de tiempos; eso se ve en la llamada.
- **Proceso de 9 pasos:** para una oferta gratuita, 5 pasos alcanzan.
- **Prueba social masiva:** no tenemos reseñas de terceros como las de Clutch. Usamos solo evidencia propia y aprobada, sin repetirla.
- **Solo SaaS:** nuestro diagnóstico es para cualquier producto digital.

---

## 3. Borrador de la página

### SEO

- **Title:** Diagnóstico UX gratis para tu producto digital | Uxuaria
- **Description:** Revisamos tu producto digital y te entregamos un reporte inicial con los problemas de experiencia que conviene resolver primero. Gratis y sin compromiso.
- **H1:** va sin "gratis", por decisión de Luis. La palabra queda en el title, la description y el CTA.
- **Intención principal:** diagnóstico UX gratis. **Secundarias:** auditoría UX, investigación de usuarios.

La sección del servicio completo mantiene "investigación de usuarios" en la página, para no perder relevancia con la URL actual.

### Presentación

Ruta: Inicio > Diagnóstico UX

# Diagnóstico UX: descubre qué está frenando a tus usuarios

Revisamos tu producto, te entregamos un reporte inicial con lo que encontramos y te mostramos qué conviene resolver primero. Sin costo y sin compromiso de contratar nada.

**CTA:** Solicita tu diagnóstico gratis · **Secundario:** Descubre cómo funciona

Para SaaS, apps, sitios web y MVP, hechos con IA o con desarrollo tradicional. Revisamos cada solicitud para confirmar que podemos aportarte algo útil.

### ¿Te suena?

## Lo que nos dicen algunos clientes

- **Tenemos visitas pero no logramos que los usuarios se queden.** Tu producto atrae gente, pero la mayoría se va sin entender qué ofreces o sin encontrar una razón para quedarse. Cada visita que se pierde es una inversión que no vuelve.
- **Ya hicimos una revisión con Claude, pero no estamos seguros.** La IA te entregó una lista larga y convincente, pero no sabes qué problemas son reales ni cuáles importan para tu negocio. Sin ese criterio, cuesta decidir por dónde empezar.
- **Construimos muchas funciones, difíciles de entender.** El producto creció función por función y ahora cuesta encontrar lo esencial. Los usuarios nuevos se pierden, y los que ya lo usan aprovechan solo una parte.
- **Hicimos la app con IA, pero no nos gusta su diseño.** Funciona, pero se ve igual a muchas otras y no refleja tu marca. Esa falta de identidad y de criterio puede restarle confianza ante quienes la prueban.
- **Los usuarios se registran, pero nadie usa la app.** El registro funciona, pero la mayoría nunca llega a lo que hace valioso tu producto. Todo queda en una cuenta creada, sin uso y sin motivos para volver.
- **Nunca hemos hablado con nuestros usuarios reales.** Las decisiones se toman con suposiciones o con las opiniones del equipo. Sin saber qué buscan ni qué los frustra, puedes estar invirtiendo en cosas que nadie necesita.

### Qué recibes

## Respuestas claras para saber qué hacer con tu producto

- **Prioridades marcadas para tu backlog.** Sabrás qué resolver y qué simplificar primero, según su impacto.
- **Los puntos donde pierdes usuarios.** Sabrás en qué momento se van y qué los está alejando.
- **Decisiones con menos suposiciones.** Tendrás hallazgos concretos para decidir y sabrás qué conviene preguntarles a tus usuarios.

### Cómo funciona

## De tu primera consulta a tu reporte, en cinco pasos

Luis unió aquí el recorrido del cliente y el proceso interno.

**[Confirmar]** Hay que validar que así se hace el diagnóstico gratuito.

| Paso | Texto | Gráfico en Figma |
|---|---|---|
| 1 | **Cuéntanos de tu producto.** Responde unas preguntas rápidas para que podamos evaluar tu caso. Si tu proyecto califica, conversamos 30 minutos. | Formulario conectado a una llamada de 30 minutos |
| 2 | **Definimos el foco.** Con lo que nos cuentas en la llamada, elegimos el flujo, el objetivo y el tipo de usuario. | Mapa de pantallas, donde se destaca un solo recorrido |
| 3 | **Recorremos el flujo como un usuario.** Avanzamos pantalla por pantalla, registramos dónde hay dudas, pasos de más o errores, y marcamos cada problema donde ocurre. | Pantallas en línea, con puntos numerados |
| 4 | **Evaluamos cada problema.** Definimos su severidad, el criterio que incumple y cómo afecta a tus usuarios y a tu negocio. | Un punto conectado a su tarjeta de hallazgo |
| 5 | **Priorizamos y armamos tu reporte.** Ordenamos los hallazgos para que sepas qué resolver primero y revisamos el reporte contigo. | Lista de hallazgos ordenada por prioridad |

**Dirección visual:** los cinco gráficos son los estados de una sola animación ligada al scroll.

**Condiciones:** los cinco pasos se leen completos sin animación, y quien tenga activada la reducción de movimiento ve las ilustraciones fijas.

**CTA:** Solicita tu diagnóstico gratis

### Así se ve tu reporte

## Cada problema, sobre la pantalla donde ocurre

Tu reporte no es una lista suelta de opiniones. Cada hallazgo señala dónde ocurre, qué tan grave es y qué recomendamos hacer.

**Visual:** pantallas y ejemplos de Mutis UX. **[Confirmar]** La captura que usamos hoy viene de la landing de Lupa UX, el nombre anterior de Mutis UX, y no muestra el reporte: hay que hacer las pantallas en español estándar, con un producto de ejemplo o con autorización para mostrarlo. La página no menciona la herramienta, así que las pantallas tampoco muestran su nombre ni su logo.

- **Tus pantallas, marcadas.** Cada hallazgo aparece numerado en el lugar exacto del producto.
- **Severidad.** Para distinguir lo urgente de lo que puede esperar.
- **El criterio detrás.** La heurística que explica por qué es un problema.
- **Una recomendación.** Qué hacer para resolverlo y cómo medirlo.

Ejemplo, tomado de la captura actual:

> **Hallazgo H1 · Severidad 3, mayor**
> El botón principal no responde al tocarlo.
> **Heurística:** visibilidad del estado del sistema.
> **Recomendación:** corregir el enlace y medir los clics.

### Después del reporte

## Y después del diagnóstico, tú decides

El reporte es tuyo: puedes llevarlo a tu equipo y resolverlo por tu cuenta. Si quieres llegar más hondo o que lo resolvamos contigo, el siguiente paso es el servicio completo.

**Servicio pro: investigación con usuarios reales.** El diagnóstico te muestra lo que vemos como expertos. Con el servicio completo también escuchamos y observamos a tus usuarios:

- **Entrevistas.** Conversamos con tus usuarios para entender qué buscan, qué los frustra y por qué toman sus decisiones.
- **Pruebas de usabilidad.** Vemos cómo usan tu producto en tareas reales y dónde se traban.

Así, cada decisión se apoya en evidencia y no en suposiciones.

**[Confirmar]** Los entregables salen de la página actual de investigación y del caso Greenify.

| | Diagnóstico gratuito | Servicio completo (pro) |
|---|---|---|
| **Alcance** | Tu flujo más importante | Los flujos o el producto completo, según lo acordado |
| **Método** | Revisión experta | Evaluación heurística e investigación con usuarios reales: entrevistas y pruebas de usabilidad |
| **Resultado** | Reporte inicial con prioridades | Síntesis de entrevistas, informe de usabilidad, mapa de experiencia, perfiles de usuario, mapa de fricción y backlog priorizado |
| **Después** | Tú decides cómo seguir | Podemos diseñar y construir la solución contigo |
| **Inversión** | Gratis | Propuesta según el alcance |

### Caso de éxito

## Greenify: +40 problemas de conversión y retención que el equipo no sabía que tenía

Greenify es una app para medir y compensar la huella de carbono. Tenía una propuesta de valor clara, un modelo de monetización y usuarios activos, pero la conversión no cerraba, la retención era frágil y el equipo no sabía en qué punto se rompía la experiencia.

**Encontramos los tres momentos en los que la app perdía usuarios:**

- **En la calculadora de huella,** donde los usuarios abandonaban y las unidades confusas generaban datos incorrectos.
- **Al llegar al pago externo,** porque la pasarela aparecía en inglés, sin aviso, y la confianza se derrumbaba.
- **Después de pagar,** porque nada invitaba a volver.

**Lo que recibió el equipo:**

- **+40 problemas de usabilidad,** cada uno con su impacto en el negocio y una recomendación concreta.
- **3 horizontes de implementación:** mejoras rápidas, mediano plazo y hoja de ruta.
- **2 proto-personas** como base para sus próximas decisiones de producto.

Este caso fue un análisis UX completo, no un diagnóstico gratuito.

**CTA:** Leer el caso completo → `/portafolio/greenify`

**Evidencia de apoyo:**

- **+15 años** diseñando productos digitales para Latinoamérica, Estados Unidos y Europa.
- **Testimonio [Confirmar]:** usar uno ya aprobado, sin traducirlo ni cambiarlo sin autorización.

**Notas para la página:**

- Las cifras salen del caso publicado. No mencionan resultados posteriores a la implementación, así que la página no promete mejoras de conversión. **[Confirmar]** si hay resultados que se puedan publicar.
- El caso no menciona entrevistas ni pruebas de usabilidad, así que no se presenta como ejemplo de ellas.
- Los plazos de los horizontes (1–2 y 3–6 semanas) se omiten aquí, para no confundirlos con tiempos del diagnóstico.

### Lo que pedimos a cambio

## ¿Por qué es gratis?

Porque es la mejor forma de mostrarte cómo trabajamos. Si encontramos algo que podamos resolver juntos, te lo proponemos. Si no, te quedas con el reporte.

A cambio, te pedimos tres cosas:

- Si el diagnóstico te resulta útil, 2 o 3 líneas de testimonio que podamos publicar con tu nombre.
- Permiso para escribir sobre lo que encontremos, sin nombrar tu producto. Si quisiéramos nombrarlo, te pediríamos autorización antes.
- Un usuario de prueba, si tu producto requiere inicio de sesión.

### Preguntas frecuentes

**¿Qué es un diagnóstico UX?**
Es una revisión de tu producto para detectar qué problemas de experiencia frenan a tus usuarios y cuáles conviene resolver primero.

**¿Es realmente gratis?**
Sí. El diagnóstico y el reporte inicial no tienen costo. Solo te pedimos lo que se indica en "¿Por qué es gratis?".

**¿Todas las solicitudes reciben un diagnóstico?**
No. Revisamos cada solicitud y hacemos el diagnóstico cuando vemos que podemos aportar algo útil a tu producto en este momento. Si no es el caso, te escribimos para contártelo.

**¿Tengo que contratarlos después?**
No. El diagnóstico no te compromete a nada y el reporte es tuyo.

**¿Sirve para mi producto?**
Sí, si es un producto digital: SaaS, app, sitio web o MVP, hecho con IA o con desarrollo tradicional. **[Confirmar]** si también aplica a productos sin lanzar.

**¿Cuál es la diferencia entre el diagnóstico y una auditoría UX completa?**
El diagnóstico es una primera lectura de lo más importante. El servicio completo cubre más flujos y suma investigación con usuarios reales, mediante entrevistas y pruebas de usabilidad.

**¿Reemplaza las pruebas con usuarios?**
No. El diagnóstico es una revisión experta. Las entrevistas y las pruebas de usabilidad con usuarios reales son parte del servicio completo.

**¿Qué necesitan de mí?**
La dirección de tu producto, una llamada de 30 minutos y un usuario de prueba si requiere inicio de sesión. Si tienes datos de uso, también ayudan. **[Confirmar]**

**¿Y si no tengo analíticas?**
Podemos hacer el diagnóstico igual: recorremos el producto como lo haría un usuario. **[Confirmar]**

**¿El reporte incluye diseños?**
No. Incluye hallazgos y prioridades. El diseño de las soluciones se define dentro del servicio completo.

**¿Quién hace el diagnóstico?**
Luis Carlos Romero León, con más de 15 años diseñando productos digitales para Latinoamérica, Estados Unidos y Europa. **[Confirmar]**

### Otros servicios

## Otras formas en las que podemos ayudarte

Usa las mismas filas de la home, sin descripción:

- **Diseño de MVP para startups desde 0** → `/servicios/mvp/`
- **Sistemas de diseño potenciados con IA** → página nueva
- **Rescatamos tu MVP hecho con IA** → `/ai-mvp-rescue`

### Artículos relacionados

## Sigue aprendiendo sobre UX

- **[3 cosas que el diseño UX puede enseñarle a tu negocio (aunque no quieras escucharlas)](/blog/3-cosas-ux).** Observar a tus usuarios, simplificar y empatizar de verdad.
- **[6 preguntas y respuestas rápidas para entender el UX](/blog/6-preguntas-ux).** Qué es el UX y cómo puede mejorar tu producto, sin tecnicismos.
- **[¿Por qué las apps hechas con IA se parecen tanto?](/blog/prompt-ear-no-es-disenar).** Lo que se pierde al construir solo con prompts, sin estrategia.

**Notas para la página:** los resúmenes están reescritos, porque el de "3 cosas" usa voseo, y su título queda sin el emoji. Los artículos mismos aún no están alineados al español estándar.

### Cierre

## Descubre qué está frenando a tus usuarios

Cuéntanos de tu producto y evaluamos si podemos hacer tu diagnóstico gratuito.

**CTA:** Solicita tu diagnóstico gratis

---

## 4. Preguntas para Luis

1. **¿Qué trae exactamente el reporte inicial?** ¿Un flujo o más? ¿Es un documento, un PDF o un Figma?
2. **Servicio completo.** Ya incluye entrevistas y pruebas de usabilidad con usuarios reales. Falta saber si también incluye diseño e implementación, y si "Pro" es su nombre público o solo describe su nivel.
3. **¿Hay una o dos llamadas?** El flujo actual tiene dos: una inicial y otra para presentar el reporte. El borrador mantiene ambas.
4. **¿Mantenemos "nosotros" y el trato de "tú"?** El borrador los usa porque así habla la home.
5. **Greenify.** ¿Hay resultados posteriores que se puedan publicar? El caso también muestra dos años distintos: 2025 en el encabezado y 2024 en la ficha.
6. **Animación del proceso.** Cambia la regla de "solo hovers" de estas páginas. Falta definir con qué técnica se construye.
