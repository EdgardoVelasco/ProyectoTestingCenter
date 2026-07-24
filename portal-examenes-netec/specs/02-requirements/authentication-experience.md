# Experiencia de acceso, sesión e identidad

Estado: **DRAFT / NO AUTORIZA IMPLEMENTACIÓN**. Fecha: 2026-07-23.

## Flujo normativo

Navegador sin sesión → página de acceso NETEC → “Iniciar sesión con Microsoft” → redirección Entra ID → retorno al portal → MSAL procesa respuesta y establece cuenta activa → obtiene token para `ExamRequests.Access` → `GET /api/auth/me` → backend valida firma, issuer, tenant, audience y scope → devuelve identidad mínima → portal muestra usuario y habilita rutas.

La referencia visual es conceptual. El portal no reproduce la pantalla Microsoft, no captura usuario/contraseña corporativos, no almacena contraseñas y no incorpora secretos. La contraseña solo se captura en páginas oficiales de Microsoft.

## Requisitos funcionales

En todos los requisitos el actor principal es Usuario interno; los errores usan Problem Details, no revelan token, claims sensibles ni configuración interna.

| ID | Actor; precondiciones | Flujo principal | Alternos y casos negativos | Postcondición; reglas | CA; prioridad; dependencias |
|---|---|---|---|---|---|
| RF-AUTH-001 Mostrar página de acceso | Usuario sin sesión; runtime válido | verificar sesión y mostrar acceso corporativo | sesión restaurable evita login; configuración inválida muestra fallo seguro | sin sesión funcional; RN-AUTH-004/007 | CA-AUTH-001; P0; runtime |
| RF-AUTH-002 Iniciar autenticación | Sin sesión; botón habilitado | iniciar redirect Entra | doble clic se ignora; error pasa a AUTHENTICATION_ERROR | REDIRECTING; RN-AUTH-001/002 | CA-AUTH-002; P0; Entra/MSAL |
| RF-AUTH-003 No capturar contraseñas | Cualquier estado | mostrar solo acción Microsoft | ningún campo password, validación local o simulación Microsoft | credencial fuera del portal; RN-AUTH-002 | CA-AUTH-003; P0; ADR-033 |
| RF-AUTH-004 Restaurar sesión | Caché MSAL válida | procesar retorno/cuenta antes de rutas | cuenta ausente o expirada vuelve a acceso sin loop | cuenta activa coherente; RN-AUTH-004 | CA-AUTH-004; P0; RF-AUTH-002 |
| RF-AUTH-005 Obtener identidad | Cuenta activa | obtener nombre/username mínimos | claim ausente no se inventa; identidad funcional se confirma por backend | identidad cargada o error; RN-AUTH-013 | CA-AUTH-005; P0; 004 |
| RF-AUTH-006 Consultar identidad validada | Token con scope | llamar `GET /api/auth/me` | 401 renueva/redirect; 403 acceso denegado; red no disponible reintenta | identidad backend disponible; RN-AUTH-005/006 | CA-AUTH-006; P0; API |
| RF-AUTH-007 Mostrar usuario autenticado | Identidad validada | mostrar nombre, username y logout | correo opcional según P-LOGIN-07; nunca token/roles completos | contexto de cuenta visible; RN-AUTH-012/013 | CA-AUTH-007; P0; 006 |
| RF-AUTH-008 Cerrar sesión | Sesión activa | advertir cambios, limpiar estado efímero, logout Entra y volver al acceso | cancelar conserva sesión; fallo remoto impide aparentar logout completo | sin acceso local; RN-AUTH-009/014 | CA-AUTH-008; P0; ADR-036 |
| RF-AUTH-009 Proteger rutas | Ruta interna solicitada | guard verifica cuenta y estado | URL directa/atrás sin sesión redirige al acceso | formulario inaccesible sin sesión; RN-AUTH-007/009 | CA-AUTH-009; P0; guard |
| RF-AUTH-010 Manejar acceso denegado | Usuario autenticado sin rol autorizado | mostrar pantalla 403 segura y logout | no revelar grupos, política o recurso | ACCESS_DENIED; RN-AUTH-011/012 | CA-AUTH-010; P0; backend 403 |
| RF-AUTH-011 Manejar error | Error Entra/MSAL/API | mensaje seguro, reintento y soporte | sin stack, token, tenant interno ni PII excesiva | AUTHENTICATION_ERROR recuperable | CA-AUTH-011; P0; contrato error |
| RF-AUTH-012 Deshabilitar acceso externo | Página de acceso | mostrar botón deshabilitado y “Disponible próximamente” | no navegación, evento, ruta o auth alterna | capacidad solo visual; RN-AUTH-008 | CA-AUTH-012; P0; ADR-035 |
| RF-AUTH-013 Expirar sesión | Sesión activa | bloquear envío, reautenticar por redirect y recuperar datos temporales | no enviar operación; mecanismo seguro de recuperación pendiente P-LOGIN-19 | SESSION_EXPIRED/RESTORING | CA-AUTH-013; P0; MSAL/API |
| RF-AUTH-014 Conservar borradores persistidos | Borrador guardado | logout no elimina datos backend | memoria no guardada se advierte, no se promete restauración | borrador sigue asociado a subject/oid | CA-AUTH-014; P0; RF-004 |

