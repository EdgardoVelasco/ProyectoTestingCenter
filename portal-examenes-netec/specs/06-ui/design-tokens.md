# Design tokens

Estado: **APPROVED** para implementación UI-004..007. Sintaxis conceptual mapeada a SCSS/CSS centralizado.

## Marca y superficies

| Token | Valor | Clasificación | Justificación/uso |
|---|---|---|---|
| color-brand-primary / gradient-start | `#02419F` | OFICIAL | Azul corporativo, inicio del degradado. |
| color-brand-secondary / gradient-end | `#00A1AF` | OFICIAL | Teal corporativo, final del degradado. |
| color-brand-gray | `#D8D8D8` | OFICIAL | Gris corporativo; no texto pequeño en blanco. |
| color-brand-yellow | `#FAC939` | OFICIAL | Auxiliar/acento, nunca CTA principal. |
| color-brand-dark | `#333333` | OFICIAL | Texto oscuro. |
| color-brand-blue-aux | `#0561EC` | OFICIAL | Auxiliar. |
| color-brand-blue-light | `#4C93FF` | OFICIAL | Auxiliar claro. |
| color-brand-green-aux | `#27DEBF` | OFICIAL | Auxiliar. |
| color-brand-green-light | `#94FFED` | OFICIAL | Auxiliar claro. |
| color-background | `#F5F7FA` | DERIVADA | Fondo neutro para legibilidad; no color oficial. |
| color-surface | `#FFFFFF` | DERIVADA | Superficie estándar accesible. |
| color-surface-muted | `#F1F4F8` | DERIVADA | Agrupación secundaria. |
| color-border | `#D8D8D8` | DERIVADA desde oficial | Borde neutro. |
| color-divider | `#D8D8D8` | DERIVADA desde oficial | Separador. |

## Texto, enlaces y estados

| Token | Valor | Clasificación | Justificación |
|---|---|---|---|
| color-text-primary | `#333333` | OFICIAL aplicado | Contraste 12.63:1 sobre blanco. |
| color-text-secondary | `#555F6D` | DERIVADA | Contraste AA; requiere validación automática. |
| color-text-disabled | `#767676` | DERIVADA | Mínimo 4.54:1 sobre blanco; no único indicador. |
| color-text-on-primary | `#FFFFFF` | DERIVADA | 9.29:1 sobre azul principal. |
| color-link | `#02419F` | DERIVADA desde oficial | Enlace con subrayado/foco. |
| color-success | `#137333` | DERIVADA APPROVED | Semántico no oficial; 5.95:1 sobre blanco. |
| color-warning | `#8A4B00` | DERIVADA APPROVED | Semántico no oficial; 6.80:1 sobre blanco. Amarillo queda para fondo/acento. |
| color-error | `#B3261E` | DERIVADA APPROVED | Semántico no oficial; 6.54:1 sobre blanco. |
| color-info | `#0561EC` | DERIVADA APPROVED desde auxiliar | 5.35:1 sobre blanco; uso semántico no oficial. |
| color-focus | `#FAC939` con contraste sobre `#333333` | DERIVADA APPROVED | 8.11:1 frente al oscuro; contorno adicional según superficie. |

## Tipografía

| Token | Valor | Clasificación |
|---|---|---|
| font-family-primary | `Montserrat, Arial, sans-serif` | Montserrat OFICIAL; fallbacks DERIVADOS |
| font-weight-light/regular/medium/semibold/bold | `300/400/500/600/700` | variantes OFICIALES; mapeo numérico DERIVADO |
| font-size-xs/sm/md/lg/xl/2xl/3xl | `12/14/16/18/22/28/36px` | DERIVADA |
| line-height-tight/normal/relaxed | `1.2/1.5/1.65` | DERIVADA |

## Espaciado, bordes y sombras

| Token | Valor | Clasificación | Justificación |
|---|---|---|---|
| spacing-1/2/3/4/6/8/12 | `4/8/12/16/24/32/48px` | DERIVADA | Escala base 4 para consistencia. |
| border-width-default | `1px` | DERIVADA | Separación discreta. |
| border-radius-small/medium/large | `4/8/12px` | DERIVADA | Jerarquía sin alterar marca. |
| shadow-small | `0 1px 2px rgb(51 51 51 / 10%)` | DERIVADA | Elevación mínima. |
| shadow-card | `0 4px 16px rgb(2 65 159 / 10%)` | DERIVADA | Card empresarial. |
| shadow-dialog | `0 16px 40px rgb(51 51 51 / 24%)` | DERIVADA | Modal. |

Breakpoints (`360`, `600`, `960`, `1280px`) son DERIVADOS y se especifican en responsive. Ningún valor PROPUESTO se implementa hasta aprobarse.
