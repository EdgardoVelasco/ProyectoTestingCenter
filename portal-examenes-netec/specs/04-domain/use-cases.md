# Casos de uso

| UC | Actor | Inicio → resultado |
|---|---|---|
| UC-01 Capturar | Ventas | sesión → BORRADOR creado/actualizado |
| UC-02 Validar | Ventas | borrador → lista completa de problemas sin mutación |
| UC-03 Enviar | AC | válido/no duplicado → re-resolución por sede, folio, snapshots, REGISTRADA y outbox atómicos |
| UC-04 Consultar | Ventas | filtros/ID → solo recursos propios |
| UC-05 Cancelar | Ventas | borrador propio → CANCELADA auditada |
| UC-06 Notificar aprobador | Worker | outbox vencido → ENVIADA_A_APROBADOR, reprogramado o DEAD_LETTER |
| UC-07 Cargar catálogo | Admin técnico | archivo/migración validada → catálogo versionado |
| UC-08 Seleccionar examen | Ventas | filtros/examId → detalle activo con precio/moneda derivados |
| UC-09 Gestionar participantes | Ventas | BORRADOR → agregar/editar/eliminar 1..N y validar correos |
| UC-10 Calcular/resumir | Ventas | examen+cantidad → total backend y confirmación completa |
| UC-11 Congelar comercial | Sistema | submit revalidado → snapshots financieros/comerciales inmutables |
| UC-12 Gestionar exámenes | Ventas | BORRADOR → agregar/eliminar líneas, seleccionar examen y precio venta |
| UC-13 Asignar vouchers | Ventas | participantes+líneas → asignaciones sin voucher huérfano |
| UC-14 Resolver aprobador | AC/Sistema | sede activa → regla vigente y nombre solo lectura; ausencia bloquea submit |
| UC-15 Auditar enrutamiento | Sistema | resolución/cambio de regla → AuditEntry con ruleId/versión/resultado |
| UC-16 Consultar reglas | Administrador futuro | autorización → listado de reglas/vigencias; sin mutación en fase 1 |

UC-03 queda **MODIFICADO**: revalida precio vigente, participantes, referencia y total. No existe caso de aprobación/rechazo interno.

## Casos DRAFT

| ID | Actor | Flujo | Alternos |
|---|---|---|---|
| UC-AUTH-01 Acceder | Usuario interno | acceso→redirect→retorno→me→portal | error/denegado/restauración |
| UC-AUTH-02 Cerrar sesión | Autenticado | advertir→logout Entra→acceso | cancelar/cambios |
| UC-AUTH-03 Expirar | Autenticado | renovar o redirect | bloquea operación/preserva borrador persistido |
| UC-STEP-01 Capturar guiado | EXAM_SALES | pasos 1..5→confirmar | volver/guardar/error/revalidar |
| UC-STEP-02 Continuar borrador | EXAM_SALES | cargar→primer paso seguro | dependencias cambiaron |
## UC-COM-001 Capturar empresa libre

Ventas captura Empresa en Información comercial. El frontend valida para avanzar; guardar BORRADOR permite ausencia. Backend normaliza trim/espacios, valida cualquier valor presente y persiste el snapshot. No interviene catálogo.

## UC-COM-002 Resolver Asesor Comercial

Al abrir el formulario, Angular reutiliza la identidad obtenida una vez desde `/api/auth/me` y muestra el nombre como dato read-only. Al crear o actualizar, el request no contiene asesor; Spring obtiene `oid`/`sub`, nombre y UPN del principal autenticado. Al crear el borrador persiste requester y asesor iguales. La identidad incompleta impide el envío y produce un error seguro.
