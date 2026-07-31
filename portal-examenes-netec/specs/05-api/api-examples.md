# Ejemplos de API

Crear borrador (`POST /exam-requests`); el frontend no envía precio, moneda, snapshots ni total:

```json
{"scheduledCourseCode":null,"courseTypeId":"00000000-0000-0000-0000-000000000001","segmentId":"00000000-0000-0000-0000-000000000003","organizationalLocationId":"00000000-0000-0000-0000-000000000004","companyName":"SCOTIABANK COLPATRIA","participants":[{"id":"00000000-0000-0000-0000-000000000010","firstName":"Carlos","lastName":"Galindo","email":"usuario@empresa.com"}],"examAssignments":[{"examCatalogId":"00000000-0000-0000-0000-000000000007","participantIds":["00000000-0000-0000-0000-000000000010"]}]}

El request no acepta asesor. La respuesta incluye `requester` y `salesAdvisor` read-only, ambos derivados del principal autenticado e iguales durante el MVP.
```

Validate/submit resuelve por asignación costo base, moneda y snapshots; calcula cantidad, `lineTotal` y `totalAmount`. Si el cliente envía costo, precio, cantidad, moneda o totales, se rechazan. Un participante puede aparecer en varias asignaciones de examen.
# Ejemplos API — extensión de enrutamiento

La entrada usa `siteId`; no acepta nombre ni correo de aprobador:

```json
{"siteId":"11111111-1111-1111-1111-111111111111","companyId":"22222222-2222-2222-2222-222222222222","participants":[],"items":[]}
```

`GET /api/v1/approval-routing/resolve?siteId=...` devuelve únicamente datos necesarios para presentación:

```json
{"site":{"id":"11111111-1111-1111-1111-111111111111","code":"BOG","name":"Bogotá"},"approvalRecipientName":"Felipe González","routingRuleId":"33333333-3333-3333-3333-333333333333","resolvedAt":"2026-07-22T12:00:00Z"}
```

Submit responde `folio`, `status`, `site`, `approvalRecipientName` y `approvalNotificationStatus`. El backend ignora campos de destinatario no admitidos y re-resuelve la regla. Para sede sin regla/correo válido devuelve 422 `APPROVAL_ROUTE_UNAVAILABLE`; cambio desde la confirmación devuelve 409 `APPROVAL_ROUTE_CHANGED`.
## Empresa libre MVP

Un borrador puede enviar `"companyName": null`. Cuando existe:

```json
{"companyName":"SCOTIABANK COLPATRIA"}
```

Backend normaliza espacios y devuelve `companyNameSnapshot`; no requiere ni consulta `companyId`.

`GET /api/auth/me.username` significa UPN resuelto mediante `preferred_username`, `upn` o `email`; no es un correo capturado por Angular.
Los campos comerciales `courseType`, `segment` y `costCenter` se envÃ­an como
snapshots visibles seleccionados desde el catÃ¡logo y se conservan para el
renderizado histÃ³rico del correo.
