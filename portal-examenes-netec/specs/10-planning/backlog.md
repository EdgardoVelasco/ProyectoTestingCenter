# Backlog actualizado

| Orden | Incremento | Requisitos/historias | Entrada → salida |
|---|---|---|---|
| 1 | Autenticación y borrador | RF001-005 / HU001-004 | claims → borrador propio |
| 2 | Catálogos comerciales | RF007,028 / HU014,023 | significados/catálogos → captura comercial |
| 3 | Examen/precio | RF021-023 / HU017-019 | ADR-011/datos → total backend |
| 4 | Participantes | RF024 / HU020 | ADR-012/límite → colección dinámica |
| 5 | Validación/duplicados | RF006,008,025-026,028 / HU005-006,021,023 | reglas → submit validable |
| 6 | Folio/submit | RF009-010,014,019,027,029-030 / HU007,022,024-025 | validación → REGISTRADA+snapshots |
| 7 | Enrutamiento y outbox | RF011-013,018,037-045 / HU011-013,032-039,041 | sedes+correos confirmados → resolución backend, snapshots y entrega al aprobador |
| 8 | Consulta/detalle | RF015-017,020 / HU008-009,015-016 | snapshots → histórico propio |
| 9 futuro | Consulta administrativa de rutas | RF046 / HU040 | propietario/RBAC confirmado → consulta auditable; sin aprobación interna |

## Configuración runtime — IN_REVIEW

| ID | Estado | Resultado |
|---|---|---|
| CONF-SPEC-001 | COMPLETADA | Estrategia, requisitos, ADR, BDD y trazabilidad documentados. |
| CONF-IMP-001 | IMPLEMENTADA | Generar runtime config público al arrancar. |
| CONF-IMP-002 | IMPLEMENTADA | Cargar/validar configuración antes de Angular. |
| CONF-IMP-003 | COMPLETADA | Inicializar MSAL desde runtime config. |
| NGINX-IMP-001 | IMPLEMENTADA | Crear template NGINX. |
| NGINX-IMP-002 | IMPLEMENTADA | Crear entrypoint de sustitución allowlisted. |
| NGINX-IMP-003 | IMPLEMENTADA | Configurar reverse proxy conservando `/api`. |
| NGINX-TEST-001 | PARCIAL | Validados SPA, `/api`, no-store, salud, 503 y fail-fast; faltan timeout/request-size automatizados. |
| AUTH-TEST-001 | COMPLETADA | Validar `protectedResourceMap` same-origin y exclusión externa con MSAL Angular 6.x. |
| SEC-TEST-001 | PARCIAL | Escaneo actual sin hallazgos productivos; falta automatizar en CI. |

## Backlog login y stepper

Estado vigente de login (2026-07-23): LOGIN-SPEC-001, LOGIN-IMP-001..007, LOGIN-TEST-001/002 y LOGIN-DOC-001 COMPLETADAS. La tabla histórica inferior queda superseded para esas tareas; la prueba interactiva del tenant permanece pendiente de ejecución humana.

| ID | Estado | Alcance |
|---|---|---|
| LOGIN-SPEC-001 | COMPLETADA | Documentar login, sesión, identidad y stepper. |
| LOGIN-IMP-001 | COMPLETADA | Crear pantalla login. |
| LOGIN-IMP-002 | COMPLETADA | Adaptar MSAL existente. |
| LOGIN-IMP-003 | COMPLETADA | Implementar guard. |
| LOGIN-IMP-004 | COMPLETADA | Servicio autenticación. |
| LOGIN-IMP-005 | COMPLETADA | `/api/auth/me` y migración. |
| LOGIN-IMP-006 | COMPLETADA | Identidad en header. |
| LOGIN-IMP-007 | COMPLETADA | Logout. |
| LOGIN-TEST-001 | COMPLETADA | Pruebas frontend. |
| LOGIN-TEST-002 | COMPLETADA | Pruebas backend. |
| LOGIN-DOC-001 | COMPLETADA | Guía manual development. |
| STEPPER-IMP-001 | COMPLETADA | Stepper implementado y reordenado. |
| STEPPER-IMP-002 | COMPLETADA | FormGroup raíz por pasos. |
| STEPPER-IMP-003 | COMPLETADA | Navegación/validación con participantes antes de exámenes. |
| STEPPER-IMP-004 | COMPLETADA | Estados visuales cubiertos por pruebas de componente. |
| STEPPER-IMP-005 | COMPLETADA | Persistencia de borrador con participantes/asignaciones. |
| STEPPER-A11Y-001 | PARCIAL | Teclado y etiquetas implementados; falta axe automatizado. |
| STEPPER-RESP-001 | PARCIAL | Reglas responsive implementadas; falta E2E visual automatizado. |

