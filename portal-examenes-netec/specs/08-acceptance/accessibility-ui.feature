# language: es
@accessibility @in_review
Característica: Accesibilidad de la interfaz con identidad NETEC

  @BDD-A11Y-UI-001 Escenario: Labels persistentes
    Entonces cada control tiene label visible y nombre accesible

  @BDD-A11Y-UI-002 Escenario: Teclado y orden
    Cuando se usa Tab y Shift+Tab
    Entonces el orden coincide con lectura y ninguna acción queda inaccesible

  @BDD-A11Y-UI-003 Escenario: Error anunciado
    Dado un envío inválido
    Entonces el resumen recibe foco y los errores se asocian a sus controles

  @BDD-A11Y-UI-004 Escenario: Diálogo accesible
    Cuando abre y cierra un diálogo
    Entonces atrapa foco, tiene nombre y devuelve foco al disparador

  @BDD-A11Y-UI-005 Escenario: Color no exclusivo
    Entonces estado, selección y validación disponen de texto, forma o semántica adicional

  @BDD-A11Y-UI-006 Escenario: Reflow y zoom
    Cuando se amplía a 200% desde 360 píxeles
    Entonces no se pierde información ni funcionalidad
