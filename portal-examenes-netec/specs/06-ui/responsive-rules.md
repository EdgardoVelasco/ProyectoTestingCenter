# Reglas responsive

Breakpoints DERIVADOS, IN_REVIEW:

| Rango | Regla |
|---|---|
| 360–599 px | Una columna, acciones apiladas/ancho completo, participantes como cards, padding 16 px. |
| 600–959 px | Una o dos columnas según ancho mínimo de control; acciones pueden envolver. |
| 960–1279 px | Dos columnas; participantes/resumen completos. |
| ≥1280 px | Contenedor máximo; no estirar campos indefinidamente. |

Validar 360×800, 768×1024, 1280×800 y 1440×900; zoom 200%; textos largos; teclado; modal y barra sticky. Breakpoints no son oficiales del manual.

Acceso usa card centrada y acciones apiladas/full-width en móvil. Header conserva nombre/correo de `/api/auth/me`. Stepper es completo en escritorio y compacto/desplazable o “Paso X de 4” en móvil. Solicitante fijo se mantiene antes del paso actual.
## Menú de usuario

- Escritorio: avatar 40 px derivado del token de control, nombre y UPN.
- Tablet: bloque flexible con ellipsis, sin desplazar marca.
- Móvil ≤600 px: avatar + nombre + expansión; UPN oculto solo visualmente en activador y completo en overlay. Menú limitado al viewport.
- Zoom 200%: sin solapamiento; identidad puede truncarse, acción permanece disponible.
