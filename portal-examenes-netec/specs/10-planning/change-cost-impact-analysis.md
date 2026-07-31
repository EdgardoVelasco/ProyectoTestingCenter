# Análisis relativo de impacto y costo

Escala: XS < S < M < L < XL. No representa importes monetarios.

| Cambio | Fase | Backend | Frontend | BD | Seguridad | Pruebas | Tamaño |
|---|---:|---:|---:|---:|---:|---:|---:|
| Confirmación de envío | 1A | S | M | XS | S | M | M |
| Reinicio del formulario | 1A | S | M | XS | S | M | M |
| CN → Comercial | 1A | S | S | S | XS | S | S |
| Mejoras del correo | 1A | S | XS | XS | S | M | M |
| Importación CSV | 1B | M | L | XS | L | L | L |
| Edición de importados | 1B | S | M | XS | M | M | M |
| Límite de 100 alumnos | 1B | S | S | XS | M | M | S |
| Facturación | 2 | XL | XL | L | XL | XL | XL |
| AP–AC | 3 | L | L | L | XL | L | L |
| Catálogo fortalecido | 4 | XL | M | L | L | XL | XL |

## Dependencias y costos relativos

- Fase 1A depende del contrato actual de submit, folio, Outbox e idempotencia.
  El costo operativo es bajo; el principal retrabajo está en pruebas de estados
  y renderer de correo.
- Fase 1B depende de validadores equivalentes frontend/backend. Requiere
  procesamiento seguro, memoria acotada y pruebas de archivos malformados.
- Fase 2 requiere nuevos permisos/roles Entra, auditoría, concurrencia, soporte
  operativo y posiblemente más notificaciones; es el mayor costo de seguridad y
  mantenimiento.
- Fase 3 puede requerir migración de snapshots históricos y administración de
  relaciones AP–AC; riesgo de retrabajo alto si cambia la fuente de identidad.
- Fase 4 puede implicar servicios externos, licencias o agentes controlados;
  toda actualización automatizada requiere revisión humana.

Orden recomendado: 1A → 1B → descubrimiento de Fase 2 → Fase 2 → Fase 3 → Fase 4.
