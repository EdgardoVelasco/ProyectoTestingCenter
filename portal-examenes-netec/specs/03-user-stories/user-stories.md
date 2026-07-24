# Historias de usuario

| ID | Épica; historia y valor | Prioridad/dependencias | RF / RN | Negativo principal |
|---|---|---|---|---|
| HU-001 | EP-01: Como Ventas quiero acceder identificado para no capturar mis datos | P0 / Entra | 001-002 / 003 | token inválido |
| HU-002 | EP-02: crear solicitud para iniciar captura estructurada | P0 / HU-001 | 003 / 003 | formato inválido |
| HU-003 | EP-02: guardar borrador para continuar después | P0 / 002 | 004 / 013-014 | conflicto versión |
| HU-004 | EP-02: editar borrador para corregirlo | P0 / 003 | 005 / 008,016 | ajeno/no borrador |
| HU-005 | EP-02: validar información para corregir antes de enviar | P0 / catálogos | 006-007 / 001-006,019-020 | relación inválida |
| HU-006 | EP-03: detectar duplicado para evitar compra repetida | P0 / 005 | 008 / 007 | carrera concurrente |
| HU-007 | EP-03: enviar y obtener folio para dar seguimiento | P0 / 005-006 | 009-010,014,019 / 009-010,015 | doble clic |
| HU-008 | EP-04: consultar mis solicitudes para conocer estado | P0 / 001 | 015,017 / 016 | filtros inválidos |
| HU-009 | EP-04: consultar detalle propio para revisar instantánea | P0 / 008 | 016 / 016,018 | solicitud ajena |
| HU-010 | EP-02: cancelar borrador para descartarlo | P1 / 003 | API cancel / 008 | estado no permitido |
| HU-011 | EP-05: conservar solicitud si falla correo | P0 / 007 | 011-012 / 010-012 | proveedor caído |
| HU-012 | EP-05: reintentar notificación para entrega eventual | P0 / 011 | 013 / 012,015 | agotamiento |
| HU-013 | EP-06: auditar cambios para trazabilidad | P0 / transversal | 018 / 014 | dato sensible |
| HU-014 | EP-02: cargar catálogos dependientes para elegir combinaciones válidas | P0 / catálogos | 007 / 004-006,017 | catálogo inactivo |
| HU-015 | EP-01: restringir acceso por usuario para proteger datos | P0 / 001 | 015-016 / 016 | enumeración de IDs |
| HU-016 | EP-06: recibir errores uniformes para recuperar la operación | P0 / transversal | 020 / 020 | backend/conexión |
| HU-017 | EP-07: consultar examen activo para elegir el producto correcto | P0 / catálogos | 021 / 021,034 | catálogo vacío/inactivo |
| HU-018 | EP-07: autocompletar examen/precio para evitar transcripción | P0 / HU-017 | 022 / 022,035-036 | precio/moneda ausente |
| HU-019 | EP-07: calcular total exacto para revisar importe | P0 / HU-018 | 023,029 / 023-026,037-039 | total manipulado |
| HU-020 | EP-08: agregar, editar y eliminar participantes | P0 / HU-003 | 024 / 028,033 | límite/estado enviado |
| HU-021 | EP-08: validar cantidad y participantes | P0 / HU-019-020 | 025-026 / 024,028-031 | cantidad desigual/correo repetido |
| HU-022 | EP-07: congelar datos comerciales al enviar | P0 / HU-018-019 | 027 / 027,033-034,040 | precio cambia antes/después |
| HU-023 | EP-07: validar referencia según contexto | P0 / catálogos | 028 / 032 | requerida ausente |
| HU-024 | EP-07: revisar resumen financiero | P0 / HU-019 | 029 / 025-026,037 | datos recalculados |
| HU-025 | EP-07: confirmar solicitud completa antes de Facturación | P0 / HU-017-024 | 030 / 001,040 | cancelar confirmación |
| HU-026 | EP-07: agregar varios exámenes para representar el pedido real | P0 / HU-017 | 031 / 041,043 | línea repetida/límite |
| HU-027 | EP-08: asignar participantes por examen para que todo voucher tenga destinatario | P0 / HU-020,026 | 032 / 042 | línea sin asignación |
| HU-028 | EP-07: ajustar precio de venta sin alterar costo base | P0 / HU-018 | 033 / 023,025,044 | manipular costo base |
| HU-029 | EP-06: como Testing Center quiero mantener exámenes/precios para controlar el catálogo | P0 / rol | 034 / 052-054 | vigencia traslapada/no autorizado |
| HU-030 | EP-07: resolver precio por sucursal para usar moneda correcta | P0 / HU-017 | 035 / 051-052,056-059 | MAD sin tasa vigente |
| HU-031 | EP-06: mantener tipo de cambio para que MAD calcule EUR automáticamente | P0 / rol | 036 / 056-057 | tasa ausente/solapada |
| HU-032 | EP-09: como AC quiero consultar sedes activas para elegir el enrutamiento correcto | P0 / catálogos | 037 / 060 | catálogo vacío |
| HU-033 | EP-09: como AC quiero ver el aprobador resuelto para revisar el destino | P0 / HU-032 | 038-039 / 061-067 | regla ausente |
| HU-034 | EP-09: como AC quiero enviar directamente al aprobador para eliminar el reenvío de Testing Center | P0 / HU-033 | 040 / 070-075 | correo inválido |
| HU-035 | EP-09: como sistema quiero bloquear sedes sin regla para evitar envíos incorrectos | P0 / HU-032 | 041 / 066,075 | inactiva/vencida |
| HU-036 | EP-09: como auditor quiero conservar el aprobador histórico | P0 / HU-034 | 042 / 068-069,076 | regla cambia después |
| HU-037 | EP-09: como auditor quiero registrar la resolución para explicar el destinatario | P0 / HU-033 | 043 / 072 | PII excesiva |
| HU-038 | EP-09: como administrador futuro quiero auditar la regla aplicada | P0 / HU-037 | 044 / 072,077 | conflicto de versión |
| HU-039 | EP-09: como AC quiero que submit revalide el aprobador para usar configuración vigente | P0 / HU-033 | 045 / 073-074,077 | destinatario alterado |
| HU-040 | EP-09: como administrador futuro autorizado quiero consultar reglas para operarlas de forma controlada | P1 / P-25 | 046 / 072,081 | sin propietario/acceso no autorizado |
| HU-041 | EP-05: como Testing Center quiero que una falla del correo no pierda la solicitud | P0 / HU-034 | 012-013,040 | fallo/reintento |
| HU-042 | EP-05: como Testing Center quiero recibir copia cuando la política de sede lo indique para conocer la solicitud sin reenviarla | P0 / P-39 | 047 / 079-080 | sede fuera/ambigua |

