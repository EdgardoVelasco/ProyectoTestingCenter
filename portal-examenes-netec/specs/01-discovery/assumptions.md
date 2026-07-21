# Supuestos residuales

| ID | Estado | Supuesto |
|---|---|---|
| SUP-001 | SUPUESTO | Claims Entra permiten identificar al asesor autenticado; mapping pendiente P-11. |
| SUP-002 | SUPUESTO | `item.quantity = count(assignments)` hasta resolver P-16. |
| SUP-003 | SUPUESTO | Una solicitud usa una sola ubicación y moneda; mezclar MAD con otras ubicaciones no aplica porque ubicación pertenece a la cabecera. |
| SUP-004 | SUPUESTO | Mientras se confirma P-20, el tipo USD→EUR será configuración administrativa versionada; si falta/no está vigente, MAD no puede enviarse. |
| SUP-005 | SUPUESTO | Cinco reintentos de correo; política pendiente P-14. |

Ya no son supuestos: múltiples exámenes/participantes, precio venta editable, segmento obligatorio, tipo opcional, referencia opcional, máximo 100, empresa=cliente, vigencia, ubicación como fuente de país, retake/comentarios y venta cero prohibida.
