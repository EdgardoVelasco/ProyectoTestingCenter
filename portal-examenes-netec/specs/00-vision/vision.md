# Visión

## Identidad comercial MVP

El portal reduce recaptura y riesgo de suplantación al asociar automáticamente el Asesor Comercial con el solicitante autenticado. Delegación y registro para terceros no forman parte de la primera versión.

## Problema y resultado

El AC hoy envía solicitudes por correo al aprobador que corresponde a la sede. Testing Center no las reenvía. El producto proveerá un registro estructurado, resolverá el aprobador por configuración y enviará la solicitud de aprobación de forma trazable y resiliente. La decisión de aprobación seguirá fuera del portal en esta fase.

## Usuarios y valor

- Ventas: captura, guarda, envía y consulta sus solicitudes.
- Aprobador por sede: recibe un correo consistente con folio y enlace.
- Testing Center: compra después de la aprobación, fuera del alcance de fase 1; no reenvía la solicitud inicial.
- Administración técnica: carga catálogos y destinatarios sin que el MVP exija UI.

La evidencia real añade clave de evento, tipo, AC, CN, Centro de Costos o Sucursal, empresa, referencia, varios exámenes, costo base, precio de venta, cantidad y participantes. El portal admite varios participantes y exámenes, con asignación explícita: un alumno puede presentar varios exámenes y no existen vouchers sin participante.

Éxito: solicitudes completas y localizables, importes exactos y snapshots históricos, participantes trazables, sin duplicados activos, con folio único, auditoría y conservación aun cuando falle el correo.

## Límites

No incluye aprobación/rechazo dentro del portal, compra/entrega de voucher, portales externos, IA/RPA, inventario ni paneles operativos completos. Permanece pendiente confirmar si los aprobadores pertenecen formalmente a Facturación.

## Experiencia DRAFT

Acceso NETEC → redirect Entra ID → `/api/auth/me` → solicitante fijo → cuatro pasos (Comercial, Participantes, Exámenes, Resumen) → envío al aprobador. El portal nunca administra contraseñas. Acceso externo es futuro/disabled. No agrega aprobación, compra o vouchers.
