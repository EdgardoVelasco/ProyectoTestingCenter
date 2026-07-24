# Validacion de envio Graph — BOG

Fecha: 2026-07-24

- El primer intento fallo con 404 por construccion de URI.
- Se corrigio el adaptador para usar un `URI` ya codificado y evitar doble encoding del UPN.
- El ultimo Outbox fue reprogramado una vez.
- El worker completo el reintento.
- Estado final del Outbox: `SENT`.
- `sent_at` fue registrado por el backend.

Graph acepto el envio. La recepcion efectiva en el buzón del aprobador y en el grupo operativo debe confirmarse manualmente; no se afirma recepción solo con el estado SENT.
