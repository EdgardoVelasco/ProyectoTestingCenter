# ADR-022 Configuración dinámica frente a reglas codificadas

- Estado: PROPUESTO
- Fecha: 2026-07-22
- Responsables: arquitectura/operación, pendientes

## Contexto

La relación sede–persona cambia operativamente y necesita vigencia y auditoría.

## Decisión

Persistir reglas versionadas; los nombres confirmados son datos iniciales, nunca `if/switch` en frontend/backend. Administración mutable queda fuera de fase 1; RF-046 solo prevé consulta futura.

## Alternativas

Variables de entorno (poca auditoría); archivo estático (requiere despliegue); código (rechazado).

## Consecuencias positivas

Trazabilidad y cambios sin recompilar.

## Consecuencias negativas y riesgos

Se necesita propietario, RBAC, validación de solapamiento y datos iniciales completos.

## Validación

Auditoría de alta/cambio, resolución por fecha y escaneo contra destinatarios codificados.
