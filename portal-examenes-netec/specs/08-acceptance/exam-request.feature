# language: es
Característica: Registrar y consultar solicitudes propias
  Antecedentes: Dado que Ana está autenticada con el rol EXAM_SALES

  @BDD-001 Escenario: Guardar solicitud como borrador
    Cuando guarda información parcial válida
    Entonces se crea un BORRADOR sin folio ni correo

  @BDD-002 Escenario: Editar borrador
    Dado un borrador propio con versión vigente
    Cuando cambia la ciudad y guarda
    Entonces la ciudad y auditoría quedan actualizadas

  @BDD-003 Escenario: Intentar enviar solicitud incompleta
    Cuando intenta enviar sin correo del participante
    Entonces recibe VALIDATION_FAILED con el campo participantEmail

  @BDD-004 Escenario: Enviar solicitud válida
    Dado un borrador completo con catálogos activos
    Cuando confirma el envío
    Entonces obtiene un folio y existe un evento outbox

  @BDD-009 Escenario: Doble clic en enviar
    Cuando envía dos veces con la misma clave de idempotencia
    Entonces existe una transición, un folio y un evento outbox

  @BDD-011 Escenario: Consultar solicitud ajena
    Cuando consulta el identificador de otra persona
    Entonces recibe RESOURCE_NOT_FOUND

  @BDD-012 Escenario: Catálogo inactivo
    Dado que el examen fue desactivado
    Cuando intenta enviar
    Entonces recibe INACTIVE_CATALOG y conserva el borrador

  @BDD-013 Escenario: Relación examen tecnología inválida
    Cuando selecciona un examen de otra tecnología y valida
    Entonces recibe INVALID_CATALOG_RELATION

  @BDD-014 Escenario: Error del backend
    Cuando ocurre un error inesperado
    Entonces recibe Problem Details con correlationId sin detalles internos

  @BDD-015 Escenario: Pérdida temporal de conexión
    Cuando falla el guardado por red
    Entonces el formulario conserva los datos y permite reintentar

  @BDD-017 Escenario: Usuario no autenticado
    Cuando invoca la API sin token
    Entonces recibe 401

  @BDD-018 Escenario: Usuario sin rol
    Dado un token válido sin EXAM_SALES
    Cuando intenta crear
    Entonces recibe 403

  @BDD-019 Escenario: Consulta paginada
    Dado que tiene 25 solicitudes
    Cuando consulta tamaño 20
    Entonces recibe 20 elementos y total 25

  @BDD-020 Esquema del escenario: Filtrar solicitudes propias
    Cuando filtra por <filtro>
    Entonces solo recibe coincidencias propias
    Ejemplos:
      | filtro |
      | folio |
      | alumno |
      | estado |
      | tecnología |
      | fecha |

