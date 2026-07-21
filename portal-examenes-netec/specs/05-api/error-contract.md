# Contrato de errores

Content-Type `application/problem+json`, basado en RFC 9457. Campos: `type`, `title`, `status`, `detail`, `instance`, `code`, `timestamp` ISO-8601, `correlationId` y `fieldErrors[] {field,code,message}`. Nunca incluye stack trace, SQL, token ni detalles de proveedor.

Códigos adicionales: `EXAM_INACTIVE`, `EXAM_PRICE_UNAVAILABLE`, `EXAM_CURRENCY_MISSING`, `INVALID_CURRENCY`, `QUANTITY_PARTICIPANT_MISMATCH`, `DUPLICATE_PARTICIPANT_EMAIL`, `BILLING_REFERENCE_REQUIRED`, `CATALOG_EMPTY`, `TOTAL_RECALCULATED` (advertencia de respuesta, no error). Se conservan los códigos previos de autenticación, validación, duplicidad externa, versión, estado y error interno.

```json
{"type":"https://netec.com/errors/validation","title":"La solicitud contiene datos inválidos","status":400,"detail":"Corrige los campos indicados.","instance":"/api/v1/exam-requests/123/submit","code":"EXAM_REQUEST_VALIDATION_FAILED","timestamp":"2026-07-20T18:30:00-06:00","correlationId":"abc-123","fieldErrors":[{"field":"participantEmail","code":"INVALID_EMAIL","message":"Ingresa un correo electrónico válido."}]}
```
