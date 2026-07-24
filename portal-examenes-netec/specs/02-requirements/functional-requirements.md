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
| RF-011 | Notificar al aprobador | Worker reclama outbox y usa proveedor / clasifica error | correo HTML/texto o reintento; RN-010-012,071; CA-011 | P0 / 010,040 |
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
| RF-036 | Administrar manualmente tipo de cambio MVP | rol autorizado registra tasa USD→EUR y vigencia / solapamiento rechazado | tasa versionada/auditada; RN-056-057; CA-036 | P0 / responsable y precisión pendientes P-20 |
| RF-037 | Consultar sedes activas; AC autenticado | buscar catálogo / vacío | sede seleccionable; RN-060; CA-037 | P0 / RF-001,007 |
| RF-038 | Resolver aprobador por sede; sede activa | consultar regla vigente / ausente, inactiva, vencida o correo inválido | resultado no editable; RN-061-066,075; CA-038 | P0 / RF-037 |
| RF-039 | Mostrar aprobador antes del envío | resolver / cambio de sede invalida resultado | tarjeta solo lectura; RN-067,074; CA-039 | P0 / RF-038 |
| RF-040 | Enviar solicitud de aprobación | submit re-resuelve, crea snapshots+outbox / proveedor falla | notificación directa y durable; RN-070-075; CA-040 | P0 / RF-009-013,038 |
| RF-041 | Bloquear envío sin regla activa | validar regla/vigencia/correo / guardar borrador permitido | error por sede; RN-066,075; CA-041 | P0 / RF-038 |
| RF-042 | Conservar snapshot del aprobador | fijar sede/nombre/correo/regla al submit / rollback | histórico; RN-068-069,076; CA-042 | P0 / RF-010,038 |
| RF-043 | Registrar resultado de resolución | auditar regla, fecha y resultado / sanitizar error | trazabilidad; RN-072; CA-043 | P0 / RF-018,038 |
| RF-044 | Auditar regla utilizada | asociar ruleId/versión / conflicto revalida | evidencia reproducible; RN-072,077; CA-044 | P0 / RF-019,043 |
| RF-045 | Revalidar regla al enviar borrador | ignorar destinatario cliente y resolver vigente / cambio exige confirmación | backend autoritativo; RN-073-074,077; CA-045 | P0 / RF-030,038 |
| RF-046 | Consultar configuración para administración futura | sin propietario actual se bloquea administración; rol futuro autorizado lista reglas/vigencias / 403 Ventas | solo lectura fase 1; RN-072,081; CA-046 | P1 / P-25 |
| RF-047 | Aplicar copias de notificación | backend evalúa política de copia por sede / alcance ambiguo no agrega copia | Testing Center recibe copia solo cuando la sede está confirmada; AC nunca recibe copia; RN-079-080; CA-047 | P0 / P-39,RF-040 |

RF-037..046 corresponden a RF-031..040 del nuevo pedido, renumerados para evitar colisión. RF-047 agrega copias confirmadas parcialmente. Actor principal: AC/EXAM_SALES; RF-046 es administración futura. Casos negativos: sede inexistente/inactiva, regla ausente/inactiva/fuera de vigencia, correo ausente/inválido, regla concurrentemente modificada, destinatario manipulado, política de copia ambigua y proveedor caído.

RF-022/023/025/027/029/030 quedan MODIFICADOS: operan por líneas, calculan suma y muestran costo base frente a precio de venta. La igualdad global cantidad-participantes queda deprecada.

Casos negativos comunes RF-021–030: catálogo vacío/inactivo, precio o moneda ausente, cantidad ≤0/sobre límite, correo inválido/repetido, referencia requerida ausente, versión obsoleta y manipulación de importes. Actor: EXAM_SALES; backend es autoridad.

## Contrato común de aceptación

Cada CA exige caso feliz, caso negativo, autorización y auditoría cuando exista mutación. Los detalles Given/When/Then están en `03-user-stories/acceptance-criteria.md` y `08-acceptance/`.

## Extensión DRAFT: login, sesión y formulario guiado

