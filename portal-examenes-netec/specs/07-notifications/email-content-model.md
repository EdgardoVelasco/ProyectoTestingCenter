# Modelo estructurado del correo de aprobación

Estado: APPROVED para implementación del incremento de contenido (2026-07-24).

## Fuente y snapshot

`ApprovalEmailModel` es un DTO inmutable construido por `ApprovalEmailModelFactory` a partir de la solicitud y sus relaciones persistidas. No se pasan entidades JPA ni relaciones lazy al motor de plantillas. El Outbox conserva un payload JSON estructurado e inmutable; los reintentos renderizan el mismo snapshot.

## Secciones

1. Identificación: folio, fechas, estado y sede.
2. Resumen de solicitud.
3. Solicitante / Asesor Comercial (un bloque combinado en el MVP).
4. Información comercial.
5. Participantes.
6. Exámenes y costos, agrupados por proveedor y código.
7. Asignaciones participante–examen.
8. Totales agrupados por código ISO de moneda.
9. Observaciones y aviso de aprobación previa a compra.

## Reglas deterministas

- Participantes: orden de registro.
- Proveedores: orden alfabético.
- Exámenes: proveedor y código.
- Asignaciones: participante y código.
- Totales: código ISO ascendente.
- Nulos o vacíos en campos comerciales esperados: `N/A`; secciones de listas vacías se omiten.
- Cantidad: número de asignaciones únicas por examen.
- Subtotal: `BigDecimal unitPrice × quantity` con la escala y redondeo financieros aprobados.
- Monedas distintas nunca se suman ni convierten sin una regla aprobada.

## Validaciones

Se bloquea la generación si falta participante, examen, asignación válida, código, nombre, precio/moneda, solicitante, sede o aprobador. Los precios y snapshots proceden de persistencia; el frontend no es autoridad.

