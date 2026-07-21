# Registro de cambios por nueva evidencia

## Segunda actualización: respuestas de Testing Center

El 2026-07-21 se incorporaron respuestas directamente en `open-questions.md` y se inspeccionó `catalogo_examenes.xlsx` (124 registros de examen; columnas proveedor, curso, código, examen, retake, costo y comentarios). Se reemplazaron supuestos incorrectos: ahora hay varios exámenes, asignación N:M, precio venta editable separado del costo base, catálogo único Centro de Costos o Sucursal, CN confirmado y N/A="no aplica". Se agregaron RF-031..033, RN-041..047, HU-026..028, CA-031..033 y BDD-051..058.

## Tercera actualización: respuestas adicionales

Confirmados: referencia/tipo opcionales, segmento obligatorio, empresa=cliente, venta >0, máximo 100/100, Testing Center administra catálogo, vigencia, ubicación, retake/comentarios y total sin impuestos. El conflicto monetario se resolvió después: solo MAD convierte automáticamente USD→EUR.

## Cuarta actualización: conversión Madrid

Agregados RF-036, RN-057..059, HU-031, CA-036 y BDD-067..070; OpenAPI incorpora administración de tasa USD→EUR. Se exige snapshot de origen, tasa/fecha y resultado, cálculo backend y nueva confirmación si cambia ubicación o tasa.

Fecha: 2026-07-21. Evidencia: formato real anonimizado con Clave Curso Programado, Tipo de Curso, AC, Segmento, Centro de Costos o Sucursal, Empresa, referencia/factura, examen combinado, valor+moneda, cantidad, nombre y correo.

## Clasificación

- **AGREGADO:** RF-021..030, RN-021..040, HU-017..025, CA-021..030, BDD-021..050, ExamRequestParticipant, ExamPrice conceptual, CourseType, Segment, Company, Branch y SalesAdvisor; ADR-011..015.
- **MODIFICADO:** formulario, submit, duplicidad, snapshots, dominio, API, UI, correo, trazabilidad y backlog. RF-003..010/014/016 y HU-002..007 ahora contemplan datos comerciales/colección.
- **DEPRECADO:** participante único embebido; examen “código y descripción” combinado; precio “59 USD” combinado; `billingLine`; interpretación de centro/sucursal como un concepto confirmado.
- **PENDIENTE DE CONFIRMACIÓN (estado histórico):** estos puntos originaron la revisión; la tercera actualización resolvió la mayoría. Consultar `open-questions.md` para los pendientes vigentes.

## Archivos

Modificados: AGENTS, README, vision; discovery; todos los requisitos/campos/glosario; épicas/historias/CA; dominio; OpenAPI/errores/ejemplos; UI; plantilla/reglas de correo; trazabilidad; arquitectura/persistencia/seguridad/outbox; ADR-007; planificación/riesgos/DoD; validación. Revisados y conservados sin cambio material: retry-policy y ADR-001..006/008..010. Creado: este archivo, `commercial-participants.feature` y ADR-011..015.

## Impactos

- **Arquitectura/datos:** agregado 1:N participantes, resolución de ExamPrice, aritmética decimal y snapshots comerciales/financieros.
- **API:** request allowlist sin precio/total; nuevos catálogos, detalle examen y precio provisional separado.
- **UI:** cinco secciones, participantes dinámicos, contador, total y confirmación previa.
- **Pruebas:** 30 escenarios nuevos, incluidos manipulación, vigencia, dinero, N/A y fallo de correo.
- **Backlog:** pasa de cinco a ocho incrementos verticales; precio y participantes se aíslan para resolver decisiones antes de submit.

## Razón

La evidencia real tiene prioridad sobre el modelo inicial, pero no demuestra semántica de siglas ni reglas financieras. Por ello se representa fielmente, se separan datos combinados y se mantienen decisiones inciertas como propuestas/preguntas, sin inventarlas.