Se agregan RF-AUTH-001..014 y RF-UI-041..053 sin reemplazar RF-001/002: los primeros detallan experiencia y seguridad; RF-001/002 conservan trazabilidad histórica. Actor, precondiciones, flujos, postcondiciones, reglas, CA, prioridad, dependencias y casos negativos se definen en `authentication-experience.md` y `form-stepper-requirements.md`. Esta extensión no autoriza código.
## Incremento aprobado: logout, catálogo y asignaciones

Cada requisito tiene prioridad P0, actor `EXAM_SALES`, criterios BDD homónimos y casos negativos de autenticación, datos inválidos, conflicto o recurso inactivo.

| ID | Flujo principal / postcondición | Alternos y negativos | Reglas / dependencias |
|---|---|---|---|
| RF-AUTH-015..020 | Mostrar logout; confirmar si hay cambios; ejecutar MSAL logout redirect; limpiar estado sensible; volver a login; proteger historial | cancelar conserva datos; error muestra mensaje seguro; borrador persistido permanece | RN-AUTH-014..017; Entra/MSAL |
| RF-UI-054 | Renderizar Participantes antes de Exámenes | restaurar borrador migra al índice equivalente | RN-UI-056; ADR-038 |
| RF-UI-055..058 | Validar participantes antes de asignar; conservarlos; revalidar/eliminar asignaciones; mostrarlos en Exámenes | sin participantes bloquea avance; duplicados/correo inválido | RN-UI-057..059 |
| RF-CAT-001..002 | Importar fuente aprobada y persistirla | fila vacía/duplicada/costo inválido se reporta y no inserta | RN-CAT-001..003; ADR-037 |
| RF-CAT-003..006 | Consultar activos, filtrar proveedor, buscar código/nombre y listar proveedores | página vacía o ID inexistente | RN-CAT-004; catálogo persistido |
| RF-CAT-007..010 | Idempotencia, trazabilidad, retake/comentarios y costo base separado | no exponer metadatos técnicos | RN-CAT-002,003,005,006 |
| RF-ASG-001..004 | Asignar N:M y rechazar duplicados | participante ajeno/examen inexistente/inactivo → 422 | RN-ASG-001..003; participantes+catálogo |
| RF-ASG-005..006 | Backend cuenta asignaciones y calcula total decimal | ignora quantity/precio del cliente | RN-ASG-004,005 |
| RF-ASG-007..009 | Congelar snapshots, revalidar activos y mostrar matriz | solicitud enviada es inmutable | RN-ASG-006 |

Precondiciones generales: sesión válida, BORRADOR propio y versión vigente. Postcondiciones: agregado consistente, auditable y sin importes autoritativos del frontend. Pruebas: `session-management.feature`, `participant-management.feature`, `exam-catalog.feature`, `exam-assignment.feature`, API y persistencia.
## Incremento logout visible, UPN y Empresa libre — PARTIALLY SUPERSEDED

RF-AUTH-021..024 se conservan como trazabilidad histórica y quedan sustituidos visualmente por RF-UI-USER-001..010/ADR-043. La obligación de texto visible se cumple dentro del menú, no como botón directo.

Cada requisito incluye actor Usuario autenticado/Ventas, prioridad P0 y trazabilidad en la matriz.

