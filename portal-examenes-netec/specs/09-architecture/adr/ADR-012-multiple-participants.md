# ADR-012: Varios participantes y asignación

Contexto: confirmado 1..N participantes; uno puede presentar varios exámenes y no hay vouchers sin asignar. Decisión: participantes del agregado más asignación N:M a líneas; `item.quantity = count(assignments)` es obligatoria. Alternativas: duplicar participante, matriz sin entidad, solicitud por voucher. Consecuencias: no duplica datos y asignación es explícita; UI/dominio más complejos. **Estado: ACEPTADO.**