HU-017..025 son **AGREGADAS** por evidencia real. HU-002..007 quedan **MODIFICADAS** para colección de participantes y datos comerciales; ninguna historia de aprobación fue añadida.

Cada historia usa CA del mismo número cuando existe; HU-011/012 usan CA-011..013, HU-014 CA-007 y HU-015 CA-015/016. Definition of Done y tareas están en planificación.

HU-032..042 son AGREGADAS. No incluyen aprobar/rechazar ni comprar; la administración mutable de reglas es futura.

## Historias DRAFT de autenticación

| ID | Historia | RF/RN | Negativo |
|---|---|---|---|
| HU-AUTH-001 | Como usuario interno quiero iniciar sesión con Microsoft para acceder con identidad corporativa. | RF-AUTH-001..003 / RN-AUTH-001..002 | error/redirect duplicado |
| HU-AUTH-002 | Como autenticado quiero restaurar sesión al recargar para continuar. | 004,013 / 004 | cuenta expirada/loop |
| HU-AUTH-003 | Como autenticado quiero ver mi nombre para confirmar la cuenta. | 005..007 / 003,012..013 | identidad incompleta |
| HU-AUTH-004 | Como usuario quiero cerrar sesión para impedir accesos posteriores. | 008,014 / 009,014 | cambios/logout incompleto |
| HU-AUTH-005 | Como usuario sin permisos quiero mensaje claro sin exposición interna. | 009..011 / 005,011..012 | historial/403 |
| HU-AUTH-006 | Como externo quiero identificar una capacidad futura aunque no esté disponible. | 012 / 008 | click no ejecuta nada |

## Historias DRAFT del stepper

| ID | Historia | RF/RN | Negativo |
|---|---|---|---|
| HU-UI-021 | Completar solicitud con Solicitante fijo y cuatro pasos. | RF-UI-041..043 / RN-UI-041 | paso inválido |
| HU-UI-022 | Regresar sin perder información. | 044,046 / 042..043 | controles destruidos |
| HU-UI-023 | Guardar borrador desde cualquier paso. | 048 / 045 | red/versión |
| HU-UI-024 | Visualizar errores por paso y campo. | 047,053 / 047..048 | solo color |
| HU-UI-025 | Revisar y corregir resumen antes del envío. | 050..052 / 044,046,049..051 | datos obsoletos |
| HU-UI-026 | Continuar un borrador desde un paso seguro. | 049 / 047 | último paso inválido |

