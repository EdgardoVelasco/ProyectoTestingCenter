# Riesgos

Nuevos riesgos ALTO: Excel sin país/moneda/vigencia; confundir costo base con precio venta; sumar USD/EUR; límite/asignación N:M sin cerrar. Mitigación: gobierno de ExamPrice, campos/auditoría separados, una moneda por solicitud como supuesto y resolver P-15..P-18 antes de I3/I4.

| Nivel | Riesgo | Mitigación / responsable pendiente |
|---|---|---|
| Alto | Claims/grupos Entra desconocidos | sesión de identidad y prueba en tenant no productivo |
| Alto | Regla de duplicidad ambigua | decisión negocio y casos con evento/fecha antes de I3 |
| Alto | Catálogos/relaciones no disponibles | dueño, formato, calidad y vigencia antes de I2 |
| Alto | Destinatarios o permisos Graph incorrectos | app registration, mínimo privilegio y prueba controlada |
| Medio | Duplicado de correo por caída tras aceptación | idempotencia/reconciliación y mensaje tolerante a repetición |
| Medio | Contención contador/duplicado | benchmark, locks cortos, índices |
| Medio | PII en logs/auditoría | allowlist, redacción y pruebas |
| Medio | Retención/RPO/RTO sin aprobar | decisión de privacidad/operación antes de producción |
| Bajo | Mermaid/renderers distintos | sintaxis simple y revisión Markdown |
| Alto | AC/CN/BOG y clave programada mal interpretados | no precargar significado; validar con Testing Center |
| Alto | Precio aplicable ambiguo (país/contrato/vigencia/impuestos) | aprobar ADR-011 antes de I3 |
| Alto | Quantity-participants puede impedir vouchers sin asignar | feature flag/regla configurable; confirmar antes de I5 |
| Alto | Centro de costos/sucursal modelados incorrectamente | aprobar ADR-013 antes de I2 |
| Medio | Precio cambia entre resumen y submit | revalidar, recalcular y exigir nueva confirmación |
| Medio | Colección aumenta PII y tamaño de correo | máximo configurable, minimización, no logs completos |
