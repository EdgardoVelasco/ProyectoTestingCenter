# Gestión de configuración

Configuración externa por ambiente, con allowlist, validación temprana, mínimo privilegio y separación pública/privada.

- Frontend: contrato público generado al arrancar; misma imagen.
- NGINX: host/puerto backend, listen, timeouts y templates controlados.
- Backend: variables privadas directamente desde entorno/secret manager; valida issuer, audience, expiración y autorización.
- `.env`: conveniencia local, nunca fuente del navegador ni artefacto desplegable.
- Logs: nombres de variables faltantes, nunca valores.
- Cambios de nombre: deprecación documentada y compatibilidad temporal; variables desconocidas provocan advertencia o fallo según política aprobada.

Precedencia propuesta: secretos administrados/plataforma → variables del contenedor → defaults seguros solo locales. Producción no admite `localhost`, placeholders ni credenciales por defecto.
