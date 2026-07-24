# ADR-035 Acceso externo deshabilitado

- Estado: **ACEPTADO**
- Fecha: 2026-07-23
- Responsables: pendientes

## Contexto y decisión

Se requiere visibilidad futura sin habilitar identidades externas. Mostrar “Acceso externo” disabled y “Disponible próximamente”; sin ruta, handler, App Registration, formulario o lógica parcial.

## Alternativas

Ocultarlo; placeholder navegable; implementar External ID.

## Consecuencias y riesgos

Comunica roadmap, pero genera expectativas. Riesgo principal: habilitación accidental.

## Validación requerida

VAC-AUTH-004/005, BDD de no navegación y futuro ADR con evidencia.
