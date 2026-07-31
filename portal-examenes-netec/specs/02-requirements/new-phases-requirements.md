# Requisitos de nuevas fases — solo especificación

Todos los requisitos de este documento están NOT_IMPLEMENTED.

## Fase 1A — submit y correo

| ID | Requisito | Prioridad | Criterio mínimo |
|---|---|---|---|
| RF-UX-001 | Mostrar confirmación tras respuesta exitosa | Alta | título y folio backend |
| RF-UX-002 | Permitir Crear otra solicitud | Alta | limpia y vuelve al paso 1 |
| RF-UX-003 | Conservar datos ante error | Alta | no limpiar ni cambiar paso |
| RF-UX-004 | Generar nueva idempotencia | Alta | clave distinta por nueva solicitud |
| RF-TERM-001 | Mostrar Comercial | Media | CN/Cuentas Nombradas no aparece como término vigente |
| RF-MAIL-017 | Resaltar folio, sede, alumno, examen, precio y total | Media | HTML y texto plano equivalentes |
| RF-MAIL-018 | Centrar primer resumen | Media | tablas compatibles con Outlook |

Actor para RF-UX: usuario autenticado. Precondición: submit exitoso o fallido.
Postcondición de éxito: solicitud registrada, confirmación visible y estado
local listo para reinicio. Casos negativos: error HTTP, doble clic, cierre por
Escape y Outbox pendiente.

## Fase 1B — CSV

| ID | Requisito | Prioridad | Criterio mínimo |
|---|---|---|---|
| RF-CSV-001 | Mantener captura manual | Alta | flujo actual no se elimina |
| RF-CSV-002 | Descargar plantilla CSV | Alta | encabezados exactos |
| RF-CSV-003 | Cargar solo CSV UTF-8 | Alta | XLS/XLSX rechazados |
| RF-CSV-004 | Validar encabezados y filas | Alta | todos los errores visibles |
| RF-CSV-005 | Aplicar máximo 100 total | Alta | manual + importado |
| RF-CSV-006 | Mostrar vista previa | Alta | conteos y errores por fila |
| RF-CSV-007 | Importar atómicamente | Alta | una fila inválida rechaza todo |
| RF-CSV-008 | Detectar duplicados por correo | Alta | trim y comparación case-insensitive |
| RF-CSV-009 | Editar/eliminar importados | Alta | misma lista del formulario |
| RF-CSV-010 | Validar nuevamente en backend | Crítica | backend autoritativo |
| RF-CSV-011 | No persistir archivo ni datos en logs | Crítica | privacidad y seguridad |

Actor: usuario autenticado. Precondición: paso Participantes activo.
Postcondición: filas confirmadas quedan editables. Casos negativos: archivo
malformado, encabezado faltante, tamaño >1 MB, fila inválida, duplicados y total
>100. Dependencias: validadores actuales y contrato de participantes.

## Fase 2 — Facturación (PROPOSED/NEEDS_DISCOVERY)

RF-BILL-001 bandeja; RF-BILL-002 detalle; RF-BILL-003 aprobar;
RF-BILL-004 rechazar; RF-BILL-005 solicitar corrección; RF-BILL-006 comentarios;
RF-BILL-007 historial/auditoría; RF-BILL-008 concurrencia; RF-BILL-009 resultado.
Todos requieren usuarios, grupos, estados y flujo posterior confirmados.

## Fase 3 — AP/AC (NEEDS_DISCOVERY)

RF-APAC-001 creador AP; RF-APAC-002 actor AC; RF-APAC-003 fuente autorizada;
RF-APAC-004 selector; RF-APAC-005 snapshots independientes; RF-APAC-006
auditoría y migración compatible. NOT_IMPLEMENTED.

## Fase 4 — catálogo (PRIORITY_BACKLOG)

RF-CAT-REG-001 regiones; RF-CAT-REG-002 precios independientes;
RF-CAT-REG-003 vigencias/EOL; RF-CAT-REG-004 fuentes oficiales;
RF-CAT-REG-005 revisión humana y auditoría. NEEDS_DISCOVERY.
