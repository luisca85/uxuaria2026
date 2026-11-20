---
title: "Guía completa para diagnosticar la experiencia de tus usuarios en tu app o web"
subtitle: "¿Cómo saber si tu app está lista para ser usada por usuarios reales?"
seoTitle: "Diagnóstico UX: ¿tu app está lista para usuarios reales?"
description: "Guía para revisar tu app o web antes de lanzarla si no eres diseñador: evaluación con expertos, test con usuarios y accesibilidad, con checklists."
category: "UX · DIAGNÓSTICO"
pubDate: 2026-11-20
readingTime: 17
# Generic cover until the final one (1600 x 900, OG 1200 x 630); hidden in the header
cover:
  src: "/images/og-uxuaria.jpg"
  width: 1200
  height: 630
  alt: "Guía completa para diagnosticar la experiencia de tus usuarios en tu app o web"
ogImage: "/images/og-uxuaria.jpg"
showCover: false
draft: false
type: guide
summary:
  - "Qué se puede diagnosticar con certeza: usabilidad, accesibilidad y experiencia."
  - "Cómo elegir la pregunta con los cuatro cuadrantes del conocimiento en UX."
  - "Los tres métodos del triángulo técnico: expertos, usuarios y normas de accesibilidad."
  - "Checklists para revisar tu app antes de probarla con usuarios reales."
  - "Cómo priorizar los hallazgos y medir si la corrección funcionó."
---

Esta guía te ayuda a responder una pregunta concreta: si tu app o tu web está lista para que la usen personas reales. Un diagnóstico UX te dice qué tan fácil de usar y qué tan accesible es tu producto, y con eso decides qué corregir primero. Aquí explico los tres métodos que uso en Uxuaria para hacerlo y cuándo conviene cada uno.

Está escrita para quien está construyendo su propio producto: puedes estar programando con ayuda de IA (vibecoding), desarrollando solo o con un equipo pequeño, o liderando un producto sin formación en diseño. Es una guía de uso cotidiano, para revisar tu app antes de lanzarla y cada vez que le agregas algo importante. Cada término se explica la primera vez que aparece y al final hay un glosario.

## Usabilidad, accesibilidad y experiencia: qué se puede diagnosticar con certeza

Hoy seguimos dentro del paradigma de los dispositivos de escritorio y los dispositivos móviles. En ese paradigma ya hay patrones de uso que se repiten, y existe un cuerpo de conocimiento acumulado que permite a un grupo de expertos predecir qué elementos de una interfaz producen buena o mala usabilidad. Esa es la base de un diagnóstico. Si el paradigma cambia, esta guía cambia con él.

Primero conviene separar tres conceptos, porque se suelen mezclar:

<div class="post-table" role="region" aria-label="Tabla: usabilidad, accesibilidad y experiencia" tabindex="0">

| Concepto | Qué es | Qué tan firme es su diagnóstico |
| --- | --- | --- |
| Usabilidad | Qué tan fácil es usar un producto para lograr un objetivo | Alta. Se puede predecir con expertos y confirmar con usuarios |
| Accesibilidad | Que personas con distintas condiciones puedan usar el producto | Alta. Se mide contra normas como las WCAG |
| Experiencia | La suma de acontecimientos, percepciones y emociones que ocurren durante la vivencia de un producto digital | Menor. Depende de lo que damos al producto y de lo que la persona trae de su mundo |

</div>

Cuando hablo de experiencia me refiero a la que ocurre dentro del uso de un producto digital, y no a cualquier experiencia de la vida. La cruzan factores personales, ambientales y de aprendizaje que no siempre podemos controlar, porque cada persona llega con su propio mundo. Por eso en un diagnóstico hablamos con más certeza de usabilidad y accesibilidad que de experiencia. En general, a mayor usabilidad y mayor accesibilidad, mejor experiencia. Los dos factores están muy ligados, aunque la relación no se cumple en todos los casos. Esta distinción es el criterio de trabajo de Uxuaria.

Una de las herramientas para observar la experiencia es el user journey (recorrido del usuario): un mapa de las etapas por las que pasa una persona al usar el producto, con lo que hace y lo que siente en cada una. Lo retomo más abajo, porque se puede usar dentro de una evaluación con expertos.

## Antes de auditar: la pregunta que quieres responder

