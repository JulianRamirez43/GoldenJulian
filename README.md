# GoldenJulian — Estructura del Proyecto

## Árbol de archivos

```
GoldenJulian/
├── index.html          ← HTML limpio (sin duplicados, semántico)
└── src/
    ├── config.js       ← ⭐ Variables globales (cambia aquí todo)
    ├── conexion.js     ← Cliente Supabase (singleton)
    ├── catalogo.js     ← Fetch y renderización de joyas
    ├── modal.js        ← Modal de detalle + galería
    ├── filtros.js      ← Panel de filtros (generado desde config.js)
    ├── carrito.js      ← Carrito completo con localStorage
    ├── main.js         ← Punto de entrada (solo imports + init)
    └── style.css       ← Estilos con variables CSS (:root)
```

## Variables globales (src/config.js)

Todo lo que puedas necesitar cambiar está en `CONFIG`:

| Clave                  | Qué controla                          |
|------------------------|---------------------------------------|
| `NOMBRE_TIENDA`        | Nombre en el header                   |
| `WHATSAPP_NUMERO`      | Número para todos los botones de WPP  |
| `WHATSAPP_MENSAJE_BASE`| Texto base del mensaje de WPP         |
| `SUPABASE_URL`         | URL del proyecto Supabase             |
| `SUPABASE_KEY`         | Clave pública de Supabase             |
| `TABLA_JOYAS`          | Nombre de la tabla en Supabase        |
| `COLUMNA_CATEGORIAS`   | Nombre de la columna array de filtros |
| `CARRITO_TTL_HORAS`    | Cuántas horas dura el carrito         |
| `FILTROS`              | Array con todos los filtros del panel |

## Variables CSS (:root en style.css)

Los colores y tipografía están centralizados:
- `--color-oro-brillante`, `--color-oro-oscuro`, etc.
- `--font-display` (Cormorant Garamond), `--font-body` (Jost)
- `--espacio-*`, `--radio-*`, `--sombra-*`

## Bugs corregidos

1. **Modal duplicado** → Ahora hay un solo `#modal-detalle` en el HTML
2. **Carrito sin lógica** → `carrito.js` implementa todo: añadir, eliminar, persistencia, WhatsApp
3. **Filtros hardcodeados en HTML** → Ahora se generan dinámicamente desde `CONFIG.FILTROS`
4. **`window.onclick` global** → Reemplazado por listener específico en el overlay del modal
5. **Sin Escape para cerrar modal** → Añadida tecla Escape
6. **Miniaturas sin indicador activo** → La miniatura seleccionada tiene clase `.activa`

## Nuevas funcionalidades

- 🛒 **Carrito completo**: añadir, eliminar, contador, total, persistencia 24h
- 🔔 **Toast de notificación**: confirma cuando se añade al carrito
- ⌨️  **Accesibilidad**: `aria-label`, `role`, cierre con Escape
- 📱 **Responsive mejorado**: media queries para móvil
- ✨ **Animación de entrada** en las tarjetas (staggered)
- 🖼️ **Overlay hover** en las tarjetas con texto "Ver detalles"
- 🔄 **Spinner de carga** mientras se consulta Supabase
