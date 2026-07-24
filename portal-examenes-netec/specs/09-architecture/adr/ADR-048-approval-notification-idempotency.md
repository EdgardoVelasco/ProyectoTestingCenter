# ADR-048: Idempotencia de notificacion de aprobacion

Estado: PROPUESTO.

## Decision

Usar clave unica `approval-exam-request:{requestId}:v{submissionVersion}` en Outbox. Submit repetido, doble clic y reentrega no crean una segunda notificacion; `SENT` nunca se procesa automaticamente.

## Riesgo

Una aceptacion de Graph seguida de fallo local puede producir entrega duplicada; registrar correlationId y reconciliar por clave. Validar constraint unica y respuestas idempotentes.
