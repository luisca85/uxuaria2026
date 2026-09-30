# AGENTS — Cómo trabajar en este repo

Las convenciones de código (stack, BEM, tokens, idioma, HTML semántico, lo que no se toca sin aprobación) están en [`CLAUDE.md`](../CLAUDE.md). Este archivo no las repite: agrega el ciclo de trabajo, la definición de hecho y el test de regresión.

Contexto del proyecto: [`architecture.md`](architecture.md) (módulos, dónde vive cada cosa, datos y servicios externos) y [`decisions.md`](decisions.md) (decisiones con fecha y motivo, append-only).

---

## Ciclo de trabajo (spec-lite)

| Etapa | Qué pasa | Dónde |
|---|---|---|
| `/explorar <tema>` | Iterar rápido en modo vibe, sin specs | Rama `explorar/<tema>` |
| `/spec <feature>` | Escribir la spec-lite del feature que se conserva | `docs/specs/NN-<feature>.md` |
| `/construir` | Implementar contra la spec | Rama principal (`main`) |
| `/revisar` | Cerrar el cambio: definición de hecho, regresión, diff, docs | — |
| `/decidir` | Registrar una decisión con fecha y motivo | `docs/decisions.md` |
| `/estado` | Ver en qué punto está el trabajo | — |

- Las specs de `docs/specs/` son el contrato de cada feature: se leen antes de tocar código.
- Lo que no está definido en una spec queda marcado **A CONFIRMAR**; no se completa con supuestos.
- Un push a `main` es un deploy a producción (Cloudflare Pages).

---

## Reglas generales

1. **No modificar el diseño actual** sin pedido explícito de Luis: nada visual cambia fuera del alcance del feature.
2. Respetar la lista "Lo que NO se debe tocar sin un spec aprobado" de `CLAUDE.md` (copy del hero, portafolio, testimonios, redes, email, color brand, métricas).
3. No inventar datos, precios, endpoints, URLs ni métricas.
4. El copy visible va en español con voseo ("Agendá", "Contame").
5. **Caché de CSS y JS:** en producción, Cloudflare hace que los navegadores guarden `.css` y `.js` durante 4 horas (`max-age=14400`), mientras que el HTML no se guarda (`max-age=0`). Cuando cambies un CSS o JS que tiene versión en su link (por ejemplo `diagnostico.js?v=AAAAMMDD`), actualizá ese `?v=` en el HTML. Si no, los visitantes pueden seguir usando la versión vieja hasta 4 horas.

---

## Definición de hecho (general)

Un cambio está hecho cuando:

- [ ] Cumple los criterios de aceptación de su spec.
- [ ] Sigue las convenciones de `CLAUDE.md`: BEM, valores visuales en variables de `:root`, código en inglés y copy en español.
- [ ] Se verificó en el navegador en desktop y en 375 px de ancho, sin scroll horizontal.
- [ ] No agrega errores en la consola. El 404 de `/cdn-cgi/.../email-decode.min.js` en local es conocido: solo existe en producción.
- [ ] Funciona o degrada con un mensaje claro si JavaScript está desactivado (progressive enhancement).
- [ ] No cambia nada fuera del alcance de la spec: el diff solo toca lo previsto.
- [ ] La spec quedó actualizada: estado, "Dónde vive" y "Conocido".
- [ ] Está commiteado con un mensaje en español que explica el porqué.

---

## Test de regresión

Se corre en `/revisar`, antes de cerrar cualquier cambio. Tiene tres partes: **A** es local, antes del push; **B** y **C** son en producción, después del deploy (1 o 2 minutos después del push).

### A. Local (preview en `http://localhost:3000`)

Siempre en las páginas que tocó el cambio. Si tocó `styles.css` o `script.js`, que se cargan en casi todo el sitio, también en la home, una página de servicios, un caso de portafolio y un artículo del blog.

1. **Carga limpia**: sin errores nuevos en la consola, en desktop y en 375 px, sin scroll horizontal.
2. **Navegación**: la navbar lleva a Servicios, AI MVP Rescue, Blog y Contacto. El menú mobile abre, cierra y se cierra al tocar un link.
3. **CTAs de conversión**:
   - Home: los botones de AI MVP Rescue llevan a `ai-mvp-rescue`; los de agenda, a Calendly.
   - AI MVP Rescue: los 3 CTA llevan a `diagnostico/?cta=…`.
4. **Contacto** (`/contacto/`): si se envía vacío o con un email inválido, muestra los errores y no envía. El envío real se prueba en C.
5. **Funnel** (`/diagnostico/`): se ve una sola pregunta a la vez, avanza con Enter y con las letras, valida cada paso y llega a la última pregunta. Localmente no hay `/api`, así que el envío real se prueba en C.
6. **Caché**: si cambió un CSS o JS que tiene `?v=` en su link, el `?v=` del HTML se actualizó.

### B. Producción, automático (lo corre Claude)

Comprueba que las páginas del sitemap respondan, que los 301 de `_redirects` funcionen y que `/api/diagnostico` esté viva. No crea datos: el POST vacío se rechaza con 400 antes de tocar Notion.

```bash
for u in $(grep -o '<loc>[^<]*' sitemap.xml | sed 's/<loc>//') https://uxuaria.com/diagnostico/ https://uxuaria.com/diagnostico/gracias; do c=$(curl -s -o /dev/null -w '%{http_code}' "$u"); [ "$c" = 200 ] || echo "FALLA $c $u"; done
for u in /index.html /es/x /en/x /ux-ai-repair /ux-ai-repair.html; do echo "$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' https://uxuaria.com$u) <- $u"; done
curl -s -o /dev/null -w '%{http_code} POST /api/diagnostico (esperado 400)\n' -X POST -H 'Content-Type: application/json' -d '{}' https://uxuaria.com/api/diagnostico
```

Resultado esperado: el primer comando no imprime nada; los redirects dan todos `301`, a `/` o a `/ai-mvp-rescue`; la API da `400`.

### C. Producción, manual (lo hace Luis)

Solo si el cambio tocó el formulario de contacto, el funnel o `/api/diagnostico`. Genera emails y fichas reales, así que conviene usar un nombre que empiece con `TEST` y borrar la ficha de Notion después.

1. **Contacto**: enviar el formulario → aparece el mensaje de éxito y llega el email de Web3Forms.
2. **Funnel, nivel A** (founder full-time, ya factura, más de 500 usuarios, USD 5.000 o más, este mes) → `/diagnostico/gracias` con las condiciones y el botón de Calendly. Llega el aviso por email y aparece la ficha en Notion.
3. **Funnel, nivel B** (rol "proyecto personal") → `/gracias` con el mensaje general, sin Calendly.
4. **GA4**: en la vista Realtime aparece `generate_lead`, con el nivel en el caso del funnel.

---

## Desarrollo local

- Servidor estático: `python3 -m http.server 3000` desde la raíz. No resuelve URLs sin `.html` ni ejecuta `functions/`.
- Para probar Pages Functions (`/api/*`) con el comportamiento real hace falta `wrangler pages dev`. Ojo: envía emails y crea fichas reales si están cargadas las variables de entorno.
