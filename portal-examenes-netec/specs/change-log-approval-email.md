# Change log: notificacion de aprobacion por correo

Fecha: 2026-07-24  
Estado: **Etapa A documentada; implementacion BLOQUEADA**  
Commit base preservado: `22e56d0`.

## Evidencia e interpretacion

La solicitud debe persistirse y generar un evento Outbox antes de enviar. El backend resuelve el aprobador vigente por sede y conserva snapshots. BOG/MED/SCL/LIM usan la regla de Felipe Gonzalez; WTC usa Angelica Barron; MAD usa Paola Galvis. CA y PAN permiten borrador pero bloquean envio. El AC no recibe copia.

El grupo de Testing Center recibe copia para “LATAM y MAD”, pero Discovery P-39 no define los codigos exactos de LATAM. Esta ambiguedad critica bloquea cualquier envio real con CC y la implementacion no puede avanzar hasta una respuesta explicita.

## Cambios documentales

- Se agrega estrategia Graph app-only, variables por nombre, seguridad y validacion manual.
- Se agregan ADR-045..050 para Outbox, Graph, reintentos, idempotencia, concurrencia y plantilla.
- Se agregan requisitos RF-NOT-001..016, reglas RN-NOT-001..018, historias HU-NOT-001..006 y BDD de rutas, fallos y seguridad.
- Se formalizan estados PENDING/PROCESSING/SENT/FAILED/DEAD_LETTER y los estados de solicitud existentes.
- Se actualizan plantilla, trazabilidad, backlog, tareas, riesgos y reporte de validacion.

## Pendientes criticos

1. Confirmar codigos de sede que forman LATAM (P-39).
2. Confirmar permiso Graph Mail.Send con admin consent y buzon de desarrollo.
3. Confirmar propietario de configuracion y politica de Application RBAC.
4. Aprobar politica exacta de reintentos y endpoint administrativo, si aplica.

Resolucion posterior de P-39: durante el MVP todos los codigos de sede actuales reciben copia al grupo de Testing Center configurado por ambiente. La relacion seguira siendo configurable para cambios futuros.

No se modifico Angular, Spring Boot, Docker, migraciones ni configuracion de Graph en esta etapa.
