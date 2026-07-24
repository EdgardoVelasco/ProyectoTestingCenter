# Criterios de aceptación visual

Estado: **IN_REVIEW**.

| ID | Criterio verificable | Clasificación |
|---|---|---|
| VAC-001 | Computed style de todos los componentes usa Montserrat. | OFICIAL trasladado |
| VAC-002 | No existe tipografía serif efectiva ni declarada como primaria. | OFICIAL |
| VAC-003 | No hay hex/rgb/hsl directos fuera de archivos de tokens autorizados. | DERIVADA |
| VAC-004 | Todo degradado institucional empieza `#02419F` y termina `#00A1AF`. | OFICIAL |
| VAC-005 | Iconos funcionales pertenecen a una familia outline consistente. | OFICIAL |
| VAC-006 | Todo campo tiene label visible asociado. | DERIVADA |
| VAC-007 | Foco de teclado es perceptible y ≥3:1 respecto a adyacentes. | DERIVADA |
| VAC-008 | Pantalla funciona a 360, 768, 1280 y 1440 px, zoom 200%, sin pérdida. | DERIVADA |
| VAC-009 | Controles equivalentes tienen altura/alineación consistente. | DERIVADA |
| VAC-010 | Errores/estados incluyen texto o semántica; nunca solo color. | DERIVADA |
| VAC-011 | Logo usa asset oficial, mantiene proporción y no se recolorea/reconstruye. | DERIVADA conservadora |
| VAC-012 | Componentes compartidos consumen tokens; no hay estilos duplicados/inline. | DERIVADA |
| VAC-013 | Solicitante, comercial, examen, participantes y resumen son distinguibles. | DERIVADA |
| VAC-014 | Título, sección, label, valor y ayuda tienen jerarquía tipográfica clara. | DERIVADA |
| VAC-015 | Cada combinación de color respeta `color-system.md` y WCAG aplicable. | DERIVADA |

Evidencia: inspección estática, computed styles, axe, teclado, screenshots y contraste. Herramientas siguen PROPUESTAS hasta aprobación.

## Login DRAFT

VAC-AUTH-001 identidad NETEC; 002 botón “Iniciar sesión con Microsoft”; 003 sin password interno; 004 externo visible/disabled; 005 disabled no solo color; 006 teclado; 007 foco inicial; 008 errores anunciados; 009 identidad visible; 010 logout accesible.

## Stepper DRAFT

VAC-STEP-001 Solicitante fijo y cuatro pasos; 002 actual identificable; 003 completados; 004 errores; 005 teclado; 006 responsive; 007 un panel; 008 Guardar disponible; 009 Enviar solo en Resumen; 010 datos conservados; 011 tokens/Montserrat; 012 iconos outline.
## Logout visible, UPN y Empresa

- VAC-AUTH-016: **SUPERSEDED por VAC-USER-004**; “Cerrar sesión” permanece como texto dentro del menú en todos los breakpoints.
- VAC-AUTH-017: el botón tiene borde perceptible y contraste AA sobre azul.
- VAC-AUTH-018: hover, focus, active, loading y disabled son distinguibles sin estilos inline.
- VAC-AUTH-019: el correo readonly muestra el UPN validado o “No disponible”.
- VAC-COM-001: Empresa es input, no select/autocomplete.
- VAC-COM-002: helper y errores están asociados; el resumen conserva el nombre.
## Authenticated User Menu

- VAC-USER-001: avatar/nombre/correo en escritorio.
- VAC-USER-002: contenido visible sin hover.
- VAC-USER-003: foco perceptible.
- VAC-USER-004: “Cerrar sesión” visible en menú.
- VAC-USER-005: iconos outline.
- VAC-USER-006: correo completo dentro del menú.
- VAC-USER-007: menú usable en móvil.
- VAC-USER-008: contraste AA.
- VAC-USER-009: Escape cierra.
- VAC-USER-010: foco vuelve al activador.
- VAC-USER-011: sin inline/hex en componente.
- VAC-USER-012: logout reutiliza flujo existente.

- VAC-COM-021: Asesor Comercial muestra el mismo nombre que Solicitante.
- VAC-COM-022: no presenta affordance de selector o edición.
- VAC-COM-023: helper de sesión, loading y error son legibles y accesibles.
- VAC-COM-024: resumen conserva el mismo nombre.
