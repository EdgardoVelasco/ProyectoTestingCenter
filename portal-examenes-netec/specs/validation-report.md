# Reporte de validación cruzada

## Autenticación real development — 2026-07-23

Estado técnico: IMPLEMENTADO Y AUTOMATIZADO. Estado end-to-end con usuario real: PENDIENTE DE INTERACCIÓN HUMANA.

- Angular abre `/login` sin sesión; evidencia visual headless confirmada.
- El botón inicia redirect real al host oficial de Microsoft; no se enviaron credenciales.
- NGINX sirve runtime config sin secretos y conserva `/api`.
- Spring inició con perfil `development` y metadata real del tenant.
- `/api/auth/me` anónimo responde 401.
- 31/31 pruebas Angular correctas.
- Pruebas Spring de endpoint, scope, issuer, tenant y audience correctas; integración Testcontainers omitida en contenedor sin socket.
- No hay password input, usuario hardcodeado como condición de acceso ni token impreso.
- ALTO: falta completar login/logout interactivo con una cuenta y confirmar consentimiento/redirect reales.
- MEDIO: bundle Angular supera el presupuesto de advertencia.

> Estado más reciente (2026-07-23): login, `/api/auth/me`, protección de rutas y stepper de cuatro pasos IMPLEMENTADOS; revisión funcional pendiente. Evidencia y hallazgos en `implementation-report-login-stepper.md`.

## Integración normativa de marca — 2026-07-21

Se verificó directamente el manual PDF de 14 páginas y se trazaron únicamente sus afirmaciones comprobables como OFICIALES. Layout, tokens digitales, accesibilidad, semántica y herramientas están marcados DERIVADOS/PROPUESTOS/PENDIENTES. No cambió lógica de negocio, frontend, SCSS ni tema Angular Material. El paquete queda IN_REVIEW y no autoriza implementación.

Cobertura: BR-001..012 → fuente/página → token → CMP-001..023 → VAC-001..015 → 26 escenarios BDD de marca/visual/accesibilidad → prueba/SCSS futuro/estado.

| Severidad | Hallazgo | Tratamiento/estado |
|---|---|---|
| ALTO | Vigencia del manual confirmada, pero propietario/aprobador y quién cambia IN_REVIEW a APPROVED siguen pendientes. | P-BR-01/05. |
| ALTO | No existen SVG/variantes oficiales de logo. | P-BR-02/03; BR-010 bloqueado para implementación. |
| ALTO | Carga y licencia de Montserrat/Kollektif no resueltas. | P-BR-04/06; no asumir proveedor. |
| ALTO | Teal, gris y colores claros fallan AA para diversas combinaciones de texto. | Ratios documentados; restricciones y tokens semánticos pendientes. |
| ALTO | Frontend previo usa Inter/Segoe, tema `azure-blue`, hex directos y degradado no oficial. | Deuda inventariada; no se modificó por pausa. Migración solo tras aprobación. |
| MEDIO | Degradado autorizado en botones/header; variantes concretas, librería outline y estados semánticos siguen pendientes. No existe modo oscuro oficial; es PROPUESTA. | P-BR-07..13/UI-010..012. |
| MEDIO | ESLint/Stylelint/axe/Playwright/regresión no configurados. | Documentados como PROPUESTOS; no instalar sin aprobación. |
| BAJO | Directorio de referencias aún no tiene baseline aprobada. | README creado; poblar durante primera implementación aprobada. |

Validaciones no ambiguas: precedencia definida, clasificaciones visibles, ratios WCAG calculados, BDD y matriz completos, AGENTS/README/DoD actualizados. No se alteraron requisitos funcionales ni estados del proceso de exámenes.

## Validación de implementación visual aprobada — 2026-07-21

- Paquete y UI-004..007 aprobados antes de modificar código.
- Build Angular de producción: correcto.
- Pruebas: 13/13 correctas, incluidas dos de cumplimiento de marca.
- Auditoría de dependencias de producción: 0 vulnerabilidades.
- Hex/rgb directos: únicamente `_tokens.scss`; estilos inline: 0; tema prebuilt/fuentes anteriores: retirados.
- Cuatro parciales SCSS requeridos creados; Montserrat local OFL-1.1.
- Evidencia visual: escritorio 1440 px y layout de una columna 500 px correctos.

