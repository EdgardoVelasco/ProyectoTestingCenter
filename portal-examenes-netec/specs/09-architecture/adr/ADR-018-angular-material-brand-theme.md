# ADR-018: Tema NETEC para Angular Material

- **Estado:** ACEPTADO
- **Fecha:** 2026-07-21
- **Responsables:** Frontend/diseño/marca, pendientes

## Contexto

Angular Material está instalado y actualmente usa un tema prebuilt que no acredita cumplimiento NETEC.

## Decisión

Tras aprobación, Angular Material usará tema personalizado que mapea tokens NETEC sin modificar internals ni duplicar estilos por componente.

## Alternativas

Mantener tema prebuilt; reemplazar Material; overrides globales ad hoc. Se descartan por inconsistencia, costo o fragilidad.

## Consecuencias positivas

Controles coherentes, accesibles y mantenibles.

## Consecuencias negativas

Requiere migración, pruebas visuales y conocimiento de theming Angular 22.

## Riesgos

Contraste insuficiente del teal, cambios de API Material, divergencia de tokens.

## Validación

VAC completo, screenshots, axe y computed styles. Esta ADR no autoriza crear el tema hasta aprobación explícita.
