# Criterios de aceptación

## Evidencia frontend — 2026-07-21

CA-002, CA-004, CA-021..026 y CA-029..033 tienen representación visual y pruebas unitarias de los comportamientos disponibles sin backend extendido. CA-006/030 se simulan mediante servicios separados y diálogo de confirmación; no se consideran integrados hasta implementar `validate`/`submit`. CA-035 bloquea MAD cuando no existe precio convertido resuelto por backend, sin inventar tasa.

| ID | Given / When / Then |
|---|---|
| CA-001 | Dado usuario habilitado, cuando completa Entra, entonces API acepta JWT; inválido produce 401. |
| CA-002 | Dado token válido, cuando abre captura, entonces id/nombre/correo provienen de claims y no son editables. |
| CA-003 | Dada sesión, cuando crea, entonces obtiene BORRADOR propio con versión 0. |
| CA-004 | Dado borrador parcial, cuando guarda, entonces persiste sin folio/outbox/correo. |
| CA-005 | Dado borrador propio y versión vigente, cuando edita, entonces cambia y audita; versión vieja da 409. |
| CA-006 | Dado formulario incompleto, cuando valida/envía, entonces 400 incluye todos los fieldErrors conocidos y conserva UI. |
| CA-007 | Dada relación inactiva/incompatible, cuando valida, entonces 422 identifica campo y no envía. |
| CA-008 | Dado activo con mismo correo normalizado+examen, cuando envía otro, entonces 409 DUPLICATE_EXAM_REQUEST. |
| CA-009 | Dados envíos concurrentes, cuando asignan folio, entonces todos son únicos y secuenciales sin `count+1`. |
| CA-010 | Dado envío válido, cuando confirma transacción, entonces solicitud, snapshots y outbox existen juntos. |
| CA-011 | Dado outbox al aprobador snapshot, cuando proveedor acepta, entonces correo HTML/texto se marca SENT y solicitud ENVIADA_A_APROBADOR. |
| CA-012 | Dado error, cuando se registra intento, entonces no hay secretos/PII excesiva y solicitud permanece. |
| CA-013 | Dado fallo temporal, cuando vence backoff, reintenta; al quinto fallo queda DEAD_LETTER y alerta. |
| CA-014 | Dado commit exitoso, cuando responde submit, entonces muestra folio y estado aun con notificación pendiente. |
| CA-015 | Dado usuario, cuando lista, entonces solo propias, paginadas y ordenadas. |
| CA-016 | Dado ID ajeno, cuando consulta, entonces devuelve 404 sin revelar existencia. |
| CA-017 | Dados filtros válidos, cuando consulta, entonces combina folio/alumno/estado/tecnología/rango. |
| CA-018 | Dada mutación, cuando termina, entonces AuditEntry conserva actor, acción, entidad, fecha y correlación. |
| CA-019 | Dado doble clic/misma clave, cuando submit concurre, entonces una sola transición/outbox y misma respuesta lógica. |
| CA-020 | Dado error, cuando API responde, entonces usa Problem Details con code, timestamp y correlationId. |
| CA-021 | Dada sesión, cuando busca exámenes, entonces solo ve activos; vacío se informa sin inventar opciones. |
| CA-022 | Dado examId activo, cuando lo selecciona, backend devuelve código/nombre/fabricante/tecnología/certificación/costo base/moneda no editables y habilita precio de venta; datos base ausentes dan 422. |
| CA-023 | Dado precio 59.0000 USD y cantidad 2, cuando calcula, entonces backend devuelve 118.0000 USD e ignora/rechaza total cliente. |
| CA-024 | Dado BORRADOR, cuando agrega/edita/elimina participantes dentro del límite, entonces persiste la colección; enviado da 409. |
| CA-025 | Dada RN-030 activa, cuando cantidad difiere de participantes, entonces submit falla en ambos campos. |
| CA-026 | Dados correos equivalentes normalizados, cuando valida, entonces bloquea repetido interno o activo externo. |
| CA-027 | Dado submit, cuando el catálogo cambia después, entonces detalle conserva snapshots usados al enviar. |
| CA-028 | Dada solicitud válida, cuando referencia está vacía, no bloquea; cuando se captura, se conserva como cadena libre dentro del límite. |
| CA-029 | Dado borrador completo, cuando abre resumen, entonces muestra examen, precio, moneda, cantidad, total, participantes, empresa y referencia calculados. |
| CA-030 | Dado resumen vigente, cuando confirma, entonces backend revalida y envía; si precio/examen cambió, recalcula y exige nueva revisión. |
| CA-031 | Dado BORRADOR, cuando agrega dos exámenes distintos, conserva dos líneas con cantidades/importes separados. |
| CA-032 | Dado un participante y dos líneas, cuando lo asigna a ambas, existen dos vouchers asignados; una línea sin asignados no se envía. |
| CA-033 | Dado costo base 59 USD, cuando Ventas captura precio venta 55 USD, backend conserva ambos, calcula con 55 y no altera catálogo. |
| CA-034 | Dado Testing Center autorizado, cuando crea/modifica examen/precio, entonces vigencia, retake, comentarios y auditoría quedan disponibles; Ventas recibe 403. |
| CA-035 | Dada ubicación MAD, costo 100 USD y tasa 0.92 USD→EUR, cuando selecciona examen, backend devuelve base 92 EUR y snapshots de 100 USD/tasa; otra ubicación conserva 100 USD. |
| CA-036 | Dado rol autorizado, cuando registra una tasa USD→EUR vigente no solapada, queda auditada y disponible; Ventas recibe 403. |
| CA-037 | Dado AC autenticado, cuando consulta sedes, entonces recibe solo sedes activas y buscables. |
| CA-038 | Dada sede con regla activa/vigente/correo válido, cuando resuelve, entonces obtiene nombre y ruleId; de lo contrario recibe error sin inventar destinatario. |
| CA-039 | Dada resolución válida, cuando revisa el formulario, entonces ve “Aprobador asignado” y no puede editarlo. |
| CA-040 | Dado submit válido, cuando backend re-resuelve, entonces persiste solicitud+snapshots+outbox para el aprobador en una transacción. |
| CA-041 | Dada sede sin regla utilizable, cuando envía, entonces se bloquea; guardar borrador permanece permitido. |
| CA-042 | Dada solicitud enviada, cuando cambia la regla, entonces detalle conserva sede, nombre, correo y ruleId usados. |
| CA-043 | Dada resolución, cuando termina, entonces auditoría registra sede, regla, versión, resultado y correlación sin correo completo en logs. |
| CA-044 | Dado submit, cuando aplica regla, entonces persiste su id/versión y un cambio concurrente fuerza nueva resolución. |
| CA-045 | Dado destinatario enviado por cliente o regla cambiada, cuando submit procesa, entonces ignora el destinatario, resuelve backend y exige nueva confirmación si cambió. |
| CA-046 | Dado que no existe propietario autorizado, cuando cualquier usuario intenta administrar reglas en producción, entonces se bloquea; cuando el rol futuro sea aprobado podrá consultar reglas/vigencias y Ventas seguirá recibiendo 403. |
| CA-047 | Dada una sede incluida explícitamente en la política “LATAM y MAD”, cuando se genera la notificación, entonces copia a `LATAM_Testing_Center@netec.com.mx` y no copia al AC; una sede sin clasificación confirmada no recibe copia automática. |

