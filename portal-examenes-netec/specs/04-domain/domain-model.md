# Modelo de dominio revisado con respuestas

```mermaid
erDiagram
  EXAM_REQUEST ||--|{ EXAM_REQUEST_PARTICIPANT : contains
  EXAM_REQUEST ||--|{ EXAM_REQUEST_ITEM : contains
  EXAM_REQUEST_ITEM }o--|| EXAM : selects
  EXAM ||--o{ EXAM_PRICE : priced_by
  EXAM_REQUEST_ITEM ||--|{ ITEM_PARTICIPANT_ASSIGNMENT : assigns
  EXAM_REQUEST_PARTICIPANT ||--o{ ITEM_PARTICIPANT_ASSIGNMENT : receives
  EXAM_REQUEST }o--o| COURSE_TYPE : typed_as
  EXAM_REQUEST }o--|| SEGMENT : segmented_as
  EXAM_REQUEST }o--o| ORGANIZATIONAL_LOCATION : cost_center_or_branch
  EXAM_REQUEST }o--o| COMPANY : for_company
  EXAM_REQUEST ||--o{ NOTIFICATION_OUTBOX : emits
  EXAM_REQUEST ||--o{ AUDIT_ENTRY : audited
```

ExamRequest contiene participantes únicos y líneas `ExamRequestItem`. Cada línea selecciona un examen, conserva costo base/precio de venta/moneda/cantidad/total y asigna participantes mediante entidad de unión. Un participante puede aparecer en varias líneas; no hay voucher sin asignar. La equivalencia exacta `item.quantity = assignments` sigue supuesto P-16.

`OrganizationalLocation` representa “Centro de Costos o Sucursal”; sus códigos confirmados forman un catálogo sin jerarquía inventada. ExamPrice depende de país y proveedor. El Excel es fuente inicial, pero no contiene moneda, país ni vigencia.
