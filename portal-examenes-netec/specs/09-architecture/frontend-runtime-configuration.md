# Configuración pública de runtime del frontend

Estado: **APPROVED / IMPLEMENTADO**. Runtime config, carga previa y MSAL implementados y verificados el 2026-07-23.

## Objetivo y principios

Permitir que la misma imagen Angular se promueva entre desarrollo, pruebas, staging y producción sin recompilarla.

- Angular usa `API_BASE_PATH=/api`; no hardcodea URLs absolutas.
- Angular no lee `.env`; el navegador solo descarga configuración pública generada al arrancar el contenedor.
- No se permiten secretos, tokens, credenciales, certificados privados ni secretos Graph.
- La configuración se valida antes de inicializar MSAL y antes del bootstrap funcional.
- Si falta una variable obligatoria, la aplicación falla de forma segura: muestra un error técnico sin valores y registra únicamente el nombre faltante.

## Contrato público esperado

| Propiedad | Propósito | Sensibilidad |
|---|---|---|
| `entraTenantId` | Tenant público de Entra | Pública |
| `entraFrontendClientId` | Identificador de la SPA | Pública |
| `entraBackendScope` | Scope delegado solicitado | Pública |
| `entraAuthority` | Authority HTTPS permitida | Pública |
| `entraRedirectUri` | URI registrada; preferentemente origen actual | Pública |
| `apiBasePath` | Base relativa, inicialmente `/api` | Pública |
| `environmentName` | Etiqueta no secreta del ambiente | Pública |

## Alternativas

### Opción A — `runtime-config.json` (preferida provisionalmente)

JSON generado desde una plantilla con allowlist. Angular lo descarga con `Cache-Control: no-store`, valida esquema/valores y luego inicializa MSAL. Ventajas: tipado y validación natural, independiente del orden de scripts y sin global mutable. Riesgos: petición inicial adicional y manejo explícito del error.

### Opción B — `env.js`

Script que asigna `window.APP_CONFIG`. Ventajas: carga temprana simple. Riesgos: global mutable, tipado adicional, CSP más delicada y posibilidad de arrancar con un objeto parcial.

## Secuencia de arranque

Contenedor → entrypoint valida allowlist → genera configuración pública → inicia NGINX → navegador descarga Angular → Angular carga/valida configuración → inicializa MSAL → inicia aplicación.

## MSAL

Se aprueba `@azure/msal-angular` 6.x y `@azure/msal-browser` 5.x. La instancia pública se construye e inicializa con runtime config antes del bootstrap. `protectedResourceMap` protege `${window.location.origin}${apiBasePath}/*` con `entraBackendScope`; no incluye recursos externos. `redirectUri` usa el valor público validado y debe coincidir con un URI registrado. No se incorpora client secret. La aplicación procesa el retorno redirect antes de realizar llamadas funcionales.

## Caché

PROPUESTA: `runtime-config.json` con `Cache-Control: no-store`; bundles con hash, caché larga e inmutable. `index.html` no debe fijar una configuración obsoleta.
