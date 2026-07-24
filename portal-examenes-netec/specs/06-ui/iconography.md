# Iconografía

- **OFICIAL:** toda iconografía mantiene característica outline (manual p. 10).
- **PROPUESTA:** Material Symbols Outlined por compatibilidad con Angular Material.
- No mezclar outlined, rounded y filled. Una excepción requiere registro, contraste y aprobación.

## Reglas derivadas

| Aspecto | Regla |
|---|---|
| Tamaños | 16 px en densidad alta, 20 px en controles, 24 px estándar; 32+ solo ilustrativo. |
| Grosor | Consistente dentro de una pantalla; no simular relleno por stroke excesivo. |
| Alineación | Caja centrada y baseline alineado con texto. |
| Botones | Icono acompaña label salvo acción universal validada; hit target mínimo 44×44. |
| Tablas | Acciones repetidas usan tooltip/nombre accesible; no depender solo del glifo. |
| Decorativos | `aria-hidden="true"`; no reciben foco. |
| Funcionales | Nombre accesible mediante texto o `aria-label`; estado se anuncia. |

La fuente/asset oficial de iconos es PENDIENTE. Material Symbols Outlined permanece PROPUESTA hasta aprobación de ADR-019.
