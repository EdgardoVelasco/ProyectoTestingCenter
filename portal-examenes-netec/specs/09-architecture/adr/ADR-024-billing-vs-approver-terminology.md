# ADR-024 Terminología Facturación frente a Aprobador

- Estado: PROPUESTO
- Fecha: 2026-07-22
- Responsables: negocio, pendientes

## Contexto

La evidencia posterior confirma que Felipe González, Angélica Barrón y Paola Galvis pertenecen a Facturación y que el rol/área se denomina Finanzas.

## Decisión

Usar “Aprobador de Facturación/Finanzas”, “solicitud de aprobación” y `ENVIADA_A_APROBADOR`. Se mantiene deprecado `ENVIADA_A_FACTURACION`: describe destino organizacional, pero no expresa que el estado solo acredita notificación, no decisión.

## Alternativas

Mantener Facturación (arriesga significado incorrecto); nombres duales (rechazado por contradicción).

## Consecuencias positivas

Lenguaje fiel al proceso.

## Consecuencias negativas y riesgos

La implementación existente requerirá migración contractual coordinada.

## Validación

Búsqueda global sin término antiguo en contratos normativos y pruebas de estado.
