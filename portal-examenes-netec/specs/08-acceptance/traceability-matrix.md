# Matriz de trazabilidad actualizada

## Autenticación real development — IMPLEMENTADA

| Requisito | Regla | Historia/CA | BDD | Pantalla/componente | Endpoint/configuración | Prueba | Estado |
|---|---|---|---|---|---|---|---|
| RF-AUTH-001..004 | RN-AUTH-001..003/008 | HU-AUTH-001/002 | AUTH-001..005 | login/AuthService | Entra runtime | login/auth specs | IMPLEMENTADO |
| RF-AUTH-005..007 | RN-AUTH-004..007 | HU-AUTH-002/003 | AUTH-006..013; sesión | guard/interceptor | `/api/auth/me`, issuer/aud/tid/scp | interceptor, MockMvc, validators | IMPLEMENTADO |
| RF-AUTH-008 | RN-AUTH-003/010 | HU-AUTH-003 | AUTH-007/008 | header/solicitante | identidad mínima | component/API tests | IMPLEMENTADO |
| RF-AUTH-009/012 | RN-AUTH-008/009 | HU-AUTH-004 | AUTH-014..017; sesión | logout/session expired | logout redirect | AuthService tests/manual | IMPLEMENTADO |
| RF-AUTH-010/011/013 | RN-AUTH-008/010 | HU-AUTH-005/006 | AUTH-013/018..020 | error/403/external disabled | 401/403 | component/MockMvc | IMPLEMENTADO |

> Estado más reciente (2026-07-23): AUTH-001..014, UI-041..048 y UI-050..053 IMPLEMENTADOS. UI-049 PARCIAL porque el paso se conserva localmente al guardar, pendiente de persistencia backend entre dispositivos. Evidencia: 25 pruebas Angular, prueba backend de identidad, builds e integración Docker same-origin.

## Trazabilidad de identidad visual — IN_REVIEW

**Estado de ejecución:** paquete APPROVED e infraestructura UI-004..007 IMPLEMENTADA el 2026-07-21. Los registros de logo/iconografía permanecen bloqueados donde se indica.

| BR | Fuente manual | Token | Componente/pantalla | VAC | BDD | Prueba propuesta | Archivo SCSS futuro | Estado |
|---|---|---|---|---|---|---|---|---|
| BR-001 | pp. 7–8 paleta | `color-brand-*` | todos / todas | 003,015 | BR-003,005 | Stylelint + contraste | `_tokens.scss` | IN_REVIEW |
| BR-002 | p. 7 azul→verde | gradient-start/end | CMP-001 / headers autorizados | 004 | BR-002 | computed CSS + screenshot | `_tokens.scss`, `_components.scss` | IN_REVIEW |
| BR-003 | p. 9 Montserrat | font-family-primary | todos / todas | 001,014 | BR-001 | computed font/Playwright | `_typography.scss` | IN_REVIEW |
| BR-004 | p. 5 sin patines | font-family-primary | todos / todas | 002 | BR-001 | escaneo/computed font | `_typography.scss` | IN_REVIEW |
| BR-005 | p. 10 outline | icon tokens pendientes | CMP-014 y acciones | 005 | BR-004 | DOM/screenshot/a11y | `_components.scss` | IN_REVIEW |
| BR-006 | traslado digital | todos los colores | todos | 003,012 | BR-003; VIS-001/002 | regla hex/style | todos autorizados | IN_REVIEW |
| BR-007 | mantenibilidad derivada | spacing/radius/shadow | CMP-001..023 | 003,009,012 | VIS-001/003/004 | Stylelint/review | cuatro parciales | IN_REVIEW |
| BR-008 | pp. 4,13 intención/aplicación | type/layout/surface | CMP-003/004 / Crear | 008,013,014 | BR-007,012–015 | visual por viewport | `_layout.scss`, `_components.scss` | IN_REVIEW |
| BR-009 | requisito producto | text/focus/semánticos | todos | 006–010,015 | BR-005,007–010; A11Y-UI-* | axe/teclado/contraste | todos | IN_REVIEW |
| BR-010 | manual de logotipo/aplicaciones | asset pendiente | CMP-001 / app header | 011 | BR-012 | hash/dimensiones/screenshot | `_components.scss` | BLOQUEADO ASSET |
| BR-011 | accesibilidad derivada | semantic colors pendientes | CMP-015/016/022/023 | 010,015 | BR-005,010; A11Y-UI-005 | contraste/axe | `_tokens.scss` | PENDIENTE TOKENS |
| BR-012 | gobierno SDD | n/a | todos / proceso | 012 | BR-006; VIS-003/005 | check de PR propuesto | n/a | IN_REVIEW |

