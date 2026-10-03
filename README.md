# YOKREM — Landing y tienda en línea

Sitio estático en HTML, CSS y JavaScript vanilla (sin frameworks ni dependencias), construido a partir de la presentación "YOKREM Empresa".

## Cómo verlo

- Doble clic en `index.html`, o
- Servidor local: `python -m http.server 8000` dentro de esta carpeta y abrir `http://localhost:8000`.

## Publicar en Cloudflare Pages

El sitio no necesita compilación. En Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**, elegir el repositorio `getforgex-bit/yokrem` y configurar:

| Ajuste | Valor |
|---|---|
| Production branch | `main` |
| Framework preset | `None` |
| Build command | *(vacío)* |
| Build output directory | `/` |

Cada `git push` a `main` publica una nueva versión; las demás ramas generan vistas previas.

`_headers` define cabeceras de seguridad y la caché de imágenes (7 días) y videos (30 días). CSS y JS usan la caché por defecto de Cloudflare (se revalidan en cada visita), así que los cambios se ven de inmediato. Si reemplazas una imagen o video conservando el nombre, cambia el nombre del archivo para evitar que los visitantes vean la versión anterior.

## Estructura

```
index.html          Estructura de la página (portada, tienda, conjuntos, historia, misión, organización)
css/styles.css      Estilos y paleta de marca (tokens al inicio del archivo)
js/products.js      Catálogo: prendas, conjuntos, tallas y temporadas  ← aquí se editan productos y precios
js/app.js           Lógica: filtros, orden, búsqueda, vista rápida, bolsa, favoritos
img/                Fotos de producto, logotipo (WebP) y video de portada (MP4)
_headers            Cabeceras HTTP para Cloudflare Pages
```

## Qué incluye

- Portada cinemática con video en bucle (`img/hero-1080.mp4` y `img/hero-720.mp4` para móvil, póster `img/hero-poster.webp`), sin audio, con botón de pausa; no se reproduce sola si el sistema pide "reducir movimiento" y se detiene al salir de pantalla.
- Tarjeta flotante con los tres lookbooks de temporada (Verano, Otoño, Invierno) que filtran la tienda.
- Catálogo con filtro por temporada, orden por precio y búsqueda (ignora acentos).
- Al pasar el cursor por una prenda se ve el look completo y se puede añadir por talla.
- Vista rápida con selección de talla obligatoria.
- Conjuntos completos: el ahorro se calcula solo (Verano $198, Otoño $447, Invierno $250).
- Bolsa con cantidades, subtotal, ahorro y total; favoritos. Ambos se guardan en el navegador (localStorage).
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

Scan-bar es la base de datos de productos y códigos de barras de los negocios. Las prendas de `js/products.js` se registran solas en Scan-bar (`npm run sync:repos` allá): **cada talla es un producto con su propio código** (`top-blanco-crop-M`), listo para imprimir su etiqueta. Las prendas que se agregan desde Scan-bar (*Administración → Productos y etiquetas*) aparecen en la tienda sin tocar este repositorio.

- Activar: en `index.html`, `<script src="js/scanbar.js" data-url="https://URL-DE-SCAN-BAR" data-tienda="yokrem">`. Vacío = solo las prendas del código.
- Probar en local: `http://localhost:8000/?scanbar=http://localhost:3000` (solo acepta localhost).
- En Scan-bar, para que una prenda nueva aparezca aquí: categoría = temporada (`verano`, `otono` o `invierno`), variantes = tallas (`CH, M, G, EG`); atributos opcionales `color` y `muestra` (hex). Sin foto se usa el look de la temporada.
- Si Scan-bar no responde, la tienda funciona igual con sus prendas. Contrato y diseño completo: `docs/INTEGRACION-WEBS.md` en el repositorio Scan-bar.
