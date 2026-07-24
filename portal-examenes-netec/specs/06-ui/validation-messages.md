# Mensajes de validación

## Mensajes implementados en frontend — 2026-07-21

**AGREGADO.** Se muestran `REQUIRED`, `INVALID_EMAIL`, `PARTICIPANT_EMAIL_DUPLICATE`, `EXAM_REQUIRED`, `QUANTITY_POSITIVE`, `QUANTITY_MISMATCH`, `SALE_PRICE_INVALID`, `MAX_LENGTH` y el resumen “Revisa los campos marcados antes de continuar.” Para MAD sin resolución backend se presenta el bloqueo de `EXCHANGE_RATE_REQUIRED`; no se simula una tasa.

| Código | Mensaje |
|---|---|
| REQUIRED | Completa {etiqueta}. |
| INVALID_EMAIL | Ingresa un correo electrónico válido. |
| MAX_LENGTH | Usa como máximo {n} caracteres. |
| DATE_IN_PAST | La fecha requerida no puede ser anterior a hoy. |
| INACTIVE_CATALOG | Selecciona una opción activa. |
| INVALID_RELATION | La selección ya no es compatible; elige nuevamente. |
| DUPLICATE_EXAM_REQUEST | Ya existe una solicitud activa para este correo y examen. |
| VERSION_CONFLICT | El borrador cambió en otra sesión. Recarga para continuar. |
| CONNECTION_LOST | No hay conexión. Tus datos permanecen en pantalla. |
| EXAM_REQUIRED | Selecciona un examen. |
| EXAM_INACTIVE | El examen seleccionado ya no está activo. |
| PRICE_UNAVAILABLE | El precio del examen no está disponible. |
| CURRENCY_MISSING | La moneda del examen no está configurada. |
| QUANTITY_POSITIVE | La cantidad debe ser mayor que cero. |
| QUANTITY_MISMATCH | La cantidad de esta línea debe coincidir con el número de participantes asignados. |
| PARTICIPANT_REQUIRED | Agrega al menos un participante. |
| PARTICIPANT_EMAIL_INVALID | El correo del participante no es válido. |
| PARTICIPANT_EMAIL_DUPLICATE | Este correo ya está registrado dentro de la solicitud. |
| BILLING_REFERENCE_INVALID | La referencia de facturación supera el máximo o contiene caracteres no permitidos. |
| TOTAL_RECALCULATED | El valor total fue recalculado por el sistema. |
| EXAM_DATA_CHANGED | Los datos del examen cambiaron. Revisa el resumen antes de enviar. |
| REQUEST_IMMUTABLE | No se puede modificar una solicitud enviada. |
| EXAM_LINE_REQUIRED | Agrega al menos un examen. |
| ASSIGNMENT_REQUIRED | Asigna al menos un participante a este examen. |
| UNASSIGNED_VOUCHER | Todos los vouchers deben estar asignados a participantes. |
| SALE_PRICE_INVALID | Ingresa un precio de venta válido. |
| MIXED_CURRENCY | No se pueden sumar importes de monedas diferentes. |
| CORPORATE_EMAIL_REQUIRED | Ingresa un correo corporativo. |
| SALE_PRICE_ZERO | El precio de venta debe ser mayor que cero. |
| EXCHANGE_RATE_REQUIRED | No existe un tipo de cambio USD a EUR vigente para Madrid. |
| EXCHANGE_RATE_CHANGED | El tipo de cambio cambió. Revisa nuevamente los importes en EUR. |
| PRICE_EXPIRED | El precio base ya no está vigente. |
| LIMIT_100 | Se permite un máximo de 100 registros. |
| SITE_REQUIRED | Selecciona una sede. |
| APPROVAL_ROUTE_UNAVAILABLE | Esta sede no tiene un aprobador activo configurado. Puedes guardar el borrador, pero no enviarlo. |
| APPROVER_EMAIL_INVALID | El aprobador asignado no tiene un correo válido configurado. |
| APPROVAL_ROUTE_CHANGED | El aprobador asignado cambió. Revisa nuevamente el resumen antes de enviar. |
| APPROVAL_RESOLUTION_ERROR | No fue posible resolver el aprobador. Intenta nuevamente. |

El resumen anuncia cantidad, enlaza al primer control y no depende solo de color/iconos.
- “La empresa es obligatoria.”
- “La empresa debe contener al menos 2 caracteres.”
- “La empresa no puede superar los 150 caracteres.”
- “N/A no es un nombre de empresa válido.”
