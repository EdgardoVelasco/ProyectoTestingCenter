Feature: Contenido estructurado de la solicitud de aprobación
  Como aprobador
  Quiero recibir toda la información relevante de la solicitud
  Para revisarla sin reconstruirla manualmente

  Scenario: Solicitud con múltiples participantes y exámenes
    Given una solicitud persistida con asignaciones N:M
    When se genera el correo
    Then muestra tablas separadas de comerciales, participantes, exámenes y asignaciones
    And no repite un bloque completo por cada participante

  Scenario: Cantidades, subtotales y totales por moneda
    Given exámenes con snapshots de precio y moneda
    When se construye el modelo
    Then la cantidad es el número de asignaciones únicas
    And el subtotal usa BigDecimal
    And las monedas distintas se muestran por separado

  Scenario: Snapshot estable durante un reintento
    Given un Outbox con payload estructurado
    When cambia el catálogo después del submit
    Then el HTML y texto del reintento conservan los snapshots originales

  Scenario: Escaping de observaciones y correo
    Given texto capturado con etiquetas HTML o caracteres especiales
    When se renderiza el correo
    Then el contenido se escapa
    And no se ejecuta ni inserta HTML proporcionado por el usuario

  Scenario: Versión Outlook y texto plano
    Given una solicitud válida
    When el worker renderiza el mensaje
    Then genera HTML basado en tablas compatible con Outlook
    And genera una versión text/plain equivalente
    And no incluye botones de aprobar o rechazar

  Scenario: Datos incompletos
    Given una solicitud sin participante, asignación, precio o moneda obligatoria
    When se construye el modelo
    Then la operación falla con Problem Details seguro
    And no se envía el correo

