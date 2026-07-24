# Análisis de importación del catálogo de exámenes

Estado: **APPROVED**. Fecha de análisis: 2026-07-23.

## Fuente y estructura

- Archivo: `specs/01-discovery/catalogo_examenes.xlsx`.
- Hoja: `Hoja1`.
- Fila 1: vacía.
- Encabezados reales, fila 2: `Proveedor`, `Curso`, `Codigo examen`, `Examen`, `Retake`, `Costo`, `Comentarios`.
- Filas de datos: 124 (filas Excel 3–126).
- Proveedores distintos: 24.
- Costos: 123 enteros y un decimal; 0 inválidos y 0 vacíos.
- Moneda: no existe como columna. Discovery confirma USD como moneda del costo base.
- Códigos: 20 valores `N/A`; no hay códigos vacíos.
- Retake: 118 `No incluido` y 6 vacíos.
- Comentarios: 2 informados y 122 vacíos.
- Duplicados exactos: 5 filas repetidas; se importan una sola vez.
- Hay 30 grupos proveedor+código repetidos (35 filas adicionales). Solo 5 son duplicados semánticos exactos; los demás cambian nombre, curso o costo y no tienen vigencia que permita escoger una variante.
- Resultado esperado: 119 registros aceptados y 5 rechazados como duplicados.

## Proveedores

VMware (8), Palo Alto (17), Microsoft (10), HPE Aruba (6), HPE (5),
Google Cloud (2), Fortinet (15), EXIN / BCS (1), CompTIA (9), CertiProf (2),
AWS (14), Cisco (14), Linux Foundation (3), PeopleCert (1), ISC2 (2),
Databricks (1), Oracle (2), ISACA (3), Scrum (1), Google (4), Acquia (1),
CWNP (1), Confluent (1) e ISTQB (1).

## Normalización aprobada

1. Recortar espacios exteriores y conservar el texto visible original.
2. Comparar claves sin distinguir mayúsculas/minúsculas.
3. `base_cost` se importa como `DECIMAL(19,4)` y `base_currency` como `USD`.
4. Retake vacío permanece `NULL`; no se transforma en “No incluido”.
5. Comentario vacío permanece `NULL`.
6. Código `N/A` se conserva como evidencia, pero no identifica por sí solo al examen.
7. Clave idempotente inicial: huella normalizada de proveedor, curso, código, examen, retake, costo y comentarios. Se elimina únicamente duplicidad exacta y se preservan variantes sin inventar vigencia.
8. Reejecutar la carga actualiza solamente la coincidencia controlada o no realiza cambios; nunca duplica.
9. `source_file` y `source_row_number` conservan trazabilidad técnica y no se exponen por la API pública.

## Registros rechazados

Cinco filas son duplicados exactos de una fila anterior. El proceso controlado debe reportarlas como `DUPLICATE_SOURCE_ROW`; no se consideran errores de costo.

## Preguntas no bloqueantes

- ¿Testing Center normalizará en el futuro HPE/HPE Aruba o Google/Google Cloud?
- ¿Cómo se administrarán vigencias y actualizaciones posteriores?
- ¿Los seis retakes vacíos significan “no incluido” o “sin información”?
- ¿Se requiere conservar el Excel como fuente después de la carga inicial?
- ¿Qué variante es vigente cuando proveedor+código se repite con distinto costo?