Hallazgos residuales: asset/variantes de logo e iconos oficiales siguen pendientes; 360 px requiere Playwright con emulación real; builder Karma/Webpack está deprecado; dependencias de desarrollo reportan vulnerabilidades moderadas transitivas aunque producción reporta cero. No se implementó logo, iconografía ni herramienta adicional sin evidencia.

## Validación frontend ampliada — 2026-07-21

La interfaz Angular 22 fue refactorizada conforme a ADR-015 y las respuestas de discovery más recientes. Build de producción correcto y 11 pruebas de comportamiento correctas en Chrome Headless. Se validaron solicitante solo lectura, catálogos, selección/autocompletado, cálculo visual con decimal escalado, participantes, confirmación de eliminación, correo inválido/duplicado, cantidad por línea frente a asignaciones, guardado I1, bloqueo MAD, diálogo de confirmación y doble clic.

| Severidad | Hallazgo | Tratamiento/estado |
|---|---|---|
| ALTO | Backend I1 no acepta todavía comercial extendido, participantes ni líneas. | Guardar usa API real solo para campos I1; limitación visible y trazada. No se falsifica persistencia completa. |
| ALTO | `validate`, `submit` y catálogos aún no están implementados en backend. | Mocks separados y etiquetados como desarrollo; reemplazables por una interfaz de servicio. |
| ALTO | MAD requiere tasa/precio convertido de autoridad backend. | UI bloquea validar/enviar; no calcula ni simula tasa. |
| MEDIO | Falta verificación automatizada axe y pruebas manuales a 360 px/100 registros. | Estructura accesible y breakpoints implementados; pendiente antes de DoD integral. |
| BAJO | Builder Karma/Webpack está deprecado por Angular 22. | No afecta build/pruebas actuales; migrar a `@angular/build:karma` en tarea técnica posterior. |

No se incorporaron aprobación/rechazo, compra, voucher, portales externos, Graph real, IA ni RPA.

## Estado de implementación I1 — 2026-07-21

RF-001..005 implementados con Resource Server, perfil local explícito, requester derivado, POST/GET/PUT de BORRADOR, ETag/If-Match, auditoría, Problem Details, Flyway, Angular Reactive Forms y Compose. Verificación: frontend build y 1 prueba; backend 2 pruebas unitarias y 1 prueba de integración ejecutada correctamente con Testcontainers sobre PostgreSQL 16.14. El smoke test local confirmó identidad autenticada, creación `201`, actualización `200`, persistencia con versión incrementada y rechazo `409` de una actualización obsoleta. Incrementos 2–8 no implementados.

## Revalidación tras respuestas — 2026-07-21

Se corrigieron contradicciones anteriores: un examen por solicitud, precio no editable, cantidad global igual a participantes, centro/sucursal separados y N/A como ausencia quedaron deprecados. Modelo/API/UI ahora usan `items[]`, `participants[]` y asignaciones. Backend conserva costo base, acepta precio venta autorizado y calcula subtotales/total. Pendientes críticos reales: P-01, P-03..P-07, P-09, P-11, P-15..P-18. No se añadió aprobación de Facturación ni código.

Revalidación adicional: P-16 quedó resuelta: cantidad por línea igual a asignaciones. MAD usa tasa configurable manualmente en MVP; continúan pendientes responsable, precisión, vigencia y autorización P-20. Sin tasa vigente MAD bloquea.

Fecha: 2026-07-21. Alcance documental: 58 documentos de especificación/plan. Alcance implementado: solo Incremento 1, con código, migración inicial, entorno local y pruebas; no se iniciaron los incrementos 2–8.

## Resultado

- RF-001..030, RN-001..040, HU-001..025, CA-001..030 y BDD-001..050 tienen cobertura en matriz.
- Formato real representado: clave/tipo/AC/segmento/centro/sucursal/empresa/referencia/examen/precio/moneda/cantidad/participantes.
- Quantity-participants es coherente solo bajo regla configurable RN-030; la incertidumbre no se oculta.
- Precio/moneda están separados; total usa DECIMAL(19,4), misma moneda y autoridad backend.
- Correo deriva de persistencia y outbox; no es fuente oficial y su fallo no pierde participantes.
- Estados se conservan sin aprobación/rechazo de Facturación.

