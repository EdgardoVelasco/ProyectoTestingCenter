# API propuesta — nuevas fases

Estado global: PROPOSED / NOT_IMPLEMENTED. No cambia `openapi.yaml` ni los
endpoints actuales.

## Submit

La respuesta existente debe documentar, sin cambiar contrato implementado, la
distinción conceptual `REQUEST_REGISTERED`, `EMAIL_QUEUED`, `GRAPH_ACCEPTED` y
`EMAIL_DELIVERED`. La confirmación frontend solo requiere folio y registro; no
afirma entrega Outlook.

## CSV

Si se aprueba una API futura, deberá aceptar una representación temporal de
participantes o reutilizar el submit actual; validará nuevamente máximo 100,
encabezados, campos y duplicados. No se propone persistir el archivo ni crear un
endpoint de almacenamiento.

## Facturación

Endpoints futuros de bandeja, detalle, decisión e historial son NEEDS_DISCOVERY;
no se agregan rutas implementables hasta definir roles y estados.