Los archivos SCSS son destinos futuros, no existen ni están autorizados en esta integración.

## Implementación frontend del formulario — 2026-07-21

| RF | RN | HU | CA | UI/código | Prueba / estado |
|---|---|---|---|---|---|
| 002 | 003 | 001 | 002 | solicitante solo lectura / `AppComponent` | readonly / IMPLEMENTADO |
| 021-022 | 021-022,034-036 | 017-018 | 021-022 | filtros, catálogo mock y snapshots visuales / `CatalogMockService` | carga, selección, autocompletado / MOCK AISLADO |
| 023,029,033 | 023-026,037-039,044 | 019,024,028 | 023,029,033 | líneas, decimal escalado, resumen / `AppComponent` | cálculo y no envío de total / IMPLEMENTADO VISUAL |
| 024-026,032 | 024,028-031,042,050 | 020-021,027 | 024-026,032 | `FormArray`, asignaciones y validadores / `form-validators.ts` | alta/baja, email, duplicado, cantidad / IMPLEMENTADO |
| 030 | 001,040 | 025 | 030 | `ConfirmationDialogComponent` | diálogo / IMPLEMENTADO; submit MOCK |
| 004-005 | 008,013-014 | 003-004 | 004-005 | `ExamRequestApi` | guardado/doble clic / API REAL I1, SUBCONJUNTO |
| 035 | 056-059 | 030 | 035 | aviso y bloqueo MAD | tasa ausente / IMPLEMENTADO; conversión PENDIENTE BE |

## Implementación I1

RF-001..005 / RN-003,008,013-016 / HU-001..004 / CA-001..005 / BDD-001..002 → `/api/v1/exam-requests`, pantalla Nueva/Editar, `ExamRequest`, TT-001/TT-002 → `ExamRequestControllerIT`, `ExamRequestServiceTest`, pruebas Angular del formulario. Estado: EN IMPLEMENTACIÓN.

| 036 | 056-059 | 031 | 036 | 064,067-070 | Examen/Resumen/Admin | price/submit/admin exchange-rate | ExchangeRate/Item | TT-024 | conversion/snapshot/reconfirm |

Cobertura vigente: RF-001..036, RN-001..059, HU-001..031, CA-001..036 y BDD-001..070.

## Enrutamiento de aprobación — 2026-07-22

