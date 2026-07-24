# Proceso de cambio de especificaciones

Estado: **IN_REVIEW**. Fecha: 2026-07-21.

## Flujo obligatorio

1. Identificar la necesidad y su evidencia.
2. Localizar requisitos, decisiones, pantallas y componentes afectados.
3. Actualizar los documentos fuente antes del código.
4. Actualizar trazabilidad.
5. Actualizar criterios de aceptación.
6. Actualizar escenarios BDD y pruebas esperadas.
7. Revisar contradicciones, alcance, accesibilidad y riesgos.
8. Obtener aprobación explícita del Spec.
9. Implementar únicamente lo aprobado.
10. Ejecutar pruebas automáticas y revisión manual.
11. Adjuntar evidencia visual y resultados.
12. Cerrar el cambio y actualizar el change log.

## Estados

| Estado | Significado | ¿Autoriza implementación? |
|---|---|---|
| DRAFT | Trabajo incompleto. | No. |
| IN_REVIEW | Completo para revisión, aún no aprobado. | No. |
| APPROVED | Aprobación registrada con responsable y fecha. | Sí, dentro del alcance aprobado. |
| DEPRECATED | Válido solo como referencia histórica. | No. |
| SUPERSEDED | Sustituido por una versión identificada. | No. |

La aprobación debe quedar registrada en `specification-status.md`. La mera existencia de un documento, una captura o un cambio de código no equivale a aprobación.

Todo cambio de `/api`, runtime config, variables, templates NGINX, MSAL, CORS o separación pública/privada actualiza ADR-028..031, catálogo de variables, BDD y trazabilidad antes de código. Renombrar una variable exige deprecación y compatibilidad documentada.

## Cambios visuales

Solicitud → Spec → impacto → criterios → trazabilidad → aprobación → implementación → validación visual → pruebas → cierre. Una solicitud urgente no omite pasos; puede acelerar su revisión.

El paquete login/stepper permanece DRAFT y ADR-032..036 PROPUESTOS. Solo LOGIN-SPEC-001 puede cerrarse; ninguna implementación o cambio de contrato inicia sin aprobación explícita.
