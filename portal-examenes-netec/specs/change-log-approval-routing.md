# Change log — enrutamiento de aprobación

Fecha: 2026-07-22. Estado: IN_REVIEW; no autoriza implementación.

## Evidencia e interpretación

Testing Center confirmó que no reenvía solicitudes. El AC envía BOG/MED/SCL/LIM a Felipe González, WTC a Angélica Barrón y MAD a Paola Galvis; después de la aprobación Testing Center compra. Posteriormente se confirmaron sus correos oficiales, pertenencia a Facturación y rol/área Finanzas. El AC no recibe copia; el buzón `LATAM_Testing_Center@netec.com.mx` recibe copia para “LATAM y MAD”, pendiente delimitar LATAM.

## Cambios

- MODIFICADO: flujo AC → validar → identificar sede → resolver/mostrar aprobador → folio/persistencia/outbox → notificar/apuntar resultado.
- AGREGADO: RF-037..047, RN-060..080, HU-032..042, CA-037..047 y BDD-071..093.
- AGREGADO: `ApprovalRoutingRule`; snapshots de sede/aprobador/regla/estado de notificación en `ExamRequest`.
- PROPUESTO: entidad `Approver`, pendiente de roles, suplentes y multiplicidad.
- MODIFICADO: API con `GET /catalogs/sites`, `GET /approval-routing/resolve` y submit autoritativo.
- MODIFICADO: UI agrega Sede y tarjeta de aprobador no editable; guardar sigue permitido sin ruta.
- MODIFICADO: plantilla `approval-request-email-template.md`; la plantilla billing queda DEPRECADA.
- MODIFICADO: estado `ENVIADA_A_APROBADOR`; `ENVIADA_A_FACTURACION` queda DEPRECADO y requiere TT-029.
- AGREGADO: ADR-021..025 y tareas TT-025..029.

## Gestión de colisiones

El pedido propuso RN-041..058 y RF-031..040, ya ocupados por múltiples exámenes, precio y conversión MAD. No se sobrescribieron: equivalen respectivamente a RN-060..077 y RF-037..046. La razón es preservar trazabilidad y decisiones válidas.

## Impactos

- Arquitectura: nuevo servicio de resolución y configuración persistida; backend único decisor.
- Datos: regla versionada, vigencia, snapshots y PII protegida.
- API: dos consultas y submit enriquecido; destinatario no es entrada.
- UI: resolución informativa y bloqueo específico de Enviar.
- Notificación: destinatario snapshot por sede, nueva terminología y clave idempotente.
- Pruebas: 20 escenarios de rutas, vigencia, manipulación, concurrencia, histórico, fallo y auditoría.
- Backlog: I7 incorpora resolución/snapshots/outbox; administración mutable y aprobación interna quedan futuras.

## Preguntas y riesgos

Respondidas P-23/P-24/P-27..P-31; P-30 aclara que el destinatario de copia es un grupo de usuarios del directorio. P-26 confirma que hoy no existe responsable. Bloqueantes: designar propietario/autorizador (P-25) y delimitar “LATAM” (P-39). Riesgos: cambios sin gobierno, regla concurrente, ausencia/suplencia, PII y compatibilidad.

## Archivos modificados/creados

Gobierno/raíz: `AGENTS.md`, `README.md`; visión/discovery; requirements; stories/CA; dominio; OpenAPI/ejemplos/errores; UI; notificaciones; BDD/matriz; arquitectura/ADR; backlog/tareas/riesgos/DoD; `validation-report.md`.
