# Transactional Outbox

El evento contiene/referencia una versión inmutable de snapshots y participantes confirmados. El render usa la solicitud persistida como fuente; el correo no sustituye el registro oficial. Un fallo conserva íntegros solicitud, participantes e importes.

Esquema y estados están en diccionario/notificaciones. PENDING/FAILED vencidos → PROCESSING mediante lote pequeño y `FOR UPDATE SKIP LOCKED`; lease recupera atascados. El envío externo ocurre fuera de la transacción de reclamo; la clave lógica y reconciliación minimizan duplicados, aunque el correo es entrega al menos una vez y el proveedor podría aceptar antes de una caída. SENT no se reprocesa. Auditoría registra transiciones e intentos, no payload sensible completo. Adaptador Graph puede sustituirse sin cambiar aplicación.
# Extensión de enrutamiento de aprobación

El evento lógico es `ApprovalRequestNotificationRequested`, clave `approval-exam-request:{requestId}:v1`. Se crea solo con regla válida y contiene snapshots de sede/destinatario. Los reintentos usan el destinatario histórico; no re-resuelven una regla posterior. La solicitud persiste aunque el proveedor falle.
