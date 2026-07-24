# Tareas futuras actualizadas

## Autenticación real — estado 2026-07-23

LOGIN-SPEC-001, LOGIN-IMP-001..007, LOGIN-TEST-001/002 y LOGIN-DOC-001 están COMPLETADAS con evidencia automatizada y guía manual. La autenticación interactiva con credenciales del tenant permanece como validación humana, no como tarea automatizada cerrada.

Tareas nuevas por respuestas: TT-018 líneas 1:N (RF-031/CA-031; prueba varios exámenes); TT-019 asignación N:M (RF-032/CA-032; un alumno varios exámenes y sin huérfanos); TT-020 costo base vs precio venta (RF-033/CA-033; catálogo inmutable, decimal y monedas mixtas).

TT-021 administración Testing Center/RBAC/vigencia/importación Excel; TT-022 resolución ubicación y conversión MAD; TT-023 obligatoriedad/límites/precio/total; TT-024 tasa USD→EUR versionada, snapshots, redondeo y recálculo (RF-036).

| ID | Objetivo / archivos futuros | Dependencias; RF/CA | Pruebas / riesgo / DoD específico |
|---|---|---|---|
| TT-001 | auth/claims: security, guard, profile | Entra; RF001-002/CA001-002 | JWT/roles; claims desconocidos; requester inmutable |
| TT-002 | borrador: schema/entity/repo/API/form | TT001; RF003-005 | API/UI/locking; campos mínimos; sin correo/folio |
| TT-003 | validación base/catálogos previos | datos; RF006-007 | contract/relations; catálogos reales |
| TT-004 | duplicidad externa | regla; RF008 | carreras; clave provisional documentada |
| TT-005 | folio anual | DB; RF009 | 100 concurrentes; no count+1 |
| TT-006 | submit atómico | TT003-005,013-016; RF010,014 | rollback/idempotencia |
| TT-007 | outbox/correo | destinatarios; RF011-013 | retry/lease/HTML-text; participantes conservados |
| TT-008 | consultas | TT002; RF015-017 | ownership/paging/histórico |
| TT-009 | auditoría/observabilidad | transversal; RF018 | creador/remitente y correo enmascarado |
| TT-010 | concurrencia | TT002,004-006; RF019 | versiones/locks |
| TT-011 | Problem Details | transversal; RF020 | códigos nuevos/campos indexados |
| TT-012 | catálogos comerciales | ADR013-014; RF007,028 | vacío/búsqueda/relaciones; AC-CN-BOG |
| TT-013 | Exam/ExamPrice resolver | ADR011; RF021-022 | activo/sin precio/moneda/vigencia |
| TT-014 | participantes FormArray/entidad hija | ADR012; RF024 | 1/50, teclado, edición/borrado |
| TT-015 | dinero/resumen | TT013; RF023,029 | decimal exacto, manipulación, formato |
| TT-016 | coherencia/duplicados internos | TT014; RF025-026,028 | normalización, count, referencia |
| TT-017 | snapshots y confirmación | TT013-016; RF027,030 | cambio precio, histórico, revalidación |

Cada fila hereda el DoD común y debe listar archivos concretos al refinarse, antes de escribirlos.

## Enrutamiento de aprobación

| ID | Objetivo / archivos futuros | Dependencias; RF/CA | Pruebas / riesgo / DoD específico |
|---|---|---|---|
| TT-025 | catálogo de sedes y resolución | P-23..P-26; RF037-039 | reglas activa/vigente/correo; sin hardcode |
| TT-026 | snapshots y revalidación submit | TT025; RF040-045 | tampering, concurrencia, histórico y transacción |
| TT-027 | plantilla/outbox al aprobador | TT026; RF040,042 | HTML/texto, fallo/reintento y PII |
| TT-028 | consulta administrativa futura | RBAC; RF046 | 403 Ventas, listado/auditoría; sin mutación MVP |
| TT-029 | migración terminológica | ADR-024 aprobado | contrato/DB/UI a `ENVIADA_A_APROBADOR`; compatibilidad |

## Configuración runtime

Las tareas `CONF-SPEC-001`, `CONF-IMP-001..003`, `NGINX-IMP-001..003`, `NGINX-TEST-001`, `AUTH-TEST-001` y `SEC-TEST-001` se definen en `backlog.md`. El usuario autorizó la implementación: configuración runtime, NGINX y MSAL quedaron implementados; las tareas parciales conservan su estado explícito en el backlog.

LOGIN-SPEC-001 es la única tarea cerrada en esta actualización. Todas las LOGIN-IMP/TEST y STEPPER-IMP/A11Y/RESP permanecen PENDIENTES. MSAL existente no equivale a landing, guard, logout o endpoint nuevos.
## Incremento logout–catálogo–asignaciones

`LOGOUT-SPEC-001`, `PART-SPEC-001`, `CAT-SPEC-001`, `CAT-ANALYSIS-001` y `ASG-SPEC-001`: COMPLETED con Spec aprobado.
`LOGOUT-IMP-001`, `LOGOUT-TEST-001`, `PART-IMP-001`, `PART-TEST-001`, `CAT-DB-001`, `CAT-IMPORT-001`, `CAT-API-001`, `CAT-UI-001`, `CAT-TEST-001`, `ASG-DB-001`, `ASG-API-001`, `ASG-UI-001`, `ASG-TEST-001`: COMPLETED con evidencia automatizada del 2026-07-23.

Validación manual pendiente, sin cerrar como evidencia automática: autenticación/logout interactivo contra Microsoft Entra ID y revisión visual responsiva con una sesión real. El incremento implementado no incluye submit/aprobación ni precio de venta.
## Incremento logout visible–UPN–Empresa

- LUC-SPEC-001: COMPLETED.
- LUC-UI-001, LUC-ID-001, LUC-COM-001, LUC-TEST-001: COMPLETED con evidencia automatizada 2026-07-23.

Validaciones humanas pendientes: logout interactivo y UPN con dos cuentas Entra; revisión visual responsive/axe.
## Authenticated User Menu

Spec/ADR/BDD/trazabilidad, implementación y pruebas: COMPLETED. Validación humana Entra/zoom/dispositivos permanece pendiente.

## Requester como Asesor Comercial

Spec, ADR-044, migración V5, autoridad backend, UI read-only, contrato y pruebas. Delegación/catálogo permanecen fuera del MVP.
