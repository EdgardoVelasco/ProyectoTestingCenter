# ADR-019: Estrategia de iconografía

- **Estado:** ACEPTADO
- **Fecha:** 2026-07-21
- **Responsables:** Marca/diseño/frontend, pendientes

## Contexto

El manual permite iconos libres pero exige característica outline. No entrega assets ni librería.

## Decisión

Usar una sola familia outline; se propone Material Symbols Outlined por integración con Angular Material. Filled/rounded no se mezclan salvo excepción aprobada.

## Alternativas

SVG corporativos aún no disponibles; Material Icons Filled; múltiples librerías. Quedan pendiente/rechazadas por evidencia o inconsistencia.

## Consecuencias positivas

Coherencia, disponibilidad y accesibilidad controlable.

## Consecuencias negativas

Dependencia de fuente/asset y posible falta de glifos específicos.

## Riesgos

FOIT, ligaduras visibles si la fuente falla, licencia/carga no decididas.

## Validación

VAC-005, BDD-BR-004, revisión de bundle/fallback y nombres accesibles.
