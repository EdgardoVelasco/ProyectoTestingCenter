# Diccionario de datos revisado

Dinero: `DECIMAL(19,4)`; moneda `CHAR(3)`; cantidad integer. Nunca float ni texto combinado.

| Entidad | Campos clave |
|---|---|
| ExamRequest | folio/estado/requester snapshots; scheduledCourseCode; courseType; salesAdvisor; segment; organizationalLocation; company/client; billingReference; totalAmount; observaciones/timestamps/version. |
| ExamRequestParticipant | nombres/fullNameSnapshot, original/normalizedEmail corporativo, empresa opcional, país/ciudad/externalId. |
| ExamRequestItem | examId/snapshots; sourceBasePrice/sourceCurrency USD; exchangeRate/exchangeRateDate nullable; catalogBasePrice convertido; saleUnitPrice; currency; quantity/lineTotal/version. |
| ItemParticipantAssignment | itemId+participantId unique; voucher asignado. |
| Exam | proveedor, curso, código, nombre, retake, comentarios, activo; administrado por Testing Center. |
| ExamPrice | examId, provider/country derivado de ubicación, baseAmount, currency, validFrom/validTo, activo/version; intervalos no se traslapan para misma clave. |
| ExchangeRate | fromCurrency USD, toCurrency EUR, rate DECIMAL(19,8)>0, validFrom/validTo, source/createdBy/version; intervalos no solapados. |
| CourseType | N/A, Intensivo, Digital; extensible. |
| Segment | CN/Cuentas Nombradas; extensible. |
| OrganizationalLocation | BOG/Bogotá, MED/Medellín, WTC/México, SCL/Chile, LIM/Perú, MAD/España, CA/Centro América, PAN/Panamá. |
| SalesAdvisor | AC; vínculo con autenticado pendiente P-01. |
| Company | representa también cliente; Client separado deprecado. |
| NotificationOutbox/AuditEntry/FolioCounter | contrato previo. |

`lineTotal = saleUnitPrice × quantity`; total antes de impuestos. MAD: convertedBase = USD base × rate, con redondeo backend; se congelan origen/tasa/resultado. Otras ubicaciones no consultan ExchangeRate.
