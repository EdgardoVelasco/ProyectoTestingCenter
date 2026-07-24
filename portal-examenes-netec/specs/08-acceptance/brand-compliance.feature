# language: es
@brand @in_review
Característica: Cumplimiento de identidad corporativa NETEC

  @BDD-BR-001 Escenario: Uso de tipografía corporativa
    Dado que una pantalla del portal es renderizada
    Cuando se inspecciona su tipografía principal
    Entonces debe utilizar Montserrat
    Y no debe utilizar una familia serif

  @BDD-BR-002 Escenario: Uso del degradado institucional
    Dado que un componente aprobado utiliza el degradado corporativo
    Cuando se inspeccionan sus extremos
    Entonces debe comenzar con el azul "#02419F"
    Y debe terminar con el verde "#00A1AF"

  @BDD-BR-003 Escenario: Colores mediante tokens
    Dado que un componente frontend es revisado
    Cuando contiene estilos de color
    Entonces debe consumir tokens del sistema de diseño
    Y no debe contener colores hexadecimales directos

  @BDD-BR-004 Escenario: Iconografía outline
    Dado que una acción utiliza un icono
    Cuando se renderiza el componente
    Entonces el icono debe utilizar la variante outline aprobada

  @BDD-BR-005 Escenario: Contraste accesible
    Dado que un texto es mostrado sobre una superficie
    Cuando se calcula su contraste
    Entonces debe cumplir WCAG 2.1 AA

  @BDD-BR-006 Escenario: Cambio visual sin actualización de Spec
    Dado que se propone modificar un componente visual
    Cuando no existe una especificación APPROVED actualizada
    Entonces la implementación no debe iniciarse
    Y debe solicitarse primero la actualización del Spec

  @BDD-BR-007 Escenario: Responsive
    Cuando se revisa la pantalla a 360, 768, 1280 y 1440 píxeles y zoom 200%
    Entonces no pierde contenido, acciones ni orden lógico

  @BDD-BR-008 Escenario: Foco visible
    Cuando una persona navega únicamente con teclado
    Entonces cada control enfocado tiene indicador perceptible

  @BDD-BR-009 Escenario: Campo deshabilitado o solo lectura
    Dado un dato que no puede editarse
    Entonces su estado se comunica semánticamente y no solo por color

  @BDD-BR-010 Escenario: Estado de error
    Dado un control inválido
    Entonces muestra texto asociado al campo
    Y el error no usa un color de marca como semántica automática

  @BDD-BR-011 Escenario: Botón principal
    Entonces existe una sola acción principal por contexto
    Y no utiliza amarillo como fondo principal

  @BDD-BR-012 Escenario: Header y logotipo
    Dado el header del portal
    Entonces es compacto y usa tokens aprobados
    Y el logotipo oficial conserva asset, proporción y color

  @BDD-BR-013 Escenario: Tabla de participantes
    Cuando cambia de escritorio a móvil
    Entonces sigue siendo operable sin scroll horizontal obligatorio
    Y las acciones conservan nombre accesible

  @BDD-BR-014 Escenario: Resumen financiero
    Entonces diferencia moneda, cantidad y total con jerarquía clara
    Y el total no se presenta como campo editable

  @BDD-BR-015 Escenario: Estado vacío
    Dado un catálogo o colección sin resultados
    Entonces se muestra explicación y recuperación sin inventar datos
