# Reglas de negocio — nuevas fases

## Confirmación y reinicio

- **BR-UX-SUBMIT-001** El diálogo solo aparece tras respuesta exitosa del backend.
- **BR-UX-SUBMIT-002** Muestra el folio devuelto por backend.
- **BR-UX-SUBMIT-003** Conserva el diseño institucional.
- **BR-UX-SUBMIT-004** No se cierra automáticamente.
- **BR-UX-SUBMIT-005** Un error no muestra éxito.
- **BR-UX-RESET-001** Solo se limpia después de éxito confirmado.
- **BR-UX-RESET-002** Un error conserva datos y paso.
- **BR-UX-RESET-003** El reinicio vuelve al paso 1.
- **BR-UX-RESET-004** La nueva solicitud obtiene nueva idempotencia.
- **BR-UX-RESET-005** El estado anterior no reaparece.
- **BR-UX-RESET-006** El reinicio no cierra sesión.

## Terminología

- **BR-TERM-001** La denominación vigente es `Comercial`; `CN / Cuentas
  Nombradas` queda SUPERSEDED para uso visible nuevo y no altera históricos.

## CSV

- **BR-CSV-001** Captura manual continúa disponible.
- **BR-CSV-002** Solo se acepta CSV UTF-8.
- **BR-CSV-003** Máximo 100 alumnos por solicitud, sumando manuales e importados.
- **BR-CSV-004** Una fila inválida rechaza la importación completa.
- **BR-CSV-005** Archivo inválido no modifica la lista actual.
- **BR-CSV-006** CSV no se conserva permanentemente.
- **BR-CSV-007** Datos personales no aparecen en logs.
- **BR-CSV-DUP-001** No hay dos correos normalizados iguales en una solicitud.
- **BR-CSV-SEC-001** El contenido se trata como texto; no se ejecutan fórmulas ni
  se permiten CSV injection, binarios renombrados o columnas inesperadas.

## Estados de proceso

`REQUEST_REGISTERED`, `EMAIL_QUEUED`, `GRAPH_ACCEPTED` y `EMAIL_DELIVERED` son
conceptos de proceso propuestos; no sustituyen todavía los estados persistidos.
