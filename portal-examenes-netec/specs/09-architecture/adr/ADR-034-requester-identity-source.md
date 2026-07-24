# ADR-034 Fuente de identidad del solicitante

- Estado: **ACEPTADO**
- Fecha: 2026-07-23
- Responsables: pendientes

## Contexto y decisión

MSAL conoce cuenta/claims, pero ownership y snapshots requieren identidad backend. `/api/auth/me` es endpoint definitivo y fuente para nombre/correo en Solicitante/header. Claims frontend no autorizan. Área/unidad son opcionales en MVP. Backend crea snapshots.

## Alternativas

Solo claims frontend; Graph/directorio; conservar `/api/v1/me` (rechazado como contrato definitivo); fuentes duplicadas.

## Consecuencias y riesgos

Mayor coherencia y mínimo privilegio; agrega llamada/migración. Riesgos: claims divergentes, usuario equivocado y PII excesiva.

## Validación requerida

Definir grupos de acceso P-LOGIN-05, contrato OAuth2 y pruebas 200/401/403/snapshot.
