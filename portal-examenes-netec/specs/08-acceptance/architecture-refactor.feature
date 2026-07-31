Feature: Refactorización arquitectónica sin cambio funcional

  Scenario: Contratos HTTP conservados
    Given la aplicación después de una fase de refactor
    When se comparan endpoints y payloads
    Then permanecen iguales

  Scenario: Dominio backend aislado
    Given una clase ubicada en un paquete domain
    Then no depende de Spring, JPA, Graph ni HTTP

  Scenario: Graph aislado
    Given el módulo notification
    When se inspeccionan sus dependencias
    Then Microsoft Graph aparece únicamente en infraestructura

  Scenario: Frontend organizado por features
    Given una API de exam requests o catalog
    Then no se encuentra en core ni shared

  Scenario: Formulario conservado
    Given un usuario autenticado
    When crea, guarda, recupera y envía una solicitud
    Then observa el mismo flujo, mensajes, estilos y payloads

  Scenario: Fase fallida
    Given que una fase rompe compilación o pruebas
    Then la fase se detiene
    And no se mezclan cambios de la fase siguiente
