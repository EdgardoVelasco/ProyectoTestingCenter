# Requisitos de seguridad de configuración

Estado: **IN_REVIEW**.

| ID | Requisito | Criterio |
|---|---|---|
| SEC-CONF-001 | Separación pública/privada | La allowlist pública contiene solo campos ADR-031. |
| SEC-CONF-002 | Falla segura | Variable obligatoria faltante detiene arranque sin imprimir valor. |
| SEC-CONF-003 | Secretos externos | Backend obtiene secretos desde entorno/secret manager, no frontend. |
| SEC-CONF-004 | JWT independiente | Spring valida firma, issuer, audience, expiración y permisos aunque NGINX reenvíe. |
| SEC-CONF-005 | Same-origin | Producción usa origen común; CORS amplio está prohibido. |
| SEC-CONF-006 | Protección de API | MSAL interceptor solo adjunta token al recurso API aprobado. |
| SEC-CONF-007 | Cache segura | Runtime config no se cachea; bundles hash pueden usar caché larga. |
| SEC-CONF-008 | Higiene Git | `.env` ignorado; `.env.example` sin valores reales; historial previo sería CRÍTICO. |
| SEC-CONF-009 | Producción válida | Rechaza localhost, placeholders y defaults locales. |
| SEC-CONF-010 | Proxy seguro | NGINX limita request, timeouts y headers; 502/504 no revelan internos. |

## Extensión de sesión — DRAFT

| ID | Requisito |
|---|---|
| SEC-AUTH-001 | Solo Entra ID autentica usuarios internos; la pantalla NETEC no captura credenciales. |
| SEC-AUTH-002 | Backend valida JWT y scope en `/api/auth/me` y toda operación protegida. |
| SEC-AUTH-003 | Guard frontend mejora navegación, pero no sustituye autorización backend. |
| SEC-AUTH-004 | Identidad funcional y ownership proceden del principal backend validado. |
| SEC-AUTH-005 | Logout y expiración bloquean submit y rutas; historial no restaura acceso. |
| SEC-AUTH-006 | La respuesta de identidad minimiza claims y excluye tokens/secretos. |
- SEC-ID-011: solo se expone el UPN resuelto en `username`; no se exponen tokens ni claims adicionales para mostrar Correo.
