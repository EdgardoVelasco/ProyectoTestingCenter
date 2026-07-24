# ADR-039: asignación muchos a muchos participante–examen

Estado: **ACCEPTED**. Fecha: 2026-07-23.

## Contexto y decisión

Una solicitud admite varios participantes y exámenes. Se modela `participant_exam_assignment` entre `exam_request_participant` y `exam_catalog`. La tabla incluye `exam_request_id` aunque sea derivable: permite constraint compuesto, consultas por agregado, aislamiento y defensa ante referencias cruzadas.

La combinación `(exam_request_id, participant_id, exam_catalog_id)` es única. La cantidad por examen es el conteo de asignaciones únicas. El backend resuelve costo y snapshots; el frontend no envía importes autoritativos.

## Alternativas

Arrays/JSON, cantidad manual y entidad sin `exam_request_id` fueron rechazados por integridad, consulta y auditoría deficientes.

## Consecuencias

Positivas: integridad relacional, asignaciones auditables y totales reproducibles.  
Negativas: más joins y validaciones al editar.  
Riesgo: datos históricos mutables; se mitiga con snapshots y bloqueo tras envío.

## Validación

Constraints FK/unique, pruebas de duplicidad, pertenencia, cantidades, totales e inmutabilidad.

