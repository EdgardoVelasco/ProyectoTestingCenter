# Reglas de notificación

El payload se construye exclusivamente desde solicitud, snapshots financieros/comerciales y participantes persistidos. El correo nunca es fuente oficial; fallar o reintentar no elimina ni modifica participantes/importes.

Submit confirma solicitud y outbox en una transacción; el worker es independiente. Clave idempotente: `billing-exam-request:{requestId}:v1`, única en outbox y enviada al adaptador si el proveedor lo soporta. Un registro se reclama con bloqueo/`SKIP LOCKED`, estado PROCESSING y lease. Éxito: outbox SENT y solicitud ENVIADA_A_FACTURACION. Error temporal: FAILED y solicitud PENDIENTE_NOTIFICACION. Error permanente o máximo: DEAD_LETTER, auditoría y alerta. Microsoft Graph implementa `NotificationSender`; `LoggingNotificationSender` simulado solo en perfil local y no pretende entregar correo.
