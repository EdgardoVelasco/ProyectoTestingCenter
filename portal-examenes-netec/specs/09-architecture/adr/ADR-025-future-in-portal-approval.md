# ADR-025 Evolución futura hacia aprobación dentro del portal

- Estado: PROPUESTO
- Fecha: 2026-07-22
- Responsables: producto/negocio, pendientes

## Contexto

La aprobación precede a la compra, pero hoy ocurre fuera del portal.

## Decisión

Fase 1 solo registra y notifica. No incorpora acciones, permisos ni estados APROBADA/RECHAZADA. Una fase futura requerirá evidencia, threat model, RF/RN/BDD y ADR nuevos.

## Alternativas

Implementarla ahora (rechazada por alcance); interpretar respuesta de correo (no autorizada).

## Consecuencias positivas

MVP acotado y sin aprobación implícita.

## Consecuencias negativas y riesgos

Testing Center seguirá confirmando externamente; mecanismo pendiente P-35.

## Validación

Revisión de alcance y ausencia de endpoints/estados de decisión.
