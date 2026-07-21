# Portal de Registro de Exámenes NETEC

Portal interno para sustituir el correo de solicitud de exámenes por captura estructurada de datos comerciales, un examen, precio, moneda y uno o varios participantes. Estado: **especificación actualizada con evidencia real; implementación no autorizada**.

## Alcance MVP

Autenticación, borradores, validación, prevención de duplicados, folio, consulta propia, persistencia, auditoría y notificación desacoplada. Aprobación, compra y voucher quedan fuera.

## Arquitectura propuesta

Angular + Material; Java 21/Spring Boot 3; PostgreSQL/Flyway; Entra ID; proveedor de correo intercambiable con Microsoft Graph como destino; Transactional Outbox.

Las especificaciones se revisan en orden numérico. Preguntas críticas: `specs/01-discovery/open-questions.md`; consistencia: `specs/validation-report.md`; ejecución: `specs/10-planning/implementation-plan.md`.

La evidencia y los cambios se registran en `specs/change-log-new-scope.md`. No implementar antes de aprobar explícitamente las especificaciones. Próximo paso: confirmar claims/campos mínimos y ejecutar I1, “autenticación y borrador con solicitante”.
