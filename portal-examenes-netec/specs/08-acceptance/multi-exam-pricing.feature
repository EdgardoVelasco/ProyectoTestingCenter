# language: es
Característica: Varios exámenes, asignaciones y precio de venta

  @BDD-051 Escenario: Varios exámenes en una solicitud
    Cuando agrega dos líneas de examen
    Entonces ambas permanecen en el BORRADOR
  @BDD-052 Escenario: Un participante presenta varios exámenes
    Cuando asigna el mismo participante a dos líneas
    Entonces se registran dos vouchers asignados
  @BDD-053 Escenario: Línea sin participante
    Entonces submit recibe ASSIGNMENT_REQUIRED
  @BDD-054 Escenario: Cantidad por línea y asignaciones
    Dada regla provisional activa
    Entonces una diferencia produce QUANTITY_ASSIGNMENT_MISMATCH
  @BDD-055 Escenario: Modificar precio de venta
    Dado costo base 59 USD
    Cuando Ventas captura venta 55 USD
    Entonces subtotal usa 55 y base permanece 59
  @BDD-056 Escenario: Precio venta no modifica catálogo
    Entonces ExamPrice permanece igual
  @BDD-057 Escenario: Total de varias líneas
    Dadas líneas 55 por 1 y 70 por 2 USD
    Entonces total backend es 195 USD
  @BDD-058 Escenario: Moneda uniforme por ubicación
    Cuando ubicación es MAD
    Entonces todas las líneas se expresan en EUR; otra ubicación permanece USD
