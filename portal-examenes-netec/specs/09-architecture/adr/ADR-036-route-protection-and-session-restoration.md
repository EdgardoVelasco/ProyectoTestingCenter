# ADR-036 Protección de rutas y restauración de sesión

- Estado: **ACEPTADO**
- Fecha: 2026-07-23
- Responsables: pendientes

## Contexto y decisión

MSAL runtime/interceptor ya existen; experiencia, guard, logout y expiración no. Se restaura cuenta antes de rutas; backend es autoridad. Sin rol se muestra 403. Interacción solo por redirect. Logout DIRTY confirma. Expiración bloquea envío, reautentica y recupera datos temporales; su mecanismo seguro queda P-LOGIN-19. Historial no reabre rutas.

## Alternativas

Solo interceptor; guard sin backend; sesión manual; cookies propias.

## Consecuencias y riesgos

Navegación coherente/defensa en profundidad; agrega estados asíncronos. Riesgos: loop, logout incompleto y pérdida de memoria.

## Recuperación temporal aprobada

Para sobrevivir al redirect sin autoguardado, el frontend puede conservar exclusivamente un snapshot allowlisted del formulario y paso en `sessionStorage`, con TTL máximo de 15 minutos. Excluye tokens, identidad y metadatos internos; se elimina al restaurar, guardar, cancelar o cerrar sesión. Esta excepción se limita a expiración/reautenticación y requiere pruebas de limpieza.

## Validación requerida

P-LOGIN-05/06/13/14, BDD sesión/atrás/expiración y pruebas frontend/backend.
