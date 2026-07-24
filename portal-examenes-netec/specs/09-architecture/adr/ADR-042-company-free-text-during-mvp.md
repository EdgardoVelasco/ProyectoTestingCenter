# ADR-042 — Empresa como texto libre durante el MVP

- Estado: **APPROVED**
- Fecha: 2026-07-23

## Contexto

No existe catálogo de empresas disponible. El selector simulado contradice la evidencia y bloquearía el MVP.

## Decisión

Capturar `companyName` manualmente, normalizar espacios, conservar capitalización y persistir `companyNameSnapshot` nullable en borrador. Empresa será obligatoria al enviar. No se usa `companyId`, autocomplete ni endpoint de empresas.

## Alternativas

- Catálogo simulado: rechazada por datos ficticios.
- Esperar catálogo maestro: rechazada porque bloquea el MVP.
- Eliminar compatibilidad futura: rechazada; una futura FK será nullable y el snapshot permanecerá.

## Consecuencias positivas

Flujo honesto, implementación simple, histórico estable y ausencia de dependencia inexistente.

## Consecuencias negativas y riesgos

Variantes ortográficas y duplicados nominales; no existe identidad maestra. La migración futura requiere reconciliación sin reescribir históricos.

## Validación

Pruebas frontend/backend de 2–150, espacios, `N/A`, borrador vacío, persistencia/restauración y ausencia de llamadas a catálogo.
