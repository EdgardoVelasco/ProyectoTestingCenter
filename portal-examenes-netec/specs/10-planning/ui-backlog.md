# Backlog de gobierno e implementación visual

Estado: **IN_REVIEW**; no son tareas autorizadas hasta aprobación.

| ID | Objetivo | Dependencias | Evidencia/DoD |
|---|---|---|---|
| UI-001 | Aprobar paquete de marca y nombrar responsables. | Manual, BR, ADR | `specification-status` APPROVED. |
| UI-002 | Resolver assets/logo, fuentes, licencia y carga. | Preguntas críticas | Decisiones/ADR actualizados. |
| UI-003 | Aprobar tokens semánticos y contraste. | UI-001/002 | Tabla y pruebas de contraste. |
| UI-004 | Implementar SCSS de tokens/tipo/layout/componentes. | ADR-017 APPROVED | Sin hex fuera de tokens. |
| UI-005 | Crear tema Angular Material NETEC. | ADR-018 APPROVED | Controles/VAC/screenshots. |
| UI-006 | Adoptar iconografía outline aprobada. | ADR-019/UI-002 | Fallback, accesibilidad, VAC-005. |
| UI-007 | Migrar pantalla Crear solicitud. | UI-004..006 | Inventario, responsive, axe, visual. |
| UI-008 | Configurar ESLint/Stylelint/reglas. | Aprobación técnica | CI estable/documentado. |
| UI-009 | Configurar Playwright/axe/regresión visual. | referencias aprobadas | Evidencia por viewport. |
| UI-010 | Especificar modo oscuro derivado, sin identidad oscura oficial. | aprobación de producto/marca | tokens, contraste, componentes, VAC/BDD; no implementar aún. |
| UI-011 | Incorporar SVG oficial cuando esté disponible. | asset y variantes por fondo | hash/proporción/contraste. |
| UI-012 | Diseñar variantes de botón/header con degradado autorizado. | tokens/contraste/aprobación | azul→teal, AA y evidencia visual. |

Primer cambio recomendado: UI-004 solo después de UI-001..003; no comenzar por overrides de componentes.
