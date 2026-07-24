# ADR-044 — Solicitante como Asesor Comercial en el MVP

- **Estado:** APPROVED
- **Fecha:** 2026-07-23

## Contexto

El formulario permitía seleccionar un Asesor Comercial desde datos simulados, aunque la solicitud ya se crea bajo una identidad validada por Microsoft Entra ID. En el MVP no existe delegación ni catálogo de asesores.

## Decisión

El solicitante autenticado y el Asesor Comercial representan conceptos distintos, pero se rellenan con la misma identidad durante el MVP. El backend resuelve ambos desde el principal autenticado, con `oid` como identificador preferido y `sub` como fallback. Nombre y UPN siguen la resolución validada de `/api/auth/me`.

La API de creación/actualización no acepta `salesAdvisorId`, `salesAdvisorName` ni `salesAdvisorUpn`; propiedades desconocidas se rechazan con 400. La respuesta expone `salesAdvisor` como dato de solo lectura. `ExamRequest` conserva `sales_advisor_user_id`, `sales_advisor_name_snapshot` y `sales_advisor_upn_snapshot`.

Angular muestra un campo de solo lectura “Asesor Comercial”, reutiliza la identidad ya cargada y no consulta un catálogo de asesores.

## Alternativas

1. Usar únicamente requester y derivar el asesor: menos duplicación, pero dificulta delegación futura.
2. Mantener selector/catálogo: rechazado porque permite suplantación funcional y no existe catálogo aprobado.
3. Mantener ambos conceptos y snapshots iguales: seleccionada por compatibilidad futura y claridad histórica.

## Consecuencias

Se elimina la manipulación desde cliente y se facilita delegación futura, a cambio de duplicación intencional de snapshots. Una identidad incompleta bloquea el envío; los borradores siguen la política vigente. La migración rellena históricos desde requester y no modifica migraciones aplicadas.

## Riesgos y validación

La delegación futura requiere ADR, autorización y contrato nuevos. Se valida request sin asesor, respuesta read-only, resolución `oid`/`sub`, persistencia histórica, UI no editable y ausencia de catálogo.
