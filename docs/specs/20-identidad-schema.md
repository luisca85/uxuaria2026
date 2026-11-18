# 20 — Identidad y señales de idioma en los datos estructurados

**id:** `identidad-schema`
**Estado:** 🟡 Implementada en la rama `fix/identidad-schema-estudio` · sin publicar
**Última actualización:** 2026-11-18
**Relacionada con:** 11-home, 14-contacto, 17-servicios-hub, decisions.md (2026-11-11 y 2026-11-18)

---

## Historia de usuario

**Como** founder que le pregunta a una IA o a un buscador qué es Uxuaria,
**quiero** que el sitio se describa siempre de la misma manera,
**para** entender que es un estudio de diseño UX y no una persona suelta.

## Contexto

Auditoría del 2026-11-18. El texto del sitio ya dice "equipo reducido de diseñadores senior" en plural (decisions.md, 2026-11-11), pero los datos estructurados decían otra cosa:

| Dónde | Decía |
|---|---|
| Home (JSON-LD) | Un solo nodo `["Person", "ProfessionalService"]` con `jobTitle: "UX Designer freelance"` |
| `/contacto/` (JSON-LD) | `jobTitle: "UX Designer freelance"` y description "diseñador UX freelance" |
| `/sobre-nosotros/` | Un `Person` sin `@id` (un nodo distinto al de la home) |
| Páginas de servicio, blog y casos | `Organization` "Uxuaria" sin `@id` |
| Meta de contacto, cierre de la home, error del formulario | "escríbeme", "contáctame" (singular) |

## Cambios

1. **Organización como entidad principal** (`#organization`, `["Organization", "ProfessionalService"]`) en la home, con `areaServed`, `knowsAbout`, `knowsLanguage: "es"` y `founder: #luis`.
2. **Luis como fundador** (`#luis`, `Person`, "Gerente y fundador", `worksFor: #organization`, LinkedIn personal). Mismo `@id` en home, Sobre nosotros, blog, casos y Mutis UX.
3. **`WebSite`** con `inLanguage: "es"` y `publisher: #organization`.
4. **Referencias por `@id`** a la organización en servicios, blog, casos, Sobre nosotros y contacto. `/contacto/` pasa a tener la organización como `mainEntity`.
5. **Idioma:** `inLanguage: "es"` (antes `"es-AR"` en artículos) en `ContactPage`, `AboutPage`, `CreativeWork` y `Article`. No se agrega hreflang: el sitio tiene una sola versión de idioma.
6. **Copy a plural** (decisions.md, 2026-11-11): "O escríbenos a" en el cierre de la home; en `/contacto/` la description, la og:description, "Cuéntanos…" (tres textos), "Escríbenos a info@uxuaria.com" y el mensaje de error del formulario; y "Contáctanos" en el pie.
7. `CLAUDE.md`: la descripción del proyecto ya no dice "freelance".

## Fuera de alcance (A CONFIRMAR con Luis)

- **Ampliar `/sobre-nosotros/`** (133 palabras): hace falta contenido real (quiénes forman el equipo, qué hace cada alianza, casos por país). No se inventa.
- **`/privacidad/`** sigue en singular y con voseo ("guardo", "soy yo"): es un texto legal donde el responsable de los datos es una persona. Ver spec 17.
- **Perfiles externos** para `sameAs` (Clutch, Crunchbase, etc.): se agregan solo los que existan y Luis confirme.
- **Archivos legacy** en la raíz (`index.html`, `contacto/index.html`, `portafolio/*.html`, `servicios/*`) con el JSON-LD viejo: no se tocan; falta confirmar si se publican.

## Criterios de aceptación

1. Ninguna página publicada contiene "UX Designer freelance" ni "diseñador UX freelance".
2. Toda mención a la organización o a Luis en JSON-LD lleva `@id` `#organization` o `#luis`.
3. El JSON-LD de cada página se parsea sin errores en el build.
4. No quedan "escríbeme" ni "contáctame" en páginas del diseño nuevo.
