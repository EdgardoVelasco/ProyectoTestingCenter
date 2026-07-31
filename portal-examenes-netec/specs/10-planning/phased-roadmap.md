# Roadmap por fases

| Fase | Objetivo | Estado | Prioridad |
|---|---|---|---|
| 0 | Reconciliación documental, arquitectura limpia, caracterización y contratos | IN_PROGRESS | Alta |
| 1A | Confirmación post-submit, reinicio seguro, término Comercial y correo | READY_FOR_SPECIFICATION / NOT_IMPLEMENTED | Alta |
| 1B | Importación CSV de alumnos, validación y edición | READY_FOR_SPECIFICATION / NOT_IMPLEMENTED | Alta |
| 2 | Bandeja y decisión de Facturación | NEEDS_DISCOVERY / NOT_READY_FOR_IMPLEMENTATION | HIGH_PRIORITY |
| 3 | Separación Administrador de Proyectos–Asesor Comercial | NEEDS_DISCOVERY / NOT_READY_FOR_IMPLEMENTATION | Media |
| 4 | Catálogo regional, precios, vigencias y revisión humana | PRIORITY_BACKLOG / NEEDS_DISCOVERY | Estratégica |

## Fase 0

La rama de refactor arquitectónico fue fusionada en `master`; la separación
profunda de dominio/puertos, ArchUnit y ESLint sigue pendiente. Esta fase no
autoriza cambios funcionales.

## Fase 1A

Incluye `Solicitud enviada`, folio, `Crear otra solicitud`, limpieza posterior
al éxito, conservación ante error, nueva idempotencia, `Comercial` y mejoras
visuales del correo. Todo permanece NOT_IMPLEMENTED.

## Fase 1B

Incluye CSV UTF-8, plantilla descargable, vista previa, validación atómica,
duplicados por correo normalizado, edición posterior y máximo 100. XLS/XLSX
están OUT_OF_SCOPE.

## Fase 2

Facturación es la siguiente prioridad del cliente. Requiere resolver usuarios,
roles/grupos, alcance, estados, comentarios, SLA, concurrencia y notificaciones.
Estado NEEDS_DISCOVERY; no está lista para implementación.

## Fase 3

AP significa Administrador de Proyectos y AC Asesor Comercial. La separación,
selector y snapshots independientes requieren fuente autorizada y migración.

## Fase 4

El catálogo debe cubrir LATAM (BOG, MED, LIM, SCL, PAN, CA, WTC) y Madrid (MAD),
con precios y vigencias independientes, fuentes oficiales y revisión humana.