## Criterios DRAFT de login y stepper

- CA-AUTH-001..014 corresponden uno a uno con RF-AUTH-001..014 y `authentication.feature`.
- CA-STEP-001..013 corresponden uno a uno con RF-UI-041..053 y `form-stepper.feature`.
- Given acceso, When se inspecciona, Then ofrece login Microsoft y no contiene campo password.
- Given acceso externo, When se enfoca/activa, Then comunica deshabilitado y no navega.
- Given identidad backend válida, When carga portal, Then header y Solicitante muestran la misma cuenta no editable.
- Given un paso inválido, When intenta avanzar, Then permanece, anuncia errores y enfoca el primero.
- Given datos capturados, When navega entre pasos, Then conserva valores.
- Given Resumen, When envía, Then confirma y backend revalida sesión y reglas.
## Criterios incremento logout–UPN–Empresa

- CA-AUTH-021..024: texto “Cerrar sesión”, borde visible, estados normal/focus/hover/active/loading/disabled y misma invocación MSAL.
- CA-AUTH-025: precedencia `preferred_username`, `upn`, `email`; `username` documentado como UPN resuelto.
- CA-AUTH-026..028: UPN visible en CMP-005, “No disponible” sin valor y ausencia de control editable.
- CA-COM-001: Empresa es `input type=text`, con label y helper, sin select/autocomplete.
- CA-COM-002: frontend exige trim lógico, 2–150 al completar el paso, no espacios solos ni `N/A`.
- CA-COM-003: backend permite ausencia en BORRADOR, valida un valor informado y devuelve 422 seguro si es inválido.
- CA-COM-004: guardar/restaurar conserva `companyNameSnapshot`.
- CA-COM-005: no se realiza solicitud a catálogo de empresas.
## Criterios Authenticated User Menu

CA-USER-001..010 corresponden uno a uno a RF-UI-USER-001..010. Deben demostrar identidad sin hover, iniciales correctas, menú único, texto logout, delegación sin MSAL, cierre exterior/Escape/foco, móvil, carga segura y teclado/ARIA.

## Asesor Comercial

- AC-COM-021: Adele Vance autenticada se muestra como “Adele Vance”.
- AC-COM-022/023: no existe selector y el valor no es editable.
- AC-COM-024: asesor coincide con solicitante.
- AC-COM-025: backend conserva el identificador autenticado.
- AC-COM-026: request no admite un asesor alternativo.
- AC-COM-027: otra sesión muestra otro asesor.
- AC-COM-028: históricos conservan nombre y UPN.
- AC-COM-029: identidad incompleta muestra error seguro y bloquea envío.
- AC-COM-030: no se consulta catálogo de asesores.
