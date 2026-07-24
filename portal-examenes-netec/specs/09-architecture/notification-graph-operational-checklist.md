# Checklist operativo Graph (Etapa D futura)

- Confirmar App Registration backend con permiso de aplicacion Mail.Send.
- Confirmar admin consent y buzón de desarrollo Exchange Online.
- Confirmar `GRAPH_SENDER_MAILBOX` por ambiente y Application RBAC limitado.
- Confirmar `GRAPH_BASE_URL` y feature flag de envio.
- Verificar client secret solo en secreto operacional, nunca en repo/frontend/logs.
- Ejecutar pruebas mock antes de cualquier correo real.
- Probar recepcion solo con cuentas del tenant de desarrollo.
- Confirmar codigos LATAM de P-39 antes de construir CC.
