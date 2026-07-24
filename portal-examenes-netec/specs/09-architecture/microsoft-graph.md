# Integracion Microsoft Graph para notificaciones

Estado: **PROPUESTO / BLOQUEADO PARA IMPLEMENTACION**.

## Alcance

La aplicacion backend enviara solicitudes de aprobacion mediante Microsoft Graph usando `client_credentials`. Angular nunca llama Graph ni recibe secretos. El dominio depende de `ApprovalNotificationSender`; Graph pertenece a infraestructura y existe un simulador para pruebas locales.

## Configuracion por ambiente

Se requieren, por nombre y sin documentar valores: `ENTRA_TENANT_ID`, `ENTRA_BACKEND_CLIENT_ID`, `ENTRA_BACKEND_CLIENT_SECRET` (secreto local/operacional), `GRAPH_SENDER_MAILBOX`, `GRAPH_BASE_URL`, `GRAPH_MAIL_ENABLED`, `NOTIFICATION_WORKER_ENABLED`, `NOTIFICATION_POLL_INTERVAL`, `NOTIFICATION_BATCH_SIZE`, `NOTIFICATION_MAX_ATTEMPTS` y `NOTIFICATION_PROCESSING_TIMEOUT`.

## Autenticacion y endpoint

El cliente obtendra un token app-only para `https://graph.microsoft.com/.default` y enviara `POST /v1.0/users/{senderMailbox}/sendMail`. No se usa `/me/sendMail`. El secreto y el token no se persisten ni se registran.

## Seguridad operativa

La App Registration backend tiene confirmado el permiso de aplicacion `Mail.Send`. Aun debe verificarse manualmente el admin consent, que el buzon exista y tenga Exchange Online, y que el permiso permita enviar desde el buzon configurado. Se recomienda Exchange Online Application RBAC limitado al buzon de desarrollo. No se habilita produccion ni se modifica Azure automaticamente en este incremento.

## Adaptador

`ApprovalNotificationSender` recibe una notificacion ya materializada, aplica timeouts y devuelve un resultado normalizado (exito, codigo HTTP, reintentable y error sanitizado). La logica de negocio no conoce clases del SDK. Graph SDK, Azure Identity o HTTP encapsulado quedan sujetos a la inspeccion de dependencias antes de implementar.

## Copias

El AC no recibe copia. El grupo operativo de Testing Center solo recibe CC para codigos expresamente aprobados. P-39 no define el conjunto LATAM; por tanto el CC real queda bloqueado y no se debe inferir.

## Validacion pendiente

Antes de activar Graph se deben probar credenciales de desarrollo, consentimiento, buzon remitente, permisos restringidos, HTML/texto plano, 429/Retry-After y recepcion real sin cuentas productivas.
