# Historias de usuario

| ID | Épica; historia y valor | Prioridad/dependencias | RF / RN | Negativo principal |
|---|---|---|---|---|
| HU-001 | EP-01: Como Ventas quiero acceder identificado para no capturar mis datos | P0 / Entra | 001-002 / 003 | token inválido |
| HU-002 | EP-02: crear solicitud para iniciar captura estructurada | P0 / HU-001 | 003 / 003 | formato inválido |
| HU-003 | EP-02: guardar borrador para continuar después | P0 / 002 | 004 / 013-014 | conflicto versión |
| HU-004 | EP-02: editar borrador para corregirlo | P0 / 003 | 005 / 008,016 | ajeno/no borrador |
| HU-005 | EP-02: validar información para corregir antes de enviar | P0 / catálogos | 006-007 / 001-006,019-020 | relación inválida |
| HU-006 | EP-03: detectar duplicado para evitar compra repetida | P0 / 005 | 008 / 007 | carrera concurrente |
| HU-007 | EP-03: enviar y obtener folio para dar seguimiento | P0 / 005-006 | 009-010,014,019 / 009-010,015 | doble clic |
| HU-008 | EP-04: consultar mis solicitudes para conocer estado | P0 / 001 | 015,017 / 016 | filtros inválidos |
| HU-009 | EP-04: consultar detalle propio para revisar instantánea | P0 / 008 | 016 / 016,018 | solicitud ajena |
| HU-010 | EP-02: cancelar borrador para descartarlo | P1 / 003 | API cancel / 008 | estado no permitido |
| HU-011 | EP-05: conservar solicitud si falla correo | P0 / 007 | 011-012 / 010-012 | proveedor caído |
| HU-012 | EP-05: reintentar notificación para entrega eventual | P0 / 011 | 013 / 012,015 | agotamiento |
| HU-013 | EP-06: auditar cambios para trazabilidad | P0 / transversal | 018 / 014 | dato sensible |
| HU-014 | EP-02: cargar catálogos dependientes para elegir combinaciones válidas | P0 / catálogos | 007 / 004-006,017 | catálogo inactivo |
| HU-015 | EP-01: restringir acceso por usuario para proteger datos | P0 / 001 | 015-016 / 016 | enumeración de IDs |
| HU-016 | EP-06: recibir errores uniformes para recuperar la operación | P0 / transversal | 020 / 020 | backend/conexión |
| HU-017 | EP-07: consultar examen activo para elegir el producto correcto | P0 / catálogos | 021 / 021,034 | catálogo vacío/inactivo |
| HU-018 | EP-07: autocompletar examen/precio para evitar transcripción | P0 / HU-017 | 022 / 022,035-036 | precio/moneda ausente |
| HU-019 | EP-07: calcular total exacto para revisar importe | P0 / HU-018 | 023,029 / 023-026,037-039 | total manipulado |
| HU-020 | EP-08: agregar, editar y eliminar participantes | P0 / HU-003 | 024 / 028,033 | límite/estado enviado |
| HU-021 | EP-08: validar cantidad y participantes | P0 / HU-019-020 | 025-026 / 024,028-031 | cantidad desigual/correo repetido |
| HU-022 | EP-07: congelar datos comerciales al enviar | P0 / HU-018-019 | 027 / 027,033-034,040 | precio cambia antes/después |
| HU-023 | EP-07: validar referencia según contexto | P0 / catálogos | 028 / 032 | requerida ausente |
| HU-024 | EP-07: revisar resumen financiero | P0 / HU-019 | 029 / 025-026,037 | datos recalculados |
| HU-025 | EP-07: confirmar solicitud completa antes de Facturación | P0 / HU-017-024 | 030 / 001,040 | cancelar confirmación |
| HU-026 | EP-07: agregar varios exámenes para representar el pedido real | P0 / HU-017 | 031 / 041,043 | línea repetida/límite |
| HU-027 | EP-08: asignar participantes por examen para que todo voucher tenga destinatario | P0 / HU-020,026 | 032 / 042 | línea sin asignación |
| HU-028 | EP-07: ajustar precio de venta sin alterar costo base | P0 / HU-018 | 033 / 023,025,044 | manipular costo base |
| HU-029 | EP-06: como Testing Center quiero mantener exámenes/precios para controlar el catálogo | P0 / rol | 034 / 052-054 | vigencia traslapada/no autorizado |
| HU-030 | EP-07: resolver precio por sucursal para usar moneda correcta | P0 / HU-017 | 035 / 051-052,056-059 | MAD sin tasa vigente |
| HU-031 | EP-06: mantener tipo de cambio para que MAD calcule EUR automáticamente | P0 / rol | 036 / 056-057 | tasa ausente/solapada |

HU-017..025 son **AGREGADAS** por evidencia real. HU-002..007 quedan **MODIFICADAS** para colección de participantes y datos comerciales; ninguna historia de aprobación fue añadida.

Cada historia usa CA del mismo número cuando existe; HU-011/012 usan CA-011..013, HU-014 CA-007 y HU-015 CA-015/016. Definition of Done y tareas están en planificación.
