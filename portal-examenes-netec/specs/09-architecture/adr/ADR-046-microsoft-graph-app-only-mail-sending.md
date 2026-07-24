# ADR-046: Envio app-only mediante Microsoft Graph

Estado: PROPUESTO; no implementado.

## Decision

Usar `client_credentials`, `ClientSecretCredential` o equivalente oficial, scope `.default` y `POST /v1.0/users/{senderMailbox}/sendMail`, encapsulado en infraestructura. El dominio solo conoce `ApprovalNotificationSender`.

## Alternativas

SMTP, Graph delegado `/me/sendMail`, proveedor SaaS o llamada Graph desde Angular. Se descartan por seguridad, alcance o ausencia de usuario delegado.

## Consecuencias

Permite remitente controlado y pruebas con mock; requiere consentimiento administrativo, Exchange Online, proteccion del secreto y limites Graph. Validar permisos y recepcion en tenant de desarrollo antes de activar.
