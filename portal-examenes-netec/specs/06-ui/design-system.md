# Sistema de diseño NETEC para el portal

Estado: **IN_REVIEW**. No autoriza implementación.

## Principios

1. Fidelidad: no crear una identidad nueva ni modificar el logotipo.
2. Trazabilidad: BR→token→componente→VAC→BDD→prueba.
3. Accesibilidad: marca y WCAG conviven; excepciones se documentan.
4. Consistencia: un propósito visual usa un token/componente compartido.
5. Claridad empresarial: jerarquía, densidad y ayuda favorecen captura segura.
6. Responsive: contenido y acciones siguen utilizables desde 360 px.

## Gobierno

Los documentos de color, tipografía e iconografía contienen reglas OFICIALES. Tokens de layout, escalas y estados son DERIVADOS/PROPUESTOS. Un componente se aprueba al figurar en inventario, tener VAC, accesibilidad, estados y aprobación del paquete.

## Angular Material

ADR-018 propone un tema personalizado NETEC tras aprobación. El tema prebuilt actual no se considera evidencia de cumplimiento. La migración futura centralizará tokens en `_tokens.scss`, `_typography.scss`, `_layout.scss` y `_components.scss`; estos archivos no se crean en esta tarea.
