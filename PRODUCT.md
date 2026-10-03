# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Jóvenes adultos, hombres y mujeres, de aproximadamente 18 a 35 años, que buscan ropa casual para el día a día. El problema que la marca nació para resolver, según su propia historia: encontrar ropa casual que combine comodidad, versatilidad y personalidad. Compran en México (precios en MXN).

La historia oficial dice que la ropa es para cada persona "sin importar su edad"; ese texto se conserva, pero el público comercial al que se dirige la tienda son los jóvenes adultos.

## Product Purpose

Tienda en línea real de YOKREM. El éxito se mide en ventas en línea. Hoy el sitio es la portada de la marca más un catálogo que funciona en el navegador (filtros, bolsa, favoritos), pero todavía no puede cobrar ni enviar: conectar el pago, el inventario y los envíos es el siguiente paso para que venda de verdad.

## Positioning

YOKREM es una marca de moda casual nacida en Motozintla de Mendoza, en la Sierra Madre de Chiapas, con corte y confección en taller propio en Chiapas. La fundaron tres compañeros (Yojan, Kristel y Emmanuel) y el nombre une dos letras de cada uno. Diseña prendas esenciales y versátiles que funcionan "como un lienzo": la persona las adapta a su identidad en lugar de que la ropa le imponga una. Cada temporada (Verano, Otoño, Invierno) se vende como prendas sueltas y como conjunto completo con ahorro.

## Operating Context

- Flujo de compra actual: explorar por temporada, ordenar por precio, buscar (ignora acentos), ver el look completo al pasar el cursor por una prenda, abrir la vista rápida con talla obligatoria, añadir conjuntos completos (el ahorro se calcula a partir de las piezas), revisar la bolsa con cantidades, subtotal, ahorro y total, y guardar favoritos. Bolsa y favoritos viven solo en el navegador (localStorage).
- "Continuar al pago" hoy muestra un aviso: el pago no está conectado.
- Catálogo, precios, tallas y conjuntos se editan en un solo archivo: `js/products.js`. Es la fuente de verdad para cualquier precio o ahorro que aparezca en el sitio.
- Publicación: Cloudflare Pages desde el repositorio `getforgex-bit/yokrem`. Cada `git push` a `main` publica; las demás ramas generan vistas previas.
- Material de origen: la presentación "YOKREM Empresa" (catálogos de Verano, Otoño e Invierno, historia, misión, visión, valores y organigrama). No está en el repositorio.

## Capabilities and Constraints

- Sitio estático en HTML, CSS y JavaScript vanilla: sin framework, sin compilación, sin dependencias. `_headers` define cabeceras de seguridad y caché (imágenes 7 días, videos 30 días); al reemplazar un archivo multimedia hay que cambiarle el nombre.
- Idioma: español de México (`es-MX`), tuteo. Precios en pesos mexicanos, enteros.
- Catálogo actual: 8 prendas y 3 conjuntos repartidos en tres temporadas. Varias prendas actuales tienen corte femenino (top crop, top strapless, short) aunque el público es unisex; no hay prendas específicamente masculinas todavía.
- Terminología en uso: "bolsa" (no "carrito"), "prendas", "conjuntos completos", "temporada", "vista rápida", "favoritos", "chamarra", "cárdigan"; tallas CH, M, G, EG.

Decisiones abiertas (no inventarlas):
- **Pago en línea:** sin conectar. Candidatos mencionados: Mercado Pago, Stripe o Conekta; no se ha elegido.
- **Inventario y envíos:** no existen; requieren backend o plataforma de e-commerce.
- **Tallas:** CH, M, G, EG son provisionales; faltan las tallas reales por prenda.
- **Descripciones y materiales:** se redactaron a partir de las fotos; materiales y detalles sin confirmar.
- **SEO:** el catálogo se genera con JavaScript; si el posicionamiento es prioridad, las fichas de producto deben existir en HTML.

## Brand Commitments

- Nombre: YOKREM = YO (Yojan) + KR (Kristel) + EM (Emmanuel).
- Razón social: YOKREM MODA Y ESTILO, S.A. DE C.V.
- Lema: "Ropa que te define."
- Logotipo existente: monograma YK dentro de un círculo más la palabra YOKREM, con la K destacada en dorado. Archivos: `img/logo-yokrem.webp` (completo), `img/logo-monograma.webp` y `img/logo-monograma-claro.webp` (monograma para fondo claro y oscuro), `img/favicon.png`.
- Voz: cercana, en tuteo, centrada en autenticidad e identidad propia ("tú decides quién quieres ser").
- Misión, visión y valores (Honestidad, Integridad, Compromiso, Respeto, Responsabilidad) son textos oficiales de la presentación; se conservan tal cual.
- Organización: fundadores → Dirección General → tres áreas (Producción y diseño; Administración y finanzas; Ventas y mercadotecnia).

## Evidence on Hand

Confirmado por el cliente:
- **Hecho en Chiapas, con corte y confección en taller propio.**
- **Moda sostenible.** El cliente la confirma, pero lo que la respalda (materiales, procesos, desperdicio) no está documentado: no inventar detalles concretos hasta tenerlos.
- **Video de portada y looks son material propio** y pueden presentarse como campaña de la marca: `img/hero-1080.mp4`, `img/hero-720.mp4`, `img/hero-poster.webp`, `img/look-*.webp`, `img/lookbook-*.webp`. Versiones de mayor resolución (video original y looks a 2K) están fuera del repositorio, en la carpeta superior `../`.
- Fotos de producto con fondo transparente para las 8 prendas (`img/*.webp`).
- Historia, origen del nombre, misión, visión, valores y organigrama, tomados de la presentación.

Sin confirmar (no prometer):
- **"Envíos a todo México"** aparece hoy en la franja de la portada (`index.html`), pero los envíos no existen todavía. No debe presentarse como promesa hasta que haya envíos.
- "Edición Cinemática 2026" y "Campaña cinemática" aparecen en la barra de promoción y en la portada; ninguna fuente las confirma como nombre oficial de campaña.

No existe todavía (no fabricar): reseñas, testimonios, número de clientes, prensa, cuentas de redes sociales, datos de contacto (WhatsApp, correo, dirección), políticas de envío, cambios y devoluciones, guía de tallas y composición de las telas.

## Product Principles

1. **Vender sin prometer de más.** Cada decisión se mide por si ayuda a comprar, y la tienda nunca promete lo que la operación aún no cumple (pago, envíos, tallas). Es el valor de Honestidad aplicado al comercio.
2. **La prenda es un lienzo.** Se venden básicos versátiles que cada persona hace suyos; mostrar cómo se combinan (looks, conjuntos) vale más que decirle a alguien quién ser.
3. **El origen se cuenta con hechos.** Motozintla, el taller propio en Chiapas y los tres fundadores son el diferenciador real; se comunican con datos concretos, no con adornos genéricos.
4. **Unisex por defecto.** Textos, modelos y navegación se dirigen a hombres y mujeres jóvenes por igual; no se separa por género mientras el catálogo no lo pida.
5. **Los datos del catálogo mandan.** Precios, ahorros y tallas salen de `js/products.js`; cualquier cifra en la página debe coincidir con ese archivo.
