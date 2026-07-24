# Change log — logout visible, UPN y Empresa libre

Fecha: 2026-07-23. Estado: **APPROVED / IMPLEMENTATION AUTHORIZED**.

## Evidencia y decisiones

- Logout funciona pero requiere mayor affordance: CMP-012 outlined sobre CMP-027.
- `AuthenticatedIdentity.username` se conserva como UPN resuelto; no se duplica `userPrincipalName`.
- Precedencia backend: `preferred_username`, `upn`, `email`, ausencia.
- Empresa no tiene catálogo: `companyName` libre y `companyNameSnapshot` histórico.
- `companyId` queda temporalmente deprecado/no obligatorio.

## Impacto

- UI: borde/estados logout, UPN readonly, Empresa input y resumen.
- API: significado de `username`; `companyName` opcional en DraftCommand.
- BD: nueva columna nullable mediante V4.
- Pruebas: identidad, validación/normalización/persistencia, accesibilidad del botón.

## Fuera de alcance

Catálogo, autocomplete, administración y normalización maestra de empresas; cambios a lógica MSAL; submit real.

## Evidencia de implementación

- Header usa `mat-stroked-button.logout-button`, texto visible, icono outline, borde/tokens y estados normal/hover/focus/active/loading/disabled; la llamada funcional sigue en `AppComponent → AuthService.logout()`.
- Backend resuelve `username` con `IdentityClaims`: `preferred_username`, `upn`, `email`, vacío.
- Datos del solicitante presenta UPN readonly o “No disponible”.
- Empresa usa `companyName` input, validadores reutilizables, normalización y resumen; se eliminó del mock comercial.
- Flyway V4 añade `company_name_snapshot`; backend permite null en borrador y rechaza valor presente inválido con 422.
- OpenAPI eliminó `/catalogs/companies` y deprecó `companyId`.

Pruebas 2026-07-23:

- Angular: 36/36 exitosas en Chrome 150.
- Spring: 27/27 exitosas, incluidas PostgreSQL/Testcontainers y V1–V4.
- Build Angular y build de imágenes Docker exitosos.
- Runtime: frontend/health 200; cuatro migraciones y columna confirmadas.
- Auditoría: 0 estilos inline, 0 catálogo de empresas en código, 0 usuarios de prueba hardcodeados y `.env` ignorado/no rastreado.

Pendientes declarados:

- No existe script lint configurado.
- Revisión con dos usuarios y logout real requieren sesión humana de Entra; no se declaran ejecutadas.
- Bundle inicial 989.88 kB supera el budget 750 kB.
