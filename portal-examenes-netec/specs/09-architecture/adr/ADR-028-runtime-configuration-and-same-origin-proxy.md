# ADR-028 Runtime configuration y proxy same-origin

- Estado: ACEPTADO
- Fecha: 2026-07-23
- Responsables: arquitectura/seguridad, pendientes

## Contexto

Angular se despliega como archivos estáticos en NGINX. La misma imagen debe promoverse sin recompilación y el backend cambia por ambiente.

## Decisión

Angular usa `/api`; NGINX resuelve backend y genera configuración pública runtime; Spring Boot usa configuración externa y valida seguridad. Navegador y API comparten origen. No se exponen secretos.

## Alternativas

URL absoluta en Angular; recompilar por ambiente; Angular leyendo `.env`; proxy externo; runtime config. Se elige provisionalmente runtime config + proxy NGINX.

## Consecuencias

Positivas: imagen única, menos CORS/acoplamiento y backend no hardcodeado. Negativas: entrypoint/template más complejos, carga previa obligatoria y diagnóstico adicional.

## Validación

BDD ENV-001..010, NGX-001..010 y AUTH-RT-001..006. No autoriza código.
