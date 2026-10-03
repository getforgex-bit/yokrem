# YOKREM — Landing y tienda en línea

Sitio estático en HTML, CSS y JavaScript vanilla (sin frameworks ni dependencias), construido a partir de la presentación "YOKREM Empresa".

## Cómo verlo

- Doble clic en `index.html`, o
- Servidor local: `python -m http.server 8000` dentro de esta carpeta y abrir `http://localhost:8000`.

## Publicar en Cloudflare

Se publica como Worker de assets estáticos (`wrangler.jsonc`; `.assetsignore` deja fuera los archivos del repositorio); no necesita compilación. Dos formas:

- **Desde GitHub** (cada push a `main` publica): Workers & Pages → Create → **Import a repository** → este repositorio. Build command: *(vacío)*; Deploy command: `npx wrangler deploy`.
- **Desde la terminal**: `npx wrangler login` (una vez) y `npx wrangler deploy`.

Queda en `https://yokrem.<tu-cuenta>.workers.dev`. Usa Workers y no Pages: en la misma cuenta que Scan-bar, la página lo encuentra sola y Scan-bar sabe a qué URL mandar sus códigos. Pasos de todo el sistema: `docs/DESPLIEGUE.md` en el repositorio Scan-bar.

`_headers` define cabeceras de seguridad y la caché de imágenes (7 días) y videos (30 días). CSS y JS usan la caché por defecto de Cloudflare (se revalidan en cada visita), así que los cambios se ven de inmediato. Si reemplazas una imagen o video conservando el nombre, cambia el nombre del archivo para evitar que los visitantes vean la versión anterior.

## Estructura

```
index.html          Estructura de la página (portada, tienda, conjuntos, historia, misión, organización)
css/styles.css      Estilos y paleta de marca (tokens al inicio del archivo)
js/products.js      Catálogo: prendas, conjuntos, tallas y temporadas  ← aquí se editan productos y precios
js/app.js           Lógica: filtros, orden, búsqueda, vista rápida, bolsa, favoritos
img/                Fotos de producto, logotipo (WebP) y video de portada (MP4)
_headers            Cabeceras HTTP para Cloudflare
wrangler.jsonc      Publicación en Cloudflare (Workers Static Assets)
.assetsignore       Lo que no se publica (repositorio, .md)
```

## Qué incluye

- Portada cinemática con video en bucle (`img/hero-1080.mp4` y `img/hero-720.mp4` para móvil, póster `img/hero-poster.webp`), inicia silenciado por confort auditivo con botón para pausar y botón para activar/silenciar el audio; no se reproduce sola si el sistema pide "reducir movimiento" y se detiene al salir de pantalla.
- Tarjeta flotante con los tres lookbooks de temporada (Verano, Otoño, Invierno) que filtran la tienda.
- Catálogo con filtro por temporada, orden por precio y búsqueda (ignora acentos).
- Al pasar el cursor por una prenda se ve el look completo y se puede añadir por talla.
- Vista rápida con acordeón interactivo de guía de medidas (en cm), selector de cantidad (1 a 10), botón para compartir la prenda (Web Share API en móviles o portapapeles en escritorio) y selección de talla obligatoria.
- Enlaces directos (Deep Linking) mediante URL (`#prenda/{id}`) para compartir prendas o conjuntos individuales que abren automáticamente el detalle.
- Conjuntos completos con selector rápido de talla general o personalización de talla independiente por cada pieza del look (el ahorro se calcula solo: Verano $198, Otoño $447, Invierno $250).
- Bolsa con cantidades, subtotal, ahorro y total; favoritos; microinteracción de pulso en el icono de bolsa superior. Ambos se guardan en el navegador (localStorage).
- Historia, origen del nombre, misión, visión, valores y organigrama.
- Diseño adaptable a móvil, navegación con teclado y respeto a "reducir movimiento".

## Pendiente antes de vender en línea

| Tema | Estado |
|---|---|
| Pago en línea | **No conectado.** "Continuar al pago" muestra un aviso. Opciones comunes en México: Mercado Pago, Stripe o Conekta (comparar comisiones vigentes). |
| Tallas | Provisionales (CH, M, G, EG). Confirmar tallas reales por prenda en `js/products.js`. |
| Descripciones | Redactadas a partir de las fotos; confirmar materiales y detalles. |
| Inventario y envíos | No existen todavía; requieren un backend o plataforma de e-commerce. |
| SEO | El catálogo se genera con JavaScript. Si el posicionamiento en buscadores es prioridad, conviene generar las fichas de producto en HTML. |

## Scan-bar (catálogo y códigos)

Scan-bar es la base de datos de productos y códigos de barras de los negocios. Las prendas de `js/products.js` se registran solas en Scan-bar (Scan-bar revisa este repositorio cada 10 minutos; `npm run sync:repos` allá lo fuerza): **cada talla es un producto con su propio código** (`top-blanco-crop-M`), listo para imprimir su etiqueta. Las prendas que se agregan desde Scan-bar (*Administración → Productos y etiquetas*) aparecen en la tienda sin tocar este repositorio.

- Conexión: automática si la tienda vive en `yokrem.<tu-cuenta>.workers.dev` (usa `scan-bar.<tu-cuenta>.workers.dev`). En otro dominio: `data-url="https://URL-DE-SCAN-BAR"` en la etiqueta de `js/scanbar.js` de `index.html`; `data-url="off"` la apaga.
- Probar en local: `http://localhost:8000/?scanbar=http://localhost:3000` (solo acepta localhost).
- En Scan-bar, para que una prenda nueva aparezca aquí: categoría = temporada (`verano`, `otono` o `invierno`), variantes = tallas (`CH, M, G, EG`); atributos opcionales `color` y `muestra` (hex). Sin foto se usa el look de la temporada.
- Si Scan-bar no responde, la tienda funciona igual con sus prendas. Contrato y diseño completo: `docs/INTEGRACION-WEBS.md` en el repositorio Scan-bar.
