# Landing de Mutis UX (`/mutisux/`)

Página de una sola pantalla para presentar Mutis UX y juntar inscripciones a la beta.
Contrato: [`docs/specs/09-mutisux.md`](../docs/specs/09-mutisux.md). Mismo stack que el resto
de uxuaria.com: HTML, CSS y JS vanilla, sin build. Un push a `main` es un deploy.

```
mutisux/
├── index.html      la página (todo el copy está acá)
├── gracias.html    confirmación del envío sin JS (noindex)
├── mutisux.css      estilos; los tokens de color, sombra, radio y tipografía están en :root
├── mutisux.js       SITE_URL, animaciones al entrar en pantalla y envío del formulario
└── images/         grabados en AVIF y WebP, logo, favicon e imagen para redes (og-mutisux.jpg)

functions/api/mutisux-beta.js   recibe el formulario (destino de los datos: pendiente)
```

## Probar en local

Desde la raíz del repo del sitio (`coding/Lupa-ux-website/`):

```bash
npx wrangler pages dev . --port 8790
```

Abre `http://localhost:8790/mutisux/`. Así corren también `_headers` y la función del formulario.

## Editar el copy

Todo el texto visible está en `index.html`, ordenado por sección y con un comentario arriba
de cada una que dice si el copy está **aprobado en el moodboard** o es **BORRADOR**.

- Voz: español latinoamericano con tuteo, sin rayas largas, sin "X, no Y", sin emojis.
- Cada afirmación sobre la app tiene que poder verificarse en las specs de
  `coding/Lupa-ux-lite/docs/specs/`. No prometer funciones, cifras ni fechas que no existan.
- El título y la descripción para Google y redes están en el `<head>` (`title`,
  `description`, `og:*`, `twitter:*`). Si cambias uno, cambia los tres.
- Los mensajes del formulario están dos veces: en `MESSAGES` de `mutisux.js` (con JS) y en
  `MENSAJES` de `functions/api/mutisux-beta.js` (sin JS). Mantenlos iguales.

## Cambiar el dominio

Hoy es `https://uxuaria.com/mutisux/`. Si cambia, búscalo y reemplázalo en:

1. `index.html`: `canonical`, `og:url`, `og:image`, `twitter:image` y el JSON-LD (marcado con
   el comentario `DOMINIO` en el `<head>`).
2. `mutisux.js`: la constante `SITE_URL`.
3. `../sitemap.xml`: la entrada de Mutis UX.

## Carrusel de capturas (después de Funciones en acción)

Son las únicas capturas reales de la página, cada una en AVIF y WebP a 960 px y al ancho original:

| Diapositiva | Archivos en `images/` | Fuente en `coding/Lupa-ux-lite/imagenes/` |
|---|---|---|
| User Journey | `interface-journey-*` | `interfaz-2-anon.png` |
| Hallazgos | `interface-findings-*` | `interfaz-1.png` (recortada 10 px abajo) |
| Estudios | `interface-studies-*` | `interfaz-3-anon.png` |

Las `-anon` son copias de `interfaz-2.png` e `interfaz-3.png` con el nombre del estudio, del
cliente, las URLs y el email reemplazados por datos ficticios. **Nunca publiques los originales:
muestran el estudio de un cliente real.**

Para agregar, quitar o cambiar una captura:

1. Genera sus versiones y copia un bloque `.carousel__slide` en `index.html` (con su `id`,
   `aria-label` "N de M: Nombre", `srcset`, `width`, `height` y `alt`).
2. Actualiza los `aria-label` "N de M" de todas: las flechas y el aviso para lectores de
   pantalla los toman de ahí.
3. Todas se ven con la proporción de `.app-frame__window` en `mutisux.css` (la de la captura de
   Hallazgos); las más anchas quedan completas a lo ancho. Abre con la captura que más muestra:
   la de Hallazgos es un estudio vacío.
