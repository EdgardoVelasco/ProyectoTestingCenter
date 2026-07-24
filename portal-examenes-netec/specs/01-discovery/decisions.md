# Registro de decisiones

## Autenticación real development — APROBADA 2026-07-23

- Microsoft Entra ID mediante redirect; sin password interno ni popup.
- Angular usa sesión MSAL, runtime config y `${window.location.origin}/api/*`.
- Spring valida issuer, tenant, audiences explícitas y `ExamRequests.Access`.
- `/api/auth/me` es la fuente funcional de nombre y correo.
- Docker usa perfil `development`; el perfil `local` no participa en la prueba real.
- Usuarios del tenant con scope pueden probar solo en `development`; otros ambientes mantienen roles.
- Logout vuelve a `/login`; las rutas no dependen de datos locales.

## Integración de manual — 2026-07-21

**AGREGADO / IN_REVIEW.** Se verificó `specs/NETEC Manual de identidad corporativa (1).pdf` (14 páginas) como evidencia directa. Colores, degradado, Montserrat e iconografía outline se clasifican OFICIALES. Tokens digitales, layout, estados semánticos y herramientas son DERIVADOS/PROPUESTOS. ADR-016..020 permanecen PROPUESTOS; no autorizan refactor frontend.

**MODIFICADO / APPROVED.** El usuario aprobó continuar. Montserrat se cargará localmente mediante paquete versionado `@fontsource/montserrat`, evitando dependencia de CDN; fallbacks siguen siendo Arial/sans-serif. Se aprobaron tokens semánticos derivados con contraste documentado. No se incorpora Kollektif ni logotipo hasta contar con assets/licencia/variantes oficiales.

| ID | Estado | Decisión |
|---|---|---|
| DEC-001 | DECIDIDO | Monorepo y especificaciones como fuente contractual. |
| DEC-002 | DECIDIDO | Persistencia y outbox en una transacción local. |
| DEC-003 | DECIDIDO | Instantáneas visibles junto con referencias de catálogo. |
| DEC-004 | DECIDIDO | Problem Details extendido como error uniforme. |
| DEC-005 | PENDIENTE | Claims y destinatarios reales se configuran fuera del repositorio. |
| DEC-006 | MODIFICADO/CONFIRMADO | Varios exámenes y participantes con asignación; ADR-012/015. |
| DEC-007 | MODIFICADO/CONFIRMADO | Catálogo aporta costo base, Ventas puede modificar precio de venta; backend calcula y ambos se congelan; ADR-011. |
| DEC-008 | MODIFICADO/CONFIRMADO | Centro de Costos o Sucursal es una sola selección operativa; semántica del catálogo permanece documentada; ADR-013. |
| DEC-009 | AGREGADO/PROPUESTO | Referencia de facturación como texto; ADR-014. |
| DEC-010 | DEPRECADO | Participante único embebido; reemplazado por ExamRequestParticipant 1..N. |
| DEC-011 | MODIFICADO/DECIDIDO | USD general; MAD convierte automáticamente USD→EUR. Ninguna otra ubicación convierte. |
| DEC-012 | CONFIRMADO | N/A significa “no aplica” en campos autorizados. |
| DEC-013 | CONFIRMADO | Empresa y cliente son un solo concepto; `clientId` separado queda deprecado. |
| DEC-014 | CONFIRMADO | Segmento requerido; tipo de curso y referencia opcionales. |
| DEC-015 | CONFIRMADO | Máximo 100 participantes y 100 líneas. |
| DEC-016 | CONFIRMADO | Testing Center mantiene catálogo; precio tiene vigencia variable y retake/comentarios visibles. |
| DEC-017 | DECIDIDO PARCIAL | MAD usa conversión automática con tasa configurada manualmente en MVP y snapshot; responsable, precisión/vigencia/autorización siguen pendientes P-20. |
| DEC-018 | DECIDIDO | I1 usa perfil `local` con identidad simulada explícita; perfiles no locales exigen JWT Entra. |
| DEC-019 | DECIDIDO | I1 se implementa con Spring Boot 3.5.16 y Angular 22; versiones quedan fijadas en archivos de build. |
| DEC-020 | CONFIRMADO | El AC origina la solicitud; Testing Center no reenvía el mensaje inicial. |
| DEC-021 | DECIDIDO | El portal resuelve en backend un aprobador configurable por sede y lo muestra antes de enviar; ADR-021/022. |
| DEC-022 | DECIDIDO | La solicitud conserva snapshots de sede, destinatario y regla; ADR-023. |
| DEC-023 | MODIFICADO/CONFIRMADO | La notificación se denomina solicitud de aprobación al aprobador de Facturación/Finanzas. Las tres personas fueron confirmadas como integrantes de Facturación; ADR-024. |
| DEC-024 | DECIDIDO | Estado final normativo `ENVIADA_A_APROBADOR`; `ENVIADA_A_FACTURACION` queda DEPRECADO y requiere estrategia de compatibilidad al implementar. |
| DEC-025 | PROPUESTO | La aprobación dentro del portal se evalúa para fase futura, sin estados APROBADA/RECHAZADA en fase 1; ADR-025. |
| DEC-026 | CONFIRMADO | Correos oficiales: Felipe González `felipe.gonzalez@netec.com.co`, Angélica Barrón `angelica.barron@netec.com.mx`, Paola Galvis `paola.galvis@netec.com.co`. |
| DEC-027 | CONFIRMADO PARCIAL | Testing Center recibe copia mediante el grupo de usuarios del directorio `LATAM_Testing_Center@netec.com.mx` para “LATAM y MAD”; códigos LATAM pendientes P-39. El AC no recibe copia. |
| DEC-028 | CONFIRMADO | El PDF corporativo es vigente; degradado permitido en botones/header. No hay variante oscura oficial; modo oscuro queda PROPUESTO. |
| DEC-029 | CONFIRMADO / BLOQUEANTE | Actualmente no existe propietario ni autorizador de cambios de enrutamiento. Debe designarse antes de producción; el sistema no inferirá responsable. |
| DEC-030 | PROPUESTO | Misma imagen Angular, rutas `/api` relativas y proxy same-origin NGINX; ADR-028/030. |
| DEC-031 | PROPUESTO | `runtime-config.json` generado al arranque se prefiere a `env.js`; ADR-028/029. |
| DEC-032 | PROPUESTO | Configuración pública y privada se separan por allowlist; ADR-031. |

