# Estado de especificaciones

## Incremento autenticación real — 2026-07-23

Estado: **APPROVED / IMPLEMENTACIÓN AUTORIZADA**. Comprende Entra redirect real en development, runtime config, rutas protegidas, `/api/auth/me`, validación JWT completa, logout, errores, pruebas y guía manual. La autorización provisional por tenant solo aplica a `development`.

Fecha de corte: 2026-07-21.

| Paquete | Documentos | Estado | Autoriza implementación | Aprobador |
|---|---|---|---|---|
| Marca NETEC | BR-001..012, sistema visual, VAC, BDD y ADR-016..020 | APPROVED | Sí, para el incremento UI-004..007 | Usuario responsable del proyecto, aprobación explícita 2026-07-21 |
| Interfaz funcional previa | `specs/06-ui/` anterior a esta integración | Conserva su estado histórico | Según registro previo | No registrado |
| Implementación de tokens/tema | `_tokens.scss`, tema Material y migración visual | APPROVED | Sí | Usuario responsable del proyecto, 2026-07-21 |

## Registro de aprobación

Para pasar a APPROVED se requiere: identidad de quien aprueba, fecha, alcance exacto, excepciones y versión/evidencia corporativa. Hasta entonces no se refactoriza el frontend por motivos de marca.

## Aprobación registrada

El usuario responsable indicó “adelante prosigamos” tras recibir el paquete completo y la solicitud explícita de aprobación. Alcance autorizado: UI-004..007, incluyendo tokens, Montserrat local, tema Angular Material y migración controlada de la pantalla actual. No autoriza cambios funcionales ni modificación/reconstrucción del logotipo.
# Paquete de enrutamiento de aprobación

| Paquete | Estado | Fecha | Autorización |
|---|---|---|---|
| RF-037..046, RN-060..077, ADR-021..025 y documentos relacionados | IN_REVIEW | 2026-07-22 | No autoriza código hasta aprobación explícita |

## Configuración runtime

| Paquete | Estado | Fecha | Autorización |
|---|---|---|---|
| NFR-CONF/NFR-NGX/NFR-SEC, SEC-CONF y ADR-028..031 | APPROVED / IMPLEMENTADO | 2026-07-23 | Runtime config, NGINX same-origin y MSAL Angular 6.x implementados; AUTH-TEST-001 verifica bearer en `/api` y exclusión externa. |

## Login y stepper

| Paquete | Estado | Fecha | Nota |
|---|---|---|---|
| RF/RN/NFR-AUTH, RF/RN-UI, ADR-032..036, VAC/BDD login-stepper | APPROVED / IMPLEMENTACIÓN AUTORIZADA | 2026-07-23 | Usuario indicó “implementemos los cambios”; recuperación temporal allowlisted en sessionStorage con TTL. |
| Logout, orden Participantes→Exámenes, catálogo y asignaciones; ADR-037..041 | APPROVED / IMPLEMENTACIÓN AUTORIZADA | 2026-07-23 | Solicitud explícita de ejecutar Etapa A y continuar Etapa B sin ambigüedad crítica. |
