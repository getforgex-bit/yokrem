---
name: YOKREM
description: Revista de temporada. Papel, negro carbón y oro viejo para moda casual urbana con acabado de lujo.
colors:
  gold: "#B8893A"
  gold-ink: "#86621F"
  gold-light: "#E3C77E"
  sale: "#C8102E"
  t-verano: "#E8EDEF"
  t-otono: "#EFE7DC"
  t-invierno: "#E5E7EB"
  ink: "#141414"
  ink-soft: "#2E2C28"
  mute: "#5E5D58"
  line: "#E4E2DD"
  tile: "#F3F2EF"
  paper: "#FFFFFF"
  on-ink: "#FFFFFF"
  on-ink-mute: "#BDBAB2"
  hero-bg: "#0C0C0B"
  glass: "rgba(14, 14, 13, 0.46)"
  glass-line: "rgba(255, 255, 255, 0.18)"
typography:
  display:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, Georgia, serif"
    fontSize: "clamp(3.2rem, 7.4vw, 7.2rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, Georgia, serif"
    fontSize: "clamp(2rem, 3.6vw, 3.1rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, Georgia, serif"
    fontSize: "26px"
    fontWeight: 400
    lineHeight: 1.1
  statement:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, Georgia, serif"
    fontSize: "clamp(1.2rem, 1.9vw, 1.55rem)"
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: "Jost, Futura, Avenir Next, Segoe UI, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
  lead:
    fontFamily: "Jost, Futura, Avenir Next, Segoe UI, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Jost, Futura, Avenir Next, Segoe UI, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    letterSpacing: "0.16em"
  button:
    fontFamily: "Jost, Futura, Avenir Next, Segoe UI, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    letterSpacing: "0.03em"
  button-caps:
    fontFamily: "Jost, Futura, Avenir Next, Segoe UI, system-ui, sans-serif"
    fontSize: "12.5px"
    fontWeight: 500
    letterSpacing: "0.16em"
rounded:
  none: "0px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 40px)"
  section: "clamp(56px, 8vw, 112px)"
  section-head: "clamp(20px, 3vw, 32px)"
  grid-row: "44px"
  grid-col: "14px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 28px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.ink-soft}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 28px"
    height: "48px"
  button-line-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    typography: "{typography.button-caps}"
    rounded: "{rounded.none}"
    padding: "0 30px"
    height: "50px"
  button-gold-hover:
    backgroundColor: "{colors.gold-light}"
  button-ghost-dark:
    backgroundColor: "transparent"
    textColor: "{colors.on-ink}"
    typography: "{typography.button-caps}"
    rounded: "{rounded.none}"
    padding: "0 30px"
    height: "50px"
  button-ghost-dark-hover:
    backgroundColor: "{colors.on-ink}"
    textColor: "{colors.ink}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "38px"
  chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
  input-search:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "44px"
  select:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 34px 0 12px"
    height: "38px"
  size-option:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "46px"
  size-option-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
  product-card-media:
    backgroundColor: "{colors.tile}"
    rounded: "{rounded.none}"
  look-card-media:
    backgroundColor: "{colors.tile}"
    rounded: "{rounded.none}"
  look-ledger-set:
    textColor: "{colors.sale}"
    typography: "{typography.button}"
  count-badge:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    rounded: "{rounded.pill}"
    height: "17px"
  glass-panel:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.on-ink}"
    rounded: "{rounded.none}"
    padding: "16px 16px 14px"
  toast:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    rounded: "{rounded.none}"
    padding: "13px 16px 13px 20px"
---

# Design System: YOKREM

## Overview

**Creative North Star: "La Revista de Temporada"**

YOKREM se hojea como una revista de moda en la que cada colección (Verano, Otoño, Invierno) es un número propio. Los titulares van en una Didone de alto contraste, las etiquetas en mayúsculas espaciadas, las divisiones son líneas de un pixel y el resto es mucho papel blanco. La portada es la única página oscura: video a sangre completa bajo veladuras negras, el titular en Bodoni y el oro viejo como firma. Al bajar, la revista se abre a una tienda clara donde la prenda manda.

El tono es casual urbano con acabado de lujo: ropa para todos los días presentada con el cuidado de una marca de lujo, pero sin volverse inaccesible. Los precios siempre están a la vista y el lenguaje es directo. Los componentes tienen el carácter de una boutique silenciosa: esquinas rectas, negro sólido para la acción principal, bordes solo donde separan una función y aire suficiente para que el producto hable solo.

