Feature: Asignación de participantes a exámenes

  Scenario Outline: Crear asignaciones válidas
    Given participantes y exámenes activos
    When "<acción>"
    Then "<resultado>"
    Examples:
      | acción | resultado |
      | asignar uno a un examen | cantidad 1 |
      | asignar varios al mismo examen | cantidad igual a asignaciones |
      | asignar varios exámenes a uno | matriz contiene todos |

  Scenario Outline: Rechazar asignación inválida
    Given un borrador propio
    When se intenta "<caso>"
    Then el backend responde 422
    Examples:
      | caso |
      | duplicar participante y examen |
      | usar examen inactivo |
      | usar participante eliminado |
      | usar participante de otra solicitud |
      | enviar precio manipulado |

  Scenario: Calcular total
    Given un examen con precio decimal y varias asignaciones
    Then el backend calcula cantidad por conteo
    And calcula subtotal con decimal exacto

  Scenario: Eliminar asignación
    When se elimina una asignación del borrador
    Then cantidad y total se recalculan

  Scenario: Mostrar matriz
    Given asignaciones válidas
    Then Resumen muestra cada participante y sus exámenes

  Scenario: Conservar snapshots
    Given la solicitud fue enviada
    When cambia el catálogo
    Then los snapshots históricos no cambian