| Sede/regla | Aprobador | RF | RN | HU | CA | BDD | Endpoint | Pantalla/notificación | Entidad/auditoría | Tarea/prueba | Estado |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BOG/MED/SCL/LIM activa/vigente | Felipe González | 037-039 | 060-062,067 | 032-033 | 037-039 | 071-074 | GET sites/resolve | Comercial/tarjeta | Site/Rule/Audit | TT-025/resolución por sede | ESPECIFICADO; correo pendiente |
| WTC activa/vigente | Angélica | 037-039 | 060-061,063,067 | 032-033 | 037-039 | 075 | GET sites/resolve | Comercial/tarjeta | Site/Rule/Audit | TT-025/resolución WTC | ESPECIFICADO; correo pendiente |
| MAD activa/vigente | Paola Galvis | 037-039 | 060-061,064,067 | 032-033 | 037-039 | 076 | GET sites/resolve | Comercial/tarjeta | Site/Rule/Audit | TT-025/ruta+conversión | ESPECIFICADO; correo pendiente |
| sin regla/inactiva/vencida/correo inválido | ninguno | 038,041 | 066,075 | 035 | 038,041 | 077-080,089 | resolve/submit | error sede | Rule/Audit | TT-025/negativos | ESPECIFICADO |
| cambio sede/regla | vigente al submit | 039,045 | 073-074,077 | 033,039 | 039,045 | 081-082,084-085 | resolve/submit | resumen/confirmación | Rule/version/Audit | TT-026/concurrencia-tampering | ESPECIFICADO |
| submit/notificación | snapshot resuelto | 040,042 | 068-071,076 | 034,036,041 | 040,042 | 083,086-088 | submit/worker | plantilla approval | Request/Outbox | TT-026-027/fallo-retry-histórico | ESPECIFICADO |
| auditoría/config futura | sin propietario autorizado | 043-046 | 072,077,081 | 037-040 | 043-046 | 090,094 | admin futuro | administración futura | Rule/AuditEntry | TT-028/RBAC-negativo | BLOQUEADO P-25 |
| correos/copias | Finanzas/Testing Center | 040,047 | 078-080 | 034,042 | 040,047 | 091-093 | submit/worker | plantilla approval | Rule/Outbox/Audit | TT-027/destinatarios-copias | PARCIAL; P-39 |

Cobertura vigente tras respuestas: RF-001..047, RN-001..081, HU-001..042, CA-001..047 y BDD-001..094. RF/RN solicitados con IDs colisionados se mapearon a RF-037..046 y RN-060..077. No existen reglas nuevas sin CA/BDD/tarea.

## Extensión por respuestas adicionales

| RF | RN | HU | CA | BDD | Pantalla | Endpoint | Entidad | Tarea | Prueba |
|---|---|---|---|---|---|---|---|---|---|
| 034 | 052-054 | 029 | 034 | 063,065-066 | Administración técnica | POST/PUT admin exams/prices | Exam/ExamPrice | TT-021 | RBAC/vigencia/audit |
| 035 | 051-052,056 | 030 | 035 | 064 | Examen | GET exam price/validate | Location/ExamPrice | TT-022 | location/currency |
| 006,028,033 | 023,032,048-050,055 | 005,023,028 | 006,028,033 | 059-062 | Formulario | validate/submit | Request/Item | TT-023 | required/limits/zero |

Cobertura vigente: RF-001..035, RN-001..056, HU-001..030, CA-001..035, BDD-001..066.

## Extensión confirmada por respuestas

| RF | RN | HU | CA | BDD | Pantalla | Endpoint | Entidad | Tarea | Prueba |
|---|---|---|---|---|---|---|---|---|---|
| 031 | 041,043 | 026 | 031 | 051 | Líneas examen | PUT/validate | ExamRequestItem | TT-018 | multi-line |
| 032 | 042 | 027 | 032 | 052-054 | Asignaciones | PUT/validate/submit | ItemParticipantAssignment | TT-019 | N:M/count |
| 033 | 023,025,044-045 | 028 | 033 | 055-058 | Precio/Resumen | PUT/validate/submit | ExamPrice/Item | TT-020 | base-vs-sale/decimal |

RN-046/047 se cubren con BDD-029/038-039 y validaciones de campo. Cobertura vigente: RF-001..033, RN-001..047, HU-001..028, CA-001..033 y BDD-001..058. Las referencias inferiores a RF-001..030 describen la versión anterior y se conservan como trazabilidad histórica.

