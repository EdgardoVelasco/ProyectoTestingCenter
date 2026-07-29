# Análisis de estructura actual

Fecha: 2026-07-28
Rama: `refactor/clean-modular-architecture`
Commit base: `100d222` (incluye `11c587b`)

## Inventario

### Backend

El código Java está bajo `com.netec.exams` con paquetes `request`, `catalog`, `notification`, `security`, `audit` y `web`. Hay 40 archivos Java principales. Los controladores, servicios, entidades JPA, repositorios, modelos HTTP y adaptadores Graph conviven dentro de esos paquetes técnicos.

### Frontend

Angular tiene 31 archivos bajo `src/app`. Las páginas (`login-page`, `access-denied-page`, `session-expired-page`, `request-form-page`) están en la raíz de `app`; `core` contiene autenticación, MSAL, runtime config, APIs, modelos y mocks; `shared` contiene validadores. No existe separación por feature.

## Clases de mayor tamaño

- `frontend/src/app/request-form-page.component.ts`: 429 líneas; coordina formulario, navegación, participantes, asignaciones, catálogo, persistencia y envío.
- `frontend/src/app/request-form-page.component.spec.ts`: 193 líneas; protege gran parte del comportamiento visible.
- `backend/src/main/java/com/netec/exams/request/ExamRequestService.java`: servicio de ciclo de vida, sincronización de participantes y asignaciones, catálogo y auditoría.
- `backend/src/main/java/com/netec/exams/notification/ApprovalEmailTemplateRenderer.java`: renderer de correo; permanecerá aislado en infraestructura de notificaciones.

## Dependencias relevantes

- Spring MVC, Security Resource Server, JPA/Hibernate y Flyway.
- `ExamRequestService` accede directamente a repositorios JPA y catálogo.
- Notificación accede directamente a repositorio Outbox, Jackson y Graph mediante un sender.
- Entidades JPA también exponen métodos usados por aplicación/infraestructura.
- Angular usa MSAL en `core`, APIs HTTP y mocks en el mismo espacio.

## Riesgos

- Mover clases package-private puede romper tests y visibilidad.
- Las entidades tienen métodos de dominio usados por servicios actuales.
- El worker y el submit dependen de payload/snapshots exactos.
- La suite de integración requiere Docker/Testcontainers.
- `request-form-page` tiene cobertura fuerte; debe extraerse mediante caracterización incremental.

## Cobertura disponible

Backend: tests de catálogo, request, seguridad y renderer de correo. Frontend: tests de aplicación, autenticación, menú de usuario, configuración MSAL, marca y formulario. No existen todavía ArchUnit ni límites ESLint.

## Funcionalidades sin cobertura suficiente

- Prueba E2E autenticada real.
- Revisión visual Outlook.
- Worker Graph real durante `mvn verify` sin entorno Docker visible.
- Límites arquitectónicos backend/frontend.

## Orden de migración aprobado

1. Documentación y pruebas de arquitectura.
2. Catalog (menor acoplamiento).
3. Approval routing.
4. Notification/Outbox/Graph.
5. Exam request.
6. Frontend por features.
7. División incremental de `request-form-page`.

Cada grupo se compila y prueba antes de continuar. No se modifican contratos, migraciones, estilos, Graph ni reglas de negocio.

