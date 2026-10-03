/* ==========================================================================
   Scan-bar — cliente para las páginas web de los negocios (mismo archivo en todas las webs estáticas).
   Contrato: docs/INTEGRACION-WEBS.md del repositorio Scan-bar.

   Trae los productos que se agregaron desde Scan-bar (Administración → Productos y etiquetas) y se los
   pasa a la página antes de pintarla. Si Scan-bar no está configurado o no responde, la página funciona
   exactamente igual que siempre, solo con sus productos del código.

   Configuración, en la etiqueta <script>:
     data-url     URL pública de Scan-bar. Vacía = automática: si la página vive en <web>.<cuenta>.workers.dev,
                  Scan-bar está en scan-bar.<cuenta>.workers.dev (misma cuenta de Cloudflare); en otro dominio,
                  apagada. "off" la apaga siempre.
     data-tienda  identificador del negocio en Scan-bar
   Para probar en local: abre la página con ?scanbar=http://localhost:3000 (solo se aceptan localhost/127.0.0.1;
   se recuerda durante la sesión del navegador; ?scanbar= vacío lo olvida).
   ========================================================================== */
(function () {
  'use strict';
  var script = document.currentScript;
  var url = ((script && script.getAttribute('data-url')) || '').trim();
  var tienda = ((script && script.getAttribute('data-tienda')) || '').trim();
  var ESPERA_MS = 1500; // primera visita sin copia guardada: lo máximo que se espera antes de pintar sin extras
  if (!url) { var cuenta = /^[a-z0-9-]+\.([a-z0-9-]+\.workers\.dev)$/i.exec(location.hostname); if (cuenta) url = 'https://scan-bar.' + cuenta[1]; }
  if (url === 'off') url = '';

  try {
    var q = new URLSearchParams(location.search).get('scanbar');
    if (q !== null) { if (q) sessionStorage.setItem('scanbar:url', q); else sessionStorage.removeItem('scanbar:url'); }
    var local = sessionStorage.getItem('scanbar:url');
    if (local && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/?$/.test(local)) url = local;
  } catch (e) { /* sin sessionStorage: se usa la configuración de la etiqueta */ }
  url = url.replace(/\/+$/, '');
  var activo = /^https?:\/\//.test(url) && /^[a-z0-9-]+$/.test(tienda);
  var CLAVE = 'scanbar:catalogo:' + tienda;

  /** Solo URLs http(s), normalizadas (comillas y espacios quedan codificados). */
  function urlSegura(u) {
    try { var x = new URL(String(u)); return /^https?:$/.test(x.protocol) ? x.href : ''; } catch (e) { return ''; }
  }
  /** Lo mínimo que una página necesita para pintar un producto; lo demás se descarta. */
  function valido(p) {
    var sku = /^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/;
    return p && sku.test(p.sku) && typeof p.name === 'string' && typeof p.category === 'string' && Array.isArray(p.variants) && p.variants.length > 0 &&
      p.variants.every(function (v) { return v && sku.test(v.sku) && Number.isInteger(v.priceCents) && v.priceCents >= 0; });
  }
  function leerCopia() {
    try { var c = JSON.parse(localStorage.getItem(CLAVE) || 'null'); return Array.isArray(c) ? c.filter(valido) : null; } catch (e) { return null; }
  }
  function traer() {
    var ctrl = typeof AbortController === 'function' ? new AbortController() : null;
    var t = setTimeout(function () { if (ctrl) ctrl.abort(); }, 8000);
    return fetch(url + '/v1/public/t/' + tienda + '/catalog', { credentials: 'omit', signal: ctrl ? ctrl.signal : undefined })
      .then(function (r) { if (!r.ok) throw new Error('Scan-bar respondió ' + r.status); return r.json(); })
      .then(function (r) {
        var lista = (r && Array.isArray(r.products) ? r.products : []).filter(valido);
        try { localStorage.setItem(CLAVE, JSON.stringify(lista)); } catch (e) { /* sin almacenamiento */ }
        return lista;
      })
      .finally(function () { clearTimeout(t); });
  }

  /**
   * Llama a arrancar(extras) una sola vez. Con copia guardada arranca al instante y la refresca para la
   * siguiente visita; sin copia espera la respuesta (como máximo ESPERA_MS); sin integración arranca con [].
   */
  function iniciar(arrancar) {
    if (!activo) { arrancar([]); return; }
    var copia = leerCopia(), hecho = false;
    var una = function (lista) { if (!hecho) { hecho = true; arrancar(lista); } };
    var fresco = traer().catch(function (e) { if (window.console) console.warn('Scan-bar no disponible:', e.message); return null; });
    if (copia) { una(copia); return; }
    fresco.then(function (lista) { una(lista || []); });
    setTimeout(function () { una([]); }, ESPERA_MS);
  }

  window.ScanbarWeb = { activo: activo, url: url, tienda: tienda, iniciar: iniciar, urlSegura: urlSegura };
})();
