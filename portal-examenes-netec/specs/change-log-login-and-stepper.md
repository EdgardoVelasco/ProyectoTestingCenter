# Change log — login, identidad y stepper

Fecha: 2026-07-23. Estado: **DRAFT / SOLO ESPECIFICACIÓN**.

## Evidencia y necesidad

Referencia visual solicita una página inicial y navegación horizontal. Se interpreta como landing corporativa que redirige a Entra y stepper horizontal con apariencia de pestañas. Los campos visuales usuario/password no se trasladan: contradicen la arquitectura y ADR-033.

## Cambios

- Login: acceso NETEC, login Microsoft, loading/error/denied/expired y logout.
- Credenciales: portal no captura, almacena o valida contraseña.
- Externo: botón visible, disabled, “Disponible próximamente”, sin ruta/lógica.
- Identidad: MSAL detecta sesión; `/api/auth/me` propuesto como autoridad funcional.
- Solicitante: nombre/correo no editables; área/unidad no se inventan.
- Stepper: Solicitante fijo y cuatro pasos, un panel, progreso/errores, navegación, guardado y resumen.
- Sesión: nueve estados, renovación, logout, historial y borradores.

## Elementos agregados

- RF-AUTH-001..014, RN-AUTH-001..014, NFR-AUTH-001..010.
- RF-UI-041..053, RN-UI-041..051, NFR-UI-STEP-001..004.
- HU-AUTH-001..006 y HU-UI-021..026.
- CA-AUTH-001..014, CA-STEP-001..013, VAC-AUTH-001..010, VAC-STEP-001..012.
- BDD AUTH-001..020, STEP-001..020 y DRAFT-NAV-001..004.
- ADR-032..036 PROPUESTOS.
- CMP-024..031 PROPUESTOS.

## Impacto

- API: `/api/auth/me` OAuth2 `ExamRequests.Access` confirmado como definitivo; `/api/v1/me` se retira coordinadamente.
- Arquitectura: no cambia same-origin/runtime; añade experiencia, guard/logout futuros.
- UI: nuevas pantallas/header/stepper; sin implementación.
- Seguridad: backend sigue validando JWT; identidad minimizada; sin password/tokens.
- Backlog: solo LOGIN-SPEC-001 cerrada; toda implementación/prueba ejecutable pendiente.

## Riesgos y preguntas

Críticos restantes: grupo de acceso P-LOGIN-05 y mecanismo seguro para recuperar datos temporales P-LOGIN-19. Gobierno fino de tasa MAD permanece P-20.

## Archivos creados

`authentication-experience.md`, `form-stepper-requirements.md`, `form-stepper.feature`, `draft-navigation.feature`, ADR-032..036 y este change log.

## Archivos modificados

AGENTS, README, visión/gobierno/discovery, requisitos, historias/CA, estado/casos, OpenAPI/errores, UI, authentication.feature, trazabilidad, seguridad/ambientes, backlog/tareas/riesgos/DoD y validation-report.

## Próximo incremento recomendado

Resolver P-LOGIN-05/19, completar redirects no locales y gobierno de tasa MAD; revisar ADR-032..036 y aprobar el paquete. Después, implementar landing + guard + `/api/auth/me` antes del stepper.

## Respuestas incorporadas — 2026-07-23

- Solicitante fijo; stepper de cuatro pasos.
- Login únicamente redirect; sin popup.
- Sin rol: 403.
- Nombre/correo: `/api/auth/me`; área/unidad opcionales.
- Logout DIRTY confirma.
- Expiración bloquea, reautentica y recupera temporalmente; mecanismo P-LOGIN-19.
- Cantidad por línea igual a participantes asignados.
- Futuros bloqueados; visitados libres hacia atrás.
- Último paso guardado se restaura; sin autoguardado.
- CA/PAN guardan borrador pero no envían.
- MAD usa tasa configurada manualmente en MVP.
- Redirect local `http://localhost:4200`.

## Confirmación

No se modificó Angular, MSAL, NGINX, Spring Boot, Docker, infraestructura, estilos ni pruebas ejecutables en esta ejecución. La existencia previa de MSAL/runtime se conserva y se reporta como estado actual, no como cambio de este alcance.
