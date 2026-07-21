# Tareas futuras actualizadas

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
