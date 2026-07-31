# Guía de estilo del correo

Estado: APPROVED (2026-07-24) para el contenido vigente.

- HTML estructurado con tablas, ancho máximo aproximado de 720 px y estilos inline limitados al correo.
- Arial, Helvetica, sans-serif; no depender de fuentes remotas.
- Encabezado azul NETEC, acentos teal, superficies claras, bordes sutiles y contraste AA.
- Sin JavaScript, formularios, CSS externo, Grid o Flexbox como dependencia principal.
- La información crítica no depende de imágenes; cualquier logotipo debe tener texto alternativo y fallback textual.
- Se genera una plantilla `text/plain` independiente con la misma información esencial.
- Se escapan HTML, texto plano y asunto en su contexto; saltos de línea de observaciones se preservan de forma segura.
- No incluir tokens, claims internos, IDs técnicos, botones de aprobar/rechazar ni URLs no aprobadas.
- Los estilos inline son una excepción documentada para compatibilidad Outlook; no habilitan inline styles en Angular.

## Fase 1A — propuesta adicional

Estado: PROPOSED / NOT_IMPLEMENTED. El primer cuadro de resumen debe estar
centrado y permitir localizar folio, sede, solicitante, número de alumnos,
número de exámenes y total. Los alumnos, exámenes, asignaciones y totales
permanecen en tablas separadas para evitar repetición de bloques por participante.

- Resaltar con jerarquía, etiquetas, negrita, bordes y fondos suaves; nunca solo con color.
- Probar Outlook Web, escritorio y móvil, nombres largos, 100 alumnos, múltiples exámenes y monedas.
- No mostrar AP y AC como identidades separadas hasta Fase 3.
- No agregar botones Aprobar/Rechazar.
