Feature: Participantes antes de exámenes

  Scenario: Mostrar Participantes antes de Exámenes
    Given una solicitud nueva
    Then el paso 2 es Participantes
    And el paso 3 es Exámenes

  Scenario Outline: Validar participante
    Given el usuario edita participantes
    When ocurre "<caso>"
    Then el sistema produce "<resultado>"
    Examples:
      | caso | resultado |
      | agregar datos válidos | participante conservado |
      | editar datos válidos | participante actualizado |
      | correo inválido | error junto al correo |
      | correo duplicado | avance bloqueado |
      | avanzar sin participantes | avance bloqueado |
      | navegar y regresar | datos conservados |
      | alcanzar máximo 100 | alta adicional bloqueada |

  Scenario: Eliminar participante asignado
    Given un participante tiene asignaciones
    When se confirma su eliminación
    Then sus asignaciones se eliminan del borrador
    And Exámenes se revalida