Los Given/When/Then y negativos normativos están en `authentication.feature` y `form-stepper.feature`.
## Historias aprobadas del incremento

| ID | Historia / valor | Prioridad / dependencias |
|---|---|---|
| HU-AUTH-007 | Como usuario quiero cerrar sesión con Microsoft para proteger el dispositivo. | P0 / Entra |
| HU-AUTH-008 | Como usuario quiero confirmar salida con cambios para evitar pérdida accidental. | P0 / formulario dirty |
| HU-UI-027 | Como AC quiero registrar participantes antes de exámenes para asignarlos después. | P0 / ADR-038 |
| HU-CAT-001 | Como AC quiero consultar catálogo por proveedor para encontrar exámenes. | P0 / API catálogo |
| HU-CAT-002 | Como AC quiero buscar por código/nombre/curso. | P0 |
| HU-CAT-003 | Como AC quiero ver costo base, moneda, retake y comentarios. | P0 |
| HU-ASG-001 | Como AC quiero asignar participantes a un examen. | P0 |
| HU-ASG-002 | Como AC quiero asignar varios exámenes a un participante. | P0 / N:M |
| HU-ASG-003 | Como AC quiero revisar la matriz antes de enviar. | P0 |
| HU-ASG-004 | Como AC quiero corregir asignaciones en borrador. | P0 |

Criterio común Given/When/Then: dada una sesión y borrador propios, cuando se realiza la acción válida, entonces el agregado se conserva y recalcula en backend. Casos negativos: recurso inactivo, duplicado, participante ajeno, sesión expirada y versión obsoleta.
## Historias logout visible, UPN y Empresa

### HU-AUTH-009 Identificar logout

Como usuario autenticado quiero ver claramente “Cerrar sesión” para finalizar mi sesión de forma segura. P0; depende de sesión y CMP-012/027. Given header autenticado, when se renderiza, then muestra texto, borde y estados accesibles. Negativo: nunca icono solo.

### HU-AUTH-010 Ver mi correo corporativo

Como usuario autenticado quiero ver mi UPN para confirmar la cuenta utilizada. P0; depende de `/api/auth/me`. Given claims válidos, when backend resuelve identidad, then `username` muestra el primer valor disponible según precedencia. Negativo: sin valor muestra “No disponible”, no ejemplo.

### HU-COM-001 Capturar empresa manualmente

Como usuario de Ventas quiero escribir el nombre de la empresa para registrar sin catálogo. P0; depende de ADR-042/V4. Given un borrador, when se informa una empresa válida, then se normaliza, persiste y restaura como snapshot. Negativos: uno o más de 150 caracteres, espacios solos y `N/A` se rechazan; ausencia se permite solo en borrador.
## Historias Authenticated User Menu

- **HU-UI-USER-001 Abrir menú:** como usuario autenticado quiero abrir acciones desde mi identidad. P0; RF 001/004; RN 001/007/010. Given identidad, when activa con mouse/teclado, then abre un único menú. Negativo: identidad no habilitada durante carga.
- **HU-UI-USER-002 Ver identidad:** quiero confirmar la cuenta activa. P0; RF 002/003/008/009; RN 001/005/006/009. Given sesión, then avatar/nombre/UPN visibles; en móvil UPN completo permanece en menú. Negativo: no datos ficticios.
- **HU-UI-USER-003 Cerrar sesión:** quiero cerrar desde el menú. P0; RF 005/006; RN 002..004. Given menú abierto, when elige Cerrar sesión, then usa confirmación y MSAL existentes. Negativo: cancelar conserva sesión.
- **HU-UI-USER-004 Usar teclado:** quiero operar sin mouse. P0; RF 007/010; RN 007/010. Given foco en activador, Enter/Space abre, Escape cierra y restaura foco. Negativo: sin trampa o pérdida de foco.

## Identidad comercial

- **HU-COM-002 Obtener automáticamente al asesor:** como usuario autenticado quiero que el portal me identifique como asesor para evitar recaptura. P0; RF-COM-006/008/010/012; RN-COM-008..011/015/016. Given identidad válida, when creo borrador, then backend asigna requester y asesor iguales. Negativo: un valor cliente no prevalece.
- **HU-COM-003 Verificar mi identidad comercial:** como usuario autenticado quiero ver mi nombre como asesor para confirmar la asociación. P0; RF-COM-007/011; RN-COM-009/014. Given formulario, then muestra campo read-only; sin nombre muestra error seguro y bloquea avance/envío.
