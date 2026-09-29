# AGENTS — Cómo trabajar en este repo

> **Provisorio (2026-09-28).** Versión mínima creada durante la spec `funnel-diagnostico`. Luis la va a reordenar cuando incorpore la metodología spec-lite completa.

Las convenciones de código (stack, BEM, tokens, idioma, HTML semántico, lo que no se toca sin aprobación) están en [`CLAUDE.md`](../CLAUDE.md). Este archivo no las repite: agrega el ciclo de trabajo y la definición de hecho general.

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

## Desarrollo local

- Servidor estático: `python3 -m http.server 3000` desde la raíz. No resuelve URLs sin `.html` ni ejecuta `functions/`.
- Para probar Pages Functions (`/api/*`) con el comportamiento real hace falta `wrangler pages dev`. Ojo: envía emails y crea fichas reales si están cargadas las variables de entorno.
