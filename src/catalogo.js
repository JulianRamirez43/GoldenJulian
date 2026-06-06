// ============================================================
//  catalogo.js — Carga y renderización de joyas (Firebase)
// ============================================================

import { db }           from './conexion.js';
import { abrirDetalle } from './modal.js';
import {
  collection, getDocs, query
} from 'firebase/firestore';

import { CONFIG } from './config.js';

const COLECCION  = CONFIG.COLECCION_JOYAS;
const PLACEHOLDER = CONFIG.PLACEHOLDER_IMG;

// ── Estado global del catálogo ────────────────────────────
let todasLasJoyas       = [];
let filtrosActivos      = [];
let ordenActual         = 'default'; // 'default' | 'asc' | 'desc'

// ── Render de tarjetas ────────────────────────────────────
export function dibujarJoyas(lista) {
  const contenedor = document.getElementById('contenedor-joyas');
  if (!contenedor) return;
  contenedor.innerHTML = '';

  if (!lista || lista.length === 0) {
    contenedor.innerHTML = `
      <div class="sin-resultados">
        <span class="sin-resultados-icono">✦</span>
        <p>No se encontraron piezas con esta combinación.</p>
        <p class="sin-resultados-sub">Intenta con otros filtros.</p>
      </div>`;
    return;
  }

  lista.forEach((joya, i) => {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta-joya';
    tarjeta.style.animationDelay = `${i * 60}ms`;

    const foto        = joya.foto_principal || PLACEHOLDER;
    const precio      = joya.precio?.toLocaleString('es-CO') ?? '—';
    const agotada     = joya.disponible === false;

    tarjeta.innerHTML = `
      <div class="tarjeta-img-wrap">
        <img src="${foto}" alt="${joya.nombre}" loading="lazy">
        <div class="tarjeta-overlay"><span>Ver detalles</span></div>
        ${agotada ? `
          <div class="badge-agotado-tarjeta">Agotado</div>
          <div class="badge-bajo-pedido-tarjeta">Bajo pedido</div>
        ` : ''}
      </div>
      <div class="info-joya">
        <h3>${joya.nombre}</h3>
        <div class="tarjeta-footer">
          <p class="precio">$${precio}</p>
          <button class="btn-ver" aria-label="Ver detalles de ${joya.nombre}">Ver Detalles</button>
        </div>
      </div>
    `;

    tarjeta.addEventListener('click', () => abrirDetalle(joya));
    contenedor.appendChild(tarjeta);
  });
}

// ── Aplicar filtros + orden y redibujar ───────────────────
function aplicarYDibujar() {
  let resultado = [...todasLasJoyas];

  if (filtrosActivos.length > 0) {
    resultado = resultado.filter(j =>
      filtrosActivos.every(f => j.categorias?.includes(f))
    );
  }

  if (ordenActual === 'asc')  resultado.sort((a, b) => a.precio - b.precio);
  if (ordenActual === 'desc') resultado.sort((a, b) => b.precio - a.precio);

  dibujarJoyas(resultado);
}

// ── Actualizar filtros desde filtros.js ───────────────────
export function actualizarFiltros(nuevos) {
  filtrosActivos = nuevos;
  aplicarYDibujar();
}

// ── Fetch a Firestore ─────────────────────────────────────
export async function cargarJoyas() {
  const contenedor = document.getElementById('contenedor-joyas');
  if (!contenedor) return;

  contenedor.innerHTML = `
    <div class="cargando">
      <div class="spinner"></div>
      <p>Buscando piezas únicas…</p>
    </div>`;

  try {
    const snapshot = await getDocs(collection(db, COLECCION));
    // Mostrar disponibles Y agotadas (el badge distingue)
    todasLasJoyas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    aplicarYDibujar();
  } catch (error) {
    console.error('[catalogo] Error:', error.message);
    contenedor.innerHTML = `
      <div class="sin-resultados">
        <span class="sin-resultados-icono">⚠</span>
        <p>Error al conectar con el catálogo.</p>
        <p class="sin-resultados-sub">${error.message}</p>
      </div>`;
  }
}

// ── Init ordenamiento ─────────────────────────────────────
export function iniciarOrden() {
  const btnAsc  = document.getElementById('btn-orden-asc');
  const btnDesc = document.getElementById('btn-orden-desc');
  if (!btnAsc || !btnDesc) return;

  function setOrden(orden, btnActivo, btnInactivo) {
    if (ordenActual === orden) {
      // Toggle off
      ordenActual = 'default';
      btnActivo.classList.remove('activo');
    } else {
      ordenActual = orden;
      btnActivo.classList.add('activo');
      btnInactivo.classList.remove('activo');
    }
    aplicarYDibujar();
  }

  btnAsc.addEventListener('click',  () => setOrden('asc',  btnAsc,  btnDesc));
  btnDesc.addEventListener('click', () => setOrden('desc', btnDesc, btnAsc));
}
