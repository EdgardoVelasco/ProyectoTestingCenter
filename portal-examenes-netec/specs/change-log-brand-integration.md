# Change log: integración de identidad NETEC

- **Fecha:** 2026-07-21
- **Estado:** IN_REVIEW
- **Alcance:** especificaciones/gobierno; sin cambios frontend, SCSS o tema.

## Resumen y fuente

Se incorporó como norma `specs/NETEC Manual de identidad corporativa (1).pdf`, verificado directamente (14 páginas). Se tradujo a requisitos, tokens, componentes, VAC, BDD, ADR, trazabilidad, política y planificación sin crear identidad nueva.

## Reglas oficiales extraídas

- Azul `#02419F`, teal `#00A1AF`, gris `#D8D8D8` (p. 7).
- Auxiliares `#0561EC`, `#4C93FF`, `#27DEBF`, `#94FFED`, `#FAC939`, `#333333` (p. 8).
- Degradado siempre azul→verde (p. 7).
- Montserrat para uso general y variantes; identidad sin patines (pp. 5, 9).
- Kollektif Italic existe en identidad, no como fuente general (p. 5 vs p. 9).
- Iconografía siempre outline (p. 10).

## Reglas derivadas

Tokens centralizados; superficies neutras; escala de espacio/tipo; layout responsive; separación marca-semántica; WCAG; inventario; flujo Spec-first; prohibición de hex/inline en componentes; conservación estricta del asset de logo.

## Propuestas

Material Symbols Outlined; tema Material personalizado; valores de estados semánticos; focus amarillo con contraste; ESLint, Stylelint, regla custom, axe, Playwright y regresión visual. No fueron implementadas.

## Archivos creados

- `specs/00-governance/{spec-change-process,specification-status,ui-change-policy}.md`
- `specs/02-requirements/brand-requirements.md`
- `specs/06-ui/{brand-source,design-system,design-tokens,visual-style,typography,color-system,iconography,layout-rules,component-guidelines,component-inventory,responsive-rules,visual-acceptance-criteria}.md`
- `specs/06-ui/reference-screens/README.md`
- `specs/08-acceptance/{brand-compliance,visual-consistency,accessibility-ui}.feature`
- ADR-016..020 en `specs/09-architecture/adr/`
- `specs/10-planning/{ui-backlog,ui-risks,ui-definition-of-done}.md`

## Archivos modificados

`AGENTS.md`, `README.md`, discovery (assumptions/open-questions/decisions), NFR, business rules, form/accessibility, traceability y validation report.

## Requisitos, ADR, escenarios y trazabilidad

Agregados BR-001..012, RNF-018..020, RGV-001..004, VAC-001..015, BDD-BR-001..015, BDD-VIS-001..005 y BDD-A11Y-UI-001..006. ADR-016..020 están PROPUESTOS. La matriz enlaza fuente/token/componente/pantalla/VAC/BDD/prueba/SCSS/estado.

## Riesgos y preguntas

Respuesta posterior: el PDF fue confirmado vigente; el SVG no está disponible; degradado permitido en botones/header; no existe variante oscura oficial y modo oscuro queda PROPUESTO. Siguen pendientes propietario/aprobador, variantes de logo, estados semánticos y assets de iconos. Los colores teal/claros requieren restricciones de contraste.

## Impacto en interfaz actual

La implementación actual usa tema prebuilt, fuentes y colores directos no alineados. Se registra como deuda previa; no se corrigió por la pausa obligatoria. La nueva especificación está IN_REVIEW y no autoriza migración.

## Próximos pasos

1. Confirmar vigencia/aprobadores/assets/licencias.
2. Revisar y aprobar BR, tokens y ADR.
3. Resolver tokens semánticos/contraste.
4. Autorizar UI-004 como primer cambio: infraestructura de tokens sin alterar todavía componentes, seguida del tema Material y migración controlada.

## Implementación posterior a aprobación — 2026-07-21

El usuario aprobó explícitamente continuar. Se registró APPROVED antes del código y se ejecutaron UI-004..007:

- Creados `_tokens.scss`, `_typography.scss`, `_layout.scss`, `_components.scss` y `styles.scss`.
- Montserrat 300/400/500/600/700 se sirve localmente mediante `@fontsource/montserrat` 5.2.6, licencia OFL-1.1 incluida.
- Tema prebuilt eliminado; Angular Material usa tema personalizado y variables NETEC.
- Degradado institucional corregido a 90° azul→teal.
- Colores/espacios/radios/sombras migrados a tokens; estilos inline/directos retirados.
- Orden visual/DOM vigente: Solicitante fijo → Comercial → Participantes → Exámenes → Resumen (ADR-038).
- Agregadas pruebas de tokens, Montserrat, ausencia de serif y orden del degradado.
- Evidencia revisada en escritorio 1440 px y breakpoint móvil de una columna a 500 px. Chrome Headless Windows recorta capturas solicitadas debajo de su ancho mínimo; 360 px queda para Playwright.

No se agregó logotipo ni iconografía al carecer de assets oficiales; no cambió lógica funcional.
