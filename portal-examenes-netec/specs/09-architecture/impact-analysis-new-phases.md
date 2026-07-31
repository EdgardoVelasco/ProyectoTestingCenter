# Impacto arquitectónico — nuevas fases

## Fase 1A

La confirmación pertenece a la capa de presentación y consume el resultado
existente de submit. El reinicio debe invalidar estado local y solicitar nueva
idempotencia sin tocar sesión, identidad ni catálogos. El correo solo requiere
ajuste documental/visual del renderer aprobado; no cambia Graph ni Outbox.

## Fase 1B

CSV introduce un flujo de entrada temporal en la feature de participantes. La
vista previa debe ser local, la validación backend es autoritativa y el archivo
no debe persistirse. El límite 100 es transversal a captura manual/importación.

## Fases 2–4

Facturación agrega un bounded context de revisión y estados de negocio. AP–AC
afecta identidad, autorización, snapshots y compatibilidad histórica. Catálogo
afecta fuentes, vigencia, precio y gobernanza. Ninguna fase autoriza código aún.
