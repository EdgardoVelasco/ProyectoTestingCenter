# Validation report — Fase 1 implementación

## Estado

Implementación parcial en `feat/phase-1a-1b-implementation`. No se declara
terminada hasta ejecutar pruebas Angular, compilación Maven, pruebas backend y
validación manual.

## Cambios verificados por inspección

- El submit abre un diálogo solo en callback exitoso.
- El callback exitoso reinicia formulario, borrador, errores, paso y recovery.
- El submit fallido no invoca `resetForm`.
- La nueva solicitud genera un UUID nuevo para `Idempotency-Key`.
- Backend acepta opcionalmente la clave y conserva fallback compatible.
- CSV se valida antes de modificar la lista.
- Una fila inválida, duplicado o total >100 bloquea la importación completa.
- Apellido materno vacío es válido.
- El archivo no se persiste.

## Pruebas pendientes por entorno

- `npm run build` y `npm test -- --watch=false`.
- `mvn clean verify`.
- Pruebas con Testcontainers.
- Pruebas de importación con archivos válidos, inválidos, duplicados y 101 filas.
- Prueba manual de submit, diálogo, reinicio y Outbox.
- Validación responsive y accesibilidad.

## Bloqueo técnico actual

Docker no respondió por ausencia del pipe `dockerDesktopLinuxEngine`; el build
local de Angular tampoco pudo iniciar porque falta el paquete builder de
Angular en `node_modules`. No se ocultó este fallo.
