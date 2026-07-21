# language: es
Característica: Conversión automática exclusiva para Madrid

  @BDD-067 Escenario: Convertir para Madrid
    Dado costo base 100 USD y tasa vigente 0.92
    Cuando selecciona MAD
    Entonces backend muestra 92 EUR y conserva origen/tasa
  @BDD-068 Escenario: No convertir otra ubicación
    Dado costo 100 USD y tasa disponible
    Cuando selecciona BOG
    Entonces conserva 100 USD y no aplica tasa
  @BDD-069 Escenario: Cambiar ubicación a Madrid
    Cuando cambia BOG por MAD
    Entonces recalcula todas las líneas en EUR y exige revisar resumen
  @BDD-070 Escenario: Cambia tasa antes de enviar
    Cuando backend detecta una tasa vigente distinta
    Entonces recalcula, muestra EXCHANGE_RATE_CHANGED y exige nueva confirmación