## Hallazgos

| Severidad | Hallazgo | Tratamiento/estado |
|---|---|---|
| CRÍTICO | Significados AC/CN/BOG, campos obligatorios y catálogos reales desconocidos. | Preguntas 1–9/29–33; bloquean configuración productiva, no specs. |
| CRÍTICO | Estrategia/precio aplicable, impuestos y permiso de valor cero no confirmados. | ADR-011 PROPUESTO; bloquea I3. |
| ALTO | No se confirma si vouchers pueden quedar sin participantes o mezclar exámenes. | ADR-012/015 y RN-030 configurable; bloquea I4/I5 definitivo. |
| ALTO | Centro de costos vs sucursal y referencia compuesta son ambiguos. | ADR-013/014 PROPUESTOS; campos separados/texto provisional. |
| ALTO | Duplicidad externa podría requerir empresa, cliente, evento, clave, fecha o referencia. | Regla mínima documentada; no cerrar antes de I5. |
| MEDIO | Endpoint de precio puede cambiar al conocer dimensiones. | Separado provisionalmente y versionado por OpenAPI. |
| MEDIO | Máximo 50 es objetivo técnico, no límite confirmado. | Configurable; pregunta 38. |
| BAJO | Documentos previos usan términos participante embebido/billingLine en contexto histórico. | ADR-007 y changelog los marcan deprecados. |

## Correcciones automáticas no ambiguas

1. Separado código/nombre y amount/currency; eliminado importe cliente del request.
2. Convertido participante único a colección hija y añadido duplicado interno.
3. Añadida revalidación de precio/total en transición y confirmación.
4. Separados costCenterId/branchId sin imponer jerarquía.
5. Actualizado correo con snapshots y tabla de participantes.
6. Reordenado backlog en ocho incrementos y actualizado DoD/riesgos.

## Revisión de alcance

No se incorporaron aprobación/rechazo, compra, voucher, portales de fabricantes, IA, RPA ni inventario. Facturación continúa fuera del portal. El código generado se limita al Incremento 1: autenticación/identidad y ciclo de vida del borrador.

## Validación de enrutamiento de aprobación — 2026-07-22

Resultado: especificación IN_REVIEW; no se modificó código.

| Nivel | Hallazgo | Resolución/estado |
|---|---|---|
| RESUELTO | Correos, pertenencia a Facturación y rol Finanzas | Confirmados en discovery; deben cargarse como configuración auditable, no código. |
| ALTO | IDs RN-041..058 y RF-031..040 ya ocupados | Corregido sin pérdida: RN-060..077 y RF-037..046; mapeo en change log. |
| ALTO | Terminología/estado indicaban Facturación sin evidencia de adscripción | Corregido en contrato normativo a Aprobador/ENVIADA_A_APROBADOR; compatibilidad futura TT-029. |
| ALTO | Regla puede cambiar entre UI y submit | Backend re-resuelve, usa versión y exige nueva confirmación. |
| ALTO | CA/PAN no tienen ruta evidenciada | Enviar bloqueado; guardar borrador permitido. |
| MEDIO | `Approver` separado no está justificado todavía | Permanece PROPUESTO, P-24/P-33/P-34. |
| ALTO | “LATAM” no identifica inequívocamente códigos de sede para CC | P-39; no activar copia automática hasta delimitar. |
| CRÍTICO | No existe propietario/autorizador de reglas por tratarse de la primera automatización | P-25 reformulada; bloquear administración productiva y designar responsable antes de operar. |
| MEDIO | Respuesta de aprobación, suplentes y buzones adicionales desconocidos | P-32..P-35; no incluidos. |
| BAJO | `siteId` y `organizationalLocationId` pueden duplicar concepto | Se especificó una sola selección y alias de compatibilidad deprecado. |

