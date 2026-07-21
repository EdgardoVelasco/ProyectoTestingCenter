# Matriz de trazabilidad actualizada

| 036 | 056-059 | 031 | 036 | 064,067-070 | Examen/Resumen/Admin | price/submit/admin exchange-rate | ExchangeRate/Item | TT-024 | conversion/snapshot/reconfirm |

Cobertura vigente: RF-001..036, RN-001..059, HU-001..031, CA-001..036 y BDD-001..070.

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
