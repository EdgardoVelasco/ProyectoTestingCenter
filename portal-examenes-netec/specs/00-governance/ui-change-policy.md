# Política de cambios visuales

Estado: **IN_REVIEW**.

## Regla de entrada

Ningún cambio visual comienza en código. Primero debe existir un Spec APPROVED y trazabilidad actualizada.

## Cambio menor

Ejemplos: espacio, alineación, contraste o tamaño tipográfico. Debe actualizar documento afectado, change log, VAC cuando aplique y prueba/evidencia visual. No permite introducir valores directos fuera de tokens.

## Cambio de componente

Ejemplos: nueva variante de botón, card, tabla o selector. Debe actualizar inventario, guía de componentes, tokens aplicables, VAC, BDD, matriz y ADR si altera una decisión. El componente no existe oficialmente hasta ser registrado y aprobado.

## Cambio de identidad

Ejemplos: color, tipografía, logotipo o degradado. Requiere evidencia corporativa, actualización del manual o aprobación formal, ADR, revisión integral de Specs e impacto. Ningún equipo del producto puede reconstruir o reinterpretar el logotipo.

## Excepciones

Las excepciones deben registrar motivo, duración, componente, riesgo, contraste, aprobador y plan de retiro. Una necesidad semántica o accesible puede justificar un color derivado, pero nunca se presenta como color oficial.

## Revisión mínima

- Fuente y clasificación OFICIAL/DERIVADA/PROPUESTA/PENDIENTE.
- Componentes y pantallas afectados.
- Contraste, teclado, responsive y zoom.
- Tokens y ausencia de estilos duplicados/inline.
- Evidencia visual en resoluciones aprobadas.
- Pruebas y trazabilidad BR→token→componente→VAC→BDD→archivo.

Landing, header y stepper son cambios de componente: requieren inventario, VAC-AUTH/VAC-STEP, BDD, trazabilidad, ADR y aprobación. La referencia visual no autoriza campos password ni reproducción del IdP.