| ID | Descripción; precondición | Flujo principal / alternos | Postcondición; reglas | CA / dependencia / caso negativo |
|---|---|---|---|---|
| RF-AUTH-021 | Mostrar texto “Cerrar sesión” en sesión activa | Header presenta botón visible | Acción identificable; RN-AUTH-018/019 | CA-AUTH-021; CMP-027/012; nunca icono solo |
| RF-AUTH-022 | Mostrar contorno accesible | Variante secondary outlined sobre header | Borde y contraste AA | CA-AUTH-022; tokens; sin colores directos |
| RF-AUTH-023 | Estados visuales logout | normal/hover/focus/active/loading/disabled | Estado perceptible por texto, borde y foco | CA-AUTH-023; CSS compartido; teclado |
| RF-AUTH-024 | Mantener logout existente | Invoca la misma confirmación y MSAL redirect | Sin regresión funcional; RN-AUTH-014/015 | CA-AUTH-024; AuthService; no navegación falsa |
| RF-AUTH-025 | Obtener UPN validado | Backend resuelve claims por precedencia | `username` contiene UPN o vacío | CA-AUTH-025; Entra/API; claim ausente |
| RF-AUTH-026 | Mostrar UPN | Datos del solicitante usa `/api/auth/me.username` | Valor real, solo lectura | CA-AUTH-026; RF-AUTH-025 |
| RF-AUTH-027 | Correo no disponible | Sin claim válido muestra “No disponible” | No se inventa identidad | CA-AUTH-027; ausencia de claims |
| RF-AUTH-028 | Impedir edición | Se renderiza CMP-005, no input | Identidad inmutable | CA-AUTH-028; sesión validada |
| RF-COM-001 | Capturar Empresa como texto | Ventas escribe `companyName` | Estado del formulario conserva valor; RN-COM-001 | CA-COM-001; no catálogo |
| RF-COM-002 | Validar Empresa frontend | Trim lógico, 2–150, no espacios/N/A | Error junto al campo | CA-COM-002; Reactive Forms |
| RF-COM-003 | Validar Empresa backend | Borrador permite ausencia; valor presente se normaliza/valida; submit futuro exige | Problem Details 422 en valor inválido | CA-COM-003; API |
| RF-COM-004 | Persistir snapshot | Guardado almacena `company_name_snapshot` | Se restaura en respuesta/borrador | CA-COM-004; Flyway V4 |
| RF-COM-005 | No depender de catálogo | UI/API omiten `companyId` obligatorio y no llaman empresas | MVP funciona sin catálogo | CA-COM-005; ADR-042 |
## Authenticated User Menu — APPROVED

Actor: Usuario autenticado. Prioridad P0. Precondición común: identidad validada o estado de carga seguro.

| ID | Flujo principal | Alternos/casos negativos | Postcondición; regla | CA/dependencias/prueba |
|---|---|---|---|---|
| RF-UI-USER-001 | Mostrar activador con identidad | carga/error sin identidad ficticia | identidad visible; 001/009 | CA-USER-001; CMP-028 |
| RF-UI-USER-002 | Derivar avatar desde nombre | una palabra/ausencia | iniciales o icono; 005 | CA-USER-002; helper puro |
| RF-UI-USER-003 | Mostrar nombre y UPN | UPN ausente muestra No disponible | cuenta reconocible; 001/006 | CA-USER-003 |
| RF-UI-USER-004 | Abrir `mat-menu` desde activador completo | doble activación no duplica overlay | menú abierto; 007/010 | CA-USER-004; Material |
| RF-UI-USER-005 | Mostrar “Cerrar sesión” dentro del menú | nunca icono solo | acción disponible; 002/003 | CA-USER-005 |
| RF-UI-USER-006 | Emitir logout al contenedor | cambios pendientes abren confirmación | reutiliza flujo existente; 004 | CA-USER-006; AuthService |
| RF-UI-USER-007 | Escape/exterior cierran y restauran foco | sin trampa de foco | activador recupera foco; 007/010 | CA-USER-007; CDK |
| RF-UI-USER-008 | Adaptar activador a móvil | UPN oculto visualmente, completo en menú | uso desde 360 px; 006 | CA-USER-008 |
| RF-UI-USER-009 | Mostrar carga/estado seguro | no habilitar logout sin identidad | ausencia de datos ficticios; 009 | CA-USER-009 |
| RF-UI-USER-010 | Navegación y semántica accesibles | teclado/lector de pantalla | menú usable; 007/008/010 | CA-USER-010 |

## Asesor Comercial derivado de sesión

| ID | Descripción | Actor/precondición | Flujo, postcondición y alternos | Reglas/CA/pruebas |
|---|---|---|---|---|
| RF-COM-006 | Obtener asesor desde sesión | usuario autenticado | backend resuelve `oid`/`sub`, nombre y UPN; sin identidad mínima bloquea envío | RN-COM-008/011/014; AC-COM-021/025/029 |
| RF-COM-007 | Mostrar asesor read-only | identidad cargada | UI muestra mismo nombre que solicitante y ayuda de sesión | RN-COM-008/009; AC-COM-021..024 |
| RF-COM-008 | Impedir selección manual | formulario abierto | no selector, escritura ni opciones | RN-COM-009/010/016; AC-COM-022/023/030 |
| RF-COM-009 | Persistir snapshots | creación de borrador | guarda id, nombre y UPN; histórico no cambia | RN-COM-012/013; AC-COM-025/028 |
| RF-COM-010 | Validar en backend | request autenticado | ignora la identidad del cliente porque el contrato no la acepta | RN-COM-010/011; AC-COM-025/026 |
| RF-COM-011 | Manejar identidad incompleta | claim faltante | muestra error seguro; no permite envío | RN-COM-014; AC-COM-029 |
| RF-COM-012 | Sincronizar conceptos | MVP | requester y advisor quedan iguales; otra cuenta produce otros snapshots | RN-COM-008/015; AC-COM-024/027 |