| RF | RN | HU | CA | BDD | Pantalla | Endpoint | Entidad | Tarea | Prueba / estado |
|---|---|---|---|---|---|---|---|---|---|
| 001-002 | 003,016 | 001,015 | 001-002 | 017-018 | Acceso/Solicitante | todos | AuditEntry | TT-001 | JWT/claims / ESPECIFICADO |
| 003-005 | 008,013-014,016,033 | 002-004,010,020 | 003-005,024 | 001-002,027 | Nueva/Editar | POST/PUT/cancel | Request/Participant | TT-002,014 | API/UI |
| 006-007 | 001-006,017,019-020,032,034 | 005,014,023 | 006-007,028 | 003,012-013,036-039,046-048 | Formulario | validate/catalogs | catálogos | TT-003,012 | rules/contract |
| 008 | 007,029,031 | 006,021 | 008,026 | 005,010,030-031 | Formulario | submit | RequestParticipant | TT-004,016 | races |
| 009 | 009 | 007 | 009 | 016 | Confirmación | submit | FolioCounter | TT-005 | concurrency |
| 010,014 | 010,018,027,040 | 007,022,025 | 010,014,027,030 | 004,009,034-035,040-041 | Resumen/Confirmación | submit | Request/Outbox | TT-006,017 | atomic snapshots |
| 011-013 | 010-012,014-015 | 011-012 | 011-013 | 006-008,049-050 | Detalle | worker | Outbox/Audit | TT-007 | retry/render |
| 015-017 | 016,018,027,040 | 008-009,022 | 015-017,027 | 011,019-020,035 | Lista/Detalle | GET request(s) | Request/Participant | TT-008 | ownership/history |
| 018-020 | 014-015,020,033 | 013,016 | 018-020 | 002,009-010,014-015 | Todas/Error | transversal | Audit | TT-009-011 | audit/problem |
| 021-022 | 021-022,034-036 | 017-018 | 021-022 | 021-023,032,034,046 | Examen | GET exams/detail/price | Exam/Price/Vendor/Technology/Certification | TT-013 | catalog/price |
| 023 | 023-026,035,037-039 | 019 | 023 | 024-025,033,042-045 | Examen/Resumen | validate/submit/price | ExamPrice/Request | TT-015 | decimal/tampering |
| 024 | 028,033 | 020 | 024 | 026-027,029,040 | Participantes | POST/PUT request | RequestParticipant | TT-014 | dynamic/a11y |
| 025-026 | 024,028-031 | 021 | 025-026 | 028-031,040 | Participantes | validate/submit | RequestParticipant | TT-016 | count/uniqueness |
| 027 | 027,033-034,040 | 022 | 027 | 034-035,040,050 | Detalle | submit/GET detail | Request snapshots | TT-017 | historical |
| 028 | 032 | 023 | 028 | 036-039 | Comercial | validate/submit | Request/CourseType/Segment | TT-012,016 | conditional |
| 029 | 025-026,037-039 | 019,024 | 029 | 024-025,033,041-044 | Resumen | validate/price | Request/ExamPrice | TT-015 | decimal |
| 030 | 001,022-040 | 025 | 030 | 032,034,040-045 | Confirmación previa | submit | agregado completo | TT-017 | revalidation |

RF-001..030, RN-001..040, HU-001..025 y CA-001..030 quedan cubiertos. Reglas configurables tienen escenarios de ambas políticas y no se presentan como cerradas.

## Configuración runtime y same-origin — 2026-07-23