El sistema rechaza tres cosas: parecer una tienda genérica de plantilla, contar el origen chiapaneco con artesanía folclórica y dar la sensación de lujo inaccesible.

**Key Characteristics:**
- Papel blanco, negro carbón y oro viejo; el rojo aparece solo donde hay dinero ahorrado.
- Bodoni Moda para los titulares, siempre en peso 400 y con la cursiva como énfasis; Jost para todo lo que se lee o se pulsa.
- Esquinas rectas en todo; la píldora queda para filtros, contadores y controles sobre video.
- Mayormente plano: la profundidad sale del tono y de las líneas finas. El cristal ahumado aparece a veces, siempre sobre imagen.
- Una portada oscura y cinematográfica; el resto de la revista es claro.
- El catálogo se compone como una hoja de contactos con una plana cada cinco prendas; los conjuntos, como pliegos horizontales con créditos.
- Movimiento lento y suave con una sola curva (`cubic-bezier(.2, .7, .2, 1)`); todo se detiene con "reducir movimiento".

## Colors

Tres tintas de imprenta (papel, negro carbón y oro viejo) más un rojo reservado para el ahorro y tres tintes pálidos, uno por temporada.

### Primary
- **Oro viejo** (gold): el dorado de la K del monograma. Aparece en la K del wordmark sobre fondo claro, en los separadores (· •), en la flecha del organigrama y como fondo del botón de compra en la portada oscura. Sobre blanco su contraste es de 3.1:1, así que solo sirve para texto grande o decorativo.
- **Oro viejo tinta** (gold-ink): la versión del dorado para texto pequeño sobre fondo claro (5.5:1, cumple AA). Está definido y reservado; hoy no se usa.
- **Oro claro** (gold-light): el dorado sobre negro. Se usa en la K del wordmark sobre el video, en las etiquetas de la banda oscura, en la sílaba "K" del origen del nombre, en los contadores sobre video y en el borde que aparece al pasar el cursor por un lookbook (11.2:1 sobre negro carbón).
- **Degradado del titular:** la segunda línea del titular de portada usa un degradado dorado recortado al texto (#B8893A → #E3C77E → #F4E3B4 → #C99B4A, a 100°). Es el único degradado del sistema. El token `--gold-grad` existe en el CSS, pero no se usa.

### Secondary
- **Rojo ahorro** (sale): marca el ahorro de los conjuntos (precio del conjunto y fila "Ahorras" en los créditos, fila de ahorro en la bolsa) y los errores de formulario. Contraste de 5.9:1 sobre blanco.

### Tertiary
- **Tinte Verano** (t-verano): gris azulado muy pálido.
- **Tinte Otoño** (t-otono): arena cálida.
- **Tinte Invierno** (t-invierno): gris frío.

Los tres tintes están reservados: hoy no se usan, porque los conjuntos se muestran con fotos de estudio. Si vuelven, es solo como fondo de imagen, nunca en texto ni en controles.

### Neutral
- **Negro carbón** (ink): texto principal, acción principal (botones sólidos, filtro activo, talla elegida), barra de promoción, banda del nombre, aviso breve y anillo de foco.
- **Tinta suave** (ink-soft): hover del botón sólido y texto de lectura larga (historia, descripciones, listas del organigrama).
- **Gris humo** (mute): etiquetas, conteos, texto secundario, precios tachados (6.6:1 sobre blanco).
- **Línea hueso** (line): todas las divisiones de un pixel (encabezado, barra de filtros, listas, bolsa) y el borde de reposo de chips, tallas y selector.
- **Gris hueso** (tile): el "pozo" donde se apoya cada foto de producto, las miniaturas de los créditos y los avisos informativos.
- **Papel** (paper): fondo de página (incluida la sección de conjuntos), bolsa, favoritos y vista rápida.
- **Blanco sobre negro** (on-ink) y **Ceniza** (on-ink-mute): texto principal y secundario sobre superficies oscuras.
- **Negro portada** (hero-bg): fondo de la portada mientras carga el video.
- **Cristal ahumado** (glass) y **Filo de cristal** (glass-line): relleno translúcido y borde de los paneles que flotan sobre el video.

### Named Rules
**La Regla del Oro Escaso.** El oro viejo es firma, no pintura: marca la K, los separadores, un solo botón en la portada y los bordes activos. Nunca rellena superficies grandes ni se usa en texto de lectura.

**La Regla del Rojo que Ahorra.** El rojo aparece solo donde hay dinero ahorrado o un error que corregir. Nunca es decorativo ni se usa en titulares.

**La Regla de la Tienda en Papel.** Todo lo que sirve para comprar (catálogo, tarjetas, vista rápida, bolsa y favoritos) vive sobre papel o gris hueso. El negro queda para las pausas editoriales: barra de promoción, portada, banda del nombre y aviso breve.

## Typography

**Display Font:** Bodoni Moda (con Bodoni 72, Didot, Georgia)
**Body Font:** Jost (con Futura, Avenir Next, Segoe UI, system-ui)

**Character:** Una Didone de revista, de contraste extremo, con una cursiva que funciona como la voz de la marca, junto a una geométrica tipo Futura, limpia y moderna. Bodoni pone la parte de revista; Jost pone la de tienda.

### Hierarchy
- **Display** (400, clamp(3.2rem, 7.4vw, 7.2rem), 0.9): solo para el titular de portada. La segunda línea va en cursiva, sobre su propio renglón y con el degradado dorado.
- **Headline** (400, clamp(2rem, 3.6vw, 3.1rem), 1): títulos de sección ("Tienda", "Conjuntos completos"). La entrada de la historia usa una variante más larga (clamp(1.9rem, 3.3vw, 2.9rem), 1.08) con `text-wrap: balance`.
- **Title** (400, 26px, 1.1): nombre de la prenda en una plana del catálogo. En la misma familia están el nombre del conjunto (clamp(1.9rem, 3vw, 2.6rem) en el pliego principal y clamp(1.5rem, 2.2vw, 1.9rem) en la pareja), el título de la vista rápida (clamp(1.7rem, 2.6vw, 2.3rem)), los enlaces del menú móvil (24px) y los mensajes de vacío de bolsa y catálogo (24px).
- **Statement** (400, clamp(1.2rem, 1.9vw, 1.55rem), 1.4): misión y visión, en Bodoni redonda. La lista de valores sube a clamp(1.7rem, 4.2vw, 3.6rem) y alterna redonda y cursiva.
- **Body** (Jost 400, 15px, 1.55): interfaz y textos. Los relatos largos suben a 16px con un máximo de 62ch; la entradilla de portada (lead) usa 17px/1.6 con un máximo de 44ch.
- **Label** (Jost 500, 12px, 0.16em, mayúsculas): antetítulos de sección. Sobre video y en la franja de pilares baja a 10–11.5px con 0.14–0.2em. En los pies de foto del catálogo y en los créditos de los conjuntos (temporada, número de piezas) va a 11px con 0.16em.
- **Button** (Jost 500, 14px, 0.03em): botones de la tienda. En la portada pasan a mayúsculas (button-caps: 12.5px, 0.16em).

### Named Rules
**La Regla de la Cursiva que Subraya.** El énfasis de la marca es la cursiva de Bodoni: segunda línea del titular, nombres de temporada en los lookbooks, lema del pie y valores alternos. Bodoni nunca va en negrita; su único peso es 400.

**La Regla de la Etiqueta Espaciada.** Toda mayúscula en Jost lleva tracking (0.12–0.2em) y va en 500. Las mayúsculas en Bodoni son exclusivas del nombre YOKREM (wordmark con 0.34em y las sílabas YO·KR·EM).

**La Regla de la Cifra Tabular.** Precios, cantidades, conteos y totales usan `font-variant-numeric: tabular-nums`, para que las columnas de dinero no bailen.

## Layout

Contenedor único de 1360px como máximo, con márgenes laterales de clamp(16px, 4vw, 40px). El encabezado es fijo y mide 64px: en escritorio, marca a la izquierda, navegación centrada y acciones a la derecha; por debajo de 960px pasa a menú, marca centrada y acciones. Las secciones respiran con clamp(56px, 8vw, 112px) arriba y abajo. Cada sección abre con la misma cabecera: antetítulo y titular a la izquierda, y nota o conteo alineado a la base a la derecha.

La portada ocupa casi toda la pantalla (mínimo de max(660px, 100svh − 38px)). El texto va abajo a la izquierda (620px como máximo) y la tarjeta de colecciones flota abajo a la derecha. Por debajo de 960px se apila y deja arriba entre 200 y 360px libres para el video.

El catálogo es una hoja de contactos con ritmo de revista. En móvil tiene 2 columnas (32px entre filas, 10px entre columnas). Desde 720px pasa a 12 columnas (44px y 12px): cada prenda ocupa 3, y la primera de cada grupo de cinco es una plana de 6 columnas. La plana ocupa dos filas si la siguen al menos cuatro prendas; si no, es un bloque apaisado de una fila con la misma altura que sus vecinas. Un grupo final de cuatro va sin plana y uno de dos lleva dos planas, así que la hoja nunca deja huecos. En móvil la plana ocupa todo el ancho.

Los conjuntos son pliegos horizontales sobre papel, abiertos por un filete de tinta. El primero ocupa todo el ancho: desde 960px va con la foto a la izquierda y los créditos a la derecha (8fr/4fr), alineados abajo. Los siguientes van en pareja (dos columnas desde 720px), con la foto 4:3 arriba y los créditos debajo, a un máximo de 28rem. Por debajo de 720px todo va en una columna. Las secciones narrativas usan rejillas asimétricas: historia 5fr/6fr, nombre 7fr/5fr y misión/visión 2 columnas iguales.

Los diálogos siguen un patrón fijo: la bolsa y los favoritos son cajones de 440px por la derecha, el menú móvil es un cajón de 360px por la izquierda y la vista rápida es un modal de hasta 1000px que ocupa toda la pantalla por debajo de 760px.

Puntos de corte observados: 420, 560, 640, 720, 760, 860 y 960px.

### Named Rules
**La Regla de la Hoja de Contactos.** En el catálogo, columnas juntas (10–12px) y filas amplias (32–44px), con una plana cada cinco prendas: las prendas se leen como una tira continua, cada fila respira y la escala cambia con ritmo.

**La Regla del Filete de Índice.** Cada titular de sección de compra se apoya en un filete de 1px en negro carbón; las divisiones internas van en línea hueso. Las cajas y los fondos de sección no separan contenido.

## Elevation & Depth

El sistema es mayormente plano. No hay sombras de elevación: la profundidad sale del cambio de tono (papel → gris hueso → negro), de las líneas finas y del velo detrás de los diálogos (rgba(20, 20, 20, 0.45)). En el catálogo, cada pozo es un ciclorama de estudio. La pared es gris hueso hasta el 76% de la altura (80% en la plana de dos filas). Ahí hay un horizonte de 1px (línea hueso mezclada con un 22% de gris humo) y debajo un piso un tono más oscuro (gris hueso con un 70% de línea hueso), que se aclara hacia abajo. Todo va enmarcado por un paspartú de 1px (negro carbón al 14%, 35% al pasar el cursor) separado 8–16px del borde. El cristal ahumado (fondo translúcido con desenfoque de 10–16px y filo claro) es un recurso ocasional y cambiante. Hoy vive sobre el video de portada (pastilla, tarjeta de colecciones, botón de video) y en el encabezado cuando se desplaza sobre la portada. Puede aparecer en otros lugares si hay imagen detrás que desenfocar.

### Shadow Vocabulary
- **Anillo de muestra** (`box-shadow: inset 0 0 0 1px rgba(20, 20, 20, .22)`): contorno interior del círculo de color, para que el blanco se vea sobre papel. No es elevación.
- **Halo del titular** (`text-shadow: 0 2px 30px rgba(0, 0, 0, .25)`): separa el titular de portada del video. No es elevación.

### Named Rules
**La Regla del Plano por Defecto.** Las superficies son planas. Lo que flota (bolsa, modal, aviso) se distingue por el velo y el contraste, no por una sombra.

**La Regla del Estudio.** Una prenda nunca flota centrada en la nada: se apoya en el piso de su ciclorama, con la base un poco por debajo del horizonte, dentro de su paspartú. El suelo lo da el tono, no una sombra.

**La Regla del Cristal con Motivo.** El cristal solo va sobre imagen o video en movimiento. Sobre papel liso no hay nada que desenfocar, y ahí no se usa.

## Shapes

Corte recto. Botones, tarjetas, pozos de imagen, campos, selector, tallas, etiqueta de ahorro, modal, cajones y aviso llevan esquinas a 0. La píldora (999px) es la excepción, y solo para cuatro cosas: chips de filtro, pastilla de portada, botón de video y contador de la bolsa. Las muestras de color son círculos de 12px.

Las líneas son de 1px. El único trazo grueso es el filete de 2px en negro que abre cada columna del organigrama. El foco es un contorno de 2px en negro carbón, separado 3px (blanco sobre fondos oscuros).

Las prendas son fotos con fondo transparente, centradas en su pozo de color con un margen interior del 13%. Las fotos de look y lookbook llenan su marco (`object-fit: cover`) o se apoyan en la base.

### Named Rules
**La Regla del Corte Recto.** Si no es un filtro, un contador o un control sobre video, sus esquinas son rectas. Redondear una tarjeta o un botón la convierte en tienda de plantilla.

## Components

### Buttons
Sastrería contenida: rectángulos de un pixel de borde, texto en Jost medio y ningún adorno.
- **Shape:** esquinas rectas (0px), 48px de alto como mínimo y 28px de relleno lateral.
- **Primary (sólido):** fondo negro carbón y texto blanco. Es la acción principal de la tienda: "Añadir a la bolsa" y "Continuar al pago".
- **Hover / Focus:** el sólido se aclara a tinta suave en 0.2s; el foco es un contorno de 2px separado 3px.
- **Línea:** borde negro carbón sobre fondo transparente; al pasar el cursor, o cuando está activo (`aria-pressed="true"`), se rellena de negro. Se usa en "Guardar en favoritos" y "Ver todas las prendas".
- **Portada:** dos botones en mayúsculas espaciadas (12.5px, 0.16em, 50px de alto). El dorado (fondo oro viejo, texto negro, pasa a oro claro al pasar el cursor) es la única acción dorada del sitio. El fantasma (borde blanco al 70%) se rellena de blanco al pasar el cursor.
- **Texto:** subrayado con separación de 3px, para acciones secundarias ("Cerrar", "Borrar búsqueda", "Entendido").

### Chips
- **Style:** píldora de 38px de alto con borde línea hueso, fondo transparente y Jost de 14px.
- **State:** al pasar el cursor, el borde pasa a negro; seleccionado (`aria-pressed="true"`), relleno negro y texto blanco. Se usan solo para filtrar por temporada.

### Cards / Containers
- **Tarjeta de prenda:** pozo de proporción 3:4 convertido en ciclorama (pared, horizonte y piso) con paspartú de 1px. La prenda se apoya en el piso (`object-position: center bottom`, padding en unidades de contenedor `10cqh 12cqw 15cqh`) y no hay nada más encima de la imagen; la bandeja de tallas se alinea al paspartú. Debajo, un pie de foto tipográfico: nombre (Jost 15px) y precio (15px medio, tabular) sobre la misma línea base; en la segunda línea, la temporada como etiqueta (11px, 0.16em, gris humo), la muestra de color y, a la derecha, el corazón de favoritos. En una plana el nombre pasa a Bodoni de 26px y el precio a 17px. Con ratón, al pasar el cursor la prenda se funde con la modelo recortada, que se acerca de 1.4× a 1.9× en 0.9s. El acercamiento apunta al torso en las prendas de arriba (origen al 15%), a la cintura y la cadera en las prendas cortas de talle alto como el short (46%) o a las piernas en los pantalones (92%), según el campo `encuadre` de `js/products.js`, y sube desde abajo una bandeja blanca con las tallas para añadir directo; en pantallas táctiles la bandeja no existe.
- **Pliego de conjunto:** sin caja ni fondo. Lleva la foto de estudio en 4:3 (`object-fit: cover`, zoom de 1.03 al pasar el cursor) y créditos al estilo de revista:
  - nombre en Bodoni;
  - etiqueta con temporada y número de piezas;
  - piezas con miniatura de 48px en pozo gris hueso y precio, entre un filete arriba y otro abajo (sin línea por fila);
  - libro de cuentas: "Por separado" tachado en gris humo, "Conjunto" en rojo de 24px y "Ahorras" en rojo de 13px;
  - botón sólido "Elegir talla y añadir".
- **Corner Style:** recto (0px).
- **Shadow Strategy:** ninguna (ver Elevation & Depth).
- **Internal Padding:** ninguna tarjeta lleva relleno. El texto cuelga de la imagen: 12px en la prenda (16px en la plana) y 20px en el pliego.

### Inputs / Fields
- **Búsqueda:** campo sin caja, solo con una línea inferior negra de 1px que pasa a 2px con el foco. Usa 16px para evitar el zoom en iOS y un icono de lupa en gris humo.
- **Selector de orden:** caja recta de 38px con borde línea hueso, chevron dibujado y fondo papel.
- **Tallas:** rejilla de 4 casillas rectas de 46px. Al pasar el cursor, el borde pasa a negro; elegida, relleno negro y texto blanco.
- **Error:** texto rojo ahorro de 14px en peso medio, anunciado con `role="alert"`.

### Navigation
- **Encabezado:** fijo y de 64px. Lleva el monograma de 34px y el wordmark YOKREM en Bodoni con 0.34em de tracking y la K en oro. Los enlaces van en Jost de 14px y se subrayan con una línea inferior al pasar el cursor.
- **Tres estados:** sobre la portada es transparente, con un degradado negro de arriba abajo, texto blanco y K en oro claro. Al desplazarse sobre la portada se vuelve cristal ahumado (rgba(12, 12, 11, .8) y desenfoque de 12px). Sobre papel es blanco al 94%, con desenfoque y una línea hueso debajo. Al abrir la búsqueda, el encabezado vuelve siempre a su estado claro.
- **Móvil:** por debajo de 960px los enlaces pasan a un cajón izquierdo con los destinos en Bodoni de 24px separados por líneas finas. Por debajo de 420px desaparece el monograma y queda solo el wordmark.

### Tarjeta de colecciones en pasarela
El componente de firma: un panel de cristal ahumado que flota sobre el video, con tres lookbooks verticales (proporción 3:4.2) y el nombre de cada temporada en cursiva Bodoni con su carácter en etiqueta ("Fresco", "Cálido", "Sobrio"). Al pasar el cursor, la foto crece un 5% en 0.8s y aparece un filo de oro claro. Cada tarjeta filtra la tienda por su temporada.

### Banda del nombre
Una pausa editorial sobre negro carbón: las sílabas YO · KR · EM en Bodoni gigante (hasta 9.6rem, interlineado de 0.82), cada una sobre el nombre de su fundador en etiqueta ceniza, separado por una línea fina. Solo la K va en oro claro.

### Bolsa y avisos
- **Bolsa:** cajón derecho con filas de miniatura (84px sobre gris hueso), nombre, talla, contador de cantidad recto y precio tabular. El resumen marca el ahorro en rojo y el total sobre una línea fina.
- **Aviso breve:** barra negro carbón centrada abajo, que entra subiendo 16px en 0.3s y puede incluir una acción de texto ("Ver bolsa").

## Do's and Don'ts

### Do:
- **Do** usa Bodoni Moda en 400 para titulares, con la cursiva como único énfasis, y Jost para todo lo que se lee o se pulsa.
- **Do** mantén esquinas rectas (0px) en botones, tarjetas, campos y diálogos; reserva la píldora (999px) para filtros, contadores y controles sobre video.
- **Do** presenta cada prenda con fondo transparente, centrada en su pozo gris hueso (#F3F2EF), con aire alrededor; la temporada, el precio y el ahorro van en el pie de foto o en los créditos, nunca encima de la imagen.
- **Do** usa cifras tabulares en precios, cantidades y contadores.
- **Do** usa oro viejo tinta (#86621F) para texto dorado pequeño sobre fondo claro y oro claro (#E3C77E) sobre negro.
- **Do** separa con líneas de 1px en línea hueso (#E4E2DD) y con cambios de tono antes que con cajas o sombras.
- **Do** anima con la curva `cubic-bezier(.2, .7, .2, 1)` y respeta "reducir movimiento": nada se mueve solo si el sistema lo pide.
- **Do** deja la acción principal de la tienda en negro carbón sólido; el botón dorado es exclusivo de la portada oscura.

### Don't:
- **Don't** hagas que parezca una tienda genérica de plantilla: nada de botones redondeados, sombras de tarjeta ni colores de sistema.
- **Don't** cuentes el origen chiapaneco con textiles, grecas, bordados ni colores típicos; eso es artesanía folclórica y no es esta marca.
- **Don't** caigas en el lujo inaccesible: precios siempre visibles, texto directo y nada que haga sentir la ropa fuera de alcance.
- **Don't** uses el rojo (#C8102E) fuera del ahorro y los errores.
- **Don't** rellenes superficies grandes de oro ni lo uses en texto de lectura.
- **Don't** pongas sombras de elevación; lo que flota se separa con el velo del fondo y el contraste del papel.
- **Don't** uses Bodoni en negrita ni Jost para titulares.
- **Don't** añadas bordes que no separen una función; en una boutique silenciosa el producto habla solo.
