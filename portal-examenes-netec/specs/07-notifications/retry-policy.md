# Política de reintentos

Supuesto por confirmar: máximo 5 intentos totales con demoras 1, 5, 15, 60 y 240 minutos más jitter ±10%. 429/408/5xx/red se consideran temporales respetando `Retry-After`; dirección inválida, autorización/configuración 4xx se considera permanente. PROCESSING con lease >10 minutos vuelve a PENDING de forma auditada. `last_error` se trunca/sanitiza. Un job periódico alerta por DEAD_LETTER y antigüedad; recuperación manual crea nuevo intento auditado sin duplicar la clave lógica.

