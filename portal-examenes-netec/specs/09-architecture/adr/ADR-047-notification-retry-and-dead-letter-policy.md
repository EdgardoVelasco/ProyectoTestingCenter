# ADR-047: Reintentos y Dead Letter

Estado: PROPUESTO.

## Decision

Politica configurable de hasta cinco intentos: inmediato, 1, 5, 15 y 60/240 minutos segun la configuracion vigente, respetando `Retry-After` y jitter. Timeout, red, 408, 429 y 5xx son transitorios. Configuracion faltante, destinatario invalido y 4xx permanentes van a `DEAD_LETTER` sin reintento indefinido. Un lease PROCESSING vencido vuelve a PENDING.

## Validacion

Probar clasificacion, backoff, Retry-After, maximo, alerta y sanitizacion de error.
