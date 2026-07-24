Feature: Notificacion de solicitud de aprobacion
  Como sistema
  Quiero persistir y notificar la solicitud al aprobador de la sede
  Para sustituir el reenvio manual sin perder la solicitud

  Scenario: Resolver aprobador para BOG, MED, SCL y LIM
    Given una solicitud valida con una de esas sedes
    When el backend procesa submit
    Then usa la regla activa persistida de Felipe Gonzalez
    And conserva un snapshot del destinatario

  Scenario: Resolver aprobador para WTC y MAD
    Given una solicitud valida con WTC o MAD
    When el backend procesa submit
    Then usa la regla activa persistida de la sede
    And no permite que el frontend elija el destinatario

  Scenario: CA o PAN sin regla
    Given un borrador con CA o PAN
    When el usuario intenta enviarlo
    Then el backend bloquea el envio
    And el borrador permanece disponible

  Scenario: Crear Outbox atomico
    Given una solicitud valida y una ruta activa
    When submit confirma la transaccion
    Then se guardan solicitud, snapshots y Outbox en la misma transaccion
    And el worker aun puede estar PENDING

  Scenario: Procesar HTML y texto plano
    Given una notificacion PENDING
    When el worker obtiene el token app-only y Graph confirma
    Then envia partes HTML y texto plano
    And no agrega botones de aprobar o rechazar

  Scenario: Error transitorio y Retry-After
    Given Graph responde 429 o 5xx
    When el worker clasifica el error
    Then programa un reintento respetando Retry-After
    And conserva la solicitud

  Scenario: Error permanente
    Given falta configuracion, permiso o destinatario valido
    When el worker procesa la notificacion
    Then no reintenta indefinidamente
    And registra DEAD_LETTER sin secretos

  Scenario: Idempotencia y concurrencia
    Given dos submits o dos workers para el mismo evento
    When ambos intentan crear o reclamar Outbox
    Then la clave unica evita duplicados
    And solo un worker procesa la fila

  Scenario: Copia a Testing Center pendiente de confirmar
    Given una solicitud de una sede que podria ser LATAM
    When no existe la lista aprobada de codigos LATAM
    Then el envio con CC queda bloqueado
    And el sistema no infiere la sede ni envia correo real

  Scenario: No perder la solicitud ante fallo de Graph
    Given Graph no esta disponible
    When el worker falla
    Then la solicitud permanece persistida
    And la interfaz muestra estado pendiente o fallido sin detalles tecnicos

  Scenario Outline: Todas las sedes DEV incluyen el grupo de copia
    Given una solicitud valida para <site>
    When el backend resuelve la notificacion
    Then el remitente es el UPN de la asesora autenticada
    And el destinatario es el aprobador DEV de la sede
    And el CC proviene de GRAPH_TESTING_CENTER_CC_GROUP

    Examples:
      | site |
      | BOG  |
      | MED  |
      | SCL  |
      | LIM  |
      | CA   |
      | PAN  |
      | WTC  |
      | MAD  |

  Scenario: Falta direccion SMTP del grupo
    Given GRAPH_TESTING_CENTER_CC_GROUP no esta configurada
    When el usuario intenta enviar
    Then el backend bloquea el envio
    And no crea Outbox

  Scenario: El frontend intenta manipular remitente, destinatario o CC
    Given un request con campos de correo alterados
    When el backend procesa submit
    Then ignora o rechaza esos campos
    And resuelve todos los valores desde identidad y configuracion
