# Guía de estilo del correo

Estado: APPROVED (2026-07-24).

- HTML estructurado con tablas, ancho máximo aproximado de 720 px y estilos inline limitados al correo.
- Arial, Helvetica, sans-serif; no depender de fuentes remotas.
- Encabezado azul NETEC, acentos teal, superficies claras, bordes sutiles y contraste AA.
- Sin JavaScript, formularios, CSS externo, Grid o Flexbox como dependencia principal.
- La información crítica no depende de imágenes; cualquier logotipo debe tener texto alternativo y fallback textual.
- Se genera una plantilla `text/plain` independiente con la misma información esencial.
- Se escapan HTML, texto plano y asunto en su contexto; saltos de línea de observaciones se preservan de forma segura.
- No incluir tokens, claims internos, IDs técnicos, botones de aprobar/rechazar ni URLs no aprobadas.
- Los estilos inline son una excepción documentada para compatibilidad Outlook; no habilitan inline styles en Angular.

