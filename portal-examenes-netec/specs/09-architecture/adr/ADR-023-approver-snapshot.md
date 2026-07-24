# ADR-023 Snapshot del aprobador en solicitudes

- Estado: PROPUESTO
- Fecha: 2026-07-22
- Responsables: arquitectura/privacidad, pendientes

## Contexto

Una regla puede cambiar después del envío; el histórico debe explicar a quién se notificó.

## Decisión

Guardar `siteId`, snapshots de sede, nombre/correo del destinatario, `approvalRoutingRuleId`, estado y fecha de notificación. El evento outbox usa estos snapshots.

## Alternativas

Resolver al leer (rechazada: reescribe historia); solo ruleId (insuficiente ante cambio/borrado).

## Consecuencias positivas

Histórico reproducible y reintento consistente.

## Consecuencias negativas y riesgos

Duplica PII; exige minimización, acceso y enmascarado.

## Validación

BDD-083/086/087/090 y pruebas de cambio de regla e historial.