## Incremento logout–participantes–catálogo–asignaciones

| ID | Estado | Evidencia |
|---|---|---|
| LOGOUT-SPEC-001 / PART-SPEC-001 / CAT-SPEC-001 / ASG-SPEC-001 | COMPLETADA | Requisitos, reglas, historias, BDD, ADR y trazabilidad aprobados. |
| CAT-ANALYSIS-001 | COMPLETADA | 124 filas, 24 proveedores, 5 duplicados exactos y 119 registros únicos documentados. |
| LOGOUT-IMP-001 / LOGOUT-TEST-001 | COMPLETADA | `logoutRedirect`, confirmación de cambios y pruebas Angular. |
| PART-IMP-001 / PART-TEST-001 | COMPLETADA | Paso anterior a Exámenes, FormArray y validaciones cubiertas. |
| CAT-DB-001 / CAT-IMPORT-001 / CAT-API-001 / CAT-UI-001 / CAT-TEST-001 | COMPLETADA | Flyway V2, CSV/importador idempotente, API, agrupación UI y pruebas. |
| ASG-DB-001 / ASG-API-001 / ASG-UI-001 / ASG-TEST-001 | COMPLETADA | Flyway V3, contrato N:M, snapshots backend, matriz UI e integración PostgreSQL. |

Pendiente humano: probar logout con una cuenta real de Entra y ejecutar revisión visual responsive/axe. Pendiente técnico: configurar lint y optimizar el bundle.
## Incremento logout visible–UPN–Empresa

| ID | Estado inicial | Alcance |
|---|---|---|
| LUC-SPEC-001 | COMPLETADA | Spec, ADR-042, BDD y trazabilidad aprobados. |
| LUC-UI-001 | COMPLETADA | Variante outlined accesible sin cambiar lógica MSAL. |
| LUC-ID-001 | COMPLETADA | Precedencia UPN y visualización readonly. |
| LUC-COM-001 | COMPLETADA | Empresa libre frontend/backend, snapshot y V4. |
| LUC-TEST-001 | COMPLETADA AUTOMATIZADA | Angular/Spring/build/integración; pruebas humanas Entra pendientes. |
## Authenticated User Menu

- USER-MENU-SPEC-001: COMPLETED.
- USER-MENU-IMP-001: COMPLETED.
- USER-MENU-TEST-001: COMPLETED (43/43).
- USER-MENU-A11Y-001: COMPLETED automatizado; revisión axe/zoom humana pendiente.

## Requester como advisor

- ADV-SPEC-001: COMPLETED.
- ADV-DB-001: COMPLETED.
- ADV-BE-001: COMPLETED.
- ADV-UI-001: COMPLETED.
- ADV-TEST-001: COMPLETED automatizado; verificación con dos cuentas Entra pendiente manual.
- ADV-DELEGATION-001: FUTURE, fuera del MVP.
## Incremento notificacion Graph (Etapa A)

| ID | Estado | Alcance |
|---|---|---|
| NOT-SPEC-001 | COMPLETADA | Requisitos, reglas, ADR, BDD y bloqueo P-39 documentados. |
| NOT-DB-001 | PENDIENTE | Tabla NotificationOutbox, indices, constraints y snapshots. |
| NOT-DB-002 | PENDIENTE | Snapshot de destinatario y clave idempotente. |
| NOT-GRAPH-001 | PENDIENTE | Adaptador Graph app-only y configuracion segura. |
| NOT-TPL-001 | PENDIENTE | Plantilla HTML/texto plano con escaping. |
| NOT-WORKER-001 | PENDIENTE | Worker configurable con lease y concurrencia. |
| NOT-RETRY-001 | PENDIENTE | Reintentos, Retry-After y Dead Letter. |
| NOT-IDEM-001 | PENDIENTE | Idempotencia de submit y Outbox. |
| NOT-API-001 | PENDIENTE | Submit y detalle con estado de notificacion. |
| NOT-UI-001 | PENDIENTE | Estados pendiente/enviada/fallida. |
| NOT-TEST-001 | PENDIENTE | Unitarias y contrato Graph mock. |
| NOT-TEST-002 | PENDIENTE | Integracion PostgreSQL/Testcontainers. |
| NOT-E2E-001 | BLOQUEADA | Prueba real DEV, requiere P-39, consentimiento y buzon. |
| NOT-DOC-001 | PENDIENTE | Guia operativa y runbook. |
