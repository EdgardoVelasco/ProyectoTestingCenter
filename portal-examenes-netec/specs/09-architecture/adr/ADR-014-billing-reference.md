# ADR-014: Referencia de facturación

## Contexto
Ejemplo compuesto `OF 84886 VA 10273 FGP FEB-2938` sin semántica confirmada.

## Decisión provisional
Capturar texto opcional de máximo 250 y conservar snapshot; no parsear OF/VA/FGP.

## Alternativas
Campos OF/VA/FGP; entidad de referencias tipadas; texto más parser validado.

## Consecuencias
Entrega rápida y fiel; menor validación/reportabilidad.

## Riesgos y preguntas
Formato libre reduce búsquedas estructuradas; aceptado para fase 1.

**Estado: ACEPTADO.**
