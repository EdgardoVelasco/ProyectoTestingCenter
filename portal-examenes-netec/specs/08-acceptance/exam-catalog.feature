Feature: Catálogo inicial de exámenes

  Scenario Outline: Procesar fila de importación
    Given el CSV controlado derivado del Excel
    When la fila es "<tipo>"
    Then el resultado es "<resultado>"
    Examples:
      | tipo | resultado |
      | válida | insertada |
      | vacía | ignorada |
      | costo inválido | rechazada y reportada |
      | duplicada | no insertada |
      | código N/A | identificada por clave alternativa |

  Scenario: Reejecutar importación
    Given el catálogo inicial ya fue importado
    When se ejecuta nuevamente
    Then no se crean duplicados

  Scenario Outline: Consultar catálogo
    Given existe catálogo persistido
    When se consulta por "<filtro>"
    Then la respuesta es paginada y solo expone datos públicos
    Examples:
      | filtro |
      | proveedor |
      | código |
      | nombre |
      | página |

  Scenario: Mostrar metadatos del examen
    Given un examen tiene retake o comentarios
    When se muestra su detalle
    Then ambos valores se presentan sin inventar los ausentes

  Scenario: Consultar proveedor sin exámenes activos
    Given el proveedor no tiene coincidencias
    Then se muestra estado vacío

  Scenario: Consultar examen inactivo
    Given el examen está inactivo
    Then no puede seleccionarse para una asignación nueva

