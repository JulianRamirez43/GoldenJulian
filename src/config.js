// ============================================================
//  config.js — Variables globales de GoldenJulian
// ============================================================

export const CONFIG = {
  // ── Negocio ──────────────────────────────────────────────
  NOMBRE_TIENDA: 'Golden Manillas',
  SLOGAN: 'Catálogo Exclusivo',
  WHATSAPP_NUMERO: '573005240150',
  WHATSAPP_MENSAJE_BASE: 'Hola GoldenManillas, me interesa obtener más información de:',

  // ── Firebase ──────────────────────────────────────────────
  FIREBASE_CONFIG: {
    apiKey:            import.meta.env.VITE_API_KEY_FIREBASE            || 'AIzaSyAxTyDOPzOPkWHgLu7iy4lcCxbRyxG_Akk',
    authDomain:        import.meta.env.VITE_AUTH_DOMAIN                 || 'golden-julian.firebaseapp.com',
    projectId:         import.meta.env.VITE_PROJECT_ID                  || 'golden-julian',
    storageBucket:     import.meta.env.VITE_STORAGE_BUCKET              || 'golden-julian.firebasestorage.app',
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID         || '599121397465',
    appId:             import.meta.env.VITE_APP_ID                      || '1:599121397465:web:d7f3022883cf58e560a0c8',
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