Comprobaciones: backend es autoridad; destinatarios no se aceptan del cliente; snapshots/outbox preservan solicitud; Testing Center no reenvía; compra y aprobación interna permanecen fuera; correos se configuran; el CC es grupo de directorio sin miembros duplicados; AC sin copia; RF/RN tienen trazabilidad. Pendiente antes de producción: aprobar ADR-021..025, designar responsable P-25 y resolver P-39. P-26 queda documentada como ausencia actual de gobierno, no como autorización implícita.

## Validación de configuración runtime — 2026-07-23

| Nivel | Hallazgo | Estado/acción |
|---|---|---|
| CRÍTICO | Exposición o historial de `.env` | NO ENCONTRADO: ignorado, no rastreado y sin historial accesible. |
| CRÍTICO | Secretos en configuración frontend | NO ENCONTRADO en referencias/bundle inspeccionados; SEC-TEST-001 pendiente. |
| ALTO | NGINX fija actualmente `backend:8080` | Deuda documentada; template futuro, sin cambio en esta ejecución. |
| ALTO | Defaults locales podrían llegar a ambiente incorrecto | SEC-CONF-009 exige fallo productivo. |
| BAJO, CERRADO | MSAL y `protectedResourceMap` | MSAL Angular 6.x instalado; coincidencia estricta same-origin verificada por AUTH-TEST-001. |
| ALTO | Runtime config previo al bootstrap aún no existe | Diseño IN_REVIEW; no implementado. |
| MEDIO | Variables reales/propuestas usan nombres distintos | P-CONF-03 y deprecación controlada. |
| MEDIO | NGINX no implementa aún caché, límites, headers, salud y 502/504 especificados | Tareas pendientes. |
| BAJO | Angular y proxies ya usan rutas relativas y conservan `/api` | Consistente con ADR-030. |

OpenAPI conserva URL relativa; `.env` no fue mostrado ni copiado; no se agregaron secretos a Markdown o ejemplos; trazabilidad cubre variables, requisitos, ADR, componentes, BDD, tareas y pruebas. En esta validación documental inicial no hubo implementación; la implementación parcial posterior se registra a continuación.

### Evidencia de implementación autorizada — 2026-07-23

- Angular: 25/25 pruebas y build de producción exitosos.
- Runtime config: allowlist, claves obligatorias, rechazo de secreto/URL API absoluta y `no-store` probados.
- NGINX: sintaxis válida, SPA/health/runtime config 200, 503 seguro y prefijo `/api` confirmado con backend 200.
- Seguridad: escaneo sin nombres secretos ni URL backend absoluta en fuentes productivas/bundle.
- Compose: `docker compose config --quiet` exitoso y sin imprimir valores.
- Pendiente ALTO: build de imagen frontend completo agotó tiempo sin salida; no invalida build Angular ni prueba NGINX, pero debe cerrarse antes de entrega.
- MSAL: inicialización previa al bootstrap, redirect procesado, cuenta activa restaurada e interceptor limitado a `/api/*`.
- Dependencias productivas: `npm audit --omit=dev` sin vulnerabilidades.
- Contenedor: imagen frontend construida correctamente; `.dockerignore` limita dependencias, artefactos y configuración local fuera del contexto.
- Integración local: PostgreSQL saludable, backend y frontend activos; `/health`, `/`, runtime config y `/api/v1/me` a través de NGINX responden HTTP 200.
- Hallazgo MEDIO: bundle inicial de 886.42 kB supera en 136.42 kB el presupuesto de advertencia; requiere optimización futura.
- Fuera de este incremento: cambios Spring Boot y automatización CI.

## Validación login y stepper — 2026-07-23

Estado: **DRAFT / DOCUMENTAL**.

| Severidad | Hallazgo | Disposición |
|---|---|---|
| ALTO | Código actual `/api/v1/me` difiere del contrato definitivo `/api/auth/me` | cambio coordinado pendiente de implementación; Spec ya no es ambiguo. |
| ALTO | Grupo concreto con acceso no confirmado | P-LOGIN-05; sin rol se confirma pantalla 403. |
| ALTO | Recuperación temporal tras expiración no tiene mecanismo seguro | P-LOGIN-19 por PII; resultado funcional confirmado. |
| MEDIO | Redirects no locales y gobierno fino de tasa MAD pendientes | P-CONF-02/P-20 parciales. |
| BAJO | Avatar/correo de header/External ID futuro | P-LOGIN-07..11; diferible. |

