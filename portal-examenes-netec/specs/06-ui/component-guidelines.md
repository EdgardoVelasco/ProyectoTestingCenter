# Guía de componentes

Estado: **IN_REVIEW**.

## Reglas comunes

Todo componente usa tokens, Montserrat, estados de foco/disabled/loading/error, targets mínimos, labels accesibles y contraste AA. No contiene hex, estilos inline ni variantes no inventariadas. Angular Material se tematiza centralmente después de aprobar ADR-018.

## Acciones

- Primaria: una por contexto, fondo azul principal y texto blanco; amarillo no es CTA.
- Secundaria: borde/texto azul sobre superficie.
- Terciaria: texto/enlace, con foco y área suficiente.
- Destructiva: semántica DERIVADA pendiente; no usar marca como error automático.

## Campos

Label visible persistente, ayuda contextual separada, error junto al campo y en resumen, alturas consistentes. Readonly no se representa como editable disabled. Select/autocomplete informa carga, vacío y error.

## Contenedores/feedback

Cards agrupan una tarea, no cada campo. Alertas incluyen texto/icono outline opcional y no dependen de color. Diálogo conserva foco, permite Escape cuando no es destructivo y devuelve foco. Tablas ofrecen alternativa responsive.

## Login, identidad y stepper — DRAFT

- Access page delega credenciales a Microsoft; no contiene inputs username/password.
- Login Microsoft evita doble activación; acceso externo usa disabled real, ayuda y ningún handler.
- Header usa identidad backend y no placeholders productivos.
- Stepper parece pestañas numeradas, pero su semántica es progreso guiado; no asignar `role=tab` sin validar patrón.
- ERROR/BLOCKED/COMPLETED combinan texto o icono outline, atributo y color.
- Los controles se conservan en un modelo raíz; navegar no destruye datos.
## Header logout outlined — DEPRECADO

ADR-043 sustituye esta variante por CMP-028. No implementar botón directo junto al menú.

Usar CMP-012 dentro de CMP-027 con borde y texto on-primary. Loading cambia texto a “Cerrando sesión…” y deshabilita el botón. Hover/active usan superficie translúcida mediante token; focus usa `color-focus`. No usar estilos inline.

## Empresa MVP

CMP-006, no CMP-007/008. Label “Empresa”, helper persistente, `aria-describedby`, errores específicos y normalización al guardar. Placeholder no sustituye label.
## CMP-028 Authenticated User Menu

- Props: `name`, `username`, `loading`, `loggingOut`; output `logoutRequested`.
- Iniciales: primer/último término, mayúsculas, máximo dos; un término una; ausencia icono outline.
- Activador siempre muestra identidad; `text-overflow` solo visual. Móvil oculta UPN del activador mediante CSS, pero el menú lo muestra completo.
- Menú usa `mat-menu`, resumen no interactivo, `mat-divider` y `mat-menu-item`.
- El componente no inyecta AuthService/MSAL ni inspecciona formularios.

## CMP-029 Asesor autenticado

Reutiliza el estado de requester del contenedor. Debe ser definición label–valor, no control de formulario editable. El helper explica el origen de sesión y el estado de error se anuncia sin revelar claims.
