# Persistencia

Persistencia futura añade ExchangeRate `numeric(19,8)` versionado. Submit MAD bloquea tasa vigente, calcula con decimal exacto y guarda monto USD origen, tasa/instante y EUR resultado; otras ubicaciones dejan tasa nula. DTO no permite mass assignment de tasa, base convertida ni totales.

PostgreSQL con Flyway. Submit: bloquear/serializar clave de duplicidad; verificar activo; bloquear fila `folio_counter(year) FOR UPDATE`, consumir secuencia y construir folio; fijar snapshots; guardar REGISTRADA + outbox PENDING + auditoría; commit. Un rollback no publica correo. La secuencia anual inicia 1 y se reinicia creando fila del nuevo año; huecos tras fallos/reintentos son aceptables, unicidad prima sobre continuidad.

Optimistic locking por `version` y ETag/If-Match. Restricciones FK/check/unique respaldan dominio. Prueba Testcontainers con 100 hilos comprueba folios únicos; barrera concurrente comprueba un solo duplicado activo; pruebas de rollback verifican atomicidad. Índices se validan con planes de consulta.