Antes de abrir la app conviene saber qué tipo de pregunta necesitas responder. Para eso uso los cuatro cuadrantes del conocimiento en UX. Su origen es la distinción entre lo conocido y lo desconocido que Donald Rumsfeld popularizó en 2002, y existen versiones aplicadas a diseño y a requisitos de producto, como el Knowns and Unknowns Framework del UX Strategy Kit de Merck. La Ventana de Johari (Luft e Ingham, 1955) es un antecedente parecido, aunque cruza lo que sabe una persona de sí misma con lo que saben los demás. La adaptación a diagnóstico UX es de Uxuaria.

<figure class="article-figure"><img class="article-figure__img" src="/images/blog/auditoria-ux/cuadrantes-conocimiento-ux.svg" width="800" height="620" alt="Cuatro cuadrantes del conocimiento en UX: lo que sabemos que sabemos, lo que sabemos que desconocemos, lo que desconocemos que sabemos y lo que no sabemos que desconocemos, cada uno con su definición y un ejemplo" loading="lazy"></figure>

Preguntas disparadoras para ubicar tu caso:

- ¿Qué dato tengo hoy que pueda mostrar con una cifra? (primer cuadrante)
- ¿Qué sospecho, pero todavía no comprobé? ¿Dónde se pierde la gente? (segundo)
- ¿Quién en mi empresa conoce las quejas y los errores más frecuentes, y le llegó esa información a quien diseña? (tercero)
- ¿Quién usa de verdad mi producto, cómo y en qué situaciones? ¿Habrá usos que ni imagino? (cuarto)

Cuando sepas en qué cuadrante está tu duda, define el flujo a revisar (por ejemplo, el registro de un cliente nuevo), su objetivo y el tipo de usuario.

## El triángulo técnico: tres métodos que se complementan

Existen muchas pruebas, tests y modelos para diagnosticar un producto. Aquí presento los tres que considero más importantes, y que juntos forman el triángulo técnico para saber si una web o una app es accesible y usable para su público objetivo, es decir, las personas a las que está dirigida.

<figure class="article-figure"><img class="article-figure__img" src="/images/blog/auditoria-ux/triangulo-diagnostico-ux.svg" width="800" height="660" alt="Triángulo con tres vértices numerados: evaluación heurística con expertos, test con usuarios y accesibilidad con normas. En el centro, web o app accesible y usable para tu público objetivo" loading="lazy"></figure>

<div class="post-table" role="region" aria-label="Tabla: el triángulo técnico" tabindex="0">

| Método | Quién evalúa | Qué responde | Límite |
| --- | --- | --- | --- |
| Evaluación con expertos (heurística) | Uno o varios profesionales con experiencia | ¿Qué problemas de uso son previsibles? | Predice problemas. No confirma que las personas los sufran |
| Test con usuarios | Personas reales del público objetivo | ¿Qué pasa cuando lo usan en su contexto? | Muestra lo que ocurre con esas personas y esas tareas |
| Accesibilidad con normas y regulaciones | Especialistas con normas (WCAG), herramientas y revisión humana | ¿Puede usarlo cualquier persona, con sus distintas condiciones? | Las herramientas automáticas detectan solo una parte de los problemas |

</div>

Ningún método reemplaza a los otros. Nielsen Norman Group advierte que la evaluación heurística no puede sustituir la investigación con usuarios. Por eso conviene combinarlos.

## Evaluación con expertos (heurística)

