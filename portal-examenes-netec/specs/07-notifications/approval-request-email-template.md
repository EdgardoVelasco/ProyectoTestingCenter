# Plantilla de solicitud de aprobación

Estado: APPROVED para contenido estructurado (2026-07-24).

## Asunto

`[Solicitud de aprobación de exámenes] {folio} — {siteCode} — {companyName}`. El asunto se limita, escapa y rechaza saltos de línea.

## Estructura

El correo contiene encabezado NETEC textual/fallback, resumen, solicitante/Asesor Comercial combinado, información comercial, tabla de participantes, tabla de exámenes/costos agrupada por proveedor, tabla de asignaciones participante–examen, totales por código ISO de moneda, observaciones y aviso de revisión previa a compra. No repite un bloque completo por participante.

Se generan HTML y `text/plain` desde un payload JSON estructurado del Outbox. Campos comerciales esperados nulos o vacíos muestran `N/A`; listas vacías omiten la sección. Las cantidades provienen de asignaciones únicas, los subtotales usan `BigDecimal` y monedas distintas nunca se suman.

## Compatibilidad y seguridad

HTML basado en tablas, ancho máximo aproximado de 720 px, Arial/Helvetica, estilos inline limitados al correo, sin JavaScript, Grid, Flexbox obligatorio, CSS remoto ni imágenes críticas. Todo texto de usuario se escapa; observaciones conservan saltos de línea seguros. No se incluyen tokens, claims internos, IDs técnicos, URLs no aprobadas ni botones de aprobar/rechazar.

El modelo, snapshots y estrategia de render se detallan en `email-content-model.md`, `email-style-guide.md` y ADR-056..060.
