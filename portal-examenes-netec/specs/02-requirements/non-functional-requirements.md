# Requerimientos no funcionales

| ID | Objetivo medible |
|---|---|
| RNF-001 Seguridad | TLS; JWT firma/issuer/audience/exp validados; RBAC; secretos externos; SAST/dependencias por CI; cero tokens/secretos en logs. |
| RNF-002 Rendimiento | API p95 <500 ms y p99 <1 s sin integración externa, con 50 solicitudes/s en prueba acordada. |
| RNF-003 Disponibilidad | Guardar/enviar lógicamente no depende de Graph; objetivo inicial 99.5% mensual, por confirmar. |
| RNF-004 Observabilidad | 100% respuestas con correlationId; JSON logs; métricas y alertas DEAD_LETTER. |
| RNF-005 Accesibilidad | WCAG 2.1 AA: teclado, foco, contraste, labels, resumen de errores y lector de pantalla. |
| RNF-006 Compatibilidad | Dos últimas versiones estables de Edge/Chrome; responsive desde 360 px. |
| RNF-007 Calidad | Unitarias ≥80% líneas en dominio/servicios y 100% reglas críticas; integración por endpoint; cobertura no sustituye aserciones. |
| RNF-008 Privacidad | Minimización, autorización por propietario, cifrado en tránsito/reposo; retención pendiente. |
| RNF-009 Recuperación | Backups diarios + PITR; RPO 24 h/RTO 8 h como supuesto a confirmar; restauración semestral. |
| RNF-010 Mantenibilidad | OpenAPI validado, migraciones inmutables, ADR, lint y análisis estático en CI. |
| RNF-011 Escalabilidad | API y worker sin estado; bloqueo corto/SKIP LOCKED en outbox; índices medidos. |
| RNF-012 Contenedores | Imágenes mínimas, usuario no root, SBOM y escaneo sin vulnerabilidad crítica conocida. |
| RNF-013 Dinero | Cálculo con decimal exacto, nunca punto flotante binario; persistencia DECIMAL y moneda ISO; presentación localizada sin alterar valor. |
| RNF-014 Participantes/líneas | Formulario soporta 100 participantes y 100 líneas sin degradación visible; límites validados en FE/BE. |
| RNF-015 Catálogos | Listas buscables, paginadas si aplica, con respuesta visible de vacío/error. |
| RNF-016 Auditoría/privacidad | Registra creador y remitente; minimiza PII y enmascara correos en logs. |
| RNF-017 UX accesible | Navegación completa por teclado, error asociado al campo y confirmación con total antes del submit. |

Rate limiting queda pendiente de amenaza/capacidad; no se incorpora sin justificación.
