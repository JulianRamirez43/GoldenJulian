// ============================================================
//  carrito.js — Lógica completa del carrito
// ============================================================

import { CONFIG } from './config.js';

// ── Estado interno ────────────────────────────────────────
let items = cargarDesdeStorage();

// ── Persistencia (localStorage con TTL) ──────────────────
function cargarDesdeStorage() {
  try {
    const raw = localStorage.getItem(CONFIG.CARRITO_STORAGE_KEY);
    if (!raw) return [];
    const { datos, expira } = JSON.parse(raw);
    if (Date.now() > expira) {
      localStorage.removeItem(CONFIG.CARRITO_STORAGE_KEY);
      return [];
    }
    return datos;
  } catch {
    return [];
  }
}

function guardarEnStorage() {
  const expira = Date.now() + CONFIG.CARRITO_TTL_HORAS * 60 * 60 * 1000;
  localStorage.setItem(
    CONFIG.CARRITO_STORAGE_KEY,
    JSON.stringify({ datos: items, expira })
  );
}

// ── API pública ───────────────────────────────────────────
export function agregarAlCarrito(joya) {
  const existe = items.find(i => i.id === joya.id);
  if (!existe) {
    items.push({ ...joya, cantidad: 1 });
  } else {
    existe.cantidad += 1;
  }
  guardarEnStorage();
  renderizarCarrito();
  actualizarContador();
  mostrarNotificacion(`"${joya.nombre}" añadida al carrito`);
}

export function eliminarDelCarrito(id) {
  items = items.filter(i => i.id !== id);
  guardarEnStorage();
  renderizarCarrito();
  actualizarContador();
}

export function obtenerTotal() {
  return items.reduce((sum, i) => sum + i.precio * i.cantidad, 0);
}

export function obtenerCantidadTotal() {
  return items.reduce((sum, i) => sum + i.cantidad, 0);
}

// ── Render ────────────────────────────────────────────────
export function renderizarCarrito() {
  const contenedor = document.getElementById('items-carrito');
  const totalEl    = document.getElementById('total-precio');
  if (!contenedor) return;

  if (items.length === 0) {
    contenedor.innerHTML = `
      <div class="carrito-vacio">
        <span class="carrito-vacio-icono">✦</span>
        <p>Tu carrito está vacío</p>
      </div>`;
    if (totalEl) totalEl.textContent = '$0';
    return;
  }

  contenedor.innerHTML = items.map(item => `
    <div class="item-mini">
      <img src="${item.foto_principal || CONFIG.PLACEHOLDER_IMG}" alt="${item.nombre}">
      <div class="item-mini-info">
        <h4>${item.nombre}</h4>
        <p class="item-mini-precio">$${(item.precio * item.cantidad).toLocaleString('es-CO')}</p>
        ${item.cantidad > 1 ? `<p class="item-mini-cantidad">× ${item.cantidad}</p>` : ''}
        <button class="btn-eliminar" data-id="${item.id}">Eliminar</button>
      </div>
    </div>
  `).join('');

  // Eventos de eliminar
  contenedor.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', () => eliminarDelCarrito(btn.dataset.id));
  });

  if (totalEl) {
    totalEl.textContent = `$${obtenerTotal().toLocaleString('es-CO')}`;
  }
}

export function actualizarContador() {
  const contador = document.getElementById('contador-carrito');
  if (contador) {
    const total = obtenerCantidadTotal();
    contador.textContent = total;
    contador.style.display = total > 0 ? 'inline' : 'none';
  }
}

function mostrarNotificacion(texto) {
  const n = document.createElement('div');
  n.className = 'notificacion-carrito';
  n.textContent = texto;
  document.body.appendChild(n);
  setTimeout(() => n.classList.add('visible'), 10);
  setTimeout(() => {
    n.classList.remove('visible');
    setTimeout(() => n.remove(), 400);
  }, 2500);
}

// ── WhatsApp checkout ─────────────────────────────────────
export function finalizarPorWhatsapp() {
  if (items.length === 0) return;

  const lineas = items.map(
    i => `• ${i.nombre} × ${i.cantidad} = $${(i.precio * i.cantidad).toLocaleString('es-CO')}`
  ).join('\n');

  const total   = obtenerTotal().toLocaleString('es-CO');
  const mensaje = `${CONFIG.WHATSAPP_MENSAJE_BASE}\n\n${lineas}\n\n*Total: $${total}*`;
  const url     = `https://wa.me/${CONFIG.WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}

// ── Cerrar panel ─────────────────────────────────────────
export function cerrarCarrito() {
  const panel = document.getElementById("panel-carrito");
  if (panel) panel.classList.add("oculto");
}

// ── Init del panel ────────────────────────────────────────
export function iniciarCarrito() {
  const flotante      = document.getElementById('btn-carrito-flotante');
  const panel         = document.getElementById('panel-carrito');
  const btnCerrar     = document.getElementById('cerrar-carrito');
  const btnFinalizar  = document.getElementById('btn-finalizar-wpp');

  if (flotante && panel) {
    flotante.addEventListener('click', () => {
      panel.classList.toggle('oculto');
    });
  }

  if (btnCerrar && panel) {
    btnCerrar.addEventListener('click', () => panel.classList.add('oculto'));
  }

  if (btnFinalizar) {
    btnFinalizar.addEventListener('click', finalizarPorWhatsapp);
  }

  renderizarCarrito();
  actualizarContador();
}
