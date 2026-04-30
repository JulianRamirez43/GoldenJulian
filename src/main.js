// ============================================================
//  main.js — Punto de entrada
// ============================================================

require('dotenv').config();
import { cargarJoyas, iniciarOrden } from './catalogo.js';
import { iniciarModal }              from './modal.js';
import { iniciarFiltros }            from './filtros.js';
import { iniciarCarrito }            from './carrito.js';

function init() {
  iniciarModal();
  iniciarFiltros();
  iniciarCarrito();
  iniciarOrden();
  cargarJoyas();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
