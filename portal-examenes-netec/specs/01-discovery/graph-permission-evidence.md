# Evidencia de permiso Microsoft Graph

Fecha: 2026-07-24

Se confirma que la App Registration del backend tiene configurado el permiso de aplicacion `Mail.Send` de Microsoft Graph.

Esta evidencia no confirma por si sola:

- admin consent otorgado;
- existencia y licencia Exchange Online del buzon remitente;
- restriccion Application RBAC;
- valores de runtime del cliente Graph;
- recepcion efectiva del mensaje.

La implementacion debe validar esos puntos en desarrollo sin exponer secretos.
