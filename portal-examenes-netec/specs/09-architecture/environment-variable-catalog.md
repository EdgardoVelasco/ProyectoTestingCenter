# Catálogo de variables de ambiente

Estado: **IN_REVIEW**. Se inspeccionaron nombres, nunca valores.

## Variables reales encontradas

| Nombre | Clasificación | Consumidor/propósito | Estado |
|---|---|---|---|
| `TENANT_ID` | pública frontend | Tenant Entra; candidata a `ENTRA_TENANT_ID` | Real, nombre por normalizar |
| `FRONTEND_CLIENT_ID` | pública frontend | Client ID de la SPA | Real |
| `BACKEND_CLIENT_ID` | configuración backend y derivación pública | Audience/client ID API; no es secreto | Real |
| `BACKEND_SCOPE` | pública frontend | Scope delegado API | Real |
| `FRONTEND_URL` | pública/infraestructura | Redirect/origen permitido según ambiente | Real; semántica por cerrar |
| `BACKEND_URL` | configuración NGINX | Destino actual conceptual | Real; separar host/port propuesto |
| `DB_URL` | configuración backend sensible | Conexión JDBC sin credencial embebida | Referenciada |
| `DB_USER` | secreto backend operacional | Usuario de base de datos | Referenciada |
| `DB_PASSWORD` | secreto backend | Contraseña de base de datos | Referenciada |
| `ENTRA_ISSUER_URI` | configuración backend | Issuer JWT permitido | Referenciada |
| `ENTRA_AUDIENCE` | configuración backend | Audience JWT permitida | Referenciada |
| `SPRING_PROFILES_ACTIVE` | configuración backend | Perfil Spring | Referenciada |
| `LOCAL_USER_ID/NAME/EMAIL/AREA/BUSINESS_UNIT` | configuración backend local | Identidad simulada solo local | Ejemplo versionado; no producción |

## Variables propuestas, no definitivas

| Nombre | Clasificación |
|---|---|
| `BACKEND_HOST`, `BACKEND_PORT`, `NGINX_LISTEN_PORT` | configuración NGINX |
| `ENTRA_TENANT_ID`, `ENTRA_FRONTEND_CLIENT_ID`, `ENTRA_BACKEND_SCOPE`, `ENTRA_AUTHORITY`, `ENTRA_REDIRECT_URI`, `API_BASE_PATH`, `ENVIRONMENT_NAME` | pública frontend |
| `ENTRA_BACKEND_CLIENT_ID`, `ENTRA_ALLOWED_AUDIENCES`, `SERVER_PORT`, `FRONTEND_ALLOWED_ORIGIN` | configuración backend |
| `ENTRA_BACKEND_CLIENT_SECRET`, `GRAPH_SENDER_MAILBOX`, `DATABASE_URL`, `DATABASE_USERNAME`, `DATABASE_PASSWORD` | futura privada/secreto backend |

Client IDs, tenant, authority y scope son visibles; ser públicos no autoriza modificarlos ni omitir validación. `GRAPH_SENDER_MAILBOX` puede ser dato operacional sensible aunque no sea credencial. Client secret, contraseñas, claves privadas y tokens jamás entran en configuración pública.

`.env` es local, está ignorado y no fue encontrado como archivo versionado. `.env.example` solo puede contener nombres y valores evidentemente ficticios.
