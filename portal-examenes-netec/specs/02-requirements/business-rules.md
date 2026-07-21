# Reglas de negocio actualizadas

| ID | Regla |
|---|---|
| RN-001 | Solo se envía con obligatorios válidos. |
| RN-002 | Todo correo cumple sintaxis; participantes usan correo corporativo según política pendiente. |
| RN-003 | Solicitante/instantes provienen de sesión/servidor. |
| RN-004 | Referencias de catálogo usadas al enviar están activas. |
| RN-005 | Cada examen conserva relaciones de tecnología/proveedor/certificación. |
| RN-006 | Curso/evento y examen se validan cuando exista relación confirmada. |
| RN-007 | Duplicidad externa provisional: correo normalizado + examId + estado no CANCELADA. |
| RN-008 | Ventas solo modifica BORRADOR. |
| RN-009 | Backend genera folio único anual. |
| RN-010 | Solicitud completa y outbox se confirman antes del correo. |
| RN-011 | Fallar correo no elimina solicitud, líneas ni participantes. |
| RN-012 | Fallo deja PENDIENTE_NOTIFICACION. |
| RN-013 | Borrador no genera correo/folio. |
| RN-014 | Cambios, envío e intentos se auditan. |
| RN-015 | Submit es idempotente. |
| RN-016 | Ventas solo consulta/modifica propias. |
| RN-017 | Catálogo inactivo no sirve en nuevas solicitudes. |
| RN-018 | Se guardan snapshots históricos visibles. |
| RN-019 | Reglas de fechas continúan pendientes de confirmación. |
| RN-020 | Backend repite toda validación crítica. |
| RN-021 | Cada examen se selecciona desde catálogo activo. |
| RN-022 | Código, nombre, fabricante, tecnología, certificación, costo base y moneda vienen de catálogo; precio de venta es editable por Ventas. |
| RN-023 | Costo base es ≥0 y precio de venta es decimal exacto >0; venta cero no permitida. |
| RN-024 | Cantidad por línea es entero >0 y bajo límite configurable. |
| RN-025 | `lineTotal = saleUnitPrice × quantity`; `totalAmount = suma(lineTotal)` en la moneda de solicitud. |
| RN-026 | Totales no son editables manualmente. |
| RN-027 | Costo base, precio venta, moneda y datos de examen se congelan al enviar. |
| RN-028 | Cada participante tiene nombre y correo válido. |
| RN-029 | No se repite correo normalizado en la colección de participantes. |
| RN-030 | DEPRECADA: cantidad global no equivale a participantes. Se valida cantidad por línea contra asignaciones según P-16. |
| RN-031 | Correos se normalizan antes de duplicidad. |
| RN-032 | Referencia de facturación es cadena libre opcional en fase 1. |
| RN-033 | Datos enviados son inmutables para Ventas. |
| RN-034 | Inactivos no se usan; snapshots históricos permanecen. |
| RN-035 | Cada línea requiere examen para obtener base/moneda y calcular. |
| RN-036 | Cambiar examen reemplaza derivados/base y exige revisar precio venta/resumen. |
| RN-037 | Backend calcula todos los totales. |
| RN-038 | Moneda es USD salvo MAD, donde es EUR; ubicación determina la regla. |
| RN-039 | Importes y moneda se almacenan separados. |
| RN-040 | Enviada conserva snapshots comerciales/financieros exactos. |
| RN-041 | Una solicitud admite varios exámenes y participantes. |
| RN-042 | Cada voucher se asigna a un participante; un participante puede presentar varios exámenes. |
| RN-043 | Líneas duplicadas del mismo examen requieren regla pendiente para evitar duplicación accidental. |
| RN-044 | Costo base y precio venta se almacenan separados; Ventas no modifica el costo base/catálogo desde la solicitud. |
| RN-045 | Solo MAD convierte automáticamente USD→EUR; las demás ubicaciones conservan USD. |
| RN-046 | El correo del participante debe ser corporativo; definición técnica pendiente. |
| RN-047 | `N/A` significa no aplica únicamente en campos autorizados. |
| RN-048 | Segmento es obligatorio; inicialmente CN. Tipo de curso es opcional. |
| RN-049 | Empresa y cliente son el mismo concepto; no se capturan dos selecciones. |
| RN-050 | Máximo configurable confirmado: 100 participantes y 100 líneas. |
| RN-051 | País/precio/moneda se determinan desde Centro de Costos o Sucursal. |
| RN-052 | Precio base tiene vigencia; no se usa fuera de su intervalo válido. |
| RN-053 | Retake y comentarios del examen se muestran y conservan como snapshot. |
| RN-054 | Testing Center es responsable de alta/modificación de exámenes y precios con auditoría. |
| RN-055 | Total representa importes antes de impuestos; el portal no calcula impuestos. |
| RN-056 | Para MAD backend obtiene tipo USD→EUR vigente, convierte con decimal exacto y redondeo definido, y guarda monto origen, tasa, instante y resultado como snapshots. |
| RN-057 | Si MAD no tiene tipo de cambio vigente, la solicitud no puede validarse ni enviarse. |
| RN-058 | Cambiar ubicación hacia/desde MAD recalcula todas las líneas y exige revisar de nuevo el resumen. |
| RN-059 | El frontend nunca determina ni acepta como autoridad el tipo de cambio o importe convertido. |

RN-030 queda deprecada. Permanecen críticas la igualdad línea/asignaciones y el gobierno de la tasa USD→EUR.
