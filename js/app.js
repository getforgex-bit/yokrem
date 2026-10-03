/* ==========================================================================
   YOKREM — Lógica de la tienda (JavaScript vanilla, sin dependencias)
   - Catálogo con filtros por temporada, orden y búsqueda
   - Vista rápida con selección de talla
   - Bolsa de compras y favoritos (se guardan en localStorage)
   - Conjuntos completos con ahorro calculado
   El pago en línea NO está conectado: el botón "Continuar al pago" muestra
   un aviso. Ver README.md para integrar una pasarela real.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- Datos ---------- */
  var PRODUCTOS = window.YOKREM_PRODUCTOS || [];
  var CONJUNTOS = window.YOKREM_CONJUNTOS || [];
  var TEMPORADAS = window.YOKREM_TEMPORADAS || {};
  var TALLAS = window.YOKREM_TALLAS || [];
  var MAX_CANTIDAD = 10;
  var CLAVE_BOLSA = 'yokrem.bolsa';
  var CLAVE_FAVORITOS = 'yokrem.favoritos';

  // Índice único de todo lo que se puede comprar (prendas y conjuntos)
  var catalogo = new Map();
  PRODUCTOS.forEach(function (p) {
    catalogo.set(p.id, Object.assign({ tipo: 'prenda', precioRegular: p.precio, ahorro: 0 }, p));
  });
  CONJUNTOS.forEach(function (c) {
    var piezas = c.piezas.map(function (id) { return catalogo.get(id); }).filter(Boolean);
    var regular = piezas.reduce(function (t, p) { return t + p.precio; }, 0);
    catalogo.set(c.id, Object.assign({ tipo: 'conjunto', piezasData: piezas, precioRegular: regular, ahorro: regular - c.precio }, c));
  });

  /* ---------- Utilidades ---------- */
  var $ = function (sel, raiz) { return (raiz || document).querySelector(sel); };
  var $$ = function (sel, raiz) { return Array.prototype.slice.call((raiz || document).querySelectorAll(sel)); };

  var formato = new Intl.NumberFormat('es-MX', {
    style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 0
  });
  function dinero(n) { return formato.format(n); }

  function esc(texto) {
    return String(texto).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function normalizar(texto) {
    return String(texto).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  }

  var reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var almacen = {
    leer: function (clave, porDefecto) {
      try {
        var valor = window.localStorage.getItem(clave);
        return valor ? JSON.parse(valor) : porDefecto;
      } catch (e) { return porDefecto; }
    },
    guardar: function (clave, valor) {
      try { window.localStorage.setItem(clave, JSON.stringify(valor)); } catch (e) { /* sin almacenamiento: la sesión sigue funcionando */ }
    }
  };

  function validarTalla(id, talla) {
    var d = catalogo.get(id);
    if (!d || !talla) return false;
    if (TALLAS.indexOf(talla) !== -1) return true;
    if (d.tipo === 'conjunto' && typeof talla === 'string' && talla.trim().length > 0) return true;
    return false;
  }

  // Valida lo que venga de localStorage (pudo ser editado o venir de otra versión)
  function limpiarBolsa(items) {
    if (!Array.isArray(items)) return [];
    return items
      .filter(function (i) { return i && catalogo.has(i.id) && validarTalla(i.id, i.talla); })
      .map(function (i) {
        var cantidad = Math.min(MAX_CANTIDAD, Math.max(1, parseInt(i.cantidad, 10) || 1));
        return { id: i.id, talla: String(i.talla), cantidad: cantidad };
      });
  }
  function limpiarFavoritos(ids) {
    if (!Array.isArray(ids)) return [];
    return ids.filter(function (id, idx) { return catalogo.has(id) && ids.indexOf(id) === idx; });
  }

  /* ---------- Estado ---------- */
  var estado = {
    temporada: 'todo',
    orden: 'recomendados',
    busqueda: '',
    bolsa: limpiarBolsa(almacen.leer(CLAVE_BOLSA, [])),
    favoritos: limpiarFavoritos(almacen.leer(CLAVE_FAVORITOS, []))
  };
  var actual = null; // producto abierto en la vista rápida
  var vrCantidad = 1; // cantidad seleccionada en la vista rápida

  /* ---------- Elementos ---------- */
  var el = {
    catalogo: $('#catalogo'),
    vacio: $('#catalogo-vacio'),
    conteo: $('#conteo-resultados'),
    filtros: $('#filtros'),
    orden: $('#orden'),
    tienda: $('#tienda'),
    estadoBusqueda: $('#estado-busqueda'),
    terminoBusqueda: $('#termino-busqueda'),
    conjuntos: $('#lista-conjuntos'),

    btnMenu: $('#btn-menu'),
    menu: $('#menu-movil'),
    btnBuscar: $('#btn-buscar'),
    barraBusqueda: $('#barra-busqueda'),
    inputBusqueda: $('#input-busqueda'),

    btnBolsa: $('#btn-bolsa'),
    conteoBolsa: $('#conteo-bolsa'),
    bolsa: $('#bolsa'),
    bolsaTitulo: $('#bolsa-titulo'),
    bolsaContenido: $('#bolsa-contenido'),
    bolsaResumen: $('#bolsa-resumen'),
    bolsaTotales: $('#bolsa-totales'),
    btnPagar: $('#btn-pagar'),
    avisoPago: $('#aviso-pago'),

    btnFavoritos: $('#btn-favoritos'),
    conteoFavoritos: $('#conteo-favoritos'),
    favoritos: $('#favoritos'),
    favoritosContenido: $('#favoritos-contenido'),

    vr: $('#vista-rapida'),
    vrImagen: $('#vr-imagen'),
    vrMiniaturas: $('#vr-miniaturas'),
    vrTemporada: $('#vr-temporada'),
    vrTitulo: $('#vr-titulo'),
    vrPrecio: $('#vr-precio'),
    vrDescripcion: $('#vr-descripcion'),
    vrColor: $('#vr-color'),
    vrPiezas: $('#vr-piezas'),
    vrLegendTalla: $('#vr-legend-talla'),
    vrBtnGuia: $('#vr-btn-guia'),
    vrTextoGuia: $('#vr-texto-guia'),
    vrGuiaPanel: $('#vr-guia-panel'),
    vrTallas: $('#vr-tallas'),
    vrConjuntoTallas: $('#vr-conjunto-tallas'),
    vrNotaTalla: $('#vr-nota-talla'),
    vrError: $('#vr-error'),
    vrQtyMenos: $('#vr-qty-menos'),
    vrQtyVal: $('#vr-qty-val'),
    vrQtyMas: $('#vr-qty-mas'),
    vrAgregar: $('#vr-agregar'),
    vrFavorito: $('#vr-favorito'),
    vrCompartir: $('#vr-compartir'),

    aviso: $('#aviso'),
    avisoTexto: $('#aviso-texto'),
    avisoVerBolsa: $('#aviso-ver-bolsa')
  };

  var ICONO_CORAZON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.3 4.6 13a4.7 4.7 0 0 1 0-6.7 4.7 4.7 0 0 1 6.7 0l.7.7.7-.7a4.7 4.7 0 0 1 6.7 0 4.7 4.7 0 0 1 0 6.7Z"/></svg>';

  /* ---------- Catálogo ---------- */
  function prendasVisibles() {
    var palabras = normalizar(estado.busqueda).split(/\s+/).filter(Boolean);
    var lista = PRODUCTOS.filter(function (p) {
      return estado.temporada === 'todo' || p.temporada === estado.temporada;
    });
    if (palabras.length) {
      lista = lista.filter(function (p) {
        var texto = normalizar([p.nombre, p.color, TEMPORADAS[p.temporada], p.descripcion].join(' '));
        return palabras.every(function (w) { return texto.indexOf(w) !== -1; });
      });
    }
    if (estado.orden === 'precio-asc') lista = lista.slice().sort(function (a, b) { return a.precio - b.precio; });
    if (estado.orden === 'precio-desc') lista = lista.slice().sort(function (a, b) { return b.precio - a.precio; });
    return lista;
  }

  function esFavorito(id) { return estado.favoritos.indexOf(id) !== -1; }

  function tarjeta(p) {
    var nombre = esc(p.nombre);
    return '' +
      '<li class="card">' +
        '<article aria-labelledby="t-' + p.id + '">' +
          '<div class="card-media"' + (p.encuadre ? ' data-encuadre="' + esc(p.encuadre) + '"' : '') + '>' +
            '<button class="card-open" type="button" data-accion="ver" data-id="' + p.id + '" tabindex="-1" aria-label="Ver ' + nombre + '">' +
              '<img class="img-main" src="' + p.img + '" alt="" width="' + p.w + '" height="' + p.h + '" loading="lazy" decoding="async">' +
              '<img class="img-alt" src="' + p.look + '" alt="" loading="lazy" decoding="async">' +
            '</button>' +
            '<div class="quick" aria-hidden="true">' +
              '<span class="quick-label">Añadir talla</span>' +
              TALLAS.map(function (t) {
                return '<button type="button" tabindex="-1" data-accion="rapido" data-id="' + p.id + '" data-talla="' + t + '">' + t + '</button>';
              }).join('') +
            '</div>' +
          '</div>' +
          '<div class="card-info">' +
            '<h3 class="card-title" id="t-' + p.id + '"><button type="button" data-accion="ver" data-id="' + p.id + '">' + nombre + '</button></h3>' +
            '<p class="price">' + dinero(p.precio) + '</p>' +
            '<p class="card-meta">' +
              '<span class="card-season">' + esc(TEMPORADAS[p.temporada]) + '</span>' +
              '<span class="swatch" style="--sw:' + p.muestra + '" title="' + esc(p.color) + '"><span class="sr-only">Color: ' + esc(p.color) + '</span></span>' +
            '</p>' +
            '<button class="fav-btn" type="button" data-accion="favorito" data-id="' + p.id + '" aria-pressed="' + esFavorito(p.id) + '" aria-label="Guardar ' + nombre + ' en favoritos">' + ICONO_CORAZON + '</button>' +
          '</div>' +
        '</article>' +
      '</li>';
  }

  function pintarCatalogo() {
    var lista = prendasVisibles();
    el.catalogo.innerHTML = lista.map(tarjeta).join('');
    el.vacio.hidden = lista.length > 0;
    el.conteo.textContent = lista.length + (lista.length === 1 ? ' prenda' : ' prendas');

    var termino = estado.busqueda.trim();
    el.estadoBusqueda.hidden = !termino;
    el.terminoBusqueda.textContent = termino;

    $$('.chip', el.filtros).forEach(function (chip) {
      chip.setAttribute('aria-pressed', String(chip.dataset.temporada === estado.temporada));
    });
  }

  function pintarConjuntos() {
    el.conjuntos.innerHTML = CONJUNTOS.map(function (c) {
      var d = catalogo.get(c.id);
      var piezas = d.piezasData.map(function (p) {
        return '<li><img src="' + p.img + '" alt="" loading="lazy" decoding="async"><span>' + esc(p.nombre) + '</span><span>' + dinero(p.precio) + '</span></li>';
      }).join('');
      return '' +
        '<article class="look-card" aria-labelledby="c-' + d.id + '">' +
          '<button class="look-card-media" type="button" data-accion="ver" data-id="' + d.id + '" aria-label="Ver ' + esc(d.nombre) + '">' +
            '<img src="' + d.img + '" alt="" width="' + d.w + '" height="' + d.h + '" loading="lazy" decoding="async">' +
          '</button>' +
          '<div class="look-card-body">' +
            '<h3 id="c-' + d.id + '">' + esc(d.nombre) + '</h3>' +
            '<p class="look-meta">' + esc(TEMPORADAS[d.temporada]) + ' · ' + d.piezasData.length + ' piezas</p>' +
            '<ul class="look-items">' + piezas + '</ul>' +
            '<dl class="look-ledger">' +
              '<div><dt>Por separado</dt><dd><s>' + dinero(d.precioRegular) + '</s></dd></div>' +
              '<div class="is-set"><dt>Conjunto</dt><dd>' + dinero(d.precio) + '</dd></div>' +
              '<div class="is-save"><dt>Ahorras</dt><dd>' + dinero(d.ahorro) + '</dd></div>' +
            '</dl>' +
            '<button class="btn btn-dark" type="button" data-accion="ver" data-id="' + d.id + '">Elegir talla y añadir</button>' +
          '</div>' +
        '</article>';
    }).join('');
  }

  function cambiarTemporada(temporada) {
    estado.temporada = TEMPORADAS[temporada] ? temporada : 'todo';
    pintarCatalogo();
  }

  /* ---------- Búsqueda ---------- */
  var yaDesplazo = false;
  function abrirBusqueda() {
    el.barraBusqueda.hidden = false;
    el.btnBuscar.setAttribute('aria-expanded', 'true');
    yaDesplazo = false;
    el.inputBusqueda.focus();
  }
  function cerrarBusqueda() {
    el.barraBusqueda.hidden = true;
    el.btnBuscar.setAttribute('aria-expanded', 'false');
    el.btnBuscar.focus();
  }
  function borrarBusqueda() {
    estado.busqueda = '';
    el.inputBusqueda.value = '';
    pintarCatalogo();
  }
  function irATienda() {
    el.tienda.scrollIntoView({ behavior: reducirMovimiento ? 'auto' : 'smooth', block: 'start' });
  }

  /* ---------- Diálogos ---------- */
  function cerrarDialogos() {
    $$('dialog[open]').forEach(function (d) { d.close(); });
  }
  function abrirDialogo(dialogo) {
    cerrarDialogos();
    if (typeof dialogo.showModal === 'function') dialogo.showModal();
    else dialogo.setAttribute('open', '');
  }

  /* ---------- Vista rápida ---------- */
  function abrirDetalle(id, evitarSyncUrl) {
    var d = catalogo.get(id);
    if (!d) return;
    actual = d;
    var esConjunto = d.tipo === 'conjunto';

    // Reiniciar selector de cantidad
    vrCantidad = 1;
    el.vrQtyVal.textContent = '1';
    el.vrQtyMenos.disabled = true;
    el.vrQtyMas.disabled = false;

    // Reiniciar acordeón de guía de medidas
    el.vrGuiaPanel.hidden = true;
    el.vrBtnGuia.setAttribute('aria-expanded', 'false');
    el.vrTextoGuia.textContent = 'Guía de medidas';

    el.vrTemporada.textContent = (esConjunto ? 'Conjunto · ' : 'Colección ') + TEMPORADAS[d.temporada];
    el.vrTitulo.textContent = d.nombre;
    el.vrPrecio.innerHTML = esConjunto
      ? '<s>' + dinero(d.precioRegular) + '</s><span class="sale">' + dinero(d.precio) + '</span><span class="save-text">Ahorras ' + dinero(d.ahorro) + '</span>'
      : dinero(d.precio);
    el.vrDescripcion.textContent = d.descripcion;

    el.vrColor.hidden = esConjunto;
    if (!esConjunto) el.vrColor.innerHTML = 'Color: <strong>' + esc(d.color) + '</strong>';

    el.vrPiezas.hidden = !esConjunto;
    el.vrPiezas.innerHTML = esConjunto
      ? d.piezasData.map(function (p) { return '<li><span>' + esc(p.nombre) + '</span><span>' + dinero(p.precio) + '</span></li>'; }).join('')
      : '';

    // Manejo de tallas
    if (esConjunto) {
      el.vrLegendTalla.textContent = 'Tallas del conjunto';
      el.vrNotaTalla.hidden = false;
      el.vrNotaTalla.textContent = 'Elige una talla rápida para todo el look o personaliza cada prenda:';

      // Selector rápido general
      el.vrTallas.innerHTML = TALLAS.map(function (t) {
        return '<input type="radio" name="vr-talla-general" id="vr-talla-gen-' + t + '" value="' + t + '"><label for="vr-talla-gen-' + t + '">' + t + '</label>';
      }).join('');

      // Selector individual por prenda
      el.vrConjuntoTallas.hidden = false;
      el.vrConjuntoTallas.innerHTML = d.piezasData.map(function (p) {
        return '<div class="set-piece-row" data-pieza="' + p.id + '">' +
          '<div class="set-piece-head"><img class="set-piece-thumb" src="' + p.img + '" alt=""><span>' + esc(p.nombre) + '</span></div>' +
          '<div class="size-opts size-opts-sm">' +
            TALLAS.map(function (t) {
              return '<input type="radio" name="vr-set-' + p.id + '" id="vr-set-' + p.id + '-' + t + '" value="' + t + '"><label for="vr-set-' + p.id + '-' + t + '">' + t + '</label>';
            }).join('') +
          '</div>' +
        '</div>';
      }).join('');
    } else {
      el.vrLegendTalla.textContent = 'Talla';
      el.vrNotaTalla.hidden = true;
      el.vrConjuntoTallas.hidden = true;
      el.vrConjuntoTallas.innerHTML = '';
      el.vrTallas.innerHTML = TALLAS.map(function (t) {
        return '<input type="radio" name="vr-talla" id="vr-talla-' + t + '" value="' + t + '"><label for="vr-talla-' + t + '">' + t + '</label>';
      }).join('');
    }

    // Fotos: prenda + look de su temporada, o look + piezas del conjunto
    var fotos = esConjunto
      ? [{ src: d.img, alt: 'Look completo: ' + d.nombre }].concat(d.piezasData.map(function (p) { return { src: p.img, alt: p.nombre }; }))
      : [{ src: d.img, alt: d.nombre + ', color ' + d.color.toLowerCase() }, { src: d.look, alt: 'Look de ' + TEMPORADAS[d.temporada].toLowerCase() + ' con ' + d.nombre.toLowerCase() }];
    mostrarFoto(fotos[0]);
    el.vrMiniaturas.innerHTML = fotos.map(function (f, i) {
      return '<button type="button" data-foto="' + i + '" aria-pressed="' + (i === 0) + '" aria-label="Foto ' + (i + 1) + ': ' + esc(f.alt) + '"><img src="' + f.src + '" alt=""></button>';
    }).join('');
    el.vrMiniaturas.onclick = function (e) {
      var b = e.target.closest('[data-foto]');
      if (!b) return;
      mostrarFoto(fotos[+b.dataset.foto]);
      $$('[data-foto]', el.vrMiniaturas).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
    };

    el.vrError.hidden = true;
    el.vrAgregar.textContent = esConjunto ? 'Añadir conjunto a la bolsa' : 'Añadir a la bolsa';
    actualizarBotonFavoritoVR();

    // Sincronizar URL para compartir (Deep Linking)
    if (!evitarSyncUrl) {
      try {
        history.replaceState({ yokremPrenda: id }, '', '#prenda/' + id);
      } catch (e) {}
    }

    abrirDialogo(el.vr);
  }

  function mostrarFoto(foto) {
    el.vrImagen.src = foto.src;
    el.vrImagen.alt = foto.alt;
  }

  function actualizarBotonFavoritoVR() {
    if (!actual) return;
    var fav = esFavorito(actual.id);
    el.vrFavorito.setAttribute('aria-pressed', String(fav));
    el.vrFavorito.textContent = fav ? 'Guardado en favoritos' : 'Guardar en favoritos';
  }

  /* ---------- Compartir ---------- */
  function compartirPrenda() {
    if (!actual) return;
    var url = window.location.origin + window.location.pathname + '#prenda/' + actual.id;
    var titulo = actual.nombre + ' | YOKREM';
    var texto = 'Descubre ' + actual.nombre + ' en YOKREM. Ropa que te define, confeccionada en Chiapas.';

    if (navigator.share) {
      navigator.share({
        title: titulo,
        text: texto,
        url: url
      }).catch(function (err) {
        if (!err || err.name !== 'AbortError') {
          copiarAlPortapapeles(url);
        }
      });
    } else {
      copiarAlPortapapeles(url);
    }
  }

  function copiarAlPortapapeles(url) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () {
        avisar('Enlace copiado al portapapeles.');
      }).catch(function () {
        fallbackCopiar(url);
      });
    } else {
      fallbackCopiar(url);
    }
  }

  function fallbackCopiar(url) {
    var temp = document.createElement('input');
    temp.value = url;
    document.body.appendChild(temp);
    temp.select();
    try {
      document.execCommand('copy');
      avisar('Enlace copiado al portapapeles.');
    } catch (e) {
      avisar('Copia este enlace: ' + url);
    }
    document.body.removeChild(temp);
  }

  /* ---------- Bolsa ---------- */
  function guardarBolsa() {
    almacen.guardar(CLAVE_BOLSA, estado.bolsa);
    pintarBolsa();
  }

  function agregar(id, talla, cantidad) {
    cantidad = Math.min(MAX_CANTIDAD, Math.max(1, parseInt(cantidad, 10) || 1));
    var d = catalogo.get(id);
    if (!d || !validarTalla(id, talla)) return;
    var item = estado.bolsa.find(function (i) { return i.id === id && i.talla === talla; });
    if (item) {
      if (item.cantidad >= MAX_CANTIDAD) {
        avisar('Puedes llevar hasta ' + MAX_CANTIDAD + ' piezas por prenda y talla.');
        return;
      }
      item.cantidad = Math.min(MAX_CANTIDAD, item.cantidad + cantidad);
    } else {
      estado.bolsa.push({ id: id, talla: talla, cantidad: cantidad });
    }
    guardarBolsa();

    // Microinteracción visual en el icono de bolsa del encabezado
    el.btnBolsa.classList.remove('bump');
    void el.btnBolsa.offsetWidth;
    el.btnBolsa.classList.add('bump');

    var prefijo = cantidad > 1 ? cantidad + 'x ' : '';
    var descTalla = talla.indexOf('·') !== -1 ? 'tallas ' + talla : 'talla ' + talla;
    avisar(prefijo + d.nombre + ' · ' + descTalla + ' se añadió a tu bolsa.', true);
  }

  function cambiarCantidad(indice, delta) {
    var item = estado.bolsa[indice];
    if (!item) return;
    item.cantidad = Math.min(MAX_CANTIDAD, Math.max(1, item.cantidad + delta));
    guardarBolsa();
    // Al volver a pintar la bolsa se pierde el foco: lo devolvemos al mismo control
    var mismo = $('[data-accion="' + (delta < 0 ? 'menos' : 'mas') + '"][data-indice="' + indice + '"]', el.bolsaContenido);
    var otro = $('[data-accion="' + (delta < 0 ? 'mas' : 'menos') + '"][data-indice="' + indice + '"]', el.bolsaContenido);
    var destino = mismo && !mismo.disabled ? mismo : otro;
    if (destino) destino.focus();
  }

  function quitar(indice) {
    var item = estado.bolsa[indice];
    if (!item) return;
    var d = catalogo.get(item.id);
    estado.bolsa.splice(indice, 1);
    guardarBolsa();
    avisar(d.nombre + ' se quitó de tu bolsa.');
    // Mantener el foco dentro de la bolsa
    var siguiente = $('[data-accion="quitar"]', el.bolsaContenido) || $('.drawer-empty .btn', el.bolsaContenido);
    if (siguiente) siguiente.focus();
  }

  function totales() {
    return estado.bolsa.reduce(function (t, i) {
      var d = catalogo.get(i.id);
      t.unidades += i.cantidad;
      t.regular += d.precioRegular * i.cantidad;
      t.ahorro += d.ahorro * i.cantidad;
      t.total += d.precio * i.cantidad;
      return t;
    }, { unidades: 0, regular: 0, ahorro: 0, total: 0 });
  }

  function pintarBolsa() {
    var t = totales();
    el.conteoBolsa.hidden = t.unidades === 0;
    el.conteoBolsa.textContent = t.unidades;
    el.btnBolsa.setAttribute('aria-label', 'Bolsa de compras, ' + t.unidades + (t.unidades === 1 ? ' pieza' : ' piezas'));
    el.bolsaTitulo.textContent = t.unidades ? 'Bolsa de compras (' + t.unidades + ')' : 'Bolsa de compras';

    if (!estado.bolsa.length) {
      el.bolsaContenido.innerHTML =
        '<div class="drawer-empty"><p>Tu bolsa está vacía</p><p>Explora las colecciones y guarda aquí lo que te define.</p>' +
        '<a class="btn btn-dark" href="#tienda" data-filtro="todo" data-cerrar-dialogo>Ir a la tienda</a></div>';
      el.bolsaResumen.hidden = true;
      return;
    }

    el.bolsaContenido.innerHTML = '<ul class="line-list">' + estado.bolsa.map(function (i, idx) {
      var d = catalogo.get(i.id);
      var detalle = d.tipo === 'conjunto'
        ? d.piezasData.map(function (p) { return esc(p.nombre); }).join(' + ')
        : esc(d.color);
      var descTalla = i.talla.indexOf('·') !== -1 ? 'Tallas: ' + esc(i.talla) : 'Talla ' + esc(i.talla);
      return '' +
        '<li class="line-item">' +
          '<img class="line-thumb" src="' + d.img + '" alt="" loading="lazy">' +
          '<div class="line-meta">' +
            '<span class="line-name">' + esc(d.nombre) + '</span>' +
            '<span class="line-sub">' + detalle + '</span>' +
            '<span class="line-sub">' + descTalla + ' · ' + dinero(d.precio) + ' c/u</span>' +
            '<div class="line-row">' +
              '<div class="qty" role="group" aria-label="Cantidad de ' + esc(d.nombre) + '">' +
                '<button type="button" data-accion="menos" data-indice="' + idx + '" aria-label="Quitar una"' + (i.cantidad <= 1 ? ' disabled' : '') + '>−</button>' +
                '<output aria-live="polite">' + i.cantidad + '</output>' +
                '<button type="button" data-accion="mas" data-indice="' + idx + '" aria-label="Agregar una"' + (i.cantidad >= MAX_CANTIDAD ? ' disabled' : '') + '>+</button>' +
              '</div>' +
              '<span class="line-price">' + dinero(d.precio * i.cantidad) + '</span>' +
            '</div>' +
            '<div class="line-actions"><button class="text-btn" type="button" data-accion="quitar" data-indice="' + idx + '">Eliminar</button></div>' +
          '</div>' +
        '</li>';
    }).join('') + '</ul>';

    var filas = '<div class="summary-row"><span>Subtotal</span><span>' + dinero(t.regular) + '</span></div>';
    if (t.ahorro > 0) {
      filas += '<div class="summary-row save"><span>Ahorro por conjuntos</span><span>−' + dinero(t.ahorro) + '</span></div>';
    }
    filas += '<div class="summary-row total"><span>Total</span><span>' + dinero(t.total) + '</span></div>';
    el.bolsaTotales.innerHTML = filas;
    el.bolsaResumen.hidden = false;
  }

  function abrirBolsa() {
    el.avisoPago.hidden = true;
    el.btnPagar.hidden = false;
    abrirDialogo(el.bolsa);
  }

  /* ---------- Favoritos ---------- */
  function alternarFavorito(id) {
    var d = catalogo.get(id);
    if (!d) return;
    var i = estado.favoritos.indexOf(id);
    if (i === -1) estado.favoritos.push(id); else estado.favoritos.splice(i, 1);
    almacen.guardar(CLAVE_FAVORITOS, estado.favoritos);

    var fav = i === -1;
    $$('.fav-btn[data-id="' + id + '"]').forEach(function (b) { b.setAttribute('aria-pressed', String(fav)); });
    if (actual && actual.id === id) actualizarBotonFavoritoVR();
    pintarFavoritos();
    avisar(fav ? d.nombre + ' se guardó en favoritos.' : d.nombre + ' se quitó de favoritos.');
  }

  function pintarFavoritos() {
    var n = estado.favoritos.length;
    el.conteoFavoritos.hidden = n === 0;
    el.conteoFavoritos.textContent = n;
    el.btnFavoritos.setAttribute('aria-label', 'Favoritos, ' + n + (n === 1 ? ' guardado' : ' guardados'));

    if (!n) {
      el.favoritosContenido.innerHTML =
        '<div class="drawer-empty"><p>Aún no tienes favoritos</p><p>Toca el corazón de cualquier prenda para guardarla aquí.</p>' +
        '<a class="btn btn-line" href="#tienda" data-filtro="todo" data-cerrar-dialogo>Ver prendas</a></div>';
      return;
    }
    el.favoritosContenido.innerHTML = '<ul class="line-list">' + estado.favoritos.map(function (id) {
      var d = catalogo.get(id);
      return '' +
        '<li class="line-item">' +
          '<img class="line-thumb" src="' + d.img + '" alt="" loading="lazy">' +
          '<div class="line-meta">' +
            '<span class="line-name">' + esc(d.nombre) + '</span>' +
            '<span class="line-sub">' + (d.tipo === 'conjunto' ? 'Conjunto · ' : '') + esc(TEMPORADAS[d.temporada]) + '</span>' +
            '<span class="line-price">' + dinero(d.precio) + '</span>' +
            '<div class="line-row">' +
              '<button class="btn btn-dark" type="button" data-accion="ver" data-id="' + d.id + '">Elegir talla</button>' +
              '<button class="text-btn" type="button" data-accion="favorito" data-id="' + d.id + '">Quitar</button>' +
            '</div>' +
          '</div>' +
        '</li>';
    }).join('') + '</ul>';
  }

  /* ---------- Aviso breve ---------- */
  var temporizadorAviso;
  function avisar(mensaje, conBolsa) {
    // Los diálogos abiertos quedan por encima de toda la página: el aviso
    // se muestra dentro del diálogo abierto para que siempre sea visible.
    var anfitrion = $('dialog[open]') || document.body;
    if (el.aviso.parentNode !== anfitrion) anfitrion.appendChild(el.aviso);
    el.avisoTexto.textContent = mensaje;
    el.avisoVerBolsa.hidden = !conBolsa;
    el.aviso.classList.add('show');
    clearTimeout(temporizadorAviso);
    temporizadorAviso = setTimeout(function () { el.aviso.classList.remove('show'); }, 3800);
  }

  /* ---------- Eventos ---------- */
  // Acciones delegadas: sirven para tarjetas, conjuntos, bolsa y favoritos
  document.addEventListener('click', function (e) {
    var filtro = e.target.closest('[data-filtro]');
    if (filtro) {
      estado.busqueda = '';
      el.inputBusqueda.value = '';
      cambiarTemporada(filtro.dataset.filtro);
      if (filtro.closest('dialog')) cerrarDialogos();
    } else if (e.target.closest('[data-cerrar-dialogo]')) {
      cerrarDialogos();
    }

    var cerrar = e.target.closest('[data-cerrar]');
    if (cerrar) { cerrar.closest('dialog').close(); return; }

    var menuLink = e.target.closest('.mobile-nav a');
    if (menuLink) el.menu.close();

    var accion = e.target.closest('[data-accion]');
    if (!accion) return;
    var id = accion.dataset.id;
    var indice = parseInt(accion.dataset.indice, 10);

    switch (accion.dataset.accion) {
      case 'ver': abrirDetalle(id); break;
      case 'favorito': alternarFavorito(id); break;
      case 'rapido': agregar(id, accion.dataset.talla); break;
      case 'menos': cambiarCantidad(indice, -1); break;
      case 'mas': cambiarCantidad(indice, 1); break;
      case 'quitar': quitar(indice); break;
    }
  });

  // Cerrar diálogos al tocar el fondo oscuro
  $$('dialog').forEach(function (d) {
    d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
  });

  el.filtros.addEventListener('click', function (e) {
    var chip = e.target.closest('.chip');
    if (chip) cambiarTemporada(chip.dataset.temporada);
  });

  el.orden.addEventListener('change', function () {
    estado.orden = el.orden.value;
    pintarCatalogo();
  });

  el.btnMenu.addEventListener('click', function () { abrirDialogo(el.menu); });

  el.btnBuscar.addEventListener('click', function () {
    if (el.barraBusqueda.hidden) abrirBusqueda(); else cerrarBusqueda();
  });
  $('#btn-cerrar-busqueda').addEventListener('click', cerrarBusqueda);
  el.inputBusqueda.addEventListener('input', function () {
    estado.busqueda = el.inputBusqueda.value;
    estado.temporada = 'todo';
    pintarCatalogo();
    if (!yaDesplazo && estado.busqueda.trim()) { yaDesplazo = true; irATienda(); }
  });
  el.inputBusqueda.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') cerrarBusqueda();
    if (e.key === 'Enter') irATienda();
  });
  $('#btn-borrar-busqueda').addEventListener('click', borrarBusqueda);
  $('#btn-ver-todo').addEventListener('click', function () { borrarBusqueda(); cambiarTemporada('todo'); });

  el.btnBolsa.addEventListener('click', abrirBolsa);
  el.btnFavoritos.addEventListener('click', function () { abrirDialogo(el.favoritos); });
  el.avisoVerBolsa.addEventListener('click', function () {
    el.aviso.classList.remove('show');
    abrirBolsa();
  });

  el.btnPagar.addEventListener('click', function () {
    el.btnPagar.hidden = true;
    el.avisoPago.hidden = false;
    el.avisoPago.focus();
  });
  $('#btn-aviso-ok').addEventListener('click', function () {
    el.avisoPago.hidden = true;
    el.btnPagar.hidden = false;
    el.btnPagar.focus();
  });

  // Acordeón de Guía de Medidas
  if (el.vrBtnGuia) {
    el.vrBtnGuia.addEventListener('click', function () {
      var cerrado = el.vrGuiaPanel.hidden;
      el.vrGuiaPanel.hidden = !cerrado;
      el.vrBtnGuia.setAttribute('aria-expanded', String(cerrado));
      el.vrTextoGuia.textContent = cerrado ? 'Ocultar medidas' : 'Guía de medidas';
    });
  }

  // Selector de cantidad en vista rápida
  if (el.vrQtyMenos && el.vrQtyMas) {
    el.vrQtyMenos.addEventListener('click', function () {
      if (vrCantidad > 1) {
        vrCantidad--;
        el.vrQtyVal.textContent = vrCantidad;
        el.vrQtyMenos.disabled = vrCantidad <= 1;
        el.vrQtyMas.disabled = false;
      }
    });
    el.vrQtyMas.addEventListener('click', function () {
      if (vrCantidad < MAX_CANTIDAD) {
        vrCantidad++;
        el.vrQtyVal.textContent = vrCantidad;
        el.vrQtyMas.disabled = vrCantidad >= MAX_CANTIDAD;
        el.vrQtyMenos.disabled = false;
      }
    });
  }

  // Compartir prenda
  if (el.vrCompartir) {
    el.vrCompartir.addEventListener('click', compartirPrenda);
  }

  // Selección de tallas
  el.vrTallas.addEventListener('change', function (e) {
    el.vrError.hidden = true;
    if (actual && actual.tipo === 'conjunto' && e.target.name === 'vr-talla-general') {
      var val = e.target.value;
      $$('.set-piece-row', el.vrConjuntoTallas).forEach(function (fila) {
        var pId = fila.dataset.pieza;
        var r = $('#vr-set-' + pId + '-' + val, fila);
        if (r) r.checked = true;
      });
    }
  });
  if (el.vrConjuntoTallas) {
    el.vrConjuntoTallas.addEventListener('change', function () {
      el.vrError.hidden = true;
    });
  }

  // Añadir a la bolsa desde vista rápida
  el.vrAgregar.addEventListener('click', function () {
    if (!actual) return;
    if (actual.tipo === 'conjunto') {
      var piezas = actual.piezasData;
      var seleccionadas = [];
      var falta = false;
      var todasIguales = true;
      var primeraTalla = null;

      piezas.forEach(function (p) {
        var opt = $('input[name="vr-set-' + p.id + '"]:checked', el.vrConjuntoTallas);
        if (!opt) {
          falta = true;
        } else {
          seleccionadas.push({ nombre: p.nombre, talla: opt.value });
          if (primeraTalla === null) primeraTalla = opt.value;
          else if (primeraTalla !== opt.value) todasIguales = false;
        }
      });

      if (falta) {
        el.vrError.textContent = 'Elige la talla de cada prenda para añadir el conjunto.';
        el.vrError.hidden = false;
        return;
      }

      var resumenTalla = todasIguales
        ? primeraTalla
        : seleccionadas.map(function (s) { return s.nombre.split(' ')[0] + ': ' + s.talla; }).join(' · ');

      el.vr.close();
      agregar(actual.id, resumenTalla, vrCantidad);
    } else {
      var talla = $('input[name="vr-talla"]:checked', el.vrTallas);
      if (!talla) {
        el.vrError.textContent = 'Elige una talla para añadir a la bolsa.';
        el.vrError.hidden = false;
        $('input', el.vrTallas).focus();
        return;
      }
      el.vr.close();
      agregar(actual.id, talla.value, vrCantidad);
    }
  });

  el.vrFavorito.addEventListener('click', function () { if (actual) alternarFavorito(actual.id); });

  // Limpiar URL al cerrar la vista rápida
  el.vr.addEventListener('close', function () {
    if (window.location.hash.indexOf('#prenda/') === 0) {
      try {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      } catch (e) {}
    }
  });

  // Deep linking: sincronizar al cambiar hash en el navegador
  function verificarHash(desdeCarga) {
    var hash = window.location.hash;
    if (hash.indexOf('#prenda/') === 0) {
      var id = hash.replace('#prenda/', '').trim();
      if (catalogo.has(id)) {
        abrirDetalle(id, true);
      }
    }
  }
  window.addEventListener('hashchange', function () { verificarHash(false); });

  /* ---------- Portada en video ---------- */
  var hero = $('#inicio');
  var encabezado = $('#encabezado');
  var video = $('#hero-video');
  var btnVideo = $('#btn-video');
  var btnVideoTexto = $('#btn-video-texto');
  var btnAudio = $('#btn-audio');
  var btnAudioTexto = $('#btn-audio-texto');
  var playerNote = $('#player-note');
  var pausadoPorUsuario = reducirMovimiento;
  var heroVisible = true;

  function pintarBotonVideo() {
    var pausado = video.paused;
    btnVideo.classList.toggle('is-paused', pausado);
    btnVideoTexto.textContent = pausado ? 'Reproducir video' : 'Pausar video';
  }
  function pintarBotonAudio() {
    if (!btnAudio) return;
    var conAudio = !video.muted && video.volume > 0;
    btnAudio.classList.toggle('is-unmuted', conAudio);
    btnAudio.setAttribute('aria-pressed', conAudio ? 'true' : 'false');
    btnAudio.setAttribute('aria-label', conAudio ? 'Silenciar audio del video' : 'Activar audio del video');
    btnAudio.setAttribute('title', conAudio ? 'Silenciar audio' : 'Activar audio');
    if (btnAudioTexto) {
      btnAudioTexto.textContent = conAudio ? 'Silenciar' : 'Activar audio';
    }
    if (playerNote) {
      playerNote.textContent = conAudio ? 'Audio activado' : 'Audio desactivado';
    }
  }
  function reproducir() {
    var promesa = video.play();
    if (promesa && promesa.catch) promesa.catch(pintarBotonVideo);
  }

  if (video) {
    btnVideo.hidden = false;
    if (btnAudio) btnAudio.hidden = false;
    video.addEventListener('play', pintarBotonVideo);
    video.addEventListener('pause', pintarBotonVideo);
    video.addEventListener('volumechange', pintarBotonAudio);
    btnVideo.addEventListener('click', function () {
      pausadoPorUsuario = !video.paused;
      if (video.paused) reproducir(); else video.pause();
    });
    if (btnAudio) {
      btnAudio.addEventListener('click', function () {
        if (video.muted || video.volume === 0) {
          video.muted = false;
          video.volume = 1;
          if (video.paused) {
            pausadoPorUsuario = false;
            reproducir();
          }
        } else {
          video.muted = true;
        }
        pintarBotonAudio();
      });
    }
    if (!pausadoPorUsuario) reproducir();
    pintarBotonVideo();
    pintarBotonAudio();

    // Ahorra batería: detiene el video cuando la portada sale de la pantalla
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entradas) {
        heroVisible = entradas[0].isIntersecting;
        if (pausadoPorUsuario) return;
        if (heroVisible) reproducir(); else video.pause();
      }).observe(hero);
    }
    // Chrome aborta play() si la pestaña se abrió en segundo plano
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible' && heroVisible && !pausadoPorUsuario && video.paused) reproducir();
    });
  }

  var encabezadoPendiente = false;
  function actualizarEncabezado() {
    encabezadoPendiente = false;
    encabezado.classList.toggle('is-over-hero', hero.getBoundingClientRect().bottom > encabezado.offsetHeight);
    encabezado.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', function () {
    if (!encabezadoPendiente) { encabezadoPendiente = true; requestAnimationFrame(actualizarEncabezado); }
  }, { passive: true });
  window.addEventListener('resize', actualizarEncabezado);
  actualizarEncabezado();

  /* ---------- Inicio ---------- */
  var anio = $('#anio');
  if (anio) anio.textContent = new Date().getFullYear();

  pintarCatalogo();
  pintarConjuntos();
  pintarBolsa();
  pintarFavoritos();
  verificarHash(true);
})();
