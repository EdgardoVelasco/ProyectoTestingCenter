# Casos de uso

| UC | Actor | Inicio → resultado |
|---|---|---|
| UC-01 Capturar | Ventas | sesión → BORRADOR creado/actualizado |
| UC-02 Validar | Ventas | borrador → lista completa de problemas sin mutación |
| UC-03 Enviar | Ventas | válido/no duplicado → folio, REGISTRADA y outbox atómicos |
| UC-04 Consultar | Ventas | filtros/ID → solo recursos propios |
| UC-05 Cancelar | Ventas | borrador propio → CANCELADA auditada |
| UC-06 Notificar | Worker | outbox vencido → enviado, reprogramado o DEAD_LETTER |
| UC-07 Cargar catálogo | Admin técnico | archivo/migración validada → catálogo versionado |
| UC-08 Seleccionar examen | Ventas | filtros/examId → detalle activo con precio/moneda derivados |
| UC-09 Gestionar participantes | Ventas | BORRADOR → agregar/editar/eliminar 1..N y validar correos |
| UC-10 Calcular/resumir | Ventas | examen+cantidad → total backend y confirmación completa |
| UC-11 Congelar comercial | Sistema | submit revalidado → snapshots financieros/comerciales inmutables |
| UC-12 Gestionar exámenes | Ventas | BORRADOR → agregar/eliminar líneas, seleccionar examen y precio venta |
| UC-13 Asignar vouchers | Ventas | participantes+líneas → asignaciones sin voucher huérfano |

UC-03 queda **MODIFICADO**: revalida precio vigente, participantes, referencia y total. No existe caso de aprobación/rechazo interno.
