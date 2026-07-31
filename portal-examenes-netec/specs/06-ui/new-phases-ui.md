# UI — nuevas fases

## Solicitud enviada

Diálogo institucional no automático con título `Solicitud enviada`, mensaje de
registro/proceso de Facturación y folio. Acción `Crear otra solicitud` cierra,
limpia datos editables, vuelve al paso 1 y obtiene nueva idempotencia. Escape y
cierre no deben limpiar si el usuario no confirma la acción; el comportamiento
exacto queda pendiente de revisión UX.

## CSV de alumnos

En Participantes permanecen captura manual, `Cargar alumnos desde CSV` y
`Descargar plantilla CSV`. La vista previa muestra archivo, encontrados,
válidos, errores, total actual y total proyectado. Los errores identifican fila,
campo y motivo. La lista confirmada comparte edición/eliminación con alumnos
manuales. Requisitos de teclado, foco, lector de pantalla y responsive aplican.
