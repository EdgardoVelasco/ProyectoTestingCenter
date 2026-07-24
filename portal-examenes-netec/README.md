# Portal de Registro de Exámenes NETEC

## Autenticación real de desarrollo

El perfil Docker `development` usa Microsoft Entra ID real: MSAL redirect, token delegado `ExamRequests.Access`, proxy `/api` y validación Spring de firma, issuer, tenant, audience y scope. El perfil `local` queda reservado para pruebas automatizadas explícitas y Docker Compose no lo activa.

La prueba manual está en `docs/authentication-dev-test.md`. Nunca se documentan contraseñas ni se copian tokens. La autorización provisional de development admite usuarios válidos del tenant con el scope mientras se definen App Roles; no se aplica a otros ambientes.

## Gobierno de interfaz

El [Manual de Identidad Corporativa de NETEC](<specs/NETEC Manual de identidad corporativa (1).pdf>) es fuente normativa de marca. Su interpretación para producto está en `specs/06-ui/brand-source.md`, `design-system.md`, `design-tokens.md`, `component-inventory.md` y `visual-acceptance-criteria.md`; el proceso obligatorio está en `specs/00-governance/`.

Para proponer un cambio visual: actualizar primero el Spec, impacto, VAC/BDD, matriz y change log; obtener estado APPROVED; después implementar, validar y adjuntar evidencia. Está prohibido cambiar directamente componentes/estilos, inventar colores, usar serif, alterar logo, mezclar iconos filled o escribir valores visuales fuera de tokens.

Validación prevista: lint/Stylelint, pruebas Angular, axe, Playwright, contraste y screenshots por viewport. Estas herramientas permanecen PROPUESTAS hasta aprobación; consultar `specs/10-planning/ui-definition-of-done.md`. Ningún documento IN_REVIEW autoriza refactor de marca.

## Incremento 1

Implementa identidad, creación/edición de BORRADOR, optimistic locking, auditoría y formulario Angular. Desarrollo: `docker compose up --build`, luego `http://localhost:4200`. El perfil `local` usa identidad configurada y nunca debe activarse en producción.

Portal interno para sustituir el correo de solicitud de exámenes por captura estructurada de datos comerciales, un examen, precio, moneda y uno o varios participantes. Estado: **especificación actualizada con evidencia real; implementación no autorizada**.

## Alcance MVP

Autenticación, borradores, validación, prevención de duplicados, folio, consulta propia, persistencia, auditoría y notificación desacoplada al aprobador configurado por sede. La aprobación ocurre fuera del portal; compra y voucher quedan fuera.

## Enrutamiento de aprobación

La evidencia operativa vigente establece BOG/MED/SCL/LIM → Felipe González, WTC → Angélica y MAD → Paola Galvis. Son datos configurables, no condiciones codificadas. Los correos oficiales, copias y suplencias siguen pendientes. La especificación normativa está en `specs/change-log-approval-routing.md`, ADR-021..025 y RF-037..046. No implementar hasta aprobación explícita.

## Arquitectura propuesta

Angular + Material; Java 21/Spring Boot 3; PostgreSQL/Flyway; Entra ID; proveedor de correo intercambiable con Microsoft Graph como destino; Transactional Outbox.

## Arquitectura frontend y configuración

Angular se sirve como archivos estáticos desde NGINX y llama rutas relativas `/api/...`. NGINX actúa como reverse proxy y conserva `/api`; el destino backend cambia mediante variables del contenedor, sin recompilar Angular. La misma imagen se promueve entre ambientes.

La configuración pública de Entra/MSAL se genera en runtime y se carga antes de inicializar MSAL. Tenant ID, client ID, scope, authority, redirect URI y base API son públicos; secretos, credenciales DB y Graph permanecen en backend/plataforma. `.env` es solo local, está ignorado y Angular no lo consume.

Consultar `specs/09-architecture/frontend-runtime-configuration.md`, `nginx-reverse-proxy.md` y `environment-variable-catalog.md`. Runtime config, carga previa, templates NGINX y MSAL Angular 6.x están implementados. `protectedResourceMap` protege exclusivamente `${window.location.origin}/api/*` con coincidencia estricta; Spring Boot continúa validando issuer, audience y scope.

Las especificaciones se revisan en orden numérico. Preguntas críticas: `specs/01-discovery/open-questions.md`; consistencia: `specs/validation-report.md`; ejecución: `specs/10-planning/implementation-plan.md`.

La evidencia y los cambios se registran en `specs/change-log-new-scope.md`. No implementar antes de aprobar explícitamente las especificaciones. Próximo paso: confirmar claims/campos mínimos y ejecutar I1, “autenticación y borrador con solicitante”.

## Cambio DRAFT: acceso y formulario guiado

Se documenta landing NETEC con redirect Microsoft, sin password interno, identidad mediante `/api/auth/me`, Solicitante fijo y stepper horizontal Comercial→Examen→Participantes→Resumen. Acceso externo permanece disabled. Leer `authentication-experience.md`, `form-stepper-requirements.md`, `screens.md` y ADR-032..036. No autoriza modificar Angular/Spring.
## Incremento aprobado: catálogo y asignaciones

El flujo aprobado es Comercial → Participantes → Exámenes → Resumen. El catálogo inicial se deriva de `specs/01-discovery/catalogo_examenes.xlsx`, se persiste de forma idempotente y se consulta mediante API; no se hardcodea en Angular. Cantidades y totales se derivan en backend de asignaciones participante–examen. Consultar `exam-catalog-import-analysis.md`, ADR-037..041 y `change-log-logout-participants-catalog.md`.
## UPN y Empresa en el MVP

El correo visible del solicitante es `/api/auth/me.username`, resuelto por backend desde los claims oficiales. Empresa se captura manualmente como texto libre y se persiste como snapshot; esta versión no contiene catálogo, autocomplete ni endpoint de empresas. El logout del header conserva MSAL y utiliza una variante outlined accesible.
## Menú de usuario

El header utiliza `AuthenticatedUserMenuComponent`: identidad visible, avatar derivado del nombre y acción de cierre dentro de `mat-menu`. El componente no contiene MSAL; delega la intención al flujo de logout existente.

## Asesor Comercial en el MVP

El usuario autenticado es también el Asesor Comercial. La UI lo muestra en modo de solo lectura y el backend lo resuelve desde el principal; no existe selector ni catálogo de asesores. Véase ADR-044.
## Notificaciones de aprobacion (propuesto)

El siguiente incremento sustituira el reenvio manual mediante Transactional Outbox y un adaptador Microsoft Graph app-only. La solicitud se persiste antes del envio y el frontend solo muestra estados. Las direcciones provienen de configuracion por sede, nunca de codigo.

La Etapa A esta documentada, pero la implementacion permanece bloqueada por P-39: Discovery aun no identifica que codigos comprenden LATAM para la copia al grupo de Testing Center. Tambien deben verificarse manualmente permiso Graph, consentimiento, buzon de desarrollo y restricciones RBAC.

## Contenido del correo de aprobación

El incremento aprobado genera un modelo estructurado y un payload snapshot para renderizar HTML y texto plano. El correo separa información comercial, participantes, exámenes/costos, asignaciones y totales por moneda; no repite un bloque por participante, no mezcla monedas y no incluye acciones de aprobar/rechazar. La guía normativa está en `specs/07-notifications/email-content-model.md`, `email-style-guide.md` y ADR-056..060. La implementación y revisión visual de Outlook siguen pendientes.
