# Registro de decisiones

| ID | Estado | Decisión |
|---|---|---|
| DEC-001 | DECIDIDO | Monorepo y especificaciones como fuente contractual. |
| DEC-002 | DECIDIDO | Persistencia y outbox en una transacción local. |
| DEC-003 | DECIDIDO | Instantáneas visibles junto con referencias de catálogo. |
| DEC-004 | DECIDIDO | Problem Details extendido como error uniforme. |
| DEC-005 | PENDIENTE | Claims y destinatarios reales se configuran fuera del repositorio. |
| DEC-006 | MODIFICADO/CONFIRMADO | Varios exámenes y participantes con asignación; ADR-012/015. |
| DEC-007 | MODIFICADO/CONFIRMADO | Catálogo aporta costo base, Ventas puede modificar precio de venta; backend calcula y ambos se congelan; ADR-011. |
| DEC-008 | MODIFICADO/CONFIRMADO | Centro de Costos o Sucursal es una sola selección operativa; semántica del catálogo permanece documentada; ADR-013. |
| DEC-009 | AGREGADO/PROPUESTO | Referencia de facturación como texto; ADR-014. |
| DEC-010 | DEPRECADO | Participante único embebido; reemplazado por ExamRequestParticipant 1..N. |
| DEC-011 | MODIFICADO/DECIDIDO | USD general; MAD convierte automáticamente USD→EUR. Ninguna otra ubicación convierte. |
| DEC-012 | CONFIRMADO | N/A significa “no aplica” en campos autorizados. |
| DEC-013 | CONFIRMADO | Empresa y cliente son un solo concepto; `clientId` separado queda deprecado. |
| DEC-014 | CONFIRMADO | Segmento requerido; tipo de curso y referencia opcionales. |
| DEC-015 | CONFIRMADO | Máximo 100 participantes y 100 líneas. |
| DEC-016 | CONFIRMADO | Testing Center mantiene catálogo; precio tiene vigencia variable y retake/comentarios visibles. |
| DEC-017 | DECIDIDO PARCIAL | MAD usa conversión automática con tipo versionado/snapshot; fuente y frecuencia pendientes P-20. |
