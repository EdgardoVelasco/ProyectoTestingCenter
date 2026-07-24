# Diccionario de datos revisado

Dinero: `DECIMAL(19,4)`; moneda `CHAR(3)`; cantidad integer. Nunca float ni texto combinado.

| Entidad | Campos clave |
|---|---|
| ExamRequest | folio/estado/requester snapshots; scheduledCourseCode; courseType; salesAdvisor; segment; siteId/siteCodeSnapshot/siteNameSnapshot; company; billingReference; totalAmount; approvalRecipientNameSnapshot/approvalRecipientEmailSnapshot/approvalRoutingRuleId/approvalNotificationStatus/approvalNotificationSentAt; timestamps/version. |
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
| ApprovalRoutingRule | id UUID; siteId UUID; siteCodeSnapshot string; approverUserId UUID nullable; approverName string; approverEmail email; active boolean; validFrom/validTo timestamptz; createdAt/updatedAt; version bigint. Una regla utilizable requiere sede activa, vigencia actual, active=true y correo válido. |
| Approver (PROPUESTO) | id, name, email, role, active, backupApproverId nullable. No es entidad normativa hasta confirmar multiplicidad/suplencia. |

`lineTotal = saleUnitPrice × quantity`; total antes de impuestos. MAD: convertedBase = USD base × rate, con redondeo backend; se congelan origen/tasa/resultado. Otras ubicaciones no consultan ExchangeRate.

`approvalNotificationStatus` usa PENDING/SENT/FAILED/DEAD_LETTER conforme outbox. El correo snapshot es PII: se cifra/protege según arquitectura, no aparece completo en logs y solo se devuelve si el caso de uso lo requiere.

Datos iniciales confirmados: Felipe González/`felipe.gonzalez@netec.com.co`; Angélica Barrón/`angelica.barron@netec.com.mx`; Paola Galvis/`paola.galvis@netec.com.co`. Son seed/configuración auditable, no constantes de aplicación. La política de CC se modela separada de la regla principal para no confundir aprobador con copia operativa.

`LATAM_Testing_Center@netec.com.mx` es la dirección de un grupo de usuarios del directorio, no una colección local. El portal no almacena ni sincroniza miembros. Una futura `NotificationCopyRule` relacionará códigos confirmados con esa dirección; queda bloqueada por P-39.
## exam_catalog

UUID `id`; vendor varchar(120); course_name varchar(250); exam_code varchar(100); exam_name varchar(500); retake varchar(120) nullable; base_cost decimal(19,4); base_currency char(3); comments text nullable; active boolean; business_key varchar(700) unique; source_file varchar(255); source_row_number integer; imported_at/created_at/updated_at timestamptz; version bigint.

## participant_exam_assignment

UUID `id`, `exam_request_id`, `participant_id`, `exam_catalog_id`; snapshots de código/nombre/proveedor/retake/comentario; `unit_price_snapshot decimal(19,4)` y `currency_snapshot char(3)`; timestamps y version. Unique `(exam_request_id, participant_id, exam_catalog_id)`. Las FK participante/solicitud deben impedir referencias cruzadas.
| ExamRequest.companyNameSnapshot | VARCHAR(150), nullable en borrador | Nombre manual normalizado; capitalización preservada; obligatorio al enviar; sin FK en MVP |
| ExamRequest.salesAdvisorUserId | VARCHAR(128), no nulo | `oid` o `sub`; igual a requesterId en MVP |
| ExamRequest.salesAdvisorNameSnapshot | VARCHAR(160), no nulo | nombre validado al crear la solicitud |
| ExamRequest.salesAdvisorUpnSnapshot | VARCHAR(254), no nulo | UPN validado al crear la solicitud |
