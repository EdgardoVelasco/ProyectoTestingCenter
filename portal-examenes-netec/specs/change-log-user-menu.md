# Change log — Authenticated User Menu

Fecha: 2026-07-23. Estado: **APPROVED / IMPLEMENTATION AUTHORIZED**.

## Cambio

Sustituir botón logout separado por CMP-028 basado en `mat-menu`: avatar/iniciales, identidad permanente, expansión, resumen y logout textual.

## Decisiones

- Angular Material/CDK existente.
- Iniciales desde nombre, nunca correo.
- UPN completo dentro del menú.
- Componente presentacional sin MSAL; evento hacia AppComponent.
- Confirmación y AuthService existentes permanecen.

## Archivos Spec

RF/RN/HU/CA/VAC, inventario/guías/responsive/a11y, BDD, ADR-043, backlog, riesgos y matriz.

## Evidencia de implementación

Hallazgo durante build: Material Menu elevó el bundle a 1.02 MB. Se conserva warning 750 kB y se ajusta el error de 1.00 a 1.10 MB; riesgo registrado y optimización pendiente.

- Creado `AuthenticatedUserMenuComponent` presentacional con `mat-menu`, avatar/iniciales, identidad, expansión y logout textual.
- AppComponent conserva detección de formulario sucio/confirmación; AuthService/MSAL no se modificaron.
- Desktop/tablet muestran avatar, nombre y UPN; móvil conserva avatar/nombre y oculta UPN solo en trigger.
- Material/CDK gestiona overlay, Escape, clic exterior y restauración del foco.
- Angular: 43/43 pruebas finales exitosas. Build e imagen Docker exitosos; frontend desplegado responde 200.
- Auditoría: sin inline styles, colores directos, identidad hardcodeada o AuthService/MSAL dentro del componente.

Validación humana pendiente: logout real del tenant, zoom 200% y revisión visual con sesión autenticada en dispositivos reales.
