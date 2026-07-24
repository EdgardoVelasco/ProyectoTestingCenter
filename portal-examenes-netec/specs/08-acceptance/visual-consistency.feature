# language: es
@visual @in_review
Característica: Consistencia del sistema visual

  @BDD-VIS-001 Escenario: Componentes consumen tokens
    Cuando se inspecciona un componente inventariado
    Entonces espacio, radio, sombra, tipografía y color provienen de tokens

  @BDD-VIS-002 Escenario: Sin estilos inline
    Cuando se analiza una plantilla Angular
    Entonces no contiene atributos style ni valores visuales ad hoc

  @BDD-VIS-003 Escenario: Variante registrada
    Dado que se propone una variante visual
    Cuando no figura en el inventario APPROVED
    Entonces no puede implementarse

  @BDD-VIS-004 Escenario: Controles consistentes
    Dado un grupo de formulario
    Entonces controles equivalentes comparten altura, label, ayuda y error

  @BDD-VIS-005 Escenario: Regresión visual
    Dada una referencia aprobada por viewport
    Cuando cambia la interfaz
    Entonces la diferencia se revisa y vincula al cambio de Spec