Todos son prioridad P0, dependen de RF-AUTH-005..008 y se prueban en Angular, servicio/integración Spring y `commercial-information.feature`.
## Incremento propuesto: notificacion de aprobacion por correo

Los siguientes requisitos estan **PROPUESTOS** y no autorizan implementacion hasta resolver P-39 y validar Graph en desarrollo.

| ID | Requisito | Criterio resumido | Regla/BDD | Estado |
|---|---|---|---|---|
| RF-NOT-001 | Resolver aprobador por sede | submit usa regla vigente en backend | RN-NOT-001..003; approval-email | PROPUESTO |
| RF-NOT-002 | Conservar snapshot de aprobador | sede, regla, nombre, correo y CC quedan inmutables | RN-NOT-007 | PROPUESTO |
| RF-NOT-003 | Crear Outbox transaccional | solicitud y outbox confirman en una transaccion | RN-NOT-004/005 | PROPUESTO |
| RF-NOT-004 | Procesar asincronamente | worker reclama PENDING fuera de tx | RN-NOT-010/011 | PROPUESTO |
| RF-NOT-005 | Autenticar ante Graph | client credentials y scope .default | seguridad/ADR-046 | PROPUESTO |
| RF-NOT-006 | Enviar via Graph | endpoint users/{sender}/sendMail confirma | RN-NOT-006 | PROPUESTO |
| RF-NOT-007 | Enviar CC operativo | solo codigos aprobados para Testing Center | RN-NOT-015; P-39 | BLOQUEADO |
| RF-NOT-008 | Registrar resultado | SENT/FAILED/DEAD_LETTER y auditoria | RN-NOT-010..012 | PROPUESTO |
| RF-NOT-009 | Reintentar transitorios | respeta Retry-After y maximo | RN-NOT-011 | PROPUESTO |
| RF-NOT-010 | Dead Letter | permanentes o maximo terminan DEAD_LETTER | RN-NOT-012 | PROPUESTO |
| RF-NOT-011 | Evitar duplicados | clave unica de solicitud/version | RN-NOT-009/010 | PROPUESTO |
| RF-NOT-012 | Mostrar estado | UI distingue pendiente, enviada y fallo sin tecnicismos | RN-NOT-005/010 | PROPUESTO |
| RF-NOT-013 | Conservar solicitud ante fallo | Graph fallido no elimina datos | RN-NOT-005 | PROPUESTO |
| RF-NOT-014 | Bloquear ruta faltante | CA/PAN no envian sin regla | RN-NOT-001/016 | PROPUESTO |
| RF-NOT-015 | Generar HTML y texto | partes equivalentes y seguras | RN-NOT-013 | PROPUESTO |
| RF-NOT-016 | Escapar entrada | observaciones y nombres no inyectan HTML | RN-NOT-013 | PROPUESTO |

## Correccion de enrutamiento DEV (propuesta)

RF-NOT-017..024 resuelven el destinatario principal por sede: BOG/MED/SCL/LIM/CA/PAN a Felipe, WTC a Angélica y MAD a Paola. RF-NOT-025 agrega CC a todas las sedes desde `GRAPH_TESTING_CENTER_CC_GROUP`. RF-NOT-026 obtiene el remitente desde la identidad autenticada; RF-NOT-027 muestra el aprobador; RF-NOT-028 revalida en submit; RF-NOT-029 conserva snapshots; RF-NOT-030 permite CA/PAN.

Todos dependen de configuracion DEV valida y quedan PENDIENTES mientras falte la variable SMTP completa del grupo.