4. En celular cada captura se ve en un recorte: ajusta su `--pos` en `mutisux.css`
   (`.carousel__slide--journey`, `.carousel__slide--studies`) para encuadrar lo importante.
5. Las capturas no pueden mostrar datos de clientes reales.

## Reemplazar una maqueta por una captura real

Las maquetas de "Funciones en acción" son componentes aislados: cada una es un
`<div class="mockup …">` dentro de su tarjeta (`<article class="feature-card">`).

1. Reemplaza ese `<div>` completo por la imagen, manteniendo el alto del escenario:
   ```html
   <img class="mockup" src="images/captura-hallazgos.webp" width="540" height="440"
        loading="lazy" decoding="async" alt="Describe lo que muestra la captura" />
   ```
   `.mockup` mide 220 px de alto; agrega `object-fit: cover` en `mutisux.css` si la
   proporción no coincide.
2. Si ya no queda ninguna maqueta animada, puedes borrar los estilos `*-mockup`, los
   `@keyframes` y `initMockups()` de `mutisux.js`.
3. Las capturas no pueden mostrar datos de clientes reales.

El panel de Hallazgos, la tabla de Recorridos y el Reporte de ejemplo también son
ilustrativos (datos inventados, app ficticia "Tienda Brisa"). **No enlaces reportes reales
de clientes ni publiques ningún PIN.**

## Imágenes

- Las fuentes están en `coding/Lupa-ux-lite/imagenes/` (`1.jpg` a `5.jpg` y `logo.jpg`).
- Todos los grabados vienen del **Public Domain Image Archive** de The Public Domain Review
  ([pdimagearchive.org](https://pdimagearchive.org/)). Si sumas uno, anota su página aquí y
  en la spec, y revisa sus condiciones de uso:

  | Archivo | Uso | Página de la imagen |
  |---|---|---|
  | `1.jpg` | Fig. 1, sol | [af5782b0…](https://pdimagearchive.org/images/af5782b0-81b5-47c3-b714-e68efab9a5a9/) |
  | `2.jpg` | Fig. 2, máquina voladora | [244c515e…](https://pdimagearchive.org/images/244c515e-1ac3-4aa1-a7ec-fd7ed7e8d89d/) |
  | `3.jpg` | Fig. 3, barco en el Sena | [a20b15cf…](https://pdimagearchive.org/images/a20b15cf-6fc4-4e75-9069-2ece292516fb/) |
  | `4.jpg` | Fig. 4, cabeza de perfil | [9a3f1315…](https://pdimagearchive.org/images/9a3f1315-c164-450d-960f-96acf0dc71a2/) |
  | `5.jpg` | Fig. 5, manuscrito con flores | [f28f3d0f…](https://pdimagearchive.org/images/f28f3d0f-20b9-46db-a908-d4a4a65564c4/) |
  | `logo.jpg` | Logo, ojo-globo (Odilon Redon) | [a40d9c0b…](https://pdimagearchive.org/images/a40d9c0b-7392-4fc0-8a1c-a773885c9094/) |

- Para regenerarlas: AVIF y WebP a 640 px y al ancho original, miniaturas de 88 px y el
  logo recortado en círculo (`object-position: 50% 26%`). Se hicieron con `sharp`.
- `og-mutisux.jpg` (1200 × 630) se generó con Chrome headless a partir de un HTML con las
  fuentes de la página. Si cambia el título, hay que regenerarla.
- Al reemplazar una imagen con el mismo nombre, la caché de `_headers` dura 30 días:
  mejor cambiarle el nombre.

## CSS y JS en caché

`index.html` carga `mutisux.css?v=…` y `mutisux.js?v=…`. Cambia ese número cada vez que
edites alguno de los dos, o el navegador puede seguir usando la versión anterior.

## Pendiente (decisiones de Luis)

Ver "Conocido" en la spec: destino de las inscripciones, política de privacidad,
condiciones de los reportes, GA4, condiciones de uso de los grabados y voseo o tuteo.
