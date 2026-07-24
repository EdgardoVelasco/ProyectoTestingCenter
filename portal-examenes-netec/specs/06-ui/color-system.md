# Sistema de color

Contrastes calculados con WCAG (ratio frente a blanco / azul `#02419F` / teal `#00A1AF`). La pertenencia a marca no implica accesibilidad para texto.

| Color | HEX / RGB | Clase | Contraste W/B/T | Uso permitido | No recomendado / variante accesible | Componentes |
|---|---|---|---|---|---|---|
| Azul principal | `#02419F` / 2,65,159 | OFICIAL | 9.29/1.00/2.97 | CTA, enlace, fondo con blanco | Azul sobre teal; usar blanco sobre azul | Botón/header/link |
| Teal principal | `#00A1AF` / 0,161,175 | OFICIAL | 3.13/2.97/1.00 | Marca, borde/acento grande | Texto normal blanco no AA; usar `#333333` (4.04:1) sujeto a tamaño | Gradiente/acento |
| Gris | `#D8D8D8` / 216,216,216 | OFICIAL | 1.43/6.52/2.19 | Borde/superficie | Texto en blanco; usar `#333333` | Borde/divisor |
| Azul auxiliar | `#0561EC` / 5,97,236 | OFICIAL | 5.35/1.74/1.71 | Acento/enlace alterno | Sobre azul/teal | Info propuesto |
| Azul claro | `#4C93FF` / 76,147,255 | OFICIAL | 3.03/3.06/1.03 | Fondo/acento grande | Texto blanco normal; usar `#333333` | Destacado |
| Verde auxiliar | `#27DEBF` / 39,222,191 | OFICIAL | 1.71/5.44/1.83 | Fondo/acento | Texto blanco; usar `#333333` | Destacado |
| Verde claro | `#94FFED` / 148,255,237 | OFICIAL | 1.18/7.87/2.65 | Fondo suave | Texto pequeño sobre blanco; usar `#333333` | Superficie auxiliar |
| Amarillo | `#FAC939` / 250,201,57 | OFICIAL | 1.56/5.97/2.01 | Acento/foco propuesto | Acción principal o texto blanco; usar `#333333` | Aviso/foco propuesto |
| Oscuro | `#333333` / 51,51,51 | OFICIAL | 12.63/1.36/4.04 | Texto sobre claro | Sobre azul; usar blanco | Texto |

## Restricciones

- No usar amarillo como acción principal.
- No usar verde claro como texto pequeño sobre blanco.
- No usar el degradado como fondo de áreas extensas con formularios.
- Botones y header pueden usar el degradado institucional confirmado, siempre azul→teal, mediante tokens y con contraste AA. La autorización no obliga a usarlo ni aprueba todavía una variante concreta.
- No convertir colores de marca automáticamente en éxito/error/advertencia.
- Texto normal exige 4.5:1; texto grande 3:1; componentes/foco 3:1. Una combinación fallida requiere token derivado aprobado, no ajuste local.

No existe paleta oscura oficial. Cualquier modo oscuro será DERIVADO/PROPUESTO, deberá definir tokens completos y no podrá inferir colores alterando automáticamente la paleta de marca.
