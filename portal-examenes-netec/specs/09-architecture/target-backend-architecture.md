# Arquitectura backend objetivo

Estado: APPROVED para refactor incremental; no introduce comportamiento.

El backend seguirá siendo un monolito modular organizado por dominio: `identity`, `catalog`, `examrequest`, `approvalrouting` y `notification`, con `shared` y `bootstrap` limitados a capacidades transversales.

Cada módulo adopta:

```text
domain → modelos y reglas Java puro
application → casos de uso y puertos
infrastructure → adapters Spring/JPA/HTTP/Graph
```

La dirección permitida es `infrastructure → application → domain`. Los controladores no acceden a entidades JPA directamente; los adapters traducen persistencia y transporte. Los contratos actuales permanecen sin cambios.

La migración será física primero y semántica después: se moverán paquetes con cambios mínimos, luego se extraerán puertos/casos de uso de forma aislada y verificable.

