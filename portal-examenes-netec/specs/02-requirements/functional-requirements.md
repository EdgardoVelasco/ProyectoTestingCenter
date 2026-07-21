# Requerimientos funcionales

Convención: prioridad P0 imprescindible, P1 importante. Salvo indicación, actor EXAM_SALES; toda respuesta de error usa RF-020.

| ID | Descripción; precondición | Flujo principal / alternos | Postcondición; RN; CA | Prioridad / dependencia |
|---|---|---|---|---|
| RF-001 | Autenticar con Entra ID; usuario habilitado | Redirigir, validar token / 401 token inválido | Sesión válida; RN-003; CA-001 | P0 / tenant pendiente |
| RF-002 | Identificar solicitante desde claims | Mapear id/nombre/correo/área / advertir perfil parcial | Datos no editables; RN-003; CA-002 | P0 / RF-001 |
| RF-003 | Crear solicitud | POST datos parciales / 400 formato | BORRADOR propio; RN-003; CA-003 | P0 / 001-002 |
| RF-004 | Guardar borrador | Persistir campos presentes / conflicto de versión | Borrador durable sin correo; RN-013-014; CA-004 | P0 / 003,018-019 |
| RF-005 | Editar borrador propio | PUT con versión / 403 ajeno, 409 versión | Borrador actualizado; RN-008,016; CA-005 | P0 / 004 |
| RF-006 | Validar formulario | Validar tipos, obligatorios, fechas / devolver fieldErrors | Sin mutación; RN-001,002,019,020; CA-006 | P0 / 003 |
| RF-007 | Validar relaciones de catálogos | Resolver activos y relaciones / 422 incompatible | Resultado detallado; RN-004-006,017; CA-007 | P0 / catálogos |
| RF-008 | Detectar duplicados | Normalizar email y consultar activo / 409 con folio accesible | Sin segundo envío; RN-007; CA-008 | P0 / 006-007 |
| RF-009 | Generar folio | Bloquear contador anual e incrementar / reintentar conflicto | Folio único; RN-009; CA-009 | P0 / PostgreSQL |
| RF-010 | Persistir solicitud | Transacción solicitud+snapshot+outbox / rollback completo | REGISTRADA durable; RN-010,018; CA-010 | P0 / 008-009 |
| RF-011 | Notificar Facturación | Worker reclama outbox y usa proveedor / clasifica error | correo HTML/texto o reintento; RN-010-012; CA-011 | P0 / 010 |
| RF-012 | Registrar resultado de correo | Guardar intento, proveedor, resultado / sanitizar error | SENT/FAILED auditado; RN-014; CA-012 | P0 / 011 |
| RF-013 | Reintentar correo | Elegir vencidos, backoff / DEAD_LETTER al máximo | entrega eventual/alerta; RN-011-012,015; CA-013 | P0 / 012 |
| RF-014 | Mostrar confirmación | Tras submit devolver id, folio, estado / pendiente correo visible | Usuario informado; RN-011; CA-014 | P0 / 010 |
| RF-015 | Consultar propias | GET paginado orden reciente / página vacía | Solo propias; RN-016; CA-015 | P0 / 001 |
| RF-016 | Consultar detalle | GET por id / 404 también para ajena | Snapshot completo; RN-016,018; CA-016 | P0 / 015 |
| RF-017 | Filtrar solicitudes | folio, alumno, estado, tecnología, rango / filtro inválido 400 | página filtrada propia; RN-016; CA-017 | P1 / 015 |
| RF-018 | Auditoría | Registrar quién/cuándo/qué/correlación / nunca secretos | rastro append-only; RN-014; CA-018 | P0 / transversal |
| RF-019 | Concurrencia | Optimistic lock, idempotency key y restricciones / 409 | sin pérdida ni folio/duplicado doble; RN-007,009,015; CA-019 | P0 / 004,008-010 |
| RF-020 | Error uniforme | Mapear excepción a Problem Details / ocultar internals | correlación y fieldErrors; RN-020; CA-020 | P0 / transversal |
| RF-021 | Consultar exámenes activos; sesión | Buscar/filtrar y abrir detalle / vacío o inactivo | catálogo sin edición; RN-021,034; CA-021 | P0 / RF-001,007 |
| RF-022 | Cargar datos del examen; examId activo | Backend resuelve snapshots/precio/moneda / sin precio o moneda 422 | datos derivados solo lectura; RN-022,035-036; CA-022 | P0 / 021 |
| RF-023 | Calcular importe; examen y cantidad | decimal backend y vista FE / descartar total cliente | total exacto; RN-023-026,037-039; CA-023 | P0 / 022 |
| RF-024 | Gestionar participantes en BORRADOR | agregar/editar/eliminar / límite o estado inválido | colección durable/auditada; RN-028,033; CA-024 | P0 / 003-005 |
| RF-025 | Validar cantidad-participantes | comparar si regla activa / permitir política futura | coherencia o fieldError; RN-024,030; CA-025 | P0 / 023-024 |
| RF-026 | Validar duplicados de participantes | normalizar y comparar internos/activos / 409 externo | sin correo repetido; RN-007,029,031; CA-026 | P0 / 008,024 |
| RF-027 | Conservar instantánea comercial; submit válido | fijar catálogo/precio/comercial / rollback | histórico inmutable; RN-027,033,034,040; CA-027 | P0 / 010,022-023 |
| RF-028 | Validar referencia opcional | si se captura, validar longitud/caracteres; vacío permitido | cadena preservada; RN-032; CA-028 | P0 / RF-007 |
| RF-029 | Mostrar resumen financiero | presentar precio/moneda/cantidad/total / advertir recálculo | usuario revisa valor backend; RN-025-026,037; CA-029 | P0 / 023 |
| RF-030 | Confirmar datos antes del envío | modal con solicitante, empresa, comercial, examen, participantes, total y referencia / cancelar vuelve sin perder datos | submit solo tras confirmación; RN-001,040; CA-030 | P0 / 006-010,021-029 |
| RF-031 | Gestionar líneas de examen | agregar/editar/eliminar 1..N líneas en BORRADOR / límite y duplicidad | varios exámenes; RN-041,043; CA-031 | P0 / 021-024 |
| RF-032 | Asignar participantes a exámenes | seleccionar participantes por línea / impedir voucher sin asignar | relación explícita N:M; RN-042; CA-032 | P0 / 024,031 |
| RF-033 | Capturar precio de venta | mostrar costo base y permitir precio venta decimal / costo base inmutable | ambos snapshots separados; RN-023,025,044; CA-033 | P0 / 022-023 |
| RF-034 | Administrar catálogo de exámenes/precios | Testing Center agrega/modifica, vigencia, retake y comentarios / conflicto auditado | catálogo versionado; RN-052-054; CA-034 | P0 técnico / rol pendiente P-11/P-22 |
| RF-035 | Resolver precio por ubicación | con examen+ubicación resolver costo USD; MAD aplica conversión USD→EUR / tasa ausente bloquea | origen/tasa/resultado; RN-051-052,056-059; CA-035 | P0 / 021-022,034 |
| RF-036 | Administrar tipo de cambio | rol autorizado registra tasa USD→EUR y vigencia / solapamiento rechazado | tasa versionada/auditada; RN-056-057; CA-036 | P0 / responsable pendiente P-20 |

RF-022/023/025/027/029/030 quedan MODIFICADOS: operan por líneas, calculan suma y muestran costo base frente a precio de venta. La igualdad global cantidad-participantes queda deprecada.

Casos negativos comunes RF-021–030: catálogo vacío/inactivo, precio o moneda ausente, cantidad ≤0/sobre límite, correo inválido/repetido, referencia requerida ausente, versión obsoleta y manipulación de importes. Actor: EXAM_SALES; backend es autoridad.

## Contrato común de aceptación

Cada CA exige caso feliz, caso negativo, autorización y auditoría cuando exista mutación. Los detalles Given/When/Then están en `03-user-stories/acceptance-criteria.md` y `08-acceptance/`.
