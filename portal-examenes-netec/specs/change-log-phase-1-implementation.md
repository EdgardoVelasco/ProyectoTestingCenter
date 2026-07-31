# Change log — implementación Fase 1

Fecha: 2026-07-30
Rama: `feat/phase-1a-1b-implementation`
Estado: IN_PROGRESS

## Implementado

- Diálogo `Solicitud enviada` con folio y estado inicial.
- Limpieza posterior al éxito y retorno al primer paso.
- Conservación del formulario en errores.
- Nueva clave `Idempotency-Key` por solicitud.
- Etiqueta visible `Comercial`.
- Plantilla CSV descargable.
- Carga CSV UTF-8 con vista previa.
- Validación de encabezados, campos, correos, duplicados y máximo 100.
- Importación atómica y edición posterior mediante la lista existente.
- Validación backend del máximo de participantes.

## No implementado todavía

- Fase 2 Facturación.
- Fase 3 AP–AC.
- Fase 4 catálogo fortalecido.
- Verificación Outlook adicional.

## Validación

La compilación no pudo ejecutarse en este entorno porque Docker Desktop no está
disponible y el `node_modules` local está incompleto. Debe repetirse el build,
lint y pruebas antes de declarar la Fase 1 terminada.
