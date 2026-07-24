# ADR-033 Página de acceso con Microsoft Entra ID

- Estado: **ACEPTADO**
- Fecha: 2026-07-23
- Responsables: pendientes

## Contexto y decisión

La referencia incluye credenciales, pero la arquitectura usa Entra ID. La pantalla NETEC usa “Iniciar sesión con Microsoft” exclusivamente mediante redirect, nunca popup. No contiene usuario/password, no simula Microsoft y no procesa credenciales.

## Alternativas

Formulario propio (rechazado); popup; redirect inmediato sin landing; login local visible.

## Consecuencias y riesgos

SSO y responsabilidades claras; a cambio existe salto al IdP y dependencia de redirect URI. Riesgos: loop, phishing visual y errores no recuperables.

## Validación requerida

P-LOGIN-05/06/12, tenant no productivo, VAC-AUTH y BDD.
