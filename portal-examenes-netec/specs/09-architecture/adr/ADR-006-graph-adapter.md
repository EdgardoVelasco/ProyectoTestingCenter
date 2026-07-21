# ADR-006: Microsoft Graph detrás de interfaz
Estado: PROPUESTO. Contexto: correo corporativo y desarrollo local. Decisión: `NotificationSender` con Graph y simulador local explícito. Alternativas: SMTP/proveedor SaaS. Positivo: sustituible/testeable. Negativo: más abstracción. Riesgo: límites OAuth/429; mitigar backoff, métricas y `Retry-After`.