Es la evaluación que hace una persona o un grupo de profesionales con experiencia en identificar patrones de uso. Los expertos comparan el producto con principios ya identificados, que se llaman heurísticas. Hay muchos conjuntos de heurísticas y los más conocidos son las [10 de Nielsen](https://www.nngroup.com/articles/ten-usability-heuristics/). Para tiendas online, el Baymard Institute usa sus propias guías, basadas en tests con usuarios.

El método lo propusieron Nielsen y Molich en 1990. Nielsen recomienda normalmente de tres a cinco evaluadores, porque cada persona encuentra problemas distintos. Cada uno revisa por su cuenta, en sesiones de una o dos horas, y los resultados se juntan después.

El trabajo tiene tres pasos: encontrar el patrón, identificar qué heurística se incumple y cruzarlo con un nivel de severidad. La severidad combina frecuencia, impacto y persistencia del problema, y Nielsen la califica así:

<div class="post-table" role="region" aria-label="Tabla: niveles de severidad de Nielsen" tabindex="0">

| Nivel | Significado |
| --- | --- |
| 0 | No es un problema de usabilidad |
| 1 | Cosmético |
| 2 | Menor, prioridad baja |
| 3 | Mayor, prioridad alta |
| 4 | Catástrofe, debe resolverse antes del lanzamiento |

</div>

Nielsen sugiere pedir las calificaciones después de la sesión, con la lista completa de problemas, y usar el promedio de tres evaluadores.

Sobre cada hallazgo, las recomendaciones pueden apuntar a la interfaz, al producto o al contenido. Es común que salgan muchas de interfaz, aunque pueden atacar cualquier elemento del producto.

Dentro de la evaluación con expertos también se puede trabajar con el user journey. Al mapear el recorrido, cada problema queda ubicado en la etapa donde aparece, y se ve en qué momentos la persona duda, se frustra o abandona. Así la evaluación mira la experiencia de punta a punta y no solo pantalla por pantalla.

En [Mutis UX](/mutisux/), la herramienta que desarrollé en Uxuaria, puedes marcar cada hallazgo sobre su pantalla, asignarle una severidad de 0 a 4, relacionarlo con una de las 10 heurísticas, mapear el user journey y compartir un informe con tu cliente. Cubre la parte de usabilidad y de experiencia. La parte de accesibilidad conviene revisarla aparte, con las normas y las herramientas que vemos más abajo.

Un límite que conviene tener presente: los evaluadores trabajan en un escenario controlado y no usan el producto con la urgencia ni en el contexto real de una persona usuaria. Ahí entra el test con usuarios.

## Checklist: errores comunes antes de probar con usuarios reales

Antes de sentar a personas reales frente a tu app, conviene sacar los errores que cualquiera puede detectar. Si no lo haces, el test se va a gastar en problemas evidentes y no va a llegar a lo que solo los usuarios pueden mostrarte. Esta lista agrupa los errores más comunes según la heurística con la que se relacionan. Los nombres de las heurísticas son los de [Nielsen](https://www.nngroup.com/articles/ten-usability-heuristics/). Cada punto se cumple o no se cumple. Marca los que cumples y trata los que no como un hallazgo, con su severidad. La lista de accesibilidad básica está en la sección de accesibilidad.

<div class="post-note" role="note">

> **Antes de usar la lista:** no todos los puntos son algo que tengas que corregir. Un diseño puede resolver una misma necesidad con distintos patrones, y por eso aplicas los puntos que correspondan a tu diseño. Esta lista es una versión abreviada para que la sumes a tu sistema de chequeo. Si la dejas en manos de un diseñador experto, el resultado es mucho mejor, porque él decide qué aplica en tu caso.

</div>

### Login y registro

Heurísticas relacionadas: prevención de errores, ayuda para reconocer y recuperarse de errores, consistencia y estándares.

- [ ] Pides crear una cuenta solo cuando hace falta.
- [ ] Los botones de iniciar sesión y crear cuenta se encuentran a primera vista y se distinguen entre sí.
- [ ] Los requisitos de la contraseña se ven antes de escribirla y son razonables.
- [ ] La persona puede mostrar la contraseña que escribió.
- [ ] Existe un camino claro para recuperar la contraseña y alguien lo probó de punta a punta.
- [ ] Se puede pegar la contraseña y usar un gestor de contraseñas.

### Onboarding

Heurísticas relacionadas: ayuda y documentación, reconocimiento antes que recuerdo, visibilidad del estado del sistema.

- [ ] La primera pantalla deja claro qué es el producto y qué puede hacer la persona ahora.
- [ ] La tarea principal se completa sin leer ningún tutorial.
- [ ] Si hay tutorial, es breve y se puede saltar.
- [ ] La ayuda aparece en contexto, en el momento en que se necesita.
- [ ] Solo pides los datos necesarios para empezar.
- [ ] La persona sabe en qué paso está y cuántos faltan.
- [ ] Después del primer paso hay una pantalla inicial útil, con orientación sobre qué hacer.

### Formularios y errores

Heurísticas relacionadas: prevención de errores, ayuda para reconocer, diagnosticar y recuperarse de errores.

- [ ] Cada campo tiene su etiqueta visible y el formato esperado (teléfono, fecha, código postal).
- [ ] Los mensajes de error aparecen junto al campo y dicen qué pasó y cómo resolverlo.
- [ ] Cuando hay un error, lo que la persona ya escribió no se borra.
- [ ] Los errores se previenen con valores por defecto, teclado adecuado en el móvil y confirmación antes de acciones que no se pueden deshacer.
- [ ] No se pide dos veces el mismo dato en un mismo proceso.

### Navegación y control

Heurísticas relacionadas: control y libertad del usuario, consistencia y estándares, flexibilidad y eficiencia de uso.

- [ ] En cada pantalla hay una salida clara: volver, cancelar o deshacer.
- [ ] Al volver o cancelar, la persona no pierde lo que ya hizo.
- [ ] La persona sabe dónde está: título visible y sección del menú resaltada.
- [ ] Lo mismo se llama y se ve igual en todas las pantallas.
- [ ] Los íconos llevan texto o son universales.
- [ ] Los elementos táctiles tienen un tamaño cómodo para tocarlos.

### Estados y respuestas del sistema

Heurística relacionada: visibilidad del estado del sistema.

- [ ] Cada acción importante da una respuesta visible: cargando, éxito o error.
- [ ] Las esperas largas muestran progreso.
- [ ] Los casos vacíos, sin conexión y de error tienen un diseño pensado, sin pantallas en blanco.

### Lenguaje y contenido

Heurística relacionada: correspondencia entre el sistema y el mundo real.

- [ ] Los textos usan el idioma de tus usuarios, sin jerga interna ni términos técnicos.
- [ ] Los botones dicen qué va a pasar ("Crear cuenta" en lugar de "Enviar").
- [ ] Las fechas, monedas y formatos son los del país de tu público.

### Preparación del test

- [ ] El flujo principal se recorrió completo en el celular y en el escritorio, sin fallas técnicas que frenen la prueba.
- [ ] Las cuentas y los datos de prueba están listos.
- [ ] Las tareas que le vas a pedir a cada persona están escritas.

Esta lista es un primer filtro y no reemplaza la evaluación con expertos. Un especialista va a encontrar problemas que aquí no aparecen, y las personas que prueben tu app van a mostrarte lo que ninguna lista anticipa.

## Test con usuarios

Los tests con usuarios tienen algo de magia, porque ahí vemos el producto en su contexto de uso. Muchas veces usamos una app en lugares que nunca imaginamos: pidiendo un Uber en la calle, de noche o de día, armando un calendario en una reunión llena de gente, sacando una foto en un concierto. En cada escenario las personas se comportan distinto, y eso un experto en un escenario controlado no lo ve.

Yo lo comparo con el Discovery Channel: un científico que observa qué pasa en la naturaleza. La actitud correcta es observar. No se trata de guiar al usuario para validar nuestra app ni de que no cometa errores. Lo ideal es que salgan todos los errores posibles y todas las cosas difíciles de usar.

Cómo hacerlo bien:

- Elige tareas reales, como "busca el producto más económico" o "pide un presupuesto".
- No ayudes. Si la persona se traba, esa es la información que buscas.
- Anota dónde duda, qué esperaba que pasara y qué hace en cambio.
- Registra cada problema con su severidad, igual que en la evaluación con expertos.

**Cuántas personas.** En un estudio cualitativo con un solo tipo de usuario, cinco participantes encuentran cerca del 85% de los problemas, según Nielsen Norman Group. Su consejo es repartir el presupuesto en varias rondas pequeñas, con ajustes entre una y otra, y no gastarlo en un solo estudio grande. Si hay grupos de usuarios muy distintos, hay que testear con cada grupo. Cuando lo que buscas son métricas, como tasa de éxito o tiempo en la tarea, la recomendación de NN/g sube a unos 40 participantes.

**Métricas.** Dos usadas con frecuencia son el SUS, un cuestionario de 10 preguntas con puntaje de 0 a 100 cuyo promedio es 68, y el SEQ, una pregunta por tarea en escala de 1 a 7 con promedio de 5,5 (MeasuringU). Con muestras de cinco personas el SUS no es un dato firme y no conviene presentarlo como tal.

## Accesibilidad: WCAG y marco legal

La accesibilidad es distinta de la usabilidad. Su objetivo es garantizar que las interfaces puedan usarse en diferentes condiciones del usuario: personas con problemas de visión o de audición, adultos mayores, niños, entre otras. En varios países esto tiene marcos regulatorios, incluso legales.

El marco técnico de referencia son las WCAG (Web Content Accessibility Guidelines, pautas de accesibilidad para el contenido web), publicadas por el W3C, el organismo que define los estándares de la web. Las WCAG se organizan en cuatro principios (perceptible, operable, comprensible y robusto) y tres niveles de conformidad: A, AA y AAA. El nivel AA es el que exigen la mayoría de las normas revisadas. La versión 2.2 es Recomendación del W3C desde el 5 de octubre de 2023: suma 9 criterios nuevos (por ejemplo, un tamaño mínimo de 24 por 24 píxeles para los objetivos táctiles) y elimina el criterio 4.1.1.

Con las WCAG puedes, por ejemplo, medir el contraste de un texto frente a su fondo, saber si es legible y comparar cuál de dos opciones funciona mejor.

**Marco legal (resumen verificado con fuentes oficiales; no es asesoría legal):**

<div class="post-table" role="region" aria-label="Tabla: marco legal de accesibilidad" tabindex="0">

| País o región | Norma | Qué exige y a quién |
| --- | --- | --- |
| Argentina | Ley 26.653, Decreto 656/2019, Disposición ONTI 6/2019 | Pautas WCAG 2.0. Alcanza al Estado y a privados comprendidos en la ley. La ONTI mantiene WCAG 2.0 como norma técnica, sin actualización verificada a 2.1 o 2.2 |
| Colombia | Resolución MinTIC 1519 de 2020 | WCAG 2.1 nivel AA desde el 1 de enero de 2022, para sujetos obligados por la Ley 1712 de 2014 |
| Chile | Decreto N°1 de 2015 | Norma técnica para sitios web del Estado. No verificamos obligación para privados |
| Brasil | Lei 13.146/2015, art. 63 | Accesibilidad según las mejores prácticas internacionales para empresas con sede o representación en Brasil. El artículo no fija una norma técnica ni sanción propia |
| México | Ley General para la Inclusión de las Personas con Discapacidad, art. 32 | Información en formatos accesibles. Existe una iniciativa de 2025, no vigente |
| Unión Europea | Directiva (UE) 2019/882 (European Accessibility Act) | Aplica desde el 28 de junio de 2025 a productos y servicios definidos, como e-commerce y banca. Relevante si vendes a la UE |

</div>

### Checklist de accesibilidad básica

Es una primera pasada con las WCAG como criterio. Marca lo que cumples y trata lo que no como un hallazgo.

- [ ] El flujo principal se completa solo con teclado y siempre se ve dónde está el foco.
- [ ] El contraste entre el texto y el fondo se midió con una herramienta.
- [ ] Las imágenes que informan tienen texto alternativo.
- [ ] El texto se puede ampliar hasta el 200% sin perder contenido ni funciones.
- [ ] La ayuda está siempre en el mismo lugar.
- [ ] Una persona recorrió el flujo principal con un lector de pantalla.

## El evaluador humano y los límites de las herramientas automáticas

Existen muchos evaluadores automáticos de accesibilidad y de usabilidad, y también agentes de inteligencia artificial que hacen una pasada por tu sitio y te entregan un listado. Pueden ayudar a detectar problemas. Mi sugerencia es confiar a medias: úsalos, sabiendo que no van a detectar todo lo principal y que entregan un promedio, una suma de lo básico.

Lo que respalda esto hoy:

- El manual técnico del gobierno británico (GDS Way) indica que las pruebas automáticas solo pueden encontrar alrededor del 30% de los problemas de accesibilidad probables, y que ninguna reemplaza la prueba manual y con personas usuarias.
- En un experimento de GDS de 2017 sobre una página llena de barreras, 42 de 143 barreras (29%) no fueron detectadas por ninguna de las herramientas probadas. La mejor detectó el 37%.
- El W3C aclara que ninguna herramienta puede determinar por sí sola si un sitio es accesible: hace falta evaluación humana.

**Sobre los evaluadores con inteligencia artificial.** Baymard Institute probó a ChatGPT-4 haciendo una auditoría UX de 12 páginas web y comparó sus sugerencias con las de especialistas humanos ([Baymard](https://baymard.com/research-articles/gpt-ux-audit)):

- Detectó el 14,1% de los problemas UX de la página real y el 25,5% de los que se veían en la captura.
- El 19,9% de sus sugerencias eran correctas y el 80,1% eran falsos positivos. Un 8,9% probablemente eran perjudiciales.

Baymard también reporta que las pruebas públicas de herramientas de IA y de prompts prearmados muestran una precisión de 50% a 75%, o ni siquiera la documentan ([Baymard](https://baymard.com/research-articles/ai-heuristic-evaluations)). Baymard y NN/g, entre otros, desaconsejan usar IA generativa como fuente principal para decidir qué cambiar en un sitio ([Baymard](https://baymard.com/blog/ai-heuristic-evaluations)).

Hay dos matices. Baymard ofrece su propia herramienta, UX-Ray, y publica que alcanza 95% de precisión frente a expertos humanos. Es una cifra de la empresa, y la herramienta se apoya en su base de investigación propia y está pensada sobre todo para e-commerce. Además, otros estudios dan resultados distintos: uno con GPT-4o encontró solo el 21,2% de los problemas que identificaron los expertos ([arXiv](https://arxiv.org/html/2506.16345v1)), y otro con un sistema sintético reportó 73% y 77% en dos apps, más que cinco evaluadores humanos juntos ([arXiv](https://arxiv.org/abs/2507.02306)). El resultado depende de cómo se configure el sistema, y por eso mi recomendación sigue siendo usarlos como primera pasada y revisar con un evaluador humano.

## Priorizar, informar y medir si funcionó

Un hallazgo solo sirve si lleva a una decisión. Para que un informe lo logre:

- Cada hallazgo va numerado sobre la pantalla exacta, con la heurística o el criterio de accesibilidad que incumple.
- Se agrupan por severidad, para distinguir lo urgente de lo que puede esperar.
- Cada uno trae una recomendación (de interfaz, de producto o de contenido) y una forma de medir si la corrección funcionó.
- Se incluye un mapa del recorrido del usuario (user journey) que muestra en qué etapa aparece cada problema.

Para ordenar el trabajo, la severidad es el primer filtro. Después se mira el esfuerzo de resolverlo y el impacto en el objetivo del flujo. Esa matriz de impacto y esfuerzo es una práctica de mercado, no un estándar.

Para saber si una corrección funcionó, Nielsen recomienda volver a testear después del rediseño. Si quieres afirmar una mejora con números (tasa de éxito, SEQ, SUS), la muestra debe ser cuantitativa, de unos 40 participantes según NN/g.

También conviene separar el diagnóstico del diseño de la solución, porque son trabajos distintos, y cerrar con una lista priorizada que el equipo pueda llevar a su backlog.

## Hazlo tú o déjalo en manos de expertos

Puedes hacer un primer test básico siguiendo los checklists de esta guía. Te va a mostrar los errores más evidentes antes de probar tu app con usuarios reales.

Si prefieres dejarlo en manos de expertos, [contáctanos](/servicios/investigacion/). Te hacemos un diagnóstico gratuito y te damos información sobre cuánto cuesta, cuánto tarda y cuándo conviene hacerlo en tu caso. Si quieres hacer tú mismo una evaluación heurística con tu equipo, puedes apoyarte en [Mutis UX](/mutisux/).

<aside class="article-callout" aria-label="Diagnóstico UX gratis"><span class="badge">Diagnóstico UX gratis</span><p class="article-callout__title">¿Prefieres dejarlo en manos de expertos?</p><p class="article-callout__text">Revisamos tu app o web y te decimos qué corregir primero, cuánto cuesta y cuánto tarda. Sin costo y sin compromiso.</p><a class="article-callout__link" href="/diagnostico/?cta=blog_guia_diagnostico_callout" data-track="blog_guia_diagnostico_callout_diagnostico">Pide tu diagnóstico UX gratis <img src="/images/home/arrow-up-right.svg" width="20" height="20" alt=""></a><p class="article-callout__text">¿Lo quieres hacer tú con tu equipo? <a href="/mutisux/" data-track="blog_guia_diagnostico_callout_mutisux">Haz tu evaluación heurística con Mutis UX</a>.</p></aside>

## Glosario de términos

- **Accesibilidad.** Capacidad de un producto de ser usado por personas con distintas condiciones, como baja visión, sordera o movilidad reducida.
- **Backlog.** Lista priorizada de tareas pendientes de un equipo de producto o desarrollo.
- **Criterio de conformidad.** Requisito verificable dentro de las WCAG.
- **Evaluación heurística.** Inspección de una interfaz por un pequeño grupo de evaluadores que la comparan con principios de usabilidad.
- **Experiencia (UX).** Suma de acontecimientos, percepciones y emociones que ocurren durante la vivencia de un producto digital. No se refiere a cualquier experiencia de la vida.
- **Flujo.** Camino que sigue una persona para cumplir una tarea, como registrarse o comprar.
- **Hallazgo.** Cada problema encontrado en una auditoría, con su ubicación, severidad y recomendación.
- **Heurística.** Principio general de usabilidad que se usa como regla de inspección.
- **Lector de pantalla.** Software que lee en voz alta lo que hay en la pantalla. Lo usan, entre otras, las personas ciegas.
- **Matriz de conocidos y desconocidos.** Clasificación del conocimiento en cuatro cuadrantes, popularizada por Rumsfeld en 2002.
- **Público objetivo.** Grupo de personas al que está dirigido un producto.
- **SEQ.** Pregunta única posterior a cada tarea, en escala de 1 a 7.
- **Severidad.** Gravedad de un problema según su frecuencia, impacto y persistencia. En la escala de Nielsen va de 0 a 4.
- **SUS.** Cuestionario de 10 ítems con puntaje de 0 a 100. El promedio es 68.
- **Test con usuarios (prueba de usabilidad).** Observación de personas reales mientras intentan completar tareas con un producto.
- **Usabilidad.** Qué tan fácil es usar un producto para lograr un objetivo.
- **User journey.** Representación de las etapas por las que pasa una persona al interactuar con un producto.
- **W3C.** Consorcio internacional que define los estándares de la web, incluidas las WCAG.
- **WCAG.** Pautas de accesibilidad para el contenido web, con niveles A, AA y AAA.

### Fuentes

- [Expert Review, Nielsen Norman Group](https://www.nngroup.com/consulting/expert-review/)
- [How to Conduct a Heuristic Evaluation, NN/g](https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/)
- [Severity ratings for usability problems, NN/g](https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/)
- [10 Usability Heuristics, NN/g](https://www.nngroup.com/articles/ten-usability-heuristics/)
- [Why You Only Need to Test with 5 Users, NN/g](https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/)
- [Summary of quantitative sample sizes, NN/g](https://www.nngroup.com/articles/summary-quant-sample-sizes/)
- [10 Benchmarks for UX Metrics, MeasuringU](https://measuringu.com/ux-benchmarks/)
- [WCAG 2.2, W3C](https://www.w3.org/TR/WCAG22/)
- [Accessibility, GDS Way](https://gds-way.digital.cabinet-office.gov.uk/manuals/accessibility.html)
- [Tools tested on the world's least accessible webpage, GDS (2017)](https://accessibility.blog.gov.uk/2017/02/24/what-we-found-when-we-tested-tools-on-the-worlds-least-accessible-webpage/)
- [Resolución MinTIC 1519 de 2020](https://www.cancilleria.gov.co/sites/default/files/Normograma/docs/resolucion_mintic_1519_2020.htm)
- [Directiva (UE) 2019/882, EUR-Lex](https://eur-lex.europa.eu/eli/dir/2019/882/oj/eng)
- [Knowns and Unknowns Framework, Merck UX Strategy Kit](https://strategykit.liquid.emd.design/methods/knowns-and-unknowns-framework/)
- [Baymard Institute, metodología](https://baymard.com/research/methodology)
- [ChatGPT-4 UX audit test, Baymard Institute](https://baymard.com/research-articles/gpt-ux-audit)
- [AI Heuristic UX Evaluations, Baymard Institute](https://baymard.com/research-articles/ai-heuristic-evaluations)
- [Can GPT-4o Evaluate Usability Like Human Experts?, arXiv](https://arxiv.org/html/2506.16345v1)
- [Synthetic heuristic evaluation, arXiv](https://arxiv.org/abs/2507.02306)
