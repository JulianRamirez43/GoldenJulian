// ============================================================
//  filtros.js — Panel de filtros y búsqueda
// ============================================================

import { CONFIG }         from './config.js';
import { actualizarFiltros } from './catalogo.js';

let filtrosSeleccionados = [];

function construirPanelFiltros() {
  const columnasFiltros = document.getElementById('columnas-filtros');
  if (!columnasFiltros) return;

  const grupos = CONFIG.FILTROS.reduce((acc, f) => {
    if (!acc[f.grupo]) acc[f.grupo] = [];
    acc[f.grupo].push(f);
    return acc;
  }, {});

  columnasFiltros.innerHTML = Object.entries(grupos).map(([grupo, filtros]) => `
    <div class="columna">
      <h4>${grupo}</h4>
      <div class="tags-group">
        ${filtros.map(f => `
          <button class="tag" data-valor="${f.valor}">${f.label}</button>
        `).join('')}
      </div>
    </div>
  `).join('');

  columnasFiltros.querySelectorAll('.tag').forEach(boton => {
    boton.addEventListener('click', () => toggleFiltro(boton));
  });
}

function toggleFiltro(boton) {
  const valor = boton.getAttribute('data-valor');
  if (filtrosSeleccionados.includes(valor)) {
    filtrosSeleccionados = filtrosSeleccionados.filter(f => f !== valor);
    boton.classList.remove('activo');
  } else {
    filtrosSeleccionados.push(valor);
    boton.classList.add('activo');
  }
  actualizarFiltros(filtrosSeleccionados);
}

function resetearFiltros() {
  filtrosSeleccionados = [];
  document.querySelectorAll('.tag').forEach(b => b.classList.remove('activo'));
  actualizarFiltros([]);
}

export function iniciarFiltros() {
  construirPanelFiltros();

  const btnBuscar    = document.getElementById('btn-buscar');
  const panelFiltros = document.getElementById('panel-filtros');
  const btnReset     = document.getElementById('btn-reset');

  if (btnBuscar && panelFiltros) {
    btnBuscar.addEventListener('click', () => {
      const abierto = !panelFiltros.classList.contains('oculto');
      panelFiltros.classList.toggle('oculto');
      btnBuscar.innerHTML = abierto ? '🔍 Buscar y Filtrar' : '✖ Cerrar Filtros';
    });
  }

  if (btnReset) btnReset.addEventListener('click', resetearFiltros);
}
