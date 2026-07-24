# ADR-031 Configuración pública frente a privada

- Estado: ACEPTADO
- Fecha: 2026-07-23

## Decisión

Públicos: tenant ID, frontend client ID, scope, authority, redirect URI, base API y nombre de ambiente. Privados: client secrets, credenciales DB, secretos Graph, claves/certificados privados y tokens.

La configuración pública es visible y no se trata como mecanismo de seguridad. La privada solo llega a backend/plataforma. NGINX genera únicamente campos allowlisted; Angular y logs nunca reciben valores privados.

## Alternativas

Ocultar client ID/tenant como secretos (no aporta seguridad); exponer secretos para simplificar OAuth (rechazado); un solo archivo mixto (rechazado).

## Consecuencias y validación

Requiere dos canales de configuración y escaneo automático. BDD detecta claves prohibidas, `.env` versionado y valores productivos inválidos.
