# language: es
Característica: Reglas confirmadas de catálogo y comerciales

  @BDD-059 Escenario: Segmento obligatorio
    Cuando intenta enviar sin segmento
    Entonces recibe REQUIRED en segmentId
  @BDD-060 Escenario: Tipo y referencia opcionales
    Cuando los omite y el resto es válido
    Entonces no bloquean el envío
  @BDD-061 Escenario: Precio de venta cero
    Cuando captura cero
    Entonces recibe SALE_PRICE_ZERO
  @BDD-062 Escenario: Máximo de cien
    Cuando intenta agregar el registro 101
    Entonces recibe LIMIT_100
  @BDD-063 Escenario: Precio vencido
    Cuando el precio base no está vigente
    Entonces recibe PRICE_EXPIRED
  @BDD-064 Escenario: Madrid sin tipo de cambio
    Cuando selecciona MAD y no existe tasa USD a EUR vigente
    Entonces recibe EXCHANGE_RATE_REQUIRED
  @BDD-065 Escenario: Mostrar retake y comentarios
    Cuando selecciona un examen
    Entonces ambos datos de catálogo aparecen solo lectura y se congelan al enviar
  @BDD-066 Escenario: Testing Center mantiene catálogo
    Dado usuario autorizado de Testing Center
    Cuando agrega un precio vigente
    Entonces queda auditado; Ventas no puede hacerlo
