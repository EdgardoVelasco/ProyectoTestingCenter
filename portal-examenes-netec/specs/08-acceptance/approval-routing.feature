# language: es
Característica: Enrutamiento de solicitudes al aprobador por sede
  Antecedentes:
    Dado que un AC autenticado captura una solicitud

  @BDD-071 Escenario: Resolver Felipe González para BOG
    Dada una regla activa y vigente de BOG para Felipe González con correo configurado
    Cuando el sistema resuelve el aprobador
    Entonces muestra a Felipe González sin permitir editar el destinatario

  @BDD-072 Escenario: Resolver Felipe González para MED
    Dada una regla activa y vigente de MED para Felipe González con correo configurado
    Cuando resuelve
    Entonces muestra a Felipe González

  @BDD-073 Escenario: Resolver Felipe González para SCL
    Dada una regla activa y vigente de SCL para Felipe González con correo configurado
    Cuando resuelve
    Entonces muestra a Felipe González

  @BDD-074 Escenario: Resolver Felipe González para LIM
    Dada una regla activa y vigente de LIM para Felipe González con correo configurado
    Cuando resuelve
    Entonces muestra a Felipe González

  @BDD-075 Escenario: Resolver Angélica para WTC
    Dada una regla activa y vigente de WTC para Angélica con correo configurado
    Cuando resuelve
    Entonces muestra a Angélica

  @BDD-076 Escenario: Resolver Paola Galvis para MAD
    Dada una regla activa y vigente de MAD para Paola Galvis con correo configurado
    Cuando resuelve
    Entonces muestra a Paola Galvis

  @BDD-077 Escenario: Sede sin regla activa
    Dada una sede activa sin regla
    Cuando intenta enviar
    Entonces recibe APPROVAL_ROUTE_UNAVAILABLE y puede guardar borrador

  @BDD-078 Escenario: Regla con correo faltante
    Dada una regla activa sin correo confirmado
    Cuando intenta enviar
    Entonces recibe APPROVER_EMAIL_INVALID y no se crea outbox

  @BDD-079 Escenario: Regla inactiva
    Dada una regla inactiva
    Cuando resuelve
    Entonces la trata como no disponible

  @BDD-080 Escenario: Regla fuera de vigencia
    Dada una regla cuyo intervalo no incluye el instante actual
    Cuando resuelve
    Entonces la trata como no disponible

  @BDD-081 Escenario: Cambio de sede antes del envío
    Dado que resolvió BOG
    Cuando cambia a WTC
    Entonces elimina el resultado anterior y resuelve a Angélica

  @BDD-082 Escenario: Cambio de aprobador durante borrador
    Dado un borrador confirmado visualmente
    Y que cambia la regla vigente
    Cuando envía
    Entonces backend devuelve APPROVAL_ROUTE_CHANGED y exige nueva confirmación

  @BDD-083 Escenario: Conservar aprobador histórico
    Dada una solicitud ENVIADA_A_APROBADOR
    Cuando cambia la regla de su sede
    Entonces conserva el snapshot y ruleId utilizados

  @BDD-084 Escenario: Frontend intenta alterar destinatario
    Cuando el cliente incluye otro destinatario
    Entonces el contrato lo rechaza o ignora y nunca lo usa

  @BDD-085 Escenario: Backend ignora destinatario cliente
    Dado un nombre o correo manipulado
    Cuando submit procesa
    Entonces resuelve exclusivamente la regla vigente

  @BDD-086 Escenario: Falla el correo al aprobador
    Dada solicitud y outbox confirmados
    Cuando falla temporalmente el proveedor
    Entonces queda PENDIENTE_NOTIFICACION sin perder solicitud ni snapshots

  @BDD-087 Escenario: Reintento exitoso
    Dado el outbox fallido con destinatario snapshot
    Cuando el reintento es aceptado
    Entonces queda SENT y la solicitud ENVIADA_A_APROBADOR

  @BDD-088 Escenario: Copia a Testing Center pendiente
    Cuando se prepara el correo
    Entonces no agrega copia a Testing Center hasta confirmar P-30

  @BDD-089 Escenario: Guardar sin regla configurada
    Dada una sede sin regla
    Cuando guarda
    Entonces conserva BORRADOR sin folio ni outbox

  @BDD-090 Escenario: Auditoría de la regla aplicada
    Dado un submit exitoso
    Cuando consulta la auditoría autorizada
    Entonces registra sede, ruleId, versión, resultado y correlación sin correo completo en logs

  @BDD-091 Escenario: Usar correo oficial configurado
    Dada una regla inicial para una sede confirmada
    Cuando backend crea el outbox
    Entonces usa el correo oficial configurado para el aprobador y no un valor codificado

  @BDD-092 Escenario: Copiar a Testing Center para sede incluida
    Dada una sede clasificada expresamente dentro de la política “LATAM y MAD”
    Cuando genera la notificación
    Entonces incluye copia a LATAM_Testing_Center@netec.com.mx

  @BDD-093 Escenario: No copiar al AC
    Dada cualquier solicitud de aprobación
    Cuando genera destinatarios
    Entonces no incluye al AC solicitante como copia

  @BDD-094 Escenario: Bloquear administración sin propietario autorizado
    Dado que aún no existe un propietario de configuración aprobado
    Cuando un usuario intenta cambiar una regla en producción
    Entonces el sistema bloquea la operación
    Y no asigna autorización por defecto