| Variable/tema | Requisito | ADR | Componente | BDD | Tarea | Prueba futura | Estado |
|---|---|---|---|---|---|---|---|
| `BACKEND_HOST`, `BACKEND_PORT` propuestas; `BACKEND_URL` real | NFR-CONF-002, NFR-NGX-002/003 | 028-030 | NGINX | NGX-003/004/010; ENV-002 | NGINX-IMP-001..003 | NGINX-TEST-001 | IN_REVIEW |
| `NGINX_LISTEN_PORT` propuesta | NFR-NGX-001/005 | 029 | NGINX | NGX-001/009/010 | NGINX-IMP-001/002 | config test | PROPUESTA |
| `TENANT_ID` | NFR-CONF-004/005, SEC-CONF-001 | 028/031 | runtime/MSAL | ENV-003/004; AUTH-RT-001 | CONF-IMP-001..003 | initializer | REAL; normalización pendiente |
| `FRONTEND_CLIENT_ID` | NFR-CONF-004/005, NFR-SEC-002 | 028/031 | runtime/MSAL | AUTH-RT-001/006 | CONF-IMP-001..003 | secret scan | REAL |
| `BACKEND_SCOPE` | NFR-CONF-004, SEC-CONF-006 | 030/031 | interceptor | AUTH-RT-002..004 | CONF-IMP-003 | AUTH-TEST-001 | REAL |
| `FRONTEND_URL` | NFR-CONF-001/004, SEC-CONF-009 | 028/030 | redirect/origin | ENV-001/008; AUTH-RT-005 | CONF-IMP-001/003 | redirect test | REAL; semántica pendiente |
| `BACKEND_CLIENT_ID`, `ENTRA_AUDIENCE` | NFR-NGX-004, SEC-CONF-004 | 028/031 | Spring Security | AUTH-RT-002/003 | AUTH-TEST-001 | JWT audience | REAL/referenciada |
| `ENTRA_ISSUER_URI` | NFR-NGX-004 | 031 | Spring Security | AUTH-RT-001/002 | AUTH-TEST-001 | JWT issuer | REFERENCIADA |
| `API_BASE_PATH=/api` propuesta | NFR-CONF-003, NFR-NGX-003 | 028/030 | Angular/NGINX/OpenAPI | ENV-002; NGX-003/004 | CONF-IMP-001; NGINX-IMP-003 | proxy contract | PROPUESTA |
| `DB_URL`, `DB_USER`, `DB_PASSWORD` | NFR-SEC-001..003, SEC-CONF-003 | 031 | Spring/PostgreSQL | ENV-005/007 | SEC-TEST-001 | secret scan | REFERENCIADAS; privadas |
| `SPRING_PROFILES_ACTIVE`, `LOCAL_USER_*` | SEC-CONF-009 | 031 | Spring local | ENV-008/010 | SEC-TEST-001 | profile test | SOLO LOCAL |
| `.env` | NFR-SEC-004, SEC-CONF-008 | 031 | desarrollo/Git | ENV-006/007 | CONF-SPEC-001 | git audit | IGNORADO, NO HISTORIAL |
| caché runtime/bundles | SEC-CONF-007 | 028/029 | NGINX | ENV-001/003 | NGINX-IMP-001 | header test | PROPUESTA |

Cobertura: NFR-CONF-001..006, NFR-NGX-001..006, NFR-SEC-001..004 y SEC-CONF-001..010 se relacionan con ADR-028..031, ENV-001..010, NGX-001..010 y AUTH-RT-001..006. Solo `CONF-SPEC-001` está completada.

Estado de implementación: CONF-SPEC-001, CONF-IMP-001..003, NGINX-IMP-001..003 y AUTH-TEST-001 IMPLEMENTADAS; MSAL Angular 6.x usa `${window.location.origin}/api/*`, coincidencia estricta y prueba positiva/negativa. NGINX-TEST-001 y SEC-TEST-001 permanecen PARCIALES.

## Login, identidad y stepper — DRAFT

| Requisito | Regla | Historia | CA/VAC | BDD | Pantalla/componente | Endpoint/entidad | Tarea | Estado |
|---|---|---|---|---|---|---|---|---|
| AUTH-001..003,012 | RN-AUTH-001/002/008 | HU-AUTH-001/006 | CA-AUTH; VAC-AUTH-001..008 | AUTH-001..003,018..020 | Acceso; CMP-024..026 | Entra; sin password API | LOGIN-IMP-001/TEST-001 | DRAFT |
| AUTH-004,013 | RN-AUTH-004/007/009 | HU-AUTH-002 | CA-AUTH-004/013 | AUTH-004/005/009/015/016 | Auth/sesión; CMP-031 | cuenta MSAL | LOGIN-IMP-002..004 | DRAFT |
| AUTH-005..007 | RN-AUTH-003/005/006/012/013 | HU-AUTH-003 | CA-AUTH-005..007; VAC-AUTH-009 | AUTH-006..008 | Header/Solicitante fijo; CMP-027/028 | `/api/auth/me`; principal | LOGIN-IMP-005/006 | DRAFT; endpoint confirmado |
| AUTH-008/014 | RN-AUTH-009/010/014 | HU-AUTH-004 | CA-AUTH-008/014; VAC-AUTH-010 | AUTH-014..017; DRAFT-NAV | menú/logout | Entra/BORRADOR | LOGIN-IMP-007 | DRAFT |
| AUTH-009..011 | RN-AUTH-005/007/011/012 | HU-AUTH-005 | CA-AUTH-009..011 | AUTH-010..013/015 | denied/error | API 401/403 | LOGIN-IMP-003/005 | DRAFT |
| UI-041..047/053 | RN-UI-041..044/047/048 | HU-UI-021/022/024 | CA/VAC-STEP | STEP-001..008/018/019 | CMP-029/030 | FormGroup | STEPPER-IMP-001..004/A11Y/RESP | DRAFT |
| UI-048/049 | RN-UI-042/043/045 | HU-UI-023/026 | CA-STEP-008/009 | STEP-016/017; DRAFT-NAV | acciones/stepper | BORRADOR | STEPPER-IMP-005 | DRAFT |
| UI-050..052 | RN-UI-044/046/049..051 | HU-UI-025 | CA-STEP-010..012 | STEP-009..015/020 | pasos/Resumen | validate/submit | STEPPER-IMP-003/005 | DRAFT |

