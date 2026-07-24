# Change log — configuración runtime y proxy same-origin

Fecha: 2026-07-23. Estado: **APPROVED / IMPLEMENTADO**.

## Arquitectura encontrada

Angular ya usaba `/api/v1/...`; `proxy.conf.json` conserva `/api`. NGINX sirve SPA y su `proxy_pass` conserva `/api`. Spring consume configuración externa. MSAL no estaba instalado al iniciar la inspección.

## Evidencia segura

Se inspeccionaron solo nombres de `.env`: `TENANT_ID`, `FRONTEND_CLIENT_ID`, `BACKEND_CLIENT_ID`, `BACKEND_SCOPE`, `FRONTEND_URL`, `BACKEND_URL`. No se leyeron ni copiaron valores. `.env` está ignorado, no rastreado y sin historial Git encontrado. `.env.example` contiene identidad local ficticia.

## Cambios documentales

- Agregados NFR-CONF-001..006, NFR-NGX-001..006, NFR-SEC-001..004 y SEC-CONF-001..010.
- Creados documentos de runtime, NGINX, ambientes, gestión y catálogo.
- Creados ADR-028..031.
- Creados 26 escenarios: ENV-001..010, NGX-001..010 y AUTH-RT-001..006.
- Actualizados gobierno, README, OpenAPI, arquitectura, seguridad, discovery, trazabilidad y planificación.
- `runtime-config.json` se prefiere provisionalmente sobre `env.js`.
- `no-store` para runtime config y caché larga para bundles hash queda PROPUESTO.

## Hallazgos

- ALTO: NGINX actual fija nombre/puerto backend.
- ALTO: Compose/Spring incluyen defaults locales que producción debe rechazar.
- MEDIO: nombres reales requieren normalización/deprecación.
- MEDIO: headers, límites, timeouts y salud NGINX están incompletos.
- BAJO: proxy Angular ya es coherente para desarrollo.

## Implementación aprobada — 2026-07-23

El usuario autorizó comenzar la implementación. Se agregaron carga/validación de `runtime-config.json`, token de inyección, uso de `apiBasePath`, error seguro, pruebas unitarias, template JSON, template NGINX, entrypoint allowlisted y variables Compose. Posteriormente autorizó continuar: se instalaron `@azure/msal-angular` 6.0.1 y `@azure/msal-browser` 5.17.1, se inicializa MSAL antes del bootstrap, se procesa el redirect y el interceptor protege exclusivamente el API same-origin. Spring Boot no fue modificado.

Resultados: 25 pruebas Angular exitosas; build exitoso; NGINX `-t` exitoso; `/health`, runtime config `no-store` y fallback SPA HTTP 200; backend no disponible produce 503 seguro; con backend disponible `/api/v1/me` produce 200; ausencia de `BACKEND_HOST` detiene el contenedor sin mostrar valores; Compose válido. AUTH-TEST-001 comprueba bearer y scope para `/api` y ausencia de token en orígenes externos. `npm audit --omit=dev` reporta cero vulnerabilidades de producción. La imagen `portal-examenes-netec-frontend:latest` se construyó correctamente; se añadió `.dockerignore` y el contexto bajó de 666 MB a 1.92 kB. PostgreSQL, backend y frontend quedaron activos mediante Compose; salud frontend, índice, runtime config y API a través del proxy responden HTTP 200. El build advierte que el bundle inicial alcanza 886.42 kB frente a presupuesto de 750 kB.
