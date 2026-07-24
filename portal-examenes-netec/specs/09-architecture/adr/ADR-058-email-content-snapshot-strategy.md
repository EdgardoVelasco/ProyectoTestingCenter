# ADR-058: Snapshot del contenido del correo

Estado: APPROVED — 2026-07-24.

## Decisión

El submit serializa un payload JSON estructurado con todos los snapshots comerciales, de participantes, exámenes, asignaciones, precios, monedas, destinatarios y observaciones. El worker renderiza de forma determinista. No se consulta nuevamente el catálogo durante un reintento.

## Alternativa descartada

Guardar solo el ID y recalcular al procesar, porque cambios posteriores alterarían el correo histórico.

## Validación

Deserialización, reintento posterior a cambio de catálogo y comparación de contenido.

