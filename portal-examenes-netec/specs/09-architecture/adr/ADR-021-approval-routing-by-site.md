# ADR-021 Enrutamiento de aprobadores por sede

- Estado: PROPUESTO
- Fecha: 2026-07-22
- Responsables: negocio y arquitectura, pendientes

## Contexto

El AC envía hoy por sede: BOG/MED/SCL/LIM a Felipe González, WTC a Angélica Barrón y MAD a Paola Galvis. Testing Center no reenvía. Correos oficiales y pertenencia a Facturación/Finanzas fueron confirmados; propietario, vigencia y suplencias siguen pendientes.

## Decisión

Fase 1 resolverá un único aprobador utilizable mediante `ApprovalRoutingRule` activa y vigente. La UI muestra el nombre; submit re-resuelve en backend. CA/PAN y cualquier sede sin regla bloquean enviar, no guardar.

## Alternativas

Captura manual (rechazada por error/seguridad); lista fija en código (rechazada); múltiples aprobadores (pendiente P-34).

## Consecuencias positivas

Enrutamiento controlado, auditable y modificable sin despliegue.

## Consecuencias negativas y riesgos

Requiere gobierno de configuración y manejo de vigencia/concurrencia. P-39 debe delimitar las sedes con copia a Testing Center.

## Validación

BDD-071..080 y CA-037..041. Preguntas P-23..P-37.
