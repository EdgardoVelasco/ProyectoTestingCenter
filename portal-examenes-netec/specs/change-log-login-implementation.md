# Change log — autenticación real Microsoft Entra ID

Fecha: 2026-07-23  
Estado: APPROVED / IMPLEMENTACIÓN AUTORIZADA  
Evidencia de autorización: solicitud explícita de implementar el incremento funcional real de autenticación.

## Estado encontrado

- Angular 22 standalone, MSAL Angular 6.0.1 y MSAL Browser 5.17.1.
- Runtime config y proxy same-origin `/api` ya implementados.
- Docker ejecutaba Spring con perfil `local`.
- Angular interpretaba `development` como bypass y no protegía `/api` con MSAL.
- `/api/auth/me` existía, pero faltaban validadores explícitos de tenant y audiences múltiples.

## Decisiones aprobadas

1. Microsoft Entra ID autentica mediante redirect; el portal nunca captura contraseñas.
2. `development` usa autenticación Entra real y configuración runtime.
3. El bypass queda limitado al perfil explícito `local`, fuera de Docker Compose y producción.
4. NGINX conserva `/api`; MSAL protege `${window.location.origin}/api/*`.
5. Spring valida firma, issuer, tenant, audience y `ExamRequests.Access`.
6. `/api/auth/me` entrega identidad mínima validada.
7. En `development`, cualquier usuario del tenant con el scope puede probar el portal sin App Role definitivo.
8. Fuera de `development`, se mantienen roles autorizados y denegación por defecto.
9. Login, access denied y session expired son rutas públicas; el portal es protegido.
10. Logout usa redirect y vuelve a `/login`.

## Impacto

- RF-AUTH-001..013 y RN-AUTH-001..010 pasan a implementación.
- Se agregan pruebas de MSAL, rutas, servicio de autenticación y validadores JWT.
- Se agrega `session-management.feature` y guía `docs/authentication-dev-test.md`.
- No se habilita acceso externo, Graph, correo, aprobación interna ni compra.

## Riesgos

- Redirect URI, consentimiento del scope o exposición de API mal configurados en Entra.
- Cuenta del tenant sin consentimiento delegado.
- Diferencia entre audience como client ID y Application ID URI.
- Prueba interactiva pendiente si no se proporcionan credenciales al agente.

## Evidencia de ejecución

- Runtime config coincide con las variables locales esperadas sin mostrar valores.
- Spring inicia con perfil `development` y metadata real del issuer.
- `/api/auth/me` anónimo responde 401.
- Chrome limpio renderiza `/login`, acceso externo deshabilitado y ningún password input.
- Prueba automatizada de navegador pulsa el botón y confirma redirect a `login.microsoftonline.com` mediante endpoint OAuth 2.0 v2.
- 31 pruebas Angular y 10 pruebas Spring pasaron; una integración Testcontainers fue omitida por falta de socket dentro del contenedor Maven.
- Azure CLI está autenticado en un tenant distinto al configurado, por lo que no fue posible inspeccionar la App Registration ni confirmar `requestedAccessTokenVersion`.
- Login completo, respuesta 200 de `/api/auth/me`, identidad real y logout permanecen PENDIENTES DE PRUEBA INTERACTIVA.

## Incidente AUTH-DEV-001 — sesión expirada después del consentimiento

Evidencia: Entra completa login/consentimiento, pero `/api/auth/me` responde 401 y Angular muestra sesión expirada. El rechazo ocurre en Resource Server antes del controlador. Se autoriza diagnóstico development mediante un código categórico seguro en header/log (`ISSUER`, `AUDIENCE`, `TENANT`, `EXPIRED`, `SIGNATURE` o `INVALID_TOKEN`), sin incluir token, claims o valores configurados. El diagnóstico no se habilita como detalle público fuera de development.
## Incidente AUTH-DEV-002 — compatibilidad de issuer de Microsoft Entra ID

- **Evidencia:** durante una autenticación real del tenant de desarrollo, el backend rechazó el access token en la validación de `issuer`.
- **Causa:** la API estaba configurada para aceptar exclusivamente el issuer v2 (`login.microsoftonline.com/{tenant}/v2.0`), mientras la App Registration del backend emitió un token con el issuer v1 de Entra (`sts.windows.net/{tenant}/`).
- **Decisión:** en desarrollo, y de forma compatible con producción, el Resource Server acepta únicamente los dos formatos oficiales de issuer de Microsoft Entra ID correspondientes al mismo tenant configurado. No se aceptan tenants ni issuers arbitrarios.
- **Controles conservados:** validación criptográfica, vigencia, audiencia explícita, claim `tid` y scope `ExamRequests.Access`.
- **Recomendación administrativa:** confirmar en la App Registration del backend si `requestedAccessTokenVersion` debe establecerse en `2`. Esta acción externa no es requisito para que el backend valide de forma segura ambos formatos oficiales.
- **Clasificación:** MODIFICADO.
