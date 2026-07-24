# ADR-017: Estrategia de design tokens

- **Estado:** ACEPTADO
- **Fecha:** 2026-07-21
- **Responsables:** Arquitectura/frontend/diseño, pendientes

## Contexto

Valores dispersos dificultan consistencia, contraste y evolución de marca.

## Decisión

Todo valor visual consumible se centraliza en tokens clasificados. La futura implementación separará `_tokens.scss`, `_typography.scss`, `_layout.scss` y `_components.scss`; componentes no contendrán hex ni estilos inline.

## Alternativas

CSS ad hoc; variables por componente; solo tokens Material. Se rechazan por duplicación o cobertura insuficiente.

## Consecuencias positivas

Trazabilidad, tematización, enforcement y cambios atómicos.

## Consecuencias negativas

Capa adicional, migración inicial y disciplina de nombres.

## Riesgos

Token proliferation, semántica ambigua, duplicar tokens Material.

## Validación

VAC-003/012, Stylelint/regla de hex PROPUESTAS y matriz BR→token→archivo.
