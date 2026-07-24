# ADR-020: Gobierno de cambios visuales

- **Estado:** ACEPTADO
- **Fecha:** 2026-07-21
- **Responsables:** Producto/diseño/arquitectura, pendientes

## Contexto

Spec-Driven Development pierde efecto si el frontend cambia antes que su contrato visual.

## Decisión

Prohibir cambios directos: solicitud→Spec→impacto→VAC/trazabilidad→aprobación→código→evidencia/pruebas→cierre. Solo APPROVED autoriza implementación.

## Alternativas

Documentar después; aprobación solo por code review; libertad por equipo. Se rechazan por deuda y falta de trazabilidad.

## Consecuencias positivas

Previsibilidad, auditoría y protección de marca.

## Consecuencias negativas

Mayor tiempo de preparación y necesidad de responsables disponibles.

## Riesgos

Bypass por urgencia, aprobaciones tácitas, documentos desactualizados.

## Validación

Policy, DoD, plantilla de change log, BDD-BR-006 y control propuesto en CI/PR.
