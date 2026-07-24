# Change log: enrutamiento definitivo de correo en desarrollo

Fecha: 2026-07-24  
Estado: SPEC ACTUALIZADO / IMPLEMENTACION BLOQUEADA POR CONFIGURACION FALTANTE

## Regla definitiva DEV

Remitente: UPN de la asesora autenticada, obtenido y validado por backend. En el MVP `mailSenderUpnSnapshot = requesterUpnSnapshot`.

Destinatario principal:

- BOG, MED, SCL, LIM, CA y PAN: Felipe González.
- WTC: Angélica.
- MAD: Paola Galvis.

Copia: grupo operativo de Testing Center configurado por ambiente para todas las sedes actuales.

## Cambios frente a decisiones anteriores

Quedan SUPERSEDED las reglas que indicaban CA/PAN sin ruta o bloqueadas, remitente fijo de Testing Center, Paola como copia global o Felipe/Angélica/Paola como remitentes. La nueva terminología separa remitente, destinatario principal y copia.

## Persistencia y Outbox

ExamRequest debe conservar requesterObjectIdSnapshot, requesterNameSnapshot, requesterUpnSnapshot, mailSenderUpnSnapshot, siteCodeSnapshot, approvalRoutingRuleId, approvalRecipientNameSnapshot, approvalRecipientEmailSnapshot, approvalCcSnapshot y estado/fecha de notificacion. Outbox conserva senderUpnSnapshot, recipient, cc, subject, payload, idempotencyKey y status.

## Bloqueo de implementacion

La inspeccion segura del `.env` local encontro solo variables base de Entra/frontend/backend. No existe `GRAPH_TESTING_CENTER_CC_GROUP` ni una variable equivalente con SMTP completo. No se inventara la direccion ni se implementara un CC ficticio. La Etapa C queda bloqueada hasta agregar esa variable al ambiente de desarrollo.

La variable `GRAPH_TESTING_CENTER_CC_GROUP` fue agregada posteriormente y validada por presencia y formato SMTP sin revelar su valor. Posteriormente tambien quedaron presentes `GRAPH_BASE_URL`, `GRAPH_MAIL_ENABLED` y la credencial privada de backend. La configuracion permite iniciar Etapa C; el envio real requiere pruebas y verificacion de recepcion.

## Archivos de esta actualizacion

Se agregaron ADR-051, ADR-052, ADR-054 y ADR-055, reglas RN-NOT-019..032, requisitos RF-NOT-017..030, escenarios de las ocho sedes, configuracion DEV y reporte de validacion. No se modifico Angular, Spring Boot, migraciones ni infraestructura.

## Evidencia de implementacion

Se aplico Flyway V6, se verificaron las ocho rutas en PostgreSQL, se construyo el backend y se comprobó frontend 200, health 200 y submit sin token 401. La prueba autenticada y la recepcion Graph siguen pendientes.
