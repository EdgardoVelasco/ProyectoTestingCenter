# Preguntas y respuestas de descubrimiento

Actualizado: 2026-07-21. Las respuestas de Testing Center son evidencia; los pendientes no deben asumirse.

## Confirmadas o decididas

| Tema | Estado | Evidencia/decisión |
|---|---|---|
| AC | CONFIRMADO | Asesor Comercial que envía la solicitud; existen varios dentro del grupo de Cuentas Nombradas. Se identifica desde el usuario autenticado, sujeto al mapeo técnico de Entra pendiente. |
| Segmento | CONFIRMADO | Obligatorio. Valor actual CN/Cuentas Nombradas; catálogo extensible. |
| Centro de Costos o Sucursal | CONFIRMADO | Una selección operativa: BOG Bogotá, MED Medellín, WTC México, SCL Chile, LIM Perú, MAD España, CA Centro América, PAN Panamá. |
| Tipo de curso | CONFIRMADO | Opcional; N/A, Intensivo, Digital. |
| Clave Curso Programado | CONFIRMADO | Clave de evento; N/A permitido. |
| Referencia facturación | CONFIRMADO | Cadena libre opcional; OF/VA/FGP son claves variables. Puede existir si el proyecto ya tiene factura. |
| Catálogo | CONFIRMADO | Excel inicial mantenido por investigación; Testing Center administra exámenes/precios. Debe poder agregar/modificar. |
| Precio | CONFIRMADO | Depende de país/proveedor; Ventas puede modificar precio venta; costo base permanece separado. Precio venta cero no permitido. |
| Solicitud/asignación | CONFIRMADO PARCIAL | Varios exámenes/participantes. Participante por examen y varios participantes pueden hacer el mismo; no hay vouchers sin asignar. Cantidad exacta por línea sigue pendiente. |
| Empresa/cliente | CONFIRMADO | Son el mismo concepto; usar `company`, deprecar `client` separado. |
| Correo | CONFIRMADO PARCIAL | Debe ser corporativo; política verificable de dominios pendiente. |
| Moneda | DECIDIDO | USD para ubicaciones distintas de MAD. Al seleccionar MAD, el sistema convierte automáticamente USD→EUR; no convierte para ninguna otra ubicación. |
| Impuestos | CONFIRMADO | Total no incluye impuestos. |
| N/A | CONFIRMADO | Significa no aplica y solo se permite en Tipo de Curso, Clave Curso Programado y Código de examen. |
| Vigencia | CONFIRMADO | Cambio depende del proveedor (3, 6 meses o años); debe almacenarse vigencia. |
| Límites | CONFIRMADO | Máximo 100 participantes y 100 líneas de examen. |
| País precio | CONFIRMADO | Se deriva de Centro de Costos o Sucursal. |
| Retake/comentarios | CONFIRMADO | Deben conservarse y mostrarse. |
| Facturación | CONFIRMADO | No valida presupuesto ni precio dentro de este flujo. |

## Pendientes reales

| ID | Clasificación | Pregunta |
|---|---|---|
| P-11 | CRÍTICA PARA MVP | ¿Qué grupos/claims de Entra mapean EXAM_SALES/Testing Center y área/unidad? |
| P-12 | IMPORTANTE | Explicación simplificada: si el mismo correo y examen ya existe activo, ¿debe permitirse otra solicitud cuando cambia empresa, evento, referencia o fecha? |
| P-14 | IMPORTANTE | ¿Destinatarios/CC, URL, SLA, retención, cancelación y reintentos? En investigación. |
| P-16 | CRÍTICA PARA MVP | ¿Cantidad de una línea debe ser exactamente el número de participantes asignados? |
| P-20 | CRÍTICA PARA MVP | ¿Cuál es la fuente, frecuencia de actualización, precisión y responsable del tipo de cambio USD→EUR para MAD? |
| P-21 | IMPORTANTE | ¿Qué dominios o criterio hacen que un correo sea corporativo? |
| P-22 | IMPORTANTE | ¿Testing Center administrará catálogos con UI en MVP o mediante scripts/API técnica? |

## Evidencia adjunta

`catalogo_examenes.xlsx`: 124 registros; Proveedor, Curso, Código examen, Examen, Retake, Costo, Comentarios. Todos los costos se interpretan como USD según respuesta; no contiene país ni vigencia explícitos.
