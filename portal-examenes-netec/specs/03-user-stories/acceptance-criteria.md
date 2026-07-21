# Criterios de aceptación

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
| CA-011 | Dado outbox, cuando proveedor acepta, entonces correo escapado HTML/texto se marca SENT y solicitud ENVIADA_A_FACTURACION. |
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
