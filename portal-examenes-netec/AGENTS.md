# Reglas para agentes

## Gobierno visual obligatorio

Antes de cualquier cambio frontend: leer `specs/NETEC Manual de identidad corporativa (1).pdf`, `specs/06-ui/brand-source.md`, `design-system.md`, `design-tokens.md`, `component-inventory.md` y `specs/00-governance/ui-change-policy.md`.

- No modificar frontend sin Spec APPROVED; DRAFT/IN_REVIEW no autorizan código.
- No inventar colores, usar serif ni una fuente distinta de Montserrat.
- Usar únicamente iconografía outline aprobada; no mezclar filled/rounded.
- No incluir hex/rgb/hsl en componentes ni estilos inline; consumir tokens.
- No modificar, reconstruir, deformar o recolorear el logotipo.
- Mantener todo degradado institucional de azul hacia verde/teal.
- Validar contraste, teclado, foco, responsive y zoom.
- Actualizar change log, inventario, VAC, BDD, trazabilidad y pruebas visuales.
- Reportar contradicciones y conservar OFICIAL/DERIVADA/PROPUESTA/PENDIENTE.
- No crear componente o variante sin registrarlo y aprobarlo en inventario.
- No cerrar una tarea frontend sin revisar Design System y DoD de UI.

1. Leer `specs/` antes de modificar código y respetar el alcance del MVP.
2. No implementar funcionalidad no especificada; detenerse ante ambigüedad funcional importante.
3. Mantener trazabilidad RF→RN→HU→CA→BDD→TT→código→prueba.
4. Actualizar OpenAPI y pruebas con cada cambio observable.
5. No eliminar archivos sin autorización ni almacenar secretos.
6. No cambiar estados, reglas o decisiones arquitectónicas sin actualizar/crear ADR.
7. Ejecutar pruebas antes de cerrar; informar archivos modificados.
8. Preferir cambios pequeños, reversibles y verificables.
9. Consultar la evidencia del formato real antes de modificar el formulario.
10. No combinar campos financieros ni centro de costos/sucursal sin decisión documentada.
11. El backend es autoridad de precios y totales; usar decimal exacto, nunca punto flotante binario.
12. Mantener snapshots históricos y consistencia configurable entre `quantity` y `participants`.
13. No asumir el significado de AC, CN o BOG.
14. Actualizar trazabilidad al modificar campos.
15. No implementar múltiples exámenes por solicitud sin ADR aprobado.
16. No implementar aprobación o rechazo dentro del portal en fase 1.
17. Resolver el aprobador por sede exclusivamente en backend mediante configuración vigente; nunca codificar destinatarios en frontend o backend.
18. No permitir captura manual del correo del aprobador cuando exista una regla activa.
19. Conservar snapshots de sede, aprobador y regla aplicada; los cambios de configuración no alteran solicitudes históricas.
20. No inventar correos de Felipe González, Angélica o Paola Galvis; permanecen PENDIENTES DE CONFIRMACIÓN.
21. Testing Center no es el reenviador inicial; el portal notifica directamente al aprobador resuelto.

## Configuración runtime obligatoria

- Leer `specs/09-architecture/frontend-runtime-configuration.md`, `nginx-reverse-proxy.md` y `environment-variable-catalog.md`.
- No hardcodear URLs backend absolutas; usar rutas relativas `/api`.
- Angular no lee `.env` ni contiene secretos en bundle/runtime config.
- No modificar NGINX sin actualizar ADR-028..031 y trazabilidad.
- No cambiar `/api` sin actualizar OpenAPI, BDD y matriz.
- No introducir CORS amplio; producción usa same-origin.
- Mantener la misma imagen frontend entre ambientes.
- Validar variables al arrancar y registrar nombres, nunca valores.
- No mostrar ni copiar valores de `.env`.
- No implementar configuración/MSAL/proxy sin Spec APPROVED.

## Gobierno de login y stepper

- No hardcodear usuarios, correos o condiciones de acceso por identidad individual.
- No imprimir, persistir manualmente ni mostrar access/refresh/id tokens.
- Validar firma, issuer, tenant, audience y scope en Spring Boot.
- `development` usa Entra real; solo el perfil explícito `local` permite identidad simulada en pruebas.
- Mantener MSAL y Entra en configuración runtime y rutas API relativas.
- No afirmar autenticación real sin completar una prueba interactiva con el tenant.

- Leer `authentication-experience.md`, `form-stepper-requirements.md` y ADR-032..036.
- No crear campos de contraseña, login corporativo propio ni simulación de Microsoft.
- Usar Entra ID; no mostrar tokens, claims sensibles o identidad ficticia.
- Proteger rutas y conservar backend como autoridad.
- Mantener acceso externo deshabilitado hasta aprobación futura.
- No cambiar pasos sin actualizar Spec, CA, BDD y trazabilidad.
- No perder datos al navegar; respetar NETEC, accesibilidad y responsive.
- DRAFT/PROPUESTO no autoriza implementación.
## Catálogo y asignaciones

- Leer `specs/01-discovery/exam-catalog-import-analysis.md` y ADR-037..041.
- No hardcodear exámenes ni importar filas manualmente.
- Mantener costo base separado de precio de venta y usar decimal exacto.
- Participantes precede a Exámenes; cantidad se deriva de asignaciones únicas.
- No aceptar precios, cantidades o snapshots del frontend como autoridad.
- No crear asignaciones sin participante propio y examen activo.
- Logout debe usar MSAL/Entra; una navegación local no lo sustituye.

## Identidad y empresa en MVP

- `/api/auth/me.username` representa el UPN resuelto por backend con precedencia `preferred_username` → `upn` → `email`; no duplicar `userPrincipalName` sin nueva decisión.
- El correo del solicitante es solo lectura y nunca se obtiene de valores ficticios o captura manual.
- Empresa se captura como `companyName` de texto libre en el MVP y se conserva como `companyNameSnapshot`.
- No consultar, simular o requerir catálogo/`companyId` para Empresa hasta aprobar la evolución mediante ADR.
- Normalizar espacios de Empresa sin modificar sus mayúsculas/minúsculas visibles; validar nuevamente en backend.
- El header usa CMP-028 Authenticated User Menu; no reintroducir botón logout separado.
- El componente visual emite la intención de logout y no conoce MSAL; AppComponent conserva confirmación y AuthService el flujo Entra.
- Iniciales: primera letra del primer y último componente del nombre, máximo dos, nunca derivadas del correo.
- En el MVP, requester y Asesor Comercial son la misma identidad autenticada; el backend es la autoridad.
- No mostrar selector, autocomplete, mock ni catálogo de asesores.
- No aceptar campos de asesor en requests; conservar snapshots separados según ADR-044.
- No implementar delegación o registro en nombre de otro asesor sin Spec aprobado.
## Notificaciones de aprobacion

- No enviar correo directamente dentro de la transaccion; usar Transactional Outbox.
- Resolver aprobador en backend desde configuracion persistida; nunca hardcodear destinatarios.
- No confiar en destinatario enviado por frontend.
- No usar `/me/sendMail` con client credentials; encapsular Graph app-only.
- No registrar tokens, client secrets ni cuerpos completos con datos personales.
- Mantener idempotencia, snapshots, reintentos y control de concurrencia.
- No afirmar envio antes de confirmacion de Graph y estado SENT.
- Testing Center CC solo para codigos explicitamente aprobados; no inferir LATAM.
- No usar cuentas productivas en DEV y no modificar permisos Azure automaticamente.
- Actualizar plantilla, BDD y trazabilidad ante cambios de correo.
