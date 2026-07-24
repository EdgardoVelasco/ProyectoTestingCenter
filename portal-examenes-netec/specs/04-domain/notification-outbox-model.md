# Modelo NotificationOutbox (propuesto)

La solicitud se conserva antes de cualquier llamada externa. En la misma transaccion se crea `NotificationOutbox` con id, aggregateId, aggregateType, notificationType, recipient, cc, subject, payload, status, attempts, maxAttempts, nextAttemptAt, lastAttemptAt, lastErrorCode, lastErrorMessage, createdAt, processingStartedAt, sentAt, idempotencyKey y version.

Estados: PENDING, PROCESSING, SENT, FAILED y DEAD_LETTER. No se almacenan tokens, client secrets ni credenciales. El destinatario y CC son snapshots de la solicitud; cambios futuros de routing no mutan el evento.

El worker reclama filas con lease y `SKIP LOCKED`; la unicidad de idempotencyKey impide duplicados. La solicitud cambia a ENVIADA_A_APROBADOR solo despues de confirmacion de Graph.
