# Ejemplos de API

Crear borrador (`POST /exam-requests`); el frontend no envía precio, moneda, snapshots ni total:

```json
{"scheduledCourseCode":null,"courseTypeId":"00000000-0000-0000-0000-000000000001","salesAdvisorId":"00000000-0000-0000-0000-000000000002","segmentId":"00000000-0000-0000-0000-000000000003","organizationalLocationId":"00000000-0000-0000-0000-000000000004","companyId":"00000000-0000-0000-0000-000000000006","participants":[{"id":"00000000-0000-0000-0000-000000000010","firstName":"Carlos","lastName":"Galindo","email":"usuario@empresa.com"}],"items":[{"examId":"00000000-0000-0000-0000-000000000007","saleUnitPrice":59.0000,"quantity":1,"participantIds":["00000000-0000-0000-0000-000000000010"]}]}
```

Validate/submit resuelve por línea `catalogBasePrice`, moneda y snapshots; acepta `saleUnitPrice`, calcula `lineTotal` y suma `totalAmount`. Si cliente envía costo base, moneda o totales, se rechazan. Un participante puede aparecer en `participantIds` de varias líneas.
