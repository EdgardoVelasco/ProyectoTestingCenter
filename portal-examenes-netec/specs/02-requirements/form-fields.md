# Campos revisados con respuestas de descubrimiento

Todos tienen validación FE y BE; BE es autoridad. Snapshots/totales no son editables.

| Campo | Tipo/límite | Origen/editable | Regla/mensaje |
|---|---|---|---|
| requesterId/name/email/area/businessUnit, createdAt | string/date-time | sesión/no | identidad autenticada validada |
| scheduledCourseCode | string(80) | usuario/sí | clave de evento; N/A solo si autorizado |
| courseTypeId | UUID nullable | catálogo/sí | opcional; N/A, Intensivo, Digital |
| salesAdvisorUserId/name/upn | string | sesión/no | read-only; igual a requester en MVP; snapshots backend |
| segmentId | UUID requerido | catálogo/sí | inicialmente CN/Cuentas Nombradas |
| organizationalLocationId | UUID | catálogo/sí | selección única BOG/MED/WTC/SCL/LIM/MAD/CA/PAN |
| siteId | UUID | catálogo/sí | misma sede operativa usada para precio y enrutamiento; no se duplica la selección |
| approvalRecipientName | string | backend/no | resultado visible de la regla vigente |
| approvalRecipientEmail | email | backend/no | nunca entrada cliente; no se expone salvo necesidad autorizada |
| companyName | string 2..150 | usuario/sí al enviar; opcional en borrador | texto libre MVP; trim, espacios consecutivos normalizados, conserva capitalización; `N/A` inválido |
| companyId | UUID | DEPRECADO temporalmente | nullable/sin uso en MVP; catálogo futuro requiere ADR-042 y compatibilidad |
| billingReference | string(250) nullable | usuario/sí | cadena libre opcional |
| participants[].id | UUID | servidor/no | referencia para asignaciones |
| participants[].firstName/lastName/secondLastName | string(100) | usuario/sí | nombre/apellido requeridos; segundo opcional |
| participants[].email | email(254) | usuario/sí | corporativo, normalizado, único en colección |
| participants[].company/country/city/externalId | string | usuario/sí | opcionales; empresa puede diferir |
| items[].id | UUID | servidor/no | identidad de línea |
| items[].examId | UUID | catálogo/sí | examen activo requerido |
| items[].vendor/technology/certification/code/name snapshots | UUID/string | derivado/no | catálogo; cambiar examen los reemplaza |
| items[].catalogBasePrice | decimal(19,4) | catálogo/no | costo base dependiente ubicación/proveedor y vigencia |
| items[].saleUnitPrice | decimal(19,4) | DEPRECADO en este incremento | precio de venta sigue separado, pero requiere contrato futuro |
| items[].sourceBasePrice/sourceCurrency | decimal(19,4)/char(3) | catálogo/no | costo original USD del catálogo |
| items[].exchangeRate | decimal(19,8) nullable | configuración/no | solo MAD; USD→EUR vigente, snapshot |
| items[].exchangeRateDate | date-time nullable | servidor/no | instante/vigencia de tasa aplicada |
| items[].catalogBasePrice | decimal(19,4) | derivado/no | USD original o EUR convertido para MAD |
| items[].currency | char(3) | derivado/no | USD salvo MAD=EUR |
| items[].quantity | integer | usuario/sí | >0; provisionalmente igual a asignaciones |
| items[].participantIds | UUID[] | usuario/sí | ≥1, sin repetidos; todo voucher asignado |
| items[].lineTotal | decimal(19,4) | backend/no | costo/precio autoritativo × cantidad derivada |
| items[].retakeSnapshot/commentsSnapshot | string | catálogo/no | visibles y congelados al enviar |
| totalAmount | decimal(19,4) | backend/no | suma lineTotals expresados en USD o, para MAD, EUR |
| observations | string(2000) | usuario/sí | opcional/escapado |

Máximos: 100/100. Cantidad por línea debe igualar participantes asignados. Excel aporta costos USD. MAD convierte automáticamente a EUR usando tasa configurada manualmente en MVP y versionada por backend; guarda origen, tasa y resultado. Redondeo/propietario/vigencia siguen pendientes P-20.

Al enviar, `siteCodeSnapshot`, `siteNameSnapshot`, `approvalRecipientNameSnapshot`, `approvalRecipientEmailSnapshot`, `approvalRoutingRuleId`, `approvalNotificationStatus` y `approvalNotificationSentAt` son derivados/no editables. `siteId` referencia la misma sede que `organizationalLocationId` mientras se unifica el nombre contractual.
## Asignaciones aprobadas

| Campo | Tipo | Autoridad | Validación |
|---|---|---|---|
| participants[].id | UUID/client UUID | backend/borrador | pertenece a solicitud |
| examAssignments[].examCatalogId | UUID | backend catálogo | existe y activo |
| examAssignments[].participantIds[] | UUID[] | backend | propios, únicos, 1..100 |
| assignments[].quantity | entero derivado | backend | conteo de asignaciones |
| assignments[].unitPrice/total | decimal derivado | backend | no aceptado como autoridad |
| snapshots | strings/decimal/CHAR(3) | backend | se congelan al envío |

El paso Exámenes nunca captura una cantidad independiente.
