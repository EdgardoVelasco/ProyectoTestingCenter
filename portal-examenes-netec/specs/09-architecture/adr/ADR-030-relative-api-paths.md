# ADR-030 Rutas relativas de API

- Estado: ACEPTADO
- Fecha: 2026-07-23

## Contexto

El frontend existente ya usa `/api/v1/...`; el proxy Angular y NGINX encaminan `/api`.

## Decisión

`/api` es base relativa. No hay URLs backend absolutas en Angular. NGINX conserva el prefijo y Spring Boot sigue exponiendo `/api/...`. `window.location.origin` se usa solo cuando una librería requiera clave absoluta.

## Impacto MSAL

Se adopta `@azure/msal-angular` 6.x con `@azure/msal-browser` 5.x. `protectedResourceMap` usa la clave absoluta `${window.location.origin}/api/*`, construida después de validar runtime config. Angular continúa invocando rutas relativas `/api`; la forma absoluta se limita a la allowlist interna de MSAL para obtener coincidencia estricta y evitar tokens en orígenes externos. `AUTH-TEST-001` debe demostrar coincidencia de API y exclusión de externos.

## Alternativas y consecuencias

URL absoluta acopla ambientes; eliminar `/api` en proxy rompe OpenAPI. La ruta relativa facilita same-origin y desarrollo con `proxy.conf.json`, pero exige semántica exacta de `proxy_pass`.