## Reglas

- **RN-AUTH-001:** Microsoft Entra ID es la fuente de autenticación de usuarios internos.
- **RN-AUTH-002:** el portal no solicita, valida, almacena ni administra contraseñas corporativas.
- **RN-AUTH-003:** la identidad del solicitante no es editable.
- **RN-AUTH-004:** datos locales por sí solos no constituyen autenticación.
- **RN-AUTH-005:** el backend valida firma, issuer, tenant, audience, expiración y scope del access token.
- **RN-AUTH-006:** `/api/auth/me` requiere `ExamRequests.Access`.
- **RN-AUTH-007:** un usuario no autenticado no accede al formulario.
- **RN-AUTH-008:** acceso externo permanece visible e inactivo en MVP.
- **RN-AUTH-009:** logout impide reutilizar rutas protegidas desde historial.
- **RN-AUTH-010:** borradores se asocian al identificador backend validado.
- **RN-AUTH-011:** cada usuario consulta sus borradores, salvo rol expresamente autorizado.
- **RN-AUTH-012:** interfaz y logs no muestran tokens ni claims sensibles.
- **RN-AUTH-013:** nombre y correo proceden de claims aprobados o `/api/auth/me`; backend es autoridad funcional.
- **RN-AUTH-014:** cerrar sesión elimina estado efímero, no borradores persistidos.

## Estados de autenticación

| Estado | Significado / pantalla | Acciones | Transición o error |
|---|---|---|---|
| UNAUTHENTICATED | acceso | iniciar Microsoft; externo deshabilitado | login→REDIRECTING |
| REDIRECTING | acceso con progreso | ninguna repetible | Entra→AUTHENTICATING; fallo→ERROR |
| AUTHENTICATING | retorno siendo procesado | esperar | cuenta→AUTHENTICATED; fallo→ERROR |
| AUTHENTICATED | portal/header | operar y logout | expira→SESSION_EXPIRED |
| SESSION_RESTORING | splash “Restaurando sesión” | esperar | válida→AUTHENTICATED; ausente→UNAUTHENTICATED |
| SESSION_EXPIRED | diálogo/pantalla segura | volver a iniciar; guardar solo si token aún válido | interacción→REDIRECTING |
| ACCESS_DENIED | pantalla 403 | volver/logout/soporte | permiso corregido requiere nueva sesión |
| AUTHENTICATION_ERROR | acceso con alerta | reintentar/soporte | reintento→REDIRECTING |
| LOGGING_OUT | progreso | ninguna operación protegida | fin→UNAUTHENTICATED |

## Identidad y solicitante

MSAL puede usar `sub`, `oid`, `name`, `preferred_username`, `tid`, `roles` y `scp` para detectar cuenta y solicitar tokens. Para autorización, propiedad de borradores y snapshots, la fuente autoritativa definitiva es `/api/auth/me`. Nombre y correo son obligatorios. Área y unidad son opcionales en MVP; ausencia se representa como “No disponible”. Solicitante es una tarjeta fija sobre el stepper, con loading/loaded/partial/error, y no un paso.

## Logout y expiración

Logout: si DIRTY, solicitar confirmación → limpiar cuenta activa/estado efímero → logout redirect Entra → acceso → guard bloquea historial. Borradores backend permanecen. Ante expiración se bloquea submit, se reautentica y se recuperan datos temporales; no hay autoguardado. P-LOGIN-19 debe definir almacenamiento temporal seguro y minimizado.

## Criterios de aceptación

CA-AUTH-001..014 corresponden uno a uno con RF-AUTH-001..014. Cada criterio exige escenario feliz y negativo, teclado/lector cuando aplique, ausencia de secretos y verificación backend en operaciones protegidas. Los Given/When/Then normativos están en `authentication.feature`.
