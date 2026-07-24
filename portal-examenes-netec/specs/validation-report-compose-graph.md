# Validacion Compose y variables Graph

El servicio backend ahora recibe mediante Docker Compose los nombres de variables Graph y del worker: `BACKEND_CLIENT_ID`, `ENTRA_BACKEND_CLIENT_SECRET`, `GRAPH_BASE_URL`, `GRAPH_MAIL_ENABLED`, `GRAPH_TESTING_CENTER_CC_GROUP` y `NOTIFICATION_POLL_INTERVAL`. La inspeccion del contenedor mostro solo nombres, nunca valores.

La imagen backend se reconstruyo correctamente y el contenedor inicio con perfil development. La recepcion real y el submit autenticado siguen pendientes.
