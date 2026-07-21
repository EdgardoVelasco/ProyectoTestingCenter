# ADR-008: Folio anual
Estado: ACEPTADO. Contexto: `EXA-AAAA-000001` único concurrente. Decisión: `folio_counter` por año bloqueado en transacción; no `count+1`. Alternativas: sequence global, UUID, sequence anual dinámica. Positivo: formato y control. Negativo: punto caliente/huecos. Riesgo: contención; medir y usar bloqueos cortos.
