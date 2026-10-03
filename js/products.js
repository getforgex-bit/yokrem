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