Cobertura completa RF→RN→HU→CA/VAC→BDD→UI→API/entidad→tarea. ADR-032..036 y preguntas críticas impiden aprobación.
## Incremento logout–catálogo–asignaciones

| Requisito | Regla | Historia | BDD | Pantalla/API/Entidad | Tarea/prueba | Estado |
|---|---|---|---|---|---|---|
| RF-AUTH-015..020 | RN-AUTH-014..017 | HU-AUTH-007..008 | session-management | Header/AuthService | LOGOUT-IMP/TEST-001 | IMPLEMENTED / TESTED |
| RF-UI-054..058 | RN-UI-056..059 | HU-UI-027 | participant-management, form-stepper | Stepper/FormArray | PART-IMP/TEST-001 | IMPLEMENTED / TESTED |
| RF-CAT-001..010 | RN-CAT-001..006 | HU-CAT-001..003 | exam-catalog | `/api/v1/exam-catalog`; ExamCatalogItem | CAT-* | IMPLEMENTED / TESTED |
| RF-ASG-001..009 | RN-ASG-001..006 | HU-ASG-001..004 | exam-assignment | formulario; ParticipantExamAssignment | ASG-* | IMPLEMENTED / TESTED |

## Incremento logout visible–UPN–Empresa

| Requisito | Regla | Historia | CA/BDD | Componente/API/entidad | Tarea/prueba | Estado |
|---|---|---|---|---|---|---|
| RF-AUTH-021..024 | RN-AUTH-018/019 | HU-AUTH-009 | CA-AUTH-021..024; authentication | CMP-012/027; AppComponent/AuthService | LUC-UI-001; AppComponent spec | SUPERSEDED VISUALMENTE POR ADR-043 |
| RF-AUTH-025..028 | RN-AUTH-020..023 | HU-AUTH-010 | CA-AUTH-025..028; authentication | CMP-005; `/api/auth/me`; AuthenticatedIdentity | LUC-ID-001; security/form specs | IMPLEMENTED / TESTED |
| RF-COM-001..005 | RN-COM-001..007 | HU-COM-001 | CA-COM-001..005; commercial-information | CMP-006; DraftCommand/ExamRequest | LUC-COM-001; Angular/service/integration | IMPLEMENTED / TESTED |
## Authenticated User Menu

| RF | RN | HU | CA/VAC/BDD | Componente | Tarea/prueba | Estado |
|---|---|---|---|---|---|---|
| RF-UI-USER-001..010 | RN-UI-USER-001..010 | HU-UI-USER-001..004 | CA-USER-001..010; VAC-USER-001..012; user-menu.feature | CMP-028 / AuthenticatedUserMenuComponent | USER-MENU-*; 7 component/app tests | IMPLEMENTED / TESTED |

## Solicitante como Asesor Comercial

