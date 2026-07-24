# ADR-050: Plantilla de correo de aprobacion

Estado: PROPUESTO; plantilla sujeta a validacion de negocio.

## Decision

Generar HTML y texto plano desde un modelo tipado de snapshots. Escapar todo contenido capturado, sanitizar observaciones, omitir tokens/claims internos y no incluir botones de aprobar o rechazar. El asunto identifica folio, sede y empresa; el mensaje solicita aprobacion mediante el proceso externo vigente.

## Validacion

Probar equivalencia de datos, HTML seguro, clientes de correo, ausencia de URLs no aprobadas, tabla de participantes/examenes y moneda MAD solo si esta aprobada.
