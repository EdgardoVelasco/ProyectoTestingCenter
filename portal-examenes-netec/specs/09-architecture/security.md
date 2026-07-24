# Seguridad

## Autenticación real de development — 2026-07-23

Docker usa perfil `development`, no `local`. Spring obtiene metadata/JWKS desde el issuer v2 configurado y aplica validadores de issuer, `tid` y audiences allowlisted. Toda `/api/**` exige `SCOPE_ExamRequests.Access`. La excepción provisional `allow-tenant-users` existe únicamente en `application-development.yaml`; fuera de development se exige además `EXAM_SALES` o `EXAM_ADMIN`.

El perfil `local` conserva identidad sintética solo para pruebas explícitas y nunca debe ser habilitado por Docker Compose o ambientes compartidos.

En perfil `local` exclusivamente, un filtro construye una identidad fija configurable (`LOCAL_USER_*`) para desarrollo sin tenant. El perfil está deshabilitado por defecto, no acepta identidad desde headers/request y no puede combinarse con producción. Todo perfil distinto valida JWT Entra. I1 autoriza EXAM_SALES y deriva requester del `Authentication`.

Los DTO usan allowlist para impedir modificar `unitPrice`, `currency`, `totalAmount`, snapshots y solicitante. Logs enmascaran correos y nunca registran participantes completos ni referencias financieras. Auditoría registra creador y remitente, no secretos.

Entra ID emite JWT; Resource Server valida firma por JWKS, issuer, audience, expiración y algoritmo permitido. Claims/grupos se mapean explícitamente a EXAM_SALES/BILLING/ADMIN con denegación por defecto y mínimo privilegio. EXAM_SALES crea y consulta propias; consultas ajenas responden 404.

## Configuración runtime y proxy

En producción, SPA y `/api` comparten origen mediante NGINX, por lo que el flujo principal no depende de CORS. Spring Boot mantiene validación JWT completa. Tenant/client ID/scope/authority/redirect/base API son públicos; client secret, DB, Graph, claves, certificados y tokens son privados. Runtime config usa allowlist, `no-store` y validación previa a MSAL. Nunca se imprime el entorno completo. MSAL 6.x usa redirect y una allowlist absoluta same-origin para `/api/*`; no adjunta tokens a recursos externos.

CORS solo orígenes configurados, métodos/headers mínimos. Con bearer en header y sin cookie de sesión, CSRF no aplica a API; se reevaluará si cambia el transporte. Angular no usa HTML sin sanitizar; correo escapa contexto. JPA parametriza SQL; DTO allowlist evita mass assignment (`requester`, estado, folio, auditoría ignorados). Bean Validation y relaciones se revalidan. Secretos en vault/variables de despliegue, rotables. TLS, cifrado en reposo, logs minimizados y auditoría append-only. Adjuntos no existen en fase 1; si se incorporan requieren nueva especificación de tipo, tamaño, malware y almacenamiento.

## Experiencia DRAFT

La landing inicia redirect y nunca captura contraseña. MSAL detecta sesión, pero guard/interceptor no autorizan por sí solos. `/api/auth/me` y toda API validan JWT. La identidad es mínima. Logout, expiración e historial deben impedir operaciones. Acceso externo no tiene implementación. ADR-033..036 permanecen PROPUESTOS.
## Compatibilidad de issuer de Microsoft Entra ID

El Resource Server debe aceptar exclusivamente los issuers oficiales v1 y v2 asociados al `ENTRA_TENANT_ID` configurado:

- `https://sts.windows.net/{tenant-id}/`
- `https://login.microsoftonline.com/{tenant-id}/v2.0`

Esta compatibilidad no reduce los demás controles: firma, expiración, audiencia, `tid` y scope se validan independientemente. Cualquier issuer de otro tenant debe rechazarse.
## Resolución de UPN

El backend es autoridad funcional: `preferred_username` → `upn` → `email` → cadena vacía. La respuesta usa el campo existente `username`, no expone el conjunto de claims ni tokens. El frontend no reinterpreta claims para Datos del solicitante.

## Autoridad del Asesor Comercial

Create/update no aceptan identidad de asesor. Spring obtiene `oid` o `sub`, nombre y UPN del principal. En el MVP los snapshots del asesor coinciden con requester. Esto evita mass assignment y registrar solicitudes para terceros.
