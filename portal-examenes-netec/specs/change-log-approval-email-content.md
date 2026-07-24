# Change log — contenido completo del correo de aprobación

Fecha: 2026-07-24

## Resumen

Se aprobó documentar un correo HTML y text/plain estructurado para representar la solicitud completa sin repetir un bloque por participante.

## Evidencia inspeccionada

Commit base `d44dd51`; Outbox existente con payload textual; asignaciones N:M con snapshots de código, nombre, proveedor, retake, precio y moneda; Graph app-only operativo.

## Decisiones

- DTO inmutable y fábrica dedicada.
- Payload JSON estructurado en Outbox.
- Tablas separadas: comercial, participantes, exámenes, asignaciones y totales.
- BigDecimal y totales por moneda.
- Plantilla de tablas compatible con Outlook y texto plano independiente.
- Sin botones de aprobar/rechazar ni datos técnicos.

## Archivos normativos

`email-content-model.md`, `email-style-guide.md`, `approval-email-content.feature`, ADR-056..060 y actualización de matriz/validación/backlog.

## Estado

Etapa B aprobada sin ambigüedad crítica. Etapa C implementó el DTO/fábrica, snapshot JSON, renderer HTML/text y envío HTML por Graph. Etapa D tiene compilación y prueba unitaria del renderer; la suite completa requiere Docker/Testcontainers y la revisión/recepción real en Outlook aún está pendiente.

## Implementación realizada

- `ApprovalEmailModel`, `ApprovalEmailModelFactory` y `ApprovalEmailTemplateRenderer`.
- `NotificationOutbox.payload` ahora contiene el modelo estructurado serializado.
- Worker deserializa y renderiza el snapshot antes de llamar al sender.
- Graph utiliza `contentType=HTML`; el renderer conserva también `text/plain` para clientes/adaptadores compatibles.
- Se agregó prueba unitaria de escaping, asignaciones, precio, subtotal y total.
