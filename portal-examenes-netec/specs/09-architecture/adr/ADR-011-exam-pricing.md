# ADR-011: Costo de catálogo y precio de venta

Contexto: Excel aporta costo USD; Ventas puede vender distinto y MAD opera en EUR. Decisión: ExamPrice conserva costo USD por proveedor/vigencia. En MVP, MAD aplica tasa USD→EUR configurada manualmente y versionada en backend; cada línea congela origen, tasa/fecha, convertido y totales. Otras ubicaciones usan USD. Alternativas: proveedor en tiempo real, conversión frontend. Consecuencias: reproducible; exige definir responsable, precisión, vigencia y autorización P-20. **Estado: ACEPTADO PARCIAL.**
