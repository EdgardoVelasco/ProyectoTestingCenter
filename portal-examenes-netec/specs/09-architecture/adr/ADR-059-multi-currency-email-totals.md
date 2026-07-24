# ADR-059: Totales de correo con múltiples monedas

Estado: APPROVED — 2026-07-24.

## Decisión

Calcular subtotales y totales por código ISO usando `BigDecimal`. No sumar ni convertir monedas distintas sin una regla aprobada. El correo muestra un bloque por moneda.

## Validación

Casos USD, EUR, MXN y combinación de monedas; se verifica ausencia de suma cruzada y precisión.

