# Requerimientos no funcionales

## Extensión de identidad visual — IN_REVIEW

- **RNF-018 Marca:** BR-001..012 son requisitos transversales del frontend; los lineamientos OFICIALES provienen del manual y los traslados digitales conservan su clasificación DERIVADA.
- **RNF-019 Gobernanza visual:** ninguna especificación DRAFT/IN_REVIEW autoriza código; todo cambio visual requiere Spec APPROVED, trazabilidad y evidencia.
- **RNF-020 Consistencia técnica:** una futura implementación centralizará tokens/tema y prohibirá colores directos y estilos inline; las herramientas de enforcement permanecen PROPUESTAS.

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

## Configuración runtime y proxy — IN_REVIEW

| ID | Requisito verificable |
|---|---|
| NFR-CONF-001 | La misma imagen frontend debe desplegarse en varios ambientes sin recompilar. |
| NFR-CONF-002 | El destino backend debe cambiar por configuración sin recompilar Angular. |
| NFR-CONF-003 | Angular debe utilizar rutas relativas con base `/api`. |
| NFR-CONF-004 | La configuración pública debe cargarse y validarse antes de inicializar MSAL. |
| NFR-CONF-005 | Ningún secreto debe llegar al navegador, bundle o configuración pública. |
| NFR-CONF-006 | Configuración obligatoria ausente/inválida debe impedir un arranque incompleto y reportar solo nombres. |
| NFR-NGX-001 | NGINX debe servir archivos y fallback SPA correctamente. |
| NFR-NGX-002 | NGINX debe reenviar `/api` al backend configurado. |
| NFR-NGX-003 | NGINX debe conservar el prefijo `/api`. |
| NFR-NGX-004 | Spring Boot debe validar JWT independientemente del proxy. |
| NFR-NGX-005 | Los timeouts deben definirse y ser configurables de forma controlada. |
| NFR-NGX-006 | El flujo productivo same-origin no debe depender de CORS. |
| NFR-SEC-001 | Runtime config público no puede contener secretos. |
| NFR-SEC-002 | Angular no puede contener client secrets, credenciales DB o secretos Graph. |
| NFR-SEC-003 | Logs no deben registrar valores sensibles ni dumps del entorno. |
| NFR-SEC-004 | `.env` debe permanecer fuera de control de versiones. |

## Autenticación y navegación guiada — DRAFT

| ID | Requisito |
|---|---|
| NFR-AUTH-001 | Usar OpenID Connect y OAuth 2.0 mediante Microsoft Entra ID. |
| NFR-AUTH-002 | Angular no contiene secretos. |
| NFR-AUTH-003 | No almacenar access tokens manualmente; delegar caché y ciclo a MSAL. |
| NFR-AUTH-004 | Sesión, tokens y claims sensibles no aparecen en logs. |
| NFR-AUTH-005 | La pantalla de acceso cumple WCAG 2.1 AA. |
| NFR-AUTH-006 | Acceso y estados respetan identidad NETEC y design tokens. |
| NFR-AUTH-007 | La aplicación maneja expiración y renovación segura. |
| NFR-AUTH-008 | Rutas internas requieren autenticación y autorización backend. |
| NFR-AUTH-009 | Objetivo PROPUESTO: identidad visible ≤2 s p95 después de sesión válida; requiere medición/aprobación. |
| NFR-AUTH-010 | Errores de autenticación no revelan detalles internos. |
| NFR-UI-STEP-001 | Stepper funciona en escritorio, tablet y móvil. |
| NFR-UI-STEP-002 | Stepper y paneles se operan íntegramente por teclado. |
| NFR-UI-STEP-003 | Cambiar paso no destruye controles ni datos. |
| NFR-UI-STEP-004 | Estado se mantiene en un FormGroup raíz o estrategia equivalente aprobada. |
| RNF-CAT-001 | Consulta paginada; tamaño por defecto 25 y máximo 100. |
| RNF-CAT-002 | Importación transaccional, idempotente y con reporte de aceptados/rechazados. |
| RNF-CAT-003 | Búsqueda indexada por proveedor, código, nombre y curso. |
| RNF-ASG-001 | Cálculos con `BigDecimal`/DECIMAL, nunca `double`/`float`. |
| RNF-AUTH-011 | Logout accesible por teclado y error sin datos sensibles. |
- NFR-UI-LOGOUT-001: texto y borde del logout deben alcanzar contraste WCAG 2.1 AA y conservarse desde 360 px.
- NFR-ID-001: el UPN no debe derivarse de valores ficticios o almacenamiento local no validado.
- NFR-COM-001: normalización de Empresa debe ser determinista e idéntica en frontend/backend; backend es autoridad.
- NFR-UI-USER-001: menú y activador cumplen WCAG 2.1 AA, teclado, zoom 200% y 360 px.
- NFR-UI-USER-002: identidad visible no depende de hover; truncamiento conserva valor completo accesible en el menú.
- NFR-UI-USER-003: el componente no añade dependencias; reutiliza Angular Material/CDK instalados.
