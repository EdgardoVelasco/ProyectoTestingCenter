# Supuestos residuales

## Supuestos de identidad — IN_REVIEW

- **SUPUESTO-BR-01:** el PDF incorporado es el manual vigente; falta confirmación corporativa.
- **SUPUESTO-BR-02:** Montserrat puede licenciarse y cargarse en el portal; pendiente legal/técnico.
- **SUPUESTO-BR-03:** el portal no requiere modo oscuro en la primera adopción; no es decisión.
- **SUPUESTO-BR-04:** Material Symbols Outlined puede cubrir iconografía; es PROPUESTA, no activo oficial.
- **SUPUESTO-BR-05:** 1280 px y escala base 4 son adecuados; son DERIVADOS sujetos a validación.

| ID | Estado | Supuesto |
|---|---|---|
| SUP-001 | SUPUESTO | Claims Entra permiten identificar al asesor autenticado; mapping pendiente P-11. |
| SUP-002 | DEPRECADO/CONFIRMADO | `item.quantity = count(assignments)` quedó confirmado; ya no es supuesto. |
| SUP-003 | SUPUESTO | Una solicitud usa una sola ubicación y moneda; mezclar MAD con otras ubicaciones no aplica porque ubicación pertenece a la cabecera. |
| SUP-004 | CONFIRMADO PARCIAL | MVP usa tasa USD→EUR configurable manualmente, versionada; si falta/no está vigente, MAD no puede enviarse. Gobierno fino pendiente. |
| SUP-005 | SUPUESTO | Cinco reintentos de correo; política pendiente P-14. |
| SUP-006 | SUPUESTO | `Approver` puede convertirse en entidad independiente si se confirman roles, suplentes o varios aprobadores; por ahora la regla conserva nombre/correo. |
| SUP-007 | SUPUESTO | La aprobación externa se confirma fuera del portal durante fase 1; no se infiere mecanismo de respuesta. |
| SUP-008 | SUPUESTO | Hasta definir P-25, ninguna persona o rol se considera autorizado para administrar reglas en producción; la carga inicial requerirá aprobación explícita del proyecto. |
| SUP-CONF-001 | SUPUESTO | `runtime-config.json` se adapta mejor que `env.js`; sujeto a aprobación y prueba de bootstrap. |
| SUP-CONF-002 | SUPUESTO | La plataforma proporcionará variables/secret manager y DNS interno del backend. |
| SUP-CONF-003 | SUPUESTO | El redirect URI podrá usar el origen actual si está registrado en Entra. |

Ya no son supuestos: múltiples exámenes/participantes, precio venta editable, segmento obligatorio, tipo opcional, referencia opcional, máximo 100, empresa=cliente, vigencia, ubicación como fuente de país, retake/comentarios y venta cero prohibida.

## Login y stepper — SUPUESTOS

- **CONFIRMADO:** Solicitante es contexto fijo sobre el stepper.
- **CONFIRMADO:** redirect es el único login interactivo; popup no se usa.
- **CONFIRMADO:** `/api/auth/me` es endpoint definitivo; `/api/v1/me` se retira coordinadamente.
- **CONFIRMADO MVP:** nombre/correo provienen de identidad validada; área/unidad son opcionales.
- **CONFIRMADO:** se restaura el último paso guardado y no existe autoguardado.
- **CONFIRMADO:** pasos futuros bloqueados; visitados navegables hacia atrás.
- **SUPUESTO:** avatar, si se aprueba, serán iniciales y no una foto obtenida con Graph.
## Empresa libre — 2026-07-23

- **SUPUESTO TEMPORAL APROBADO PARA MVP:** no existe catálogo de empresas disponible.
- **SUPUESTO:** la denominación capturada por Ventas es suficiente como snapshot histórico; no garantiza identidad maestra ni deduplicación corporativa.
- **SUPUESTO DERIVADO APROBADO:** Angular Material `mat-menu` satisface cierre exterior, Escape y restauración de foco con CDK; debe verificarse por pruebas.
- **CONFIRMADO (ya no supuesto):** AC significa Asesor Comercial y corresponde al solicitante autenticado en el MVP.
- **SUPUESTO FUTURO:** delegación podrá requerir catálogo, roles y relaciones organizativas; no autoriza implementación.
