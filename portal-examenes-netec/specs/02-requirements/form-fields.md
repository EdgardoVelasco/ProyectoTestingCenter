# Campos revisados con respuestas de descubrimiento

Todos tienen validación FE y BE; BE es autoridad. Snapshots/totales no son editables.

| Campo | Tipo/límite | Origen/editable | Regla/mensaje |
|---|---|---|---|
| requesterId/name/email/area/businessUnit, createdAt | string/date-time | sesión/no | claims; AC coincide solo como supuesto |
| scheduledCourseCode | string(80) | usuario/sí | clave de evento; N/A solo si autorizado |
| courseTypeId | UUID nullable | catálogo/sí | opcional; N/A, Intensivo, Digital |
| salesAdvisorId | UUID | sesión/catálogo, pendiente | AC significa Asesor Comercial |
| segmentId | UUID requerido | catálogo/sí | inicialmente CN/Cuentas Nombradas |
| organizationalLocationId | UUID | catálogo/sí | selección única BOG/MED/WTC/SCL/LIM/MAD/CA/PAN |
| companyId | UUID | catálogo/sí | representa empresa/cliente; `clientId` deprecado |
| billingReference | string(250) nullable | usuario/sí | cadena libre opcional |
| participants[].id | UUID | servidor/no | referencia para asignaciones |
| participants[].firstName/lastName/secondLastName | string(100) | usuario/sí | nombre/apellido requeridos; segundo opcional |
| participants[].email | email(254) | usuario/sí | corporativo, normalizado, único en colección |
| participants[].company/country/city/externalId | string | usuario/sí | opcionales; empresa puede diferir |
| items[].id | UUID | servidor/no | identidad de línea |
| items[].examId | UUID | catálogo/sí | examen activo requerido |
| items[].vendor/technology/certification/code/name snapshots | UUID/string | derivado/no | catálogo; cambiar examen los reemplaza |
| items[].catalogBasePrice | decimal(19,4) | catálogo/no | costo base dependiente ubicación/proveedor y vigencia |
| items[].saleUnitPrice | decimal(19,4) | usuario/sí | >0; precio venta; “El precio debe ser mayor que cero.” |
| items[].sourceBasePrice/sourceCurrency | decimal(19,4)/char(3) | catálogo/no | costo original USD del catálogo |
| items[].exchangeRate | decimal(19,8) nullable | configuración/no | solo MAD; USD→EUR vigente, snapshot |
| items[].exchangeRateDate | date-time nullable | servidor/no | instante/vigencia de tasa aplicada |
| items[].catalogBasePrice | decimal(19,4) | derivado/no | USD original o EUR convertido para MAD |
| items[].currency | char(3) | derivado/no | USD salvo MAD=EUR |
| items[].quantity | integer | usuario/sí | >0; provisionalmente igual a asignaciones |
| items[].participantIds | UUID[] | usuario/sí | ≥1, sin repetidos; todo voucher asignado |
| items[].lineTotal | decimal(19,4) | backend/no | saleUnitPrice×quantity |
| items[].retakeSnapshot/commentsSnapshot | string | catálogo/no | visibles y congelados al enviar |
| totalAmount | decimal(19,4) | backend/no | suma lineTotals expresados en USD o, para MAD, EUR |
| observations | string(2000) | usuario/sí | opcional/escapado |

Máximos: 100/100. Excel aporta costos USD. MAD convierte automáticamente a EUR usando tasa backend versionada; guarda origen, tasa y resultado. Cambiar ubicación recalcula y exige confirmación. Redondeo monetario propuesto: HALF_UP a 4 decimales persistidos y 2 en presentación, pendiente de confirmar con P-20.
