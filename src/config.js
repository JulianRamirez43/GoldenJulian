// ============================================================
//  config.js — Variables globales de GoldenJulian
//  Cambia aquí cualquier valor sin tocar el resto del código.
// ============================================================

export const CONFIG = {
  // ── Negocio ──────────────────────────────────────────────
  NOMBRE_TIENDA: 'Golden Manillas',
  SLOGAN: 'Catálogo Exclusivo',
  WHATSAPP_NUMERO: '573005240150',
  WHATSAPP_MENSAJE_BASE: 'Hola GoldenManillas, me interesa obtener más información de:',

  // ── Firebase ──────────────────────────────────────────────
  FIREBASE_CONFIG: {
    apiKey:            'AIzaSyAxTyDOPzOPkWHgLu7iy4lcCxbRyxG_Akk',
    authDomain:        'golden-julian.firebaseapp.com',
    projectId:         'golden-julian',
    storageBucket:     'golden-julian.firebasestorage.app',
    messagingSenderId: '599121397465',
    appId:             '1:599121397465:web:d7f3022883cf58e560a0c8',
  },
  COLECCION_JOYAS: 'joyas',

  // ── Catálogo ──────────────────────────────────────────────
  PLACEHOLDER_IMG: 'https://placehold.co/600x400/f9f5eb/b8860b?text=Sin+imagen',

  // ── Carrito ───────────────────────────────────────────────
  CARRITO_STORAGE_KEY: 'gj_carrito',
  CARRITO_TTL_HORAS: 24,

  // ── Filtros disponibles ───────────────────────────────────
  FILTROS: [
    { grupo: 'JOYAS',      valor: 'manilla',   label: 'MANILLAS'         },
    { grupo: 'JOYAS',      valor: 'anillo',    label: 'ANILLOS'          },
    { grupo: 'JOYAS',      valor: 'topos',     label: 'TOPOS'            },
    { grupo: 'MATERIALES', valor: 'oro',       label: 'ORO 18K'          },
    { grupo: 'MATERIALES', valor: 'laminado',  label: 'ORO LAMINADO 18K' },
    { grupo: 'MATERIALES', valor: 'plata',     label: 'PLATA'            },
    { grupo: 'MATERIALES', valor: 'neopreno',  label: 'NEOPRENO'         },
  ],
};
