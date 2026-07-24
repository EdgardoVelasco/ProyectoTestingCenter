# ADR-043 — Menú de usuario para acciones de sesión

- Estado: **APPROVED**
- Fecha: 2026-07-23

## Contexto

El botón logout directo ocupa espacio, compite con identidad y depende demasiado de estados visuales. Angular Material ya está instalado.

## Decisión

Usar CMP-028 con `mat-menu`. Activador permanente con identidad/avatar; overlay con resumen y logout textual. El componente emite un evento y no contiene MSAL; AppComponent/AuthService conservan confirmación y redirect.

## Alternativas

- Botón separado: rechazado por competencia visual.
- Enlace: rechazado por baja affordance.
- Menú propio: rechazado por duplicar teclado, overlay y foco ya resueltos por Material/CDK.

## Consecuencias

Positivas: patrón empresarial familiar, menor densidad, identidad permanente, teclado/foco estándar. Negativas: overlay requiere pruebas y la acción añade un paso. Responsive oculta UPN solo en trigger móvil.

## Riesgos y validación

Truncamiento, nombre ausente, foco, overlay móvil y regresión de logout. Validar unitariamente Material harness/DOM, teclado, Escape, foco, estilos y evento.
