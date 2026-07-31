# Riesgos — nuevas fases

| ID | Fase | Riesgo | Prob. | Impacto | Mitigación | Estado |
|---|---|---|---|---|---|---|
| RISK-UX-001 | 1A | Se limpia antes de confirmar y se pierde información | M | H | limpiar solo tras éxito | OPEN |
| RISK-UX-002 | 1A | Doble clic crea dos solicitudes | M | H | bloqueo UI e idempotencia | OPEN |
| RISK-UX-003 | 1A | Se reutiliza idempotencia | M | H | nueva clave por solicitud | OPEN |
| RISK-CSV-001 | 1B | Archivo grande bloquea navegador | M | M | límite de tamaño/procesamiento acotado | OPEN |
| RISK-CSV-002 | 1B | Datos inválidos entran al formulario | M | H | preview y validación backend | OPEN |
| RISK-CSV-003 | 1B | Correos duplicados | M | H | normalización case-insensitive | OPEN |
| RISK-CSV-004 | 1B | Datos personales en logs | L | H | redacción y pruebas de logs | OPEN |
| RISK-CSV-005 | 1B | CSV injection | M | H | tratar fórmulas como texto | OPEN |
| RISK-CSV-006 | 1B | Usuario interpreta importación parcial | L | M | importación atómica | OPEN |
| RISK-CSV-007 | 1B | Frontend/backend divergen | M | H | backend autoritativo y contrato | OPEN |
| RISK-BILLING-001 | 2 | Facturación sin autorización definida | H | XL | discovery de roles antes de plan | BLOCKED |
| RISK-APAC-001 | 3 | Separación AP/AC sin fuente oficial | H | H | no implementar hasta confirmación | BLOCKED |
| RISK-CATALOG-001 | 4 | Automatización modifica catálogo incorrectamente | M | H | revisión humana/auditoría | OPEN |
