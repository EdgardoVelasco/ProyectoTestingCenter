# Seguridad

Los DTO usan allowlist para impedir modificar `unitPrice`, `currency`, `totalAmount`, snapshots y solicitante. Logs enmascaran correos y nunca registran participantes completos ni referencias financieras. Auditoría registra creador y remitente, no secretos.

Entra ID emite JWT; Resource Server valida firma por JWKS, issuer, audience, expiración y algoritmo permitido. Claims/grupos se mapean explícitamente a EXAM_SALES/BILLING/ADMIN con denegación por defecto y mínimo privilegio. EXAM_SALES crea y consulta propias; consultas ajenas responden 404.

CORS solo orígenes configurados, métodos/headers mínimos. Con bearer en header y sin cookie de sesión, CSRF no aplica a API; se reevaluará si cambia el transporte. Angular no usa HTML sin sanitizar; correo escapa contexto. JPA parametriza SQL; DTO allowlist evita mass assignment (`requester`, estado, folio, auditoría ignorados). Bean Validation y relaciones se revalidan. Secretos en vault/variables de despliegue, rotables. TLS, cifrado en reposo, logs minimizados y auditoría append-only. Adjuntos no existen en fase 1; si se incorporan requieren nueva especificación de tipo, tamaño, malware y almacenamiento.
