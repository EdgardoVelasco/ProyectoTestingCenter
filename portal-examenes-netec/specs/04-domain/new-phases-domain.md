# Dominio — nuevas fases

## Participante importado

El participante importado se convierte en la misma entidad de dominio que el
participante manual. `source` es opcional y no altera reglas. La identidad se
determina por correo normalizado dentro de una solicitud.

## Resultado de submit

Los conceptos de proceso `REQUEST_REGISTERED`, `EMAIL_QUEUED`,
`GRAPH_ACCEPTED` y `EMAIL_DELIVERED` son una propuesta de observabilidad; no son
estados persistidos nuevos en esta etapa.

## Facturación

Se prevé un agregado de revisión con historial/auditoría y control de
concurrencia, pero permanece NEEDS_DISCOVERY. No se modifican estados actuales.
