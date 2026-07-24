# Definition of Done de frontend

Una tarea visual **no está terminada** si:

- No existe Spec APPROVED y evidencia del cambio.
- No actualizó change log, inventario, VAC, BDD y trazabilidad.
- Introduce colores fuera de tokens o estilos inline.
- Usa fuente no autorizada, serif o iconos no outline.
- Modifica/reconstruye el logotipo o invierte el degradado.
- No valida contraste, teclado, foco, responsive, zoom y errores.
- No ejecuta lint y pruebas relevantes.
- No aporta evidencia visual por viewport/estado.
- Crea componente/variante sin inventario.
- Contradice el manual o presenta derivación como oficial.

## Automatizaciones propuestas

| Herramienta/regla | Propósito | Estado |
|---|---|---|
| ESLint Angular | plantillas, componentes y pruebas | PROPUESTA |
| Stylelint SCSS | hex fuera de tokens y estilos | PROPUESTA |
| Regla custom | bloquear hex/rgb/hsl y `style=` fuera de allowlist | PROPUESTA |
| Angular tests | comportamiento/componentes | PROPUESTA para ampliar |
| axe-core | WCAG automatizable | PROPUESTA |
| Playwright | responsive, teclado y flujos | PROPUESTA |
| Screenshots visuales | regresión por viewport/estado | PROPUESTA |
| Contraste automatizado | combinaciones de tokens | PROPUESTA |

No se instala/configura ninguna herramienta en esta integración documental.

Login/stepper exige ADR-032..036 APPROVED, ausencia de password, externo sin navegación, identidad backend, rutas/expiración/logout probados, Solicitante fijo, cuatro pasos, datos conservados, teclado/lector/responsive, trazabilidad y evidencia. Con ADR PROPUESTOS ninguna implementación está Done.
- Logout del header presenta texto y borde mediante tokens en normal/hover/focus/active/loading/disabled.
- Empresa es input accesible y no produce solicitudes a catálogo; UPN se muestra readonly desde API.
- CMP-028 verifica iniciales, identidad sin hover, menú, Escape/foco, móvil y delegación de logout sin MSAL interno.
- CMP-029 muestra el mismo nombre que solicitante, sin select/input editable ni dato ficticio; helper/loading/error y resumen están verificados.
