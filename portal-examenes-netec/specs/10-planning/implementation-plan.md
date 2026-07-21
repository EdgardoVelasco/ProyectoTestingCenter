# Plan actualizado — no ejecutar sin aprobación

Cada incremento es vertical y entrega contrato, persistencia futura, backend, UI, pruebas y documentación, pero esos artefactos no se crean en esta actualización.

1. **I1 Autenticación y borrador/solicitante:** RF-001..005, HU-001..004; claims confirmados; pruebas JWT, propiedad y optimistic locking. Riesgo: claims/obligatorios.
2. **I2 Catálogos comerciales:** RF-007/028, HU-014/023; CourseType, Segment, Company, CostCenter, Branch, SalesAdvisor; búsqueda/relaciones. Riesgo: AC/CN/BOG y jerarquía.
3. **I3 Exámenes, costo, conversión MAD y precio venta:** importar Excel, RF-021..023/033-036; tasa USD→EUR versionada, administración Testing Center, snapshots y venta editable.
4. **I4 Participantes y líneas:** RF-024/031/032; colecciones dinámicas y asignación N:M.
5. **I5 Validación y duplicados:** RF-006/008/025/026/028; participante+examen, vouchers asignados y monedas.
6. **I6 Folio y submit:** RF-009/010/014/019/027/029/030, HU-007/019/022/024/025; snapshots/resumen/idempotencia. Riesgo: cambio de catálogo entre revisión/commit.
7. **I7 Outbox y correo:** RF-011..013/018, HU-011..013; tabla de participantes, retry/alerta. Riesgo: entrega al menos una vez/Graph.
8. **I8 Consulta y detalle:** RF-015..017/020, HU-008/009/015/016; filtros, histórico y privacidad. Riesgo: consultas/PII.

DoD por incremento: CA y BDD relacionados pasan, OpenAPI/matriz actualizados, autoridad backend y snapshots probados cuando apliquen, seguridad/accesibilidad/observabilidad revisadas y ninguna aprobación de Facturación añadida.
