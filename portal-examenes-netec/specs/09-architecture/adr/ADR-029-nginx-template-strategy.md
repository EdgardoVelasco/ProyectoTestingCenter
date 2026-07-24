# ADR-029 Estrategia de templates NGINX

- Estado: ACEPTADO
- Fecha: 2026-07-23

## Contexto

NGINX necesita resolver backend y producir configuración pública al arrancar sin reconstruir la imagen.

## Decisión

Usar templates compatibles con la imagen oficial y `envsubst` o mecanismo equivalente sobre una allowlist. Separar template NGINX y template `runtime-config.json`. Validar variables antes de iniciar y fallar el contenedor si falta una obligatoria. No sustituir variables arbitrarias ni bundles.

## Alternativas

Archivo fijo, `sed` ad hoc, imagen por ambiente o configuración externa montada. El archivo fijo/rebuild contradice imagen única; sustitución indiscriminada es insegura.

## Consecuencias y riesgos

Requiere entrypoint probado, escapes JSON/NGINX, mensajes sin valores y compatibilidad de imagen. Reduce drift y secretos accidentales.

## Validación

Pruebas de variables faltantes/desconocidas, prefijo, sintaxis NGINX y ausencia de secretos.
