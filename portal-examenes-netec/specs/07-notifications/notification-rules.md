# Reglas de notificación

El payload se construye exclusivamente desde solicitud, snapshots financieros/comerciales y participantes persistidos. El correo nunca es fuente oficial; fallar o reintentar no elimina ni modifica participantes/importes.

Submit re-resuelve sede–aprobador y confirma solicitud, snapshots y outbox en una transacción; el worker es independiente. Clave idempotente: `approval-exam-request:{requestId}:v1`. El evento contiene el snapshot del destinatario, no una regla mutable. Éxito: SENT y solicitud ENVIADA_A_APROBADOR. Error temporal: FAILED/PENDIENTE_NOTIFICACION. Error permanente o máximo: DEAD_LETTER, auditoría y alerta. Microsoft Graph implementa `NotificationSender`; el simulador local no entrega correo.

No se crea outbox si la regla está ausente/inactiva/fuera de vigencia o el correo es inválido. El correo completo no aparece en logs. Testing Center no reenvía. El AC no recibe copia. La copia al grupo de directorio `LATAM_Testing_Center@netec.com.mx` se aplica solo a códigos expresamente clasificados por P-39; no se infiere “LATAM”. La membresía del grupo pertenece al directorio y no se duplica en el portal.
