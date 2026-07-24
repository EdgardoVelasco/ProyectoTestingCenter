# ADR-045: Transactional Outbox para notificaciones de aprobacion

Estado: PROPUESTO; bloqueado por P-39 para la politica de CC.

## Contexto

La persistencia de una solicitud no debe depender de la disponibilidad de Graph.

## Decision

Submit persiste solicitud, snapshots y `NotificationOutbox` en una transaccion. Un worker reclama mensajes `PENDING`/vencidos mediante `FOR UPDATE SKIP LOCKED`, llama a `ApprovalNotificationSender` fuera de la transaccion y registra `SENT`, reintento o `DEAD_LETTER`.

## Alternativas

Enviar dentro de la transaccion, publicar en broker externo o ejecutar una llamada sin outbox.

## Consecuencias y riesgos

Se evita perdida de solicitudes y se puede reintentar, pero existe entrega al menos una vez y posible duplicado tras una caida posterior a Graph. Idempotencia, lease y auditoria reducen el riesgo. El CC no se activa hasta resolver P-39.

## Seguridad/observabilidad/validacion

No se persisten tokens o secretos; logs usan IDs/correlationId y errores truncados. Validar atomicidad, recuperacion de PROCESSING y que Graph no se invoque dentro de la transaccion.
