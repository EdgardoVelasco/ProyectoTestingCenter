# ADR-015: Varios exámenes por solicitud

Contexto: confirmado que una solicitud puede contener varios exámenes y no todos los participantes presentan el mismo. Decisión: ExamRequest 1:N ExamRequestItem y asignación N:M de participantes. Alternativas: un examen/solicitud, línea por voucher. Consecuencias: representa el pedido real; total y duplicidad operan por línea/asignación. Riesgos: máximo, monedas mixtas y línea duplicada pendientes. **Estado: ACEPTADO.**
