# 10 — Aviso de cookies y política de privacidad

**id:** `cookies-privacidad`
**Estado:** ✅ Construido el 2026-11-02 · pendiente: revisión legal y confirmar en Hotjar la configuración de supresión de datos
**Relacionada con:** [09-mutisux.md](09-mutisux.md) (la landing usa este mismo aviso)

## Historia de usuario

**Como** visitante de uxuaria.com, **quiero** decidir si me miden con cookies y grabaciones, **para** navegar sabiendo qué datos se guardan.

**Como** Luis, **quiero** analizar el comportamiento en el sitio con GA4 y Hotjar con el permiso de quien visita.

## Criterios de aceptación

1. Dada una primera visita a cualquier página salvo `404.html`, entonces aparece el aviso con "Aceptar" y "Rechazar", con el mismo peso visual, y GA4 y Hotjar no se cargan.
2. Dado "Aceptar", entonces se cargan GA4 (`G-6TCJ5969G7`) y Hotjar (`6838037`), y siguen activos en las demás páginas sin volver a preguntar.
3. Dado "Rechazar", entonces no se cargan y no se vuelve a preguntar. Si antes había aceptado, se borran las cookies `_ga*`, `_gid`, `_gat*` y `_hj*`, y la página se recarga.
4. Dado "Preferencias de cookies" (pie del sitio, pie de la landing y las dos políticas), entonces el aviso reaparece.
5. Dado un navegador sin JS, entonces no aparece el aviso y no se carga ningún medidor con cookies.
6. Fuera de `uxuaria.com` el aviso funciona, pero los scripts no se cargan.
7. Cloudflare Web Analytics sigue activo siempre: no usa cookies.

## Alcance

- `cookies.js`: aviso, carga de GA4 y Hotjar, enlaces del pie. Se carga en el `<head>` de todas las páginas salvo `404.html`. **Es el único lugar que carga GA4 y Hotjar:** una página nueva lleva `<script src="/cookies.js?v=…"></script>`, sin copiar sus códigos.
- `privacidad/`: política del sitio. Si cambia lo que se recoge o un proveedor, se actualizan el texto y la fecha.
- El nombre que muestra `/diagnostico/` lleva `data-hj-suppress`.

## Conocido

- Las cifras de GA4 y Hotjar solo incluyen a quienes aceptan: serán menores que las de Cloudflare y que las de GA4 antes del 2026-11-02.
- Resend no figura en la política porque el email automático está apagado (decisión del 2026-09-28). Si se activa, hay que sumarlo.
- El plazo de guarda de los formularios es genérico; Luis lo tiene que confirmar. Los textos no tuvieron revisión legal.