Validaciones:

- Fase 1 se conserva: sin aprobación interna, compra o vouchers.
- No se especifica password interno, Graph Mail.Send, External ID activo o modo oscuro.
- Entra autentica; backend autoriza y entrega identidad funcional mínima.
- Acceso externo está disabled y sin ruta.
- Solicitante es contexto fijo; stepper contiene cuatro pasos, futuros bloqueados y retorno libre a visitados.
- Último paso se restaura en borradores; no hay autoguardado.
- Todas las RF nuevas trazan a RN, HU, CA/VAC, BDD, UI/API y tarea.
- ADR-032..036 están PROPUESTOS y el paquete está DRAFT.
- OpenAPI incluye OAuth2/scope y 200/401/403 sin tokens.
- OpenAPI 3.1 parsea correctamente; contiene `AuthenticatedIdentity` y contrato DRAFT `/api/auth/me`.
- Cobertura verificada: 14 RF-AUTH, 13 RF-UI, 20 escenarios AUTH, 20 STEP y 6 DRAFT-NAV.
- ADR-032..036 verificados en estado PROPUESTO; tareas de implementación verificadas PENDIENTES.

Confirmación de ejecución: no se modificó Angular, MSAL, interceptor, guard, NGINX, Spring Boot, Docker, infraestructura, SCSS ni pruebas ejecutables; no se creó login ni stepper. MSAL preexistente del incremento anterior no fue reinstalado o alterado.

### Revalidación de respuestas recibidas

Las decisiones posteriores sustituyen la propuesta de cinco pasos: Solicitante es contexto fijo y existen cuatro pasos. Se confirmaron redirect sin popup, 403 sin rol, `/api/auth/me`, área/unidad opcionales, confirmación de logout, bloqueo y reautenticación por expiración, igualdad cantidad-asignaciones, futuros bloqueados, retorno a visitados, restauración del último paso, ausencia de autoguardado, bloqueo de envío CA/PAN, tasa MAD manual y redirect local. OpenAPI parsea con `/api/auth/me` como único contrato de identidad objetivo. Permanecen P-LOGIN-05, P-LOGIN-19, redirects no locales y gobierno fino P-20.
## AUTH-DEV-002 — issuer del access token

- **Severidad:** ALTO.
- **Hallazgo:** el flujo interactivo llegó a la API, pero el access token fue rechazado porque el backend solo aceptaba el issuer v2 y el token presentaba el issuer v1 oficial del mismo tenant.
- **Corrección definida:** permitir ambos formatos oficiales del tenant configurado mediante validación explícita, conservando audience, tenant, firma, vigencia y scope.
- **Estado:** EN CORRECCIÓN; pendiente de pruebas automatizadas y nueva validación interactiva.
## Validación Etapa A — logout, participantes, catálogo y asignaciones

Estado: **APPROVED / SIN AMBIGÜEDAD CRÍTICA** (2026-07-23).

- BAJO: Excel usa fila 2 como encabezado; documentado.
- MEDIO: 5 duplicados exactos; rechazados de forma trazable.
- MEDIO: 20 códigos `N/A`; clave alternativa aprobada.
- BAJO: 6 retakes y 122 comentarios vacíos; permanecen `NULL`.
- RESUELTO: moneda ausente del Excel; Discovery confirma costo base USD.
- RESUELTO: múltiples exámenes por participante y cantidad por asignaciones están confirmados.
- RESUELTO: orden único en documentos modificados: Comercial→Participantes→Exámenes→Resumen.
- RESUELTO: costo base y precio de venta permanecen separados.
- RESUELTO: backend es autoridad de cantidad, costo, snapshots y totales.
- No se agregan aprobación dentro del portal, compra, voucher o correo Graph.

## Validación Etapa B — logout, participantes, catálogo y asignaciones

Estado: **IMPLEMENTED / AUTOMATED TESTS PASS** (2026-07-23).