## Cambio propuesto de login y navegación

| ID | Estado | Decisión |
|---|---|---|
| D-LOGIN-01 | CONFIRMADA | Pantalla NETEC inicia redirect Entra; no popup ni contraseña. |
| D-LOGIN-02 | CONFIRMADA | `/api/auth/me` es endpoint definitivo y autoridad funcional; claims frontend apoyan sesión. |
| D-LOGIN-03 | PROPUESTA | Acceso externo visible y deshabilitado, sin ruta ni lógica. |
| D-STEP-01 | MODIFICADA/CONFIRMADA | Solicitante es tarjeta fija; ADR-038 establece Comercial, Participantes, Exámenes y Resumen. |
| D-STEP-02 | CONFIRMADA | Pasos futuros bloqueados, visitados libres hacia atrás; último paso se restaura; no autoguardado. |
| D-LOGIN-04 | CONFIRMADA | `/api/auth/me` sustituye coordinadamente a `/api/v1/me`. |
| D-LOGIN-05 | CONFIRMADA | Sin rol autorizado se muestra 403; logout DIRTY confirma; expiración bloquea y reautentica. |

Dependen de ADR-032..036 y no autorizan implementación.
## Decisiones confirmadas 2026-07-23 — UPN y empresa MVP

- **APROBADO:** `AuthenticatedIdentity.username` es el UPN funcional validado por backend. Precedencia: `preferred_username`, `upn`, `email`, ausencia.
- **APROBADO:** no se añade `userPrincipalName` porque duplicaría el contrato actual; un cambio futuro exige versionar el contrato.
- **APROBADO:** Empresa se captura manualmente como `companyName` durante el MVP, sin selector, autocomplete, mock o endpoint de empresas.
- **APROBADO:** el borrador admite Empresa ausente; cuando se informa, backend normaliza espacios, conserva capitalización y valida 2–150 caracteres y rechazo de `N/A`.
- **APROBADO:** enviar exige Empresa, pero el submit real permanece fuera del alcance implementado.
## Menú de sesión — 2026-07-23

- **APROBADO:** sustituir el botón logout separado por CMP-028 Authenticated User Menu basado en `mat-menu`.
- **APROBADO:** identidad permanece visible en el activador; correo puede truncarse visualmente, pero se muestra completo en menú.
- **APROBADO:** iniciales usan primer y último componente del nombre; una palabra usa una letra; sin nombre usa icono outline.
- **APROBADO:** el componente emite logout; AppComponent conserva confirmación y AuthService conserva MSAL.

## Solicitante y Asesor Comercial — 2026-07-23

- **APROBADO:** durante el MVP, el solicitante autenticado es el Asesor Comercial.
- **APROBADO:** `oid` es identificador preferido y `sub` fallback.
- **APROBADO:** backend rellena snapshots separados de requester y asesor con la misma identidad.
- **APROBADO:** se eliminan selector, mock, endpoint de catálogo y campos de asesor en requests.
- **FUERA DEL MVP:** delegación, catálogo de asesores y registro en nombre de terceros.
