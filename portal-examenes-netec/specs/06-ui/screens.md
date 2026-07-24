# Pantallas

## Contrato de marca — IN_REVIEW

Todas las pantallas futuras se rigen por BR-001..012, tokens, inventario y VAC. La pantalla Crear solicitud adopta el orden Solicitante fijo → Comercial → Participantes → Exámenes → Resumen conforme `form-specification.md` y ADR-038.

## Estado de implementación frontend — 2026-07-21

**AGREGADO.** La pantalla Nueva solicitud implementa las secciones Solicitante, Comercial, Participantes, Líneas de examen, Resumen y Acciones en cards responsivas. Incluye identidad solo lectura, catálogos simulados aislados, filtros de examen, colecciones dinámicas, asignaciones por línea, importes visuales, confirmación y estados de carga/error.

**PENDIENTE DE BACKEND.** Los endpoints de catálogos, validación y submit aún no existen en I1; por eso sus servicios son mocks explícitos de desarrollo. Guardar borrador reutiliza la API real y persiste solamente clave programada, referencia y observaciones hasta que el contrato extendido se implemente. MAD no calcula una tasa ficticia: bloquea validar/enviar y explica que requiere conversión backend.

Todas cumplen teclado, foco visible, labels persistentes, contraste AA, regiones de estado `aria-live`, título único y resumen enlazado de errores.

| Pantalla | Propósito/actor | Componentes, acciones y estados | Validación/mensaje/navegación | CA |
|---|---|---|---|---|
| Acceso | redirigir a Entra / cualquiera | progreso; reintentar; autenticando/error | 401 “Tu sesión no es válida”; éxito→Mis solicitudes | 001 |
| Mis solicitudes | localizar propias / Ventas | tabla/tarjetas, paginador, filtros folio/alumno/estado/tecnología/fecha; nueva/ver | carga, vacío, error conservando filtros | 015,017 |
| Nueva solicitud | crear / AC | secciones A–E, sede, tarjeta “Aprobador asignado”, participantes, líneas, precio y total | aprobador solo lectura; sin regla bloquea Enviar pero permite Guardar | 002-007,021-045 |
| Editar borrador | continuar / propietario | mismo formulario, versión; Guardar/Cancelar/Enviar | 409 ofrece recargar sin sobrescribir | 005,019 |
| Detalle | revisar snapshot / propietario | cabecera folio/estado, secciones solo lectura | ajena/no existe→Error acceso sin revelar | 016 |
| Confirmación previa | revisar / AC | solicitante, sede, aprobador, empresa/comercial, exámenes, participantes, total y referencia | cambios de precio, sede o regla obligan a revisar | 029-030,039,045 |
| Confirmación posterior | confirmar registro / AC | folio, sede, aprobador y estado de notificación | “Solicitud registrada; la notificación al aprobador está pendiente” si aplica | 014,027,040-042 |
| Error acceso | sesión/permiso | mensaje y Volver/Ingresar | no revela recurso | 001,016 |
| Error general | recuperación | correlationId, Reintentar/Volver | lenguaje no técnico; nunca stack | 020 |

## Pantallas DRAFT de login y sesión

| Pantalla | Propósito/estado | Componentes/acciones | Navegación/mensajes | Accesibilidad/responsive | RF |
|---|---|---|---|---|---|
| Acceso al Portal de Registro de Exámenes NETEC | usuario sin sesión / UNAUTHENTICATED | logo, nombre, intro, restricción, soporte, login Microsoft, acceso externo disabled + “Disponible próximamente” | Microsoft→REDIRECTING; externo no navega | foco, teclado, marca NETEC, una columna móvil | AUTH-001..003,012 |
| Autenticando | REDIRECTING/AUTHENTICATING/RESTORING | indicador y mensaje seguro | éxito→portal; fallo→error | `aria-live`, movimiento reducido | AUTH-002,004 |
| Error de autenticación | AUTHENTICATION_ERROR | alerta, Reintentar, soporte | sin stack/token | foco en alerta | AUTH-011 |
| Acceso denegado | autenticado sin permiso | explicación mínima, logout, soporte | no revela grupos/política | heading/acciones claras | AUTH-010 |
| Sesión expirada | SESSION_EXPIRED | advertencia, volver a iniciar | bloquea submit; advierte memoria | diálogo/pantalla accesible | AUTH-013 |
| Portal autenticado | AUTHENTICATED | header con logo, portal, nombre, username opcional, menú/logout | rutas protegidas | menú por teclado | AUTH-007..009 |
| Crear solicitud por pasos | autenticado | stepper 1..5, panel y acciones | avanzar/volver/guardar/resumen | horizontal/compacto | UI-041..053 |
| Confirmar logout con cambios | sesión DIRTY | Cancelar/Cerrar sesión | confirmar descarta solo memoria | foco atrapado/restaurado | AUTH-008,014 |

La referencia visual de usuario/contraseña es conceptual; no existen campos de credenciales en la pantalla NETEC. El header nunca muestra identidad ficticia, tokens, scopes o roles completos. Avatar y correo visible quedan P-LOGIN-07/08.
## Ajustes aprobados 2026-07-23

- **DEPRECADO por ADR-043:** botón secondary outlined directo; sustituido por CMP-028 y logout textual dentro del menú.
- Datos del solicitante: Correo muestra `/api/auth/me.username` o “No disponible”, como CMP-005 no editable.
- Información comercial: Empresa es CMP-006 input texto obligatorio para completar el paso, helper “Ingresa el nombre de la empresa o cliente.”, sin catálogo.
## Header autenticado — menú de usuario

CMP-028 reemplaza el botón outlined directo. El activador muestra avatar, nombre, UPN y `expand_more`; abre un menú `xPosition=before` con resumen completo, divisor y “Cerrar sesión”. El contenido nunca aparece solo por hover.

## Información comercial — asesor

El Asesor Comercial se representa con CMP-029 read-only. Mientras carga la identidad muestra un estado seguro; con identidad muestra el nombre; ante ausencia muestra “No disponible” y un mensaje de error. El resumen repite el mismo nombre sin permitir edición.