| Severidad | Hallazgo | Resolución/estado |
|---|---|---|
| ALTO, CERRADO | Consulta con filtros nulos generaba `lower(bytea)` en PostgreSQL | Sustituida por `JpaSpecificationExecutor`; prueba integrada real pasa. |
| ALTO, CERRADO | Riesgo de duplicar catálogo al reejecutar importación | Huella determinista de fila completa y clave única; primera carga 119/5 y segunda 0 nuevas. |
| ALTO, CERRADO | Precio/cantidad manipulables desde frontend | El contrato no acepta importes autoritativos; backend resuelve snapshots y deriva asignaciones. |
| MEDIO | Bundle Angular inicial 988.08 kB frente a presupuesto 750 kB | Build válido con warning; optimización posterior. |
| MEDIO | No existe comando lint en el frontend | No se declara ejecutado; incorporar ESLint/Stylelint en incremento técnico. |
| MEDIO | Logout real no se completó contra una sesión humana de Entra en esta ejecución | Servicio y pruebas pasan; validación interactiva pendiente y no se afirma como realizada. |
| MEDIO | Aún faltan axe y E2E visual automatizados | Pruebas unitarias/compilación cubren comportamiento; deuda registrada. |

Evidencia:

- Backend: 20 pruebas, 0 fallos, 0 errores y 0 omitidas; Testcontainers con PostgreSQL y Flyway V1–V3.
- Frontend: 31 pruebas exitosas en Chrome 150; build de producción exitoso.
- Runtime: frontend `/login` 200, actuator 200, catálogo anónimo 401, PostgreSQL con 119 exámenes y 3 migraciones exitosas.
- Consistencia documental: búsqueda sin coincidencias del orden deprecado Comercial → Examen → Participantes después de corregir `form-specification.md`.
- Alcance: Solicitante fijo; Comercial → Participantes → Exámenes → Resumen; sin aprobación dentro del portal, compra, correo Graph ni vouchers.
## Validación logout visible, UPN y Empresa libre — 2026-07-23

Estado: **IMPLEMENTED / AUTOMATED TESTS PASS**.

| Severidad | Hallazgo | Resolución/estado |
|---|---|---|
| ALTO, CERRADO | Empresa dependía de selector/mock inexistente | Sustituido por `companyName`; no existe llamada o endpoint de empresas. |
| ALTO, CERRADO | Empresa no se persistía | Flyway V4 y `companyNameSnapshot`; integración guarda/restaura. |
| ALTO, CERRADO | UPN no contemplaba claim `upn` | Precedencia backend explícita y tres escenarios automatizados. |
| MEDIO, CERRADO | Logout funcional con affordance insuficiente | CMP-012 outlined, texto/borde/foco y prueba de estilo computado. |
| MEDIO | No existe script lint en frontend | No se declara ejecutado; pendiente configurar ESLint/Stylelint. |
| MEDIO | No se probó visualmente con dos usuarios reales ni logout interactivo Entra | Requiere intervención humana; cobertura automatizada no sustituye evidencia real. |
| MEDIO | Bundle inicial 989.88 kB supera budget 750 kB | Build válido con warning; optimización pendiente. |

Evidencia:

- Angular 36 pruebas, Spring 27 pruebas: 0 fallos, errores u omitidas.
- OpenAPI parsea con 29 paths y sin `/catalogs/companies`.
- Docker: frontend/backend/PostgreSQL activos; HTTP 200; Flyway 4 y columna snapshot presentes.
- Seguridad/estilo: `.env` ignorado y no rastreado; 0 usuarios hardcodeados, 0 inline styles, colores directos solo en prueba normativa de tokens.
- Responsive/accesibilidad: native button, texto, aria-label complementario, target 44 px, tokens y breakpoint existente; falta revisión visual humana/axe.
## Validación Authenticated User Menu — 2026-07-23

Estado: **IMPLEMENTED / AUTOMATED TESTS PASS**.

