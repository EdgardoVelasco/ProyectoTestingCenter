# ADR-056: Modelo estructurado del correo de aprobación

Estado: APPROVED — 2026-07-24.

## Contexto

El Outbox actual contiene un texto resumido y no representa relaciones N:M, precios ni totales.

## Decisión

Crear un `ApprovalEmailModel` inmutable mediante una fábrica dedicada. El sender Graph recibe únicamente el mensaje ya renderizado. No se consultan entidades desde la plantilla.

## Alternativas

- Concatenar strings en el sender: rechazado por seguridad y mantenimiento.
- Pasar entidades JPA al template: rechazado por lazy loading y acoplamiento.
- DTO estructurado: seleccionado.

## Consecuencias

Positivas: determinismo, pruebas unitarias, separación de responsabilidades y soporte HTML/texto. Negativas: más DTOs y serialización del payload.

## Validación

Pruebas de fábrica, ordenamiento, cálculos, escaping y contrato Graph mock.

