# Prueba manual de autenticación en desarrollo

Esta guía no contiene contraseñas, tokens ni valores reales de configuración.

## Variables requeridas

El archivo local `.env`, fuera de Git, debe definir:

- `TENANT_ID`
- `FRONTEND_CLIENT_ID`
- `BACKEND_CLIENT_ID`
- `BACKEND_SCOPE`
- `FRONTEND_URL`
- `BACKEND_URL`

Docker deriva authority, issuer y audiences. `runtime-config.json` nunca debe contener client secret, contraseña, token o credencial de base de datos.

## Iniciar

1. Activar Docker Desktop.
2. Ejecutar `docker compose up -d --build`.
3. Confirmar los servicios con `docker compose ps`.
4. Abrir `http://localhost:4200` en una ventana privada.
5. Debe mostrarse `/login`, no el formulario.

## Login

1. Seleccionar **Iniciar sesión con Microsoft**.
2. Confirmar navegación a `login.microsoftonline.com`.
3. Autenticarse con una cuenta válida, por ejemplo `AC_Ventas_Dev@nwr1.onmicrosoft.com`, `edgardo.nvf@nwr1.onmicrosoft.com`, `testingcenter.dev@nwr1.onmicrosoft.com` o un aprobador de prueba.
4. No registrar la contraseña en capturas, logs o documentación.
5. Después del redirect, comprobar `/exam-requests/new`.
6. Confirmar nombre y correo reales en el header y Datos del solicitante.

## Verificar token y API

1. Abrir DevTools → Network y filtrar `auth/me`.
2. Verificar `GET /api/auth/me` con estado 200.
3. Confirmar que el request incluye Bearer, sin copiar el token.
4. Confirmar que la respuesta contiene únicamente identidad mínima, scopes y roles.
5. Comprobar que `runtime-config.json` no contiene claves `secret`, `password` o `token`.

Un 401 indica token ausente, inválido, expirado, issuer, tenant o audience incorrectos. Un 403 indica scope o autorización insuficiente.

## Logout

1. Seleccionar **Cerrar sesión** y confirmar si hay cambios.
2. Completar logout Microsoft.
3. Verificar retorno a `/login`.
4. Intentar volver: una ruta interna no debe quedar funcional.

## Otra cuenta

Usar una ventana privada nueva o cerrar completamente la sesión Microsoft. No reutilizar ni documentar credenciales.

## Validación de Entra

Si falla, revisar redirect URI exacta `http://localhost:4200`, plataforma SPA, scope expuesto, permiso delegado y consentimiento, Application ID URI, tenant de ambas aplicaciones y access token v2.
