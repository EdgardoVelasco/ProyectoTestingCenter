# ADR-005: Transactional Outbox
Estado: ACEPTADO. Contexto: DB y correo no comparten transacción. Decisión: persistir outbox con agregado. Alternativas: correo síncrono, transacción distribuida, broker directo. Positivo: durabilidad/reintento. Negativo: worker/consistencia eventual. Riesgo: duplicado; mitigar idempotencia y reconciliación.
