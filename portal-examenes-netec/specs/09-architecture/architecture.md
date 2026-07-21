# Arquitectura

## Actualización por evidencia real

El agregado contiene participantes, líneas y asignaciones N:M. Catálogo resuelve costo USD; para MAD un servicio de tipo de cambio backend resuelve USD→EUR vigente. Ventas captura precio venta en moneda destino; se congelan origen, tasa y resultado. Otras ubicaciones no invocan conversión.

```mermaid
flowchart LR
  U[Angular SPA] -->|JWT HTTPS| A[Spring Boot API]
  A -->|transacción local| P[(PostgreSQL)]
  W[Outbox Worker] --> P
  W --> I[NotificationSender]
  I --> G[Microsoft Graph]
  E[Entra ID] --> U
```

Monorepo: contratos en `specs`, futuros `frontend`, `backend`, `database`, `docker`, `tests`. Backend por capas/hexagonal: web, aplicación, dominio, persistencia y adaptadores. La API no espera correo. En local, Compose levantará PostgreSQL, API, SPA y adaptador simulado explícito. Configuración por perfiles/variables; secretos fuera de Git. OpenAPI es contrato revisable, Flyway gobierna esquema.

Observabilidad: JSON con timestamp, nivel, service, correlationId (aceptado/creado), requestId único, userId pseudónimo, folio cuando exista; nunca token, cuerpo completo ni email. Métricas: creadas, duplicados bloqueados, notificaciones SENT/FAILED/DEAD_LETTER, latencia API/worker y profundidad/edad de outbox. Actuator separado: liveness solo proceso; readiness DB/configuración esencial (no Graph). Alertas por DEAD_LETTER, edad de outbox y tasa de error.
