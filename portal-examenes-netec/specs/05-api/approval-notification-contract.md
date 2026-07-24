# Contrato de notificacion de aprobacion (propuesto)

`POST /api/v1/exam-requests/{id}/submit` valida propietario/estado, re-resuelve sede y aprobador, crea folio, snapshots y Outbox idempotente. Responde estado inicial `PENDIENTE_NOTIFICACION`; no afirma entrega Graph.

`GET /api/v1/exam-requests/{id}` puede exponer `notificationStatus` y fecha de envio, sin tokens, secretos, payload tecnico ni correo completo innecesario.

Errores Problem Details: `APPROVAL_ROUTE_NOT_FOUND`, `APPROVER_EMAIL_MISSING`, `APPROVER_INACTIVE`, `REQUEST_ALREADY_SUBMITTED`, `NOTIFICATION_ALREADY_CREATED`, `GRAPH_CONFIGURATION_MISSING`, `GRAPH_AUTHENTICATION_FAILED`, `GRAPH_SEND_FAILED` y `NOTIFICATION_DEAD_LETTER`.

No se implementa endpoint administrativo de retry en este incremento. CA/PAN bloquean submit. El CC de Testing Center queda bloqueado hasta resolver P-39.
