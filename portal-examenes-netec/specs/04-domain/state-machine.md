# Máquina de estados revisada

Estados normativos: BORRADOR→REGISTRADA→ENVIADA_A_APROBADOR; fallo: REGISTRADA→PENDIENTE_NOTIFICACION→ENVIADA_A_APROBADOR; BORRADOR→CANCELADA. `ENVIADA_A_FACTURACION` queda DEPRECADO por ADR-024 y no coexiste como estado funcional.

BORRADOR→REGISTRADA valida comerciales requeridos; sede activa; regla de aprobación activa/vigente con correo válido; 1..N líneas con examen activo, costo base y precio venta; moneda; cantidades >0; participantes válidos; asignaciones; duplicidad; referencia; totales backend. Submit re-resuelve la regla e inmoviliza líneas, sede, aprobador, ruleId, folio, outbox y auditoría atómicamente. Si cambió el aprobador desde la confirmación, no envía hasta nueva revisión.

Solo BORRADOR es editable por Ventas. No existen estados APROBADA o RECHAZADA; `ENVIADA_A_APROBADOR` acredita entrega de notificación, no decisión.

## Máquinas DRAFT de sesión y UI

Sesión: `UNAUTHENTICATED → REDIRECTING → AUTHENTICATING → AUTHENTICATED`; recarga puede usar `SESSION_RESTORING`; expiración lleva a `SESSION_EXPIRED`; 403 a `ACCESS_DENIED`; fallo a `AUTHENTICATION_ERROR`; logout usa `LOGGING_OUT → UNAUTHENTICATED`. Submit solo se permite autenticado y ningún estado de sesión cambia automáticamente ExamRequest.

Stepper: cada paso puede ser PENDING/CURRENT/COMPLETED/ERROR/BLOCKED. DIRTY/SAVING/SAVED son internos. Solo existe un CURRENT. Cambiar sede/examen/cantidad puede devolver dependientes a PENDING/ERROR sin borrar valores.
