# Máquina de estados revisada

Estados y transiciones se conservan: BORRADOR→REGISTRADA→ENVIADA_A_FACTURACION; fallo: REGISTRADA→PENDIENTE_NOTIFICACION→ENVIADA_A_FACTURACION; BORRADOR→CANCELADA.

BORRADOR→REGISTRADA valida comerciales requeridos; 1..N líneas con examen activo, costo base y precio venta; moneda aplicable; cantidades >0; participantes corporativos válidos; cada voucher asignado; duplicidad por participante+examen; referencia según P-03; lineTotals y total backend exactos. Ya no compara cantidad global con participantes globales. Submit fija líneas/asignaciones/snapshots/folio/outbox/auditoría atómicamente.

Solo BORRADOR es editable por Ventas. No existen estados de aprobación/rechazo.