| Requisito | Regla | Historia | CA/BDD | Pantalla/componente | API/entidad | Tarea/prueba | Estado |
|---|---|---|---|---|---|---|---|
| RF-COM-006..008/011/012 | RN-COM-008..011/014..016 | HU-COM-002..003 | AC-COM-021..024/027/029/030; commercial-information | Información comercial/CMP-029 | `/api/auth/me`; principal | ADV-UI/TEST-001; Angular 44 | IMPLEMENTED/TESTED |
| RF-COM-009/010 | RN-COM-010..013 | HU-COM-002 | AC-COM-025/026/028; commercial-information | Resumen read-only | ExamRequest response; snapshots V5 | ADV-DB/BE/TEST-001; Spring 28 | IMPLEMENTED/TESTED |
## Incremento notificacion de aprobacion (Etapa A)

| Requisito | Regla | Historia | Criterio/BDD | Pantalla/API | Entidad/tarea | Estado |
|---|---|---|---|---|---|---|
| RF-NOT-001..003 | RN-NOT-001..008 | HU-NOT-001/002 | approval-email: route, atomic outbox | submit/detail | ExamRequest/NotificationOutbox; NOT-DB-001/002 | PROPUESTO |
| RF-NOT-004..006 | RN-NOT-006/010/011 | HU-NOT-004 | Graph, worker, auth failures | worker/Graph adapter | ApprovalNotificationSender; NOT-GRAPH-001/WORKER-001 | PROPUESTO |
| RF-NOT-007 | RN-NOT-014/015 | HU-NOT-006 | CC confirmado / P-39 | plantilla | routing config; NOT-TPL-001 | BLOQUEADO |
| RF-NOT-008..010 | RN-NOT-010..012 | HU-NOT-003/004 | SENT/retry/dead-letter | detalle/outbox | NotificationOutbox; NOT-RETRY-001 | PROPUESTO |
| RF-NOT-011..014 | RN-NOT-005/009/016 | HU-NOT-002/005 | duplicate, CA/PAN, persistence | submit | idempotency key; NOT-IDEM-001 | PROPUESTO |
| RF-NOT-015..016 | RN-NOT-013 | HU-NOT-001 | HTML/texto y escaping | template | renderer; NOT-TPL-001 | PROPUESTO |

P-39 es una dependencia critica y bloquea RF-NOT-007 y cualquier prueba de correo real con CC.

## Correccion de enrutamiento DEV

| Requisito | Regla | BDD | Configuracion/entidad | Estado |
|---|---|---|---|---|
| RF-NOT-017..024 | RN-NOT-024..026 | approval-email outline por sede | approval_routing_rule | PENDIENTE |
| RF-NOT-025 | RN-NOT-027/028 | CC todas las sedes/falta variable | GRAPH_TESTING_CENTER_CC_GROUP | BLOQUEADO |
| RF-NOT-026..029 | RN-NOT-019..023/029 | UPN/snapshots/retry | ExamRequest/Outbox | PENDIENTE |
| RF-NOT-030 | RN-NOT-030..032 | manipulacion y revalidacion | submit backend | PENDIENTE |

## Incremento contenido completo de correo — 2026-07-24

| Requisito | Regla | Historia | Criterio/BDD | Componente | Tarea/prueba | Estado |
|---|---|---|---|---|---|---|
| RF-MAIL-001..006 | RN-MAIL-001..004 | HU-MAIL-001..004 | approval-email-content | ApprovalEmailModel/plantillas | MAIL-CONTENT-001/003 | SPEC APPROVED |
| RF-MAIL-007..009/016 | RN-MAIL-004..005 | HU-MAIL-003/005 | totals/multicurrency | ApprovalEmailModelFactory | MAIL-CONTENT-002 | SPEC APPROVED |
| RF-MAIL-010..012/014 | RN-MAIL-007..008 | HU-MAIL-006 | escaping/Outlook | renderer HTML/text | MAIL-CONTENT-003/005 | SPEC APPROVED |
| RF-MAIL-013/015 | RN-MAIL-006/009 | HU-MAIL-001..006 | snapshot/N-A/retry | NotificationOutbox.payload | MAIL-CONTENT-004 | SPEC APPROVED |
