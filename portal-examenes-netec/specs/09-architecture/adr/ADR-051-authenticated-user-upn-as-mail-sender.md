# ADR-051: UPN autenticado como remitente

Estado: PROPUESTO; bloqueado hasta configurar grupo CC y Graph DEV.

## Decision

El backend usa el UPN validado de la asesora autenticada como remitente y conserva `mailSenderUpnSnapshot`. El frontend nunca lo envia como autoridad y Outbox no almacena tokens. Graph usa `/v1.0/users/{mailSenderUpnSnapshot}/sendMail`, no `/me/sendMail`.

## Consecuencias

La solicitud queda atribuida a la persona real, pero el tenant debe permitir envio app-only desde ese usuario y la politica RBAC debe controlarlo. Reintentos conservan el snapshot original.
