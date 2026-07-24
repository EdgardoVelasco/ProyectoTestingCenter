# Change log: logout, participantes y catálogo

Fecha: 2026-07-23. Estado: **APPROVED / IMPLEMENTATION AUTHORIZED**.

## Observaciones y decisiones

- Logout MSAL real con confirmación de cambios.
- Solicitante fijo y stepper Comercial → Participantes → Exámenes → Resumen.
- Catálogo inicial desde Excel: 124 filas, 119 únicas, 5 duplicados rechazados, 24 proveedores, costo base USD.
- Asignación N:M explícita; cantidad por examen = asignaciones únicas.
- CSV UTF-8 + importador idempotente; tabla única de catálogo para MVP.
- Costo base permanece separado del precio de venta.

## Impactos

- UI: orden, selector/búsqueda agrupada, asignación y resumen matricial.
- API: consulta paginada de catálogo/proveedores/detalle y contrato de asignaciones.
- BD: `exam_catalog`, participantes y asignaciones con FK, unique, índices y snapshots.
- Seguridad: logout del proveedor, sin tokens o usuarios hardcodeados.
- Pruebas: logout, importación, catálogo, asignaciones, navegación, accesibilidad y cálculos.

## ADR

ADR-037..041.

## Pendientes no bloqueantes

Gobierno de actualizaciones posteriores, significado de retake vacío y posible normalización futura de proveedores.

## Implementación y evidencia de Etapa B

- Logout: acción accesible en header, confirmación cuando el formulario está sucio, limpieza de cuenta/identidad/estado de recuperación y `logoutRedirect` real de MSAL.
- Stepper: Solicitante fijo; orden único Comercial → Participantes → Exámenes → Resumen.
- Catálogo: migración `V2`, importador CSV idempotente, 119 registros persistidos y API protegida paginada con filtros por proveedor, código y texto.
- Asignaciones: migración `V3`, relación N:M explícita, restricción única, FK por solicitud y snapshots resueltos en backend.
- Frontend: catálogo real agrupado por proveedor, búsqueda, selección de participantes, cantidad y total derivados, resumen actualizado.
- Corrección encontrada por integración: los filtros JPQL opcionales nulos producían `lower(bytea)` en PostgreSQL; se reemplazaron por `Specification` tipada.

Evidencia del 2026-07-23:

- Excel: 124 filas fuente, 119 únicas importadas, 5 duplicados exactos omitidos, 0 costos inválidos, 24 proveedores.
- Reimportación: 0 inserciones y 124 filas reconocidas como existentes/duplicadas; sin duplicar catálogo.
- Backend: 20 pruebas, 0 fallos, 0 errores, 0 omitidas; integración real con PostgreSQL/Testcontainers incluida.
- Frontend: 31 pruebas, 0 fallos; build de producción exitoso.
- Infraestructura: tres contenedores activos; frontend y health backend HTTP 200; catálogo anónimo HTTP 401; tres migraciones y 119 registros confirmados.
- OpenAPI y trazabilidad se mantienen alineados con precios no autoritativos en cliente.

## Hallazgos y pendientes

- MEDIO: bundle inicial Angular de 988.08 kB supera el presupuesto de advertencia de 750 kB.
- MEDIO: no existe script `lint` configurado en `package.json`; debe incorporarse antes del DoD productivo integral.
- MEDIO: axe/E2E visual y prueba interactiva de logout Entra requieren sesión humana.
- IMPORTANTE: `base_cost` no equivale a precio de venta; el frontend lo identifica como costo base y el incremento no inventa margen.
- No se implementó submit/aprobación, correo, compra ni vouchers.
