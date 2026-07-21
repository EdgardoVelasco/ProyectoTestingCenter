# Reporte de validación cruzada

## Revalidación tras respuestas — 2026-07-21

Se corrigieron contradicciones anteriores: un examen por solicitud, precio no editable, cantidad global igual a participantes, centro/sucursal separados y N/A como ausencia quedaron deprecados. Modelo/API/UI ahora usan `items[]`, `participants[]` y asignaciones. Backend conserva costo base, acepta precio venta autorizado y calcula subtotales/total. Pendientes críticos reales: P-01, P-03..P-07, P-09, P-11, P-15..P-18. No se añadió aprobación de Facturación ni código.

Revalidación adicional: persisten P-11/P-12/P-14/P-16/P-20..P-22. El conflicto USD/EUR fue resuelto funcionalmente: MAD convierte automáticamente; otras ubicaciones no. Continúa ALTO el gobierno de la tasa (fuente/frecuencia/responsable/redondeo). Sin tasa vigente MAD bloquea; se conserva origen/tasa/resultado y el correo nunca es fuente oficial.

Fecha: 2026-07-21. Alcance: 58 documentos de especificación/plan; sin código, migraciones, infraestructura ni pruebas ejecutables.

## Resultado

- RF-001..030, RN-001..040, HU-001..025, CA-001..030 y BDD-001..050 tienen cobertura en matriz.
- Formato real representado: clave/tipo/AC/segmento/centro/sucursal/empresa/referencia/examen/precio/moneda/cantidad/participantes.
- Quantity-participants es coherente solo bajo regla configurable RN-030; la incertidumbre no se oculta.
- Precio/moneda están separados; total usa DECIMAL(19,4), misma moneda y autoridad backend.
- Correo deriva de persistencia y outbox; no es fuente oficial y su fallo no pierde participantes.
- Estados se conservan sin aprobación/rechazo de Facturación.

## Hallazgos

| Severidad | Hallazgo | Tratamiento/estado |
|---|---|---|
| CRÍTICO | Significados AC/CN/BOG, campos obligatorios y catálogos reales desconocidos. | Preguntas 1–9/29–33; bloquean configuración productiva, no specs. |
| CRÍTICO | Estrategia/precio aplicable, impuestos y permiso de valor cero no confirmados. | ADR-011 PROPUESTO; bloquea I3. |
| ALTO | No se confirma si vouchers pueden quedar sin participantes o mezclar exámenes. | ADR-012/015 y RN-030 configurable; bloquea I4/I5 definitivo. |
| ALTO | Centro de costos vs sucursal y referencia compuesta son ambiguos. | ADR-013/014 PROPUESTOS; campos separados/texto provisional. |
| ALTO | Duplicidad externa podría requerir empresa, cliente, evento, clave, fecha o referencia. | Regla mínima documentada; no cerrar antes de I5. |
| MEDIO | Endpoint de precio puede cambiar al conocer dimensiones. | Separado provisionalmente y versionado por OpenAPI. |
| MEDIO | Máximo 50 es objetivo técnico, no límite confirmado. | Configurable; pregunta 38. |
| BAJO | Documentos previos usan términos participante embebido/billingLine en contexto histórico. | ADR-007 y changelog los marcan deprecados. |

## Correcciones automáticas no ambiguas

1. Separado código/nombre y amount/currency; eliminado importe cliente del request.
2. Convertido participante único a colección hija y añadido duplicado interno.
3. Añadida revalidación de precio/total en transición y confirmación.
4. Separados costCenterId/branchId sin imponer jerarquía.
5. Actualizado correo con snapshots y tabla de participantes.
6. Reordenado backlog en ocho incrementos y actualizado DoD/riesgos.

## Revisión de alcance

No se incorporaron aprobación/rechazo, compra, voucher, portales de fabricantes, IA, RPA ni inventario. Facturación solo recibe notificación y actúa fuera del portal. No se generó código.
