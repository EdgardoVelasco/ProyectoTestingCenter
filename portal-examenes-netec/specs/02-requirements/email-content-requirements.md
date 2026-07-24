# Requisitos de contenido de correo — 2026-07-24

Estado: APPROVED para Etapa C.

| ID | Requisito | Criterio verificable | Prueba |
|---|---|---|---|
| RF-MAIL-001 | Generar correo completo | Identificación, comercial, participantes, exámenes, asignaciones y totales | approval-email-content |
| RF-MAIL-002 | Mostrar información comercial | Campos modelados y N/A consistente | renderer |
| RF-MAIL-003 | Mostrar solicitante/asesor | Bloque combinado desde snapshots | renderer |
| RF-MAIL-004 | Mostrar participantes | Tabla número, nombre y correo | renderer |
| RF-MAIL-005 | Mostrar exámenes | Proveedor, código, nombre, retake, precio, moneda, cantidad y subtotal | renderer |
| RF-MAIL-006 | Mostrar asignaciones | Matriz persistida participante–examen | renderer |
| RF-MAIL-007 | Derivar cantidades | Conteo de asignaciones únicas | cálculo |
| RF-MAIL-008 | Calcular subtotales | BigDecimal unitario por cantidad | cálculo |
| RF-MAIL-009 | Totales por moneda | No sumar monedas distintas | cálculo |
| RF-MAIL-010 | Generar HTML | Tablas compatibles con Outlook | renderer |
| RF-MAIL-011 | Generar texto plano | Misma información esencial | renderer |
| RF-MAIL-012 | Escapar contenido | Sin HTML ejecutable ni header injection | seguridad |
| RF-MAIL-013 | Conservar snapshot | Reintento conserva contenido original | integración |
| RF-MAIL-014 | Compatibilidad Outlook | Sin Grid/Flex/JS/CSS externo | preview |
| RF-MAIL-015 | Normalizar opcionales | Nulos comerciales → N/A | renderer |
| RF-MAIL-016 | Evitar suma multidivisa | Bloques independientes por ISO | cálculo |

Reglas RN-MAIL-001..015, historias HU-MAIL-001..006 y criterios se detallan en `specs/07-notifications/email-content-model.md` y `specs/08-acceptance/approval-email-content.feature`.
