# Contrato de errores

Content-Type `application/problem+json`, basado en RFC 9457. Campos: `type`, `title`, `status`, `detail`, `instance`, `code`, `timestamp` ISO-8601, `correlationId` y `fieldErrors[] {field,code,message}`. Nunca incluye stack trace, SQL, token ni detalles de proveedor.

Códigos adicionales: `EXAM_INACTIVE`, `EXAM_PRICE_UNAVAILABLE`, `EXAM_CURRENCY_MISSING`, `INVALID_CURRENCY`, `QUANTITY_PARTICIPANT_MISMATCH`, `DUPLICATE_PARTICIPANT_EMAIL`, `BILLING_REFERENCE_REQUIRED`, `CATALOG_EMPTY`, `TOTAL_RECALCULATED` (advertencia de respuesta, no error). Se conservan los códigos previos de autenticación, validación, duplicidad externa, versión, estado y error interno.

```json
{"type":"https://netec.com/errors/validation","title":"La solicitud contiene datos inválidos","status":400,"detail":"Corrige los campos indicados.","instance":"/api/v1/exam-requests/123/submit","code":"EXAM_REQUEST_VALIDATION_FAILED","timestamp":"2026-07-20T18:30:00-06:00","correlationId":"abc-123","fieldErrors":[{"field":"participantEmail","code":"INVALID_EMAIL","message":"Ingresa un correo electrónico válido."}]}
```
# Extensión de errores de enrutamiento

- `SITE_REQUIRED`: sede obligatoria para enviar.
- `APPROVAL_ROUTE_UNAVAILABLE`: regla ausente, inactiva o fuera de vigencia.
- `APPROVER_EMAIL_INVALID`: la configuración no contiene correo utilizable; no expone el valor.
- `APPROVAL_ROUTE_CHANGED`: la regla cambió desde la confirmación; requiere revisar nuevamente.
- `APPROVAL_RECIPIENT_NOT_ALLOWED`: el cliente intentó enviar un destinatario no admitido.

# Extensión DRAFT de autenticación

- `AUTHENTICATION_REQUIRED` (401): token ausente/expirado/inválido; no informa cuál validación criptográfica falló.
- `ACCESS_DENIED` (403): principal válido sin scope/rol; no expone grupos o políticas.
- `IDENTITY_UNAVAILABLE` (503): no se pudo construir identidad segura; nunca devuelve claims crudos.
- `SESSION_INTERACTION_REQUIRED` es estado frontend, no respuesta que contenga detalles MSAL.

`/api/auth/me` no incluye access token, refresh token, client secret o dumps de claims.
| `INVALID_COMPANY_NAME` | 422 | Empresa presente con menos de 2/más de 150 caracteres, solo espacios o `N/A` | `companyName` |
