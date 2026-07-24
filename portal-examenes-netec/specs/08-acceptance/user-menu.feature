Feature: Menú de usuario autenticado

  Scenario: Mostrar identidad sin hover
    Given una identidad autenticada
    Then el activador muestra avatar, nombre, UPN y expansión

  Scenario Outline: Calcular iniciales
    Given el nombre "<nombre>"
    Then el avatar muestra "<iniciales>"
    Examples:
      | nombre | iniciales |
      | Lynne Robbins | LR |
      | Edgardo Velasco | EV |
      | Paola | P |

  Scenario: Abrir con mouse
    When activa el trigger con puntero
    Then se muestra el resumen, divisor y Cerrar sesión

  Scenario: Abrir con teclado
    When enfoca el trigger y presiona Enter o Space
    Then el menú abre y permite navegar sus items

  Scenario: Cerrar con Escape y restaurar foco
    Given el menú abierto
    When presiona Escape
    Then el menú cierra
    And el foco vuelve al trigger

  Scenario: Cerrar al hacer clic exterior
    Given el menú abierto
    When hace clic fuera
    Then el menú cierra

  Scenario: Ejecutar logout existente
    When selecciona Cerrar sesión
    Then el componente emite logout
    And AppComponent ejecuta la confirmación y flujo MSAL existentes

  Scenario: Cancelar logout por cambios
    Given un formulario sucio
    When solicita logout y cancela
    Then la sesión continúa

  Scenario: Confirmar logout por cambios
    Given un formulario sucio
    When confirma logout
    Then se ejecuta el flujo MSAL existente

  Scenario: Estado loading
    Given la identidad en carga
    Then se muestra estado seguro
    And logout está deshabilitado
    And no aparece identidad ficticia

  Scenario: Identidad no disponible
    Given nombre y UPN ausentes
    Then se muestra icono de usuario y texto seguro

  Scenario: Correo largo
    Given un UPN largo
    Then puede truncarse en el trigger
    And aparece completo dentro del menú

  Scenario: Adaptación móvil
    Given viewport móvil
    Then avatar, nombre y expansión permanecen visibles
    And logout sigue disponible

  Scenario: Contraste y estilos
    Then usa tokens y contraste AA
    And no contiene inline styles ni colores directos
