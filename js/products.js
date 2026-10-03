/* ==========================================================================
   YOKREM — Catálogo
   Datos tomados de la presentación "YOKREM Empresa" (Catálogo Verano, Otoño
   e Invierno). Para agregar o editar prendas solo se modifica este archivo.

   Campos de cada prenda:
     id           identificador único (se usa en la bolsa y favoritos)
     nombre       nombre visible
     temporada    'verano' | 'otono' | 'invierno'
     precio       precio en MXN (entero)
     color        nombre del color
     muestra      valor CSS para el círculo de color
     img          foto del producto (fondo transparente)
     look         foto del look completo de su temporada (se muestra al pasar el cursor)
     encuadre     'superior' | 'cintura' | 'inferior': al pasar el cursor, la foto
                  del look se acerca al torso (prendas de arriba), a la cintura
                  y cadera (prendas cortas de talle alto, como shorts) o a las
                  piernas (pantalones)
     w, h         tamaño real de la imagen (evita saltos de diseño al cargar)
     descripcion  texto corto para la vista rápida

   PENDIENTE DE CONFIRMAR: las tallas y las descripciones no venían en la
   presentación; son valores provisionales.
   ========================================================================== */

window.YOKREM_TALLAS = ['CH', 'M', 'G', 'EG'];

window.YOKREM_TEMPORADAS = {
  verano: 'Verano',
  otono: 'Otoño',
  invierno: 'Invierno'
};

window.YOKREM_PRODUCTOS = [
  {
    id: 'top-blanco-crop',
    nombre: 'Top blanco crop',
    temporada: 'verano',
    precio: 599,
    color: 'Blanco',
    muestra: '#F7F7F5',
    img: 'img/top-blanco-crop.webp', w: 760, h: 826,
    look: 'img/modelo-verano.webp', encuadre: 'superior',
    descripcion: 'Top corto de tirantes anchos y escote redondo. Un básico de verano que combina con todo.'
  },
  {
    id: 'short-azul-marino',
    nombre: 'Short azul marino',
    temporada: 'verano',
    precio: 599,
    color: 'Azul marino',
    muestra: '#1C2536',
    img: 'img/short-azul-marino.webp', w: 883, h: 741,
    look: 'img/modelo-verano.webp', encuadre: 'cintura',
    descripcion: 'Short tipo chino de talle alto, con presillas y bolsillos. Cómodo para el día a día.'
  },
  {
    id: 'cardigan-cafe',
    nombre: 'Cárdigan café',
    temporada: 'otono',
    precio: 699,
    color: 'Café',
    muestra: '#8B6446',
    img: 'img/cardigan-cafe.webp', w: 900, h: 651,
    look: 'img/modelo-otono.webp', encuadre: 'superior',
    descripcion: 'Cárdigan de punto grueso con botones al frente y mangas amplias.'
  },
  {
    id: 'top-strapless-rayas',
    nombre: 'Top strapless rayas',
    temporada: 'otono',
    precio: 599,
    color: 'Rayas blanco y negro',
    muestra: 'repeating-linear-gradient(0deg, #161616 0 2px, #F5F5F5 2px 4px)',
    img: 'img/top-strapless-rayas.webp', w: 824, h: 652,
    look: 'img/modelo-otono.webp', encuadre: 'superior',
    descripcion: 'Top strapless con rayas horizontales en blanco y negro. Ideal para usar solo o debajo de un cárdigan.'
  },
  {
    id: 'jean',
    nombre: 'Jean',
    temporada: 'otono',
    precio: 699,
    color: 'Azul mezclilla',
    muestra: '#4F6D8F',
    img: 'img/jean.webp', w: 513, h: 900,
    look: 'img/modelo-otono.webp', encuadre: 'inferior',
    descripcion: 'Jean de pierna recta en azul medio, con cinco bolsillos.'
  },
  {
    id: 'bomber-azul-marino',
    nombre: 'Chamarra bomber azul marino',
    temporada: 'invierno',
    precio: 850,
    color: 'Azul marino',
    muestra: '#1E2638',
    img: 'img/bomber-azul-marino.webp', w: 821, h: 900,
    look: 'img/modelo-invierno.webp', encuadre: 'superior',
    descripcion: 'Chamarra bomber con cierre frontal y puños y cintura en tejido elástico.'
  },
  {
    id: 'sueter-cuello-alto-blanco',
    nombre: 'Suéter cuello alto blanco',
    temporada: 'invierno',
    precio: 550,
    color: 'Blanco',
    muestra: '#F4F2EC',
    img: 'img/sueter-cuello-alto-blanco.webp', w: 767, h: 877,
    look: 'img/modelo-invierno.webp', encuadre: 'superior',
    descripcion: 'Suéter de cuello alto en punto suave. Abriga sin perder la línea limpia.'
  },
  {
    id: 'pantalon-beige',
    nombre: 'Pantalón beige',
    temporada: 'invierno',
    precio: 650,
    color: 'Beige',
    muestra: '#CDBBA0',
    img: 'img/pantalon-beige.webp', w: 637, h: 850,
    look: 'img/modelo-invierno.webp', encuadre: 'inferior',
    descripcion: 'Pantalón de pierna recta con pinzas, en tono beige.'
  },
  {
    id: 'camisa-calada-beige',
    nombre: 'Camisa calada beige',
    temporada: 'verano',
    precio: 450,
    color: 'Beige',
    muestra: '#E6D8BC',
    img: 'img/camisa-calada-beige.webp', w: 833, h: 900,
    look: 'img/modelo-camisa-calada-beige.webp', encuadre: 'superior',
    descripcion: 'Camisa de manga corta en algodón con tejido calado y bordado geométrico. Fresca y con textura.'
  },
  {
    id: 'vestido-mezclilla',
    nombre: 'Vestido de mezclilla',
    temporada: 'verano',
    precio: 450,
    color: 'Azul mezclilla',
    muestra: '#4A74A8',
    img: 'img/vestido-mezclilla.webp', w: 342, h: 900,
    look: 'img/modelo-vestido-mezclilla.webp', encuadre: 'cintura',
    descripcion: 'Vestido corto de tirantes con botones al frente y costuras marcadas en la cintura.'
  },
  {
    id: 'jean-blanco-ancho',
    nombre: 'Jean blanco pierna ancha',
    temporada: 'verano',
    precio: 550,
    color: 'Blanco',
    muestra: '#F4F2EC',
    img: 'img/jean-blanco-ancho.webp', w: 519, h: 900,
    look: 'img/modelo-jean-blanco-ancho.webp', encuadre: 'inferior',
    descripcion: 'Jean de talle alto y pierna ancha en blanco, con dobladillo deshilachado.'
  },
  {
    id: 'camisa-taupe',
    nombre: 'Camisa taupe',
    temporada: 'otono',
    precio: 550,
    color: 'Taupe',
    muestra: '#7A6A5D',
    img: 'img/camisa-taupe.webp', w: 900, h: 869,
    look: 'img/modelo-camisa-taupe.webp', encuadre: 'superior',
    descripcion: 'Camisa de manga larga y corte clásico en tono taupe. Fácil de combinar.'
  },
  {
    id: 'chaqueta-mezclilla-pedreria',
    nombre: 'Chaqueta de mezclilla con pedrería',
    temporada: 'otono',
    precio: 500,
    color: 'Mezclilla claro',
    muestra: '#A9BCD6',
    img: 'img/chaqueta-mezclilla-pedreria.webp', w: 850, h: 900,
    look: 'img/modelo-chaqueta-mezclilla-pedreria.webp', encuadre: 'superior',
    descripcion: 'Chaqueta oversize de mezclilla lavada con tachuelas y piedras de colores en cuello y canesú.'
  },
  {
    id: 'chaleco-cafe',
    nombre: 'Chaleco café',
    temporada: 'otono',
    precio: 400,
    color: 'Café',
    muestra: '#6B3B26',
    img: 'img/chaleco-cafe.webp', w: 604, h: 900,
    look: 'img/modelo-chaleco-cafe.webp', encuadre: 'superior',
    descripcion: 'Chaleco de escote cuadrado con botones decorativos metálicos y de perla, y bajo asimétrico.'
  },
  {
    id: 'jean-ancho-azul',
    nombre: 'Jean ancho azul',
    temporada: 'otono',
    precio: 700,
    color: 'Azul medio',
    muestra: '#7DA2D2',
    img: 'img/jean-ancho-azul.webp', w: 528, h: 900,
    look: 'img/modelo-jean-ancho-azul.webp', encuadre: 'inferior',
    descripcion: 'Jean de talle alto y pierna ancha en azul medio con efecto lavado.'
  },
  {
    id: 'chamarra-piel-roja',
    nombre: 'Chamarra de piel roja',
    temporada: 'invierno',
    precio: 600,
    color: 'Rojo',
    muestra: '#B8342A',
    img: 'img/chamarra-piel-roja.webp', w: 900, h: 888,
    look: 'img/modelo-chamarra-piel-roja.webp', encuadre: 'superior',
    descripcion: 'Chamarra de piel granulada con cuello camisero, cierre frontal y bolsillos de parche.'
  },
  {
    id: 'polo-tejido-crema',
    nombre: 'Polo de punto crema',
    temporada: 'invierno',
    precio: 500,
    color: 'Crema',
    muestra: '#F3EEE2',
    img: 'img/polo-tejido-crema.webp', w: 717, h: 900,
    look: 'img/modelo-polo-tejido-crema.webp', encuadre: 'superior',
    descripcion: 'Polo oversize de punto suave con cuello y tres botones, puños y ruedo acanalados.'
  }
];

