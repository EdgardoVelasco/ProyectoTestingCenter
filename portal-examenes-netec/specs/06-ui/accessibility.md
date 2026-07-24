# Accesibilidad

## Integración de marca — IN_REVIEW

La paleta oficial no exime contraste. Aplican BR-009/011, `color-system.md` y VAC-006..010/015. Montserrat debe mantener zoom/reflow; iconos outline funcionales tienen nombre accesible; foco no depende únicamente del color corporativo. Cualquier excepción accesible es DERIVADA y se registra, no se atribuye al manual.

## Estado de implementación — 2026-07-21

**IMPLEMENTADO PARCIALMENTE.** Se incorporaron skip link, estructura semántica, `fieldset/legend`, regiones `role=alert/status`, foco programático al resumen, botones con nombres claros, foco visible, orden DOM lógico y diálogo Material con restauración de foco. La vista pasa a una columna y acciones apiladas bajo 720 px. Quedan pendientes axe, lector de pantalla y prueba manual de 100 participantes/líneas.

Objetivo WCAG 2.1 AA. Orden DOM/foco coincide con visual; skip link; controles con nombre/ayuda/error asociados; grupos con `fieldset/legend`; modal atrapa y devuelve foco; tabla dinámica tiene caption/encabezados, botones eliminar con nombre del participante y alternativa móvil. Agregar/eliminar anuncia contador; error enfoca resumen y enlaza fila/campo. Catálogos y toda navegación funcionan por teclado. Pruebas: axe más teclado/lector con 1 y 100 participantes/líneas.

Login redirect define foco inicial, estado anunciado y error `role=alert`. Externo expone disabled y ayuda. Header/menú soportan teclado. Stepper anuncia “Paso X de 4”; Solicitante fijo tiene heading propio. Error enfoca primer control. Sesión expirada y logout usan diálogo accesible.
## Logout, UPN y Empresa

- Logout es `button` con texto visible, target mínimo 44 px, teclado, foco de 3 px y estado loading/disabled anunciado.
- Correo se representa mediante `dt/dd`; “No disponible” es texto accesible y no un input disabled.
- Empresa posee label visible, required, helper y errores unidos mediante el mecanismo de `mat-form-field`; no depende de placeholder o color.
## Authenticated User Menu

Activador es `button`, con nombre “Abrir menú de usuario”, `aria-haspopup=menu` y expansión administrada por Material. Iconos/avatar decorativos usan `aria-hidden`. El item logout conserva texto. CDK gestiona Escape, clic exterior y restauración de foco; pruebas verifican comportamiento.

## Asesor Comercial read-only

Label y valor se agrupan semánticamente; el helper identifica que procede de sesión. No entra al orden de tabulación por no ser interactivo. Loading y error usan texto anunciable y no dependen únicamente del color.
