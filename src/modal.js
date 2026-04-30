// ============================================================
//  modal.js — Modal de detalle de joya con zoom
// ============================================================

import { CONFIG }                        from './config.js';
import { agregarAlCarrito, cerrarCarrito } from './carrito.js';

const WHATSAPP_NUMERO       = CONFIG.WHATSAPP_NUMERO;
const WHATSAPP_MENSAJE_BASE = CONFIG.WHATSAPP_MENSAJE_BASE;
const PLACEHOLDER           = CONFIG.PLACEHOLDER_IMG;

const modal           = () => document.getElementById('modal-detalle');
const imgPrincipal    = () => document.getElementById('foto-principal-modal');
const contenedorMinis = () => document.getElementById('miniaturas');

// ── Zoom ──────────────────────────────────────────────────
function iniciarZoom(imgEl) {
  imgEl.addEventListener('mousemove', (e) => {
    const rect  = imgEl.getBoundingClientRect();
    const x     = ((e.clientX - rect.left) / rect.width)  * 100;
    const y     = ((e.clientY - rect.top)  / rect.height) * 100;
    imgEl.style.transformOrigin = `${x}% ${y}%`;
    imgEl.style.transform       = 'scale(2)';
    imgEl.style.cursor          = 'zoom-in';
  });
  imgEl.addEventListener('mouseleave', () => {
    imgEl.style.transform       = 'scale(1)';
    imgEl.style.transformOrigin = 'center center';
    imgEl.style.cursor          = 'default';
  });
}

// ── Abrir ─────────────────────────────────────────────────
export function abrirDetalle(joya) {
  const m = modal();
  if (!m) return;

  cerrarCarrito();

  const img = imgPrincipal();
  img.src   = joya.foto_principal || PLACEHOLDER;
  img.style.transform = 'scale(1)';

  document.getElementById('titulo-modal').innerText = joya.nombre;
  document.getElementById('precio-modal').innerText = `$${joya.precio.toLocaleString('es-CO')}`;

  const descEl = document.getElementById('descripcion-modal');
  if (descEl) descEl.innerText = joya.descripcion || '';

  const tagsEl = document.getElementById('tags-modal');
  if (tagsEl && joya.categorias) {
    tagsEl.innerHTML = joya.categorias
      .map(c => `<span class="tag-modal">${c}</span>`).join('');
  }

  // Miniaturas
  const minis = contenedorMinis();
  minis.innerHTML = '';
  const todasFotos = [
    joya.foto_principal,
    ...(Array.isArray(joya.fotos_galeria) ? joya.fotos_galeria : []),
  ].filter(url => url && url.trim() !== '');

  todasFotos.forEach((url, i) => {
    const miniImg = document.createElement('img');
    miniImg.src = url;
    miniImg.alt = `Vista ${i + 1}`;
    if (i === 0) miniImg.classList.add('activa');
    miniImg.addEventListener('click', (e) => {
      e.stopPropagation();
      img.src = url;
      img.style.transform = 'scale(1)';
      minis.querySelectorAll('img').forEach(m => m.classList.remove('activa'));
      miniImg.classList.add('activa');
    });
    minis.appendChild(miniImg);
  });

  // Aplicar zoom a la imagen principal
  iniciarZoom(img);

  // Botón WhatsApp
  const btnWpp = document.getElementById('btn-comprar-wpp');
  if (btnWpp) {
    btnWpp.onclick = (e) => {
      e.stopPropagation();
      const msg = `${WHATSAPP_MENSAJE_BASE} ${joya.nombre} ($${joya.precio.toLocaleString('es-CO')})`;
      window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(msg)}`, '_blank');
    };
  }

  // Botón carrito
  const btnCarrito = document.getElementById('btn-add-carrito');
  if (btnCarrito) {
    btnCarrito.onclick = (e) => {
      e.stopPropagation();
      agregarAlCarrito(joya);
    };
  }

  m.classList.remove('oculto');
  document.body.style.overflow = 'hidden';
}

// ── Cerrar ────────────────────────────────────────────────
export function cerrarModal() {
  const m = modal();
  if (m) m.classList.add('oculto');
  document.body.style.overflow = '';
}

// ── Init ──────────────────────────────────────────────────
export function iniciarModal() {
  const btnCerrar = document.getElementById('cerrar-modal');
  if (btnCerrar) btnCerrar.addEventListener('click', cerrarModal);

  const m = modal();
  if (m) m.addEventListener('click', (e) => { if (e.target === m) cerrarModal(); });

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarModal(); });
}