| Severidad | Hallazgo | Resolución/estado |
|---|---|---|
| ALTO, CERRADO | Botón directo competía con identidad y tenía baja affordance | Sustituido por CMP-028 `mat-menu`; botón anterior eliminado. |
| ALTO, CERRADO | Riesgo de duplicar logout/MSAL en componente | Componente solo emite evento; AppComponent/AuthService permanecen autoridad. |
| MEDIO, CERRADO | Escape/foco/clic exterior requerían evidencia | Material Harness valida abrir, cerrar, foco restaurado y backdrop. |
| MEDIO | Bundle 1.02 MB excede warning 750 kB y antiguo error 1 MB | Error ajustado documentadamente a 1.10 MB; optimización pendiente. |
| MEDIO | No existe script lint ni axe automatizado | No se declaran ejecutados; deuda vigente. |
| MEDIO | Sin prueba humana autenticada de logout/zoom/dispositivos | Pendiente; no se sustituye con unit tests. |

Evidencia:

- Angular 43/43 pruebas: iniciales, nombre/UPN, loading, menú, logout emitido, Escape, foco y clic exterior.
- Build de producción e imagen NGINX exitosos; frontend HTTP 200.
- Código: 0 inline styles, 0 hex en componente, 0 usuario hardcodeado y 0 referencia a MSAL/AuthService en CMP-028.
- Responsive: reglas desktop/tablet/móvil compiladas; UPN permanece completo en overlay.

## Validación previa — requester como advisor (2026-07-23)

- **CRÍTICO corregido en Spec:** selector/mock permitía identidad comercial distinta al principal.
- **ALTO corregido en Spec:** OpenAPI aceptaba `salesAdvisorId`, habilitando mass assignment conceptual.
- **MEDIO:** persistencia no distinguía snapshots de asesor; resuelto mediante ADR-044 y V5 planificada.
- **BAJO:** terminología `AC /` se simplifica a “Asesor Comercial”.
- Alcance validado: sin delegación, catálogo ni registro para terceros; implementación autorizada por ADR APPROVED.

## Validación posterior — requester como advisor

- **CRÍTICO:** ninguno abierto.
- **ALTO:** ninguno abierto; cliente manipulando asesor recibe 400.
- **MEDIO:** validación interactiva con dos cuentas Entra pendiente de ejecución humana; no afecta pruebas de resolución backend.
- **BAJO:** bundle Angular conserva warning conocido de 1.02 MB frente a presupuesto warning 750 kB.
- Angular 44/44 y Spring 28/28 exitosas.
- Flyway V5 validada en Testcontainers y aplicada en base local; 4/4 históricos mantienen igualdad de snapshots.
- Frontend/backend/PostgreSQL activos; login 200 y endpoint protegido sin token 401.
- No existe catálogo/selector de asesores en producción; el resumen muestra la identidad cargada.
## Validacion Etapa A — notificacion de aprobacion por correo (2026-07-24)

Estado: **BLOCKED / NO IMPLEMENTACION**.

| Severidad | Hallazgo | Estado |
|---|---|---|
| CRITICO | Discovery P-39 no define los codigos incluidos en LATAM para aplicar CC al grupo de Testing Center | Bloquea RF-NOT-007, CC real y cualquier prueba de envio real hasta confirmacion |
| ALTO | No se verificaron permiso Graph Mail.Send, admin consent, buzon Exchange Online ni Application RBAC | Pendiente manual; no se afirma disponibilidad |
| ALTO | No existe implementacion backend de Outbox/worker/Graph en el commit base | Esperado; tareas permanecen PENDIENTES |
| MEDIO | Politica de reintentos requiere aprobacion de configuracion final | Documentada como propuesta configurable |
| BAJO | Plantilla y contrato requieren pruebas con clientes de correo | Pendiente de Etapa C/D |

Validaciones realizadas: commit base `22e56d0` preservado; no se modifico codigo Angular/Spring/NGINX/Docker ni migraciones; `.env` no se mostro ni se rastrea; no se crearon secretos ni destinatarios hardcodeados. La matriz, BDD, ADR, backlog y change log fueron actualizados para Etapa A.

