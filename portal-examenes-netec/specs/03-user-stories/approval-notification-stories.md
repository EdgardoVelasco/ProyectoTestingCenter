# Historias de notificacion de aprobacion (propuestas)

## HU-NOT-001 Enviar solicitud al aprobador

Como Asesor Comercial quiero que el portal notifique al aprobador resuelto por sede. Dado un borrador valido, cuando envio, entonces se persiste y se crea Outbox; si no existe ruta, el envio se bloquea.

## HU-NOT-002 Conservar solicitud ante fallo

Como usuario quiero que la solicitud permanezca registrada aunque Graph falle. Dado un fallo transitorio o permanente, entonces se conserva la solicitud y se reintenta o pasa a Dead Letter.

## HU-NOT-003 Consultar estado

Como usuario quiero ver pendiente, enviada o fallida sin detalles tecnicos sensibles.

## HU-NOT-004 Reintentar transitorios

Como sistema quiero respetar Retry-After y reintentar errores temporales hasta el maximo configurado.

## HU-NOT-005 Evitar duplicados

Como sistema quiero una clave idempotente para que submit repetido o workers concurrentes no creen multiples correos.

## HU-NOT-006 Recibir copia operativa

Como Testing Center quiero recibir copia solo para sedes/codigos expresamente aprobados. P-39 deja esta historia bloqueada para LATAM.
