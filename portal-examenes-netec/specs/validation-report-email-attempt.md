# Validacion de intento de correo DEV

La solicitud de prueba con sede BOG fue persistida como BORRADOR inicialmente. Tras conectar el submit real, se creo un registro Outbox con:

- destinatario principal resuelto a Felipe DEV;
- remitente snapshot igual al UPN autenticado;
- estado inicial PENDING.

El worker intento procesarlo y el Outbox quedo FAILED con un error sanitizado `NotFound` (HTTP 404 de Graph). No se recibio correo.

Interpretacion pendiente de confirmar en Exchange Online: el recurso `/users/{mailSenderUpnSnapshot}/sendMail` no encuentra el buzón remitente, o la cuenta no tiene buzón/licencia Exchange Online, o la identidad utilizada no coincide con un usuario mail-enabled. No se registraron tokens ni cuerpos de respuesta.
