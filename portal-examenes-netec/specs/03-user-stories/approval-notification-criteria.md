# Criterios de aceptacion de notificacion (propuestos)

- **NOT-CA-001:** rutas confirmadas resuelven aprobador en backend y congelan snapshot.
- **NOT-CA-002:** solicitud y Outbox se confirman atomicamente antes de Graph.
- **NOT-CA-003:** Graph exitoso marca SENT y luego ENVIADA_A_APROBADOR.
- **NOT-CA-004:** error Graph conserva solicitud y aplica reintento o DEAD_LETTER.
- **NOT-CA-005:** submit repetido no crea otra clave idempotente.
- **NOT-CA-006:** CA/PAN permiten guardar borrador pero bloquean submit.
- **NOT-CA-007:** HTML y texto plano escapan observaciones y no incluyen botones de decision.
- **NOT-CA-008:** no se agrega CC al AC; CC Testing Center solo tras resolver P-39.
