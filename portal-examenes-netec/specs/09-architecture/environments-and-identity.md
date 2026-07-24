# Ambientes e identidad

## Development con tenant real

`ENVIRONMENT_NAME=development` no significa bypass. Angular siempre configura MSAL y protege `${window.location.origin}/api/*`. Spring usa `SPRING_PROFILES_ACTIVE=development`, issuer del tenant, tenant allowlisted y audiences client ID/Application ID URI. La misma imagen conserva configuración runtime.

La prueba interactiva requiere que la App Registration backend emita access tokens compatibles con el issuer configurado, preferentemente v2 (`requestedAccessTokenVersion=2`), y que el frontend tenga permiso/consentimiento para `ExamRequests.Access`.

| Ambiente | Frontend/backend | Identidad | Regla |
|---|---|---|---|
| Local | Angular dev proxy o NGINX local | identidad simulada explícita | nunca producción |
| Pruebas | misma imagen candidata | tenant/app de pruebas | configuración pública runtime |
| Staging | misma imagen promovida | tenant/app autorizada | sin localhost/defaults |
| Producción | misma imagen aprobada | Entra ID productivo | same-origin, secretos administrados |

El navegador solicita tokens públicos MSAL; Spring Boot valida JWT de manera independiente. NGINX solo transporta. El flujo normal same-origin evita CORS; desarrollo puede usar `proxy.conf.json`, NGINX local o CORS restringido. El repositorio ya utiliza proxy Angular, por lo que se conserva como estrategia actual de desarrollo.

La experiencia añade landing, restauración, guard y logout sin cambiar configuración pública/privada. Producción no ofrece login local. `/api/auth/me` es contrato definitivo; `/api/v1/me` es implementación actual a retirar coordinadamente. Redirect local confirmado: `http://localhost:4200`; otros ambientes pendientes.
