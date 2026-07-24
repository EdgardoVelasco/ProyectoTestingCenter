# ADR-049: Concurrencia del worker Outbox

Estado: PROPUESTO.

## Decision

Reclamar lotes pequeños con `SELECT ... FOR UPDATE SKIP LOCKED`, cambiar a PROCESSING con lease y recuperar leases vencidos. Versionado optimista y estados impiden que dos instancias procesen la misma fila.

## Validacion

Probar dos workers, bloqueo, timeout, recuperacion y no reprocesamiento de SENT.