/* Conjuntos completos: el precio regular y el ahorro se calculan solos
   a partir de las piezas (Verano ahorra $198, Otoño $447, Invierno $250). */
window.YOKREM_CONJUNTOS = [
  {
    id: 'conjunto-verano',
    nombre: 'Conjunto Verano',
    temporada: 'verano',
    precio: 1000,
    piezas: ['top-blanco-crop', 'short-azul-marino'],
    img: 'img/foto-verano.webp', w: 1600, h: 1195,
    descripcion: 'Top blanco crop y short azul marino: el look completo de la colección Verano.'
  },
  {
    id: 'conjunto-otono',
    nombre: 'Conjunto Otoño',
    temporada: 'otono',
    precio: 1550,
    piezas: ['cardigan-cafe', 'top-strapless-rayas', 'jean'],
    img: 'img/foto-otono.webp', w: 1600, h: 1195,
    descripcion: 'Cárdigan café, top strapless rayas y jean: el look completo de la colección Otoño.'
  },
  {
    id: 'conjunto-invierno',
    nombre: 'Conjunto Invierno',
    temporada: 'invierno',
    precio: 1800,
    piezas: ['bomber-azul-marino', 'sueter-cuello-alto-blanco', 'pantalon-beige'],
    img: 'img/foto-invierno.webp', w: 1600, h: 1195,
    descripcion: 'Chamarra bomber azul marino, suéter cuello alto blanco y pantalón beige: el look completo de la colección Invierno.'
  }
];
