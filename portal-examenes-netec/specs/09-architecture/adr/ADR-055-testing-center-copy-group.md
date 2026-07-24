# ADR-055: grupo de copia Testing Center

Estado: BLOQUEADO PARA IMPLEMENTACION.

## Decision

Todas las sedes actuales reciben copia al grupo operativo configurado por ambiente mediante `GRAPH_TESTING_CENTER_CC_GROUP`. El grupo debe ser mail-enabled y validarse en Exchange Online. Produccion puede usar otro dominio; no se codifica el valor.

## Comportamiento de error

Si la variable falta, la direccion no es SMTP completa, el grupo no existe o no acepta mensajes, submit se bloquea y no se crea Outbox. Nunca se utiliza un destinatario ficticio.

## Evidencia faltante

El `.env` local inspeccionado no contiene la variable ni una direccion equivalente. Se requiere configurarla antes de implementar o probar correo real.