Decision de gobernanza: no iniciar implementacion ni enviar correo real hasta responder P-39 con la lista exacta de codigos LATAM (o aprobar expresamente un MVP sin CC). Se confirma adicionalmente el grupo Outlook de desarrollo en `specs/01-discovery/cc-group-evidence.md`; el dominio productivo sera configurable.
## Validación Etapa B — contenido completo de correo — 2026-07-24

Estado: **APPROVED / IMPLEMENTACIÓN PENDIENTE**.

- Se inspeccionó el commit base `d44dd51`, el modelo N:M, los snapshots de precio/código/nombre/proveedor/retake/moneda y el Outbox existente.
- No existe ambigüedad crítica sobre cantidades, asignaciones o monedas: se derivan de snapshots persistidos y se agrupan por ISO.
- Brecha trazada: el Outbox actual contiene texto resumido y Graph envía únicamente `Text`; Etapa C debe introducir payload JSON estructurado, renderer HTML/text y mensaje multipart.
- Se aprobaron BigDecimal, no mezcla de monedas, N/A para comerciales opcionales, escaping contextual, tablas Outlook, sin botones de aprobación y sin secretos.
- Documentos nuevos: `email-content-requirements.md`, `email-content-model.md`, `email-style-guide.md`, `approval-email-content.feature`, ADR-056..060 y change log.

| Severidad | Hallazgo | Estado |
|---|---|---|
| ALTO | `ExamRequest` no expone un folio persistido dedicado; Etapa C debe usar el contrato vigente o introducirlo antes de producción | Pendiente Etapa C |
| MEDIO | No existe renderer HTML/text actual | Pendiente MAIL-CONTENT-003 |
| MEDIO | Falta revisión visual en Outlook real | Pendiente MAIL-CONTENT-006 |

No se modificó código, migraciones, permisos Graph ni configuración de secretos en esta etapa.

## Validación Etapa C/D — contenido completo de correo — 2026-07-24

Estado: **IMPLEMENTADO / PARCIALMENTE VERIFICADO**.

- Build backend Docker: correcto (`mvn -DskipTests package`).
- Prueba unitaria `ApprovalEmailTemplateRendererTest`: correcta.
- HTML contiene tablas separadas de comerciales, participantes, exámenes, asignaciones y totales; texto plano se genera de forma independiente.
- Payload estructurado se serializa en Outbox y el worker renderiza snapshots antes de Graph.
- Escaping de etiquetas HTML y cálculo BigDecimal cubiertos por prueba unitaria.
- Suite completa Spring no pudo finalizar porque el contenedor de pruebas Maven no tuvo acceso al socket Docker/Testcontainers; no se oculta como éxito.
- No se ejecutó prueba real Graph/Outlook en esta etapa; no se afirma recepción ni compatibilidad visual real.

| Severidad | Hallazgo | Estado |
|---|---|---|
| ALTO | Graph `sendMail` expone HTML; el endpoint no ofrece multipart text/plain nativo | HTML implementado; texto plano disponible en renderer/adaptadores futuros |
| ALTO | No hay evidencia de recepción/revisión en Outlook DEV para este contenido | Pendiente prueba manual |
| MEDIO | Suite Testcontainers requiere socket Docker disponible al proceso de pruebas | Pendiente entorno CI/DEV |
| MEDIO | Folio dedicado aún no está persistido en `ExamRequest`; se usa ID como fallback compatible | Pendiente evolución de dominio |

## Correccion definitiva de enrutamiento DEV — 2026-07-24

Estado: **BLOCKED BEFORE IMPLEMENTATION**.

- CRITICO: `.env` no contiene `GRAPH_TESTING_CENTER_CC_GROUP` ni una direccion SMTP completa equivalente. La instruccion exige detener implementacion y no inventar el valor.
- ALTO: destinatarios DEV y remitente dinamico ya estan especificados, pero aun no existe tabla/seed ni Outbox implementado.
- ALTO: admin consent, mail-enabled group, buzon remitente y RBAC requieren verificacion operacional.

Se documentaron ADR-051, ADR-052, ADR-054 y ADR-055, snapshots, reglas RN-NOT-019..032, requisitos RF-NOT-017..030 y escenarios de las ocho sedes. No se modifico codigo ni se crearon migraciones.
