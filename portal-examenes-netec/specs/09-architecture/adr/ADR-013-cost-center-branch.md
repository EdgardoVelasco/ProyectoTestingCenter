# ADR-013: Centro de Costos o Sucursal

Contexto: negocio confirma una sola selección operativa y lista códigos, aunque denomina BOG sucursal. Decisión: catálogo único `OrganizationalLocation` con código/nombre snapshot; no crear dos campos ni jerarquía. Alternativas: CostCenter, Branch separados o catálogo tipado. Consecuencias: refleja formato real; nombre de dominio neutral hasta aclarar semántica. Riesgo: integraciones futuras pueden exigir tipo. **Estado: ACEPTADO para MVP.**
