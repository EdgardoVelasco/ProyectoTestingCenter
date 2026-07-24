# Configuracion DEV de correo

Variables requeridas antes de implementar:

- `GRAPH_TESTING_CENTER_CC_GROUP`: direccion SMTP completa del grupo de copia.
- `GRAPH_BASE_URL`.
- `GRAPH_MAIL_ENABLED`.
- `ENTRA_BACKEND_CLIENT_SECRET`.
- `NOTIFICATION_WORKER_ENABLED` y parametros del worker.

La inspeccion del `.env` actual solo encontro variables base de frontend/backend y no encontro `GRAPH_TESTING_CENTER_CC_GROUP`. El sistema debe fallar de forma segura si falta la variable; no usar aliases incompletos ni direcciones inventadas.
