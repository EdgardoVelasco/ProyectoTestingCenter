# Riesgos

Nuevos riesgos ALTO: Excel sin país/moneda/vigencia; confundir costo base con precio venta; sumar USD/EUR; límite/asignación N:M sin cerrar. Mitigación: gobierno de ExamPrice, campos/auditoría separados, una moneda por solicitud como supuesto y resolver P-15..P-18 antes de I3/I4.

| Nivel | Riesgo | Mitigación / responsable pendiente |
|---|---|---|
| Alto | Claims/grupos Entra desconocidos | sesión de identidad y prueba en tenant no productivo |
| Alto | Regla de duplicidad ambigua | decisión negocio y casos con evento/fecha antes de I3 |
| Alto | Catálogos/relaciones no disponibles | dueño, formato, calidad y vigencia antes de I2 |
| Alto | Destinatarios o permisos Graph incorrectos | app registration, mínimo privilegio y prueba controlada |
| Medio | Duplicado de correo por caída tras aceptación | idempotencia/reconciliación y mensaje tolerante a repetición |
| Medio | Contención contador/duplicado | benchmark, locks cortos, índices |
| Medio | PII en logs/auditoría | allowlist, redacción y pruebas |
| Medio | Retención/RPO/RTO sin aprobar | decisión de privacidad/operación antes de producción |
| Bajo | Mermaid/renderers distintos | sintaxis simple y revisión Markdown |
| Alto | AC/CN/BOG y clave programada mal interpretados | no precargar significado; validar con Testing Center |
| Alto | Precio aplicable ambiguo (país/contrato/vigencia/impuestos) | aprobar ADR-011 antes de I3 |
| Alto | Quantity-participants puede impedir vouchers sin asignar | feature flag/regla configurable; confirmar antes de I5 |
| Alto | Centro de costos/sucursal modelados incorrectamente | aprobar ADR-013 antes de I2 |
| Medio | Precio cambia entre resumen y submit | revalidar, recalcular y exigir nueva confirmación |
| Medio | Colección aumenta PII y tamaño de correo | máximo configurable, minimización, no logs completos |
| Crítico | Correos oficiales de aprobadores no confirmados | bloquear producción hasta P-23; nunca inventar |
| Alto | Sede sin regla, inactiva o vencida | validación backend; borrador permitido |
| Alto | Regla cambia entre resumen y submit | re-resolver con versión y exigir nueva confirmación |
| Alto | Destinatario codificado o manipulado | configuración persistida, DTO cerrado y pruebas |
| Alto | Ausencia/suplencia | resolver P-33/P-34; no inventar fallback |
| Medio | Snapshots de correo incrementan PII | mínimo privilegio, no logs y retención |
| Medio | Renombrar estado rompe consumidores | TT-029 y migración contractual antes de código |
| Crítico | No existe propietario/autorizador de reglas | bloquear administración productiva; resolver P-25 y aprobar RBAC |
| Alto | Grupo de directorio y alcance LATAM confundidos | no almacenar miembros; resolver P-39 y probar CC por código |
| Crítico | Secreto expuesto en runtime config/bundle | allowlist, validación y SEC-TEST-001 |
| Alto | URL absoluta o localhost en producción | escaneo y validación de arranque |
| Alto | Desarrollo y producción usan rutas distintas | `/api` único y pruebas de proxy |
| Alto | `proxy_pass` elimina `/api` | prueba NGX-004 y revisión de template |
| Bajo, controlado | `protectedResourceMap` no coincide | MSAL Angular 6.x fijado; coincidencia estricta same-origin y AUTH-TEST-001 aprobada |
| Medio | MSAL incrementa el bundle inicial | vigilar presupuesto; evaluar carga diferida/optimización sin debilitar autenticación |
| Alto | Configuración carga después del bootstrap | initializer bloqueante y ENV-003 |
| Alto | NGINX inicia con variables faltantes | entrypoint fail-fast sin valores |
| Crítico | `.env` versionado o secreto histórico | CI/Git audit; no reescribir historial sin plan |
| Alto | CORS innecesario o abierto | same-origin; CORS dev restringido |
| Medio | Runtime config cacheado/obsoleto | `no-store`; bundles hash con caché larga |
| Alto | Aplicación inicia incompleta | esquema estricto y pantalla de error segura |

## Riesgos login/stepper

| Severidad | Riesgo | Mitigación |
|---|---|---|
| CRÍTICO | formulario falso/captura de contraseña | ADR-033, VAC/BDD, sin inputs password |
| CRÍTICO | confiar solo en frontend/no validar JWT | backend autoritativo y 401/403 |
| ALTO | identidad ficticia/equivocada | `/api/auth/me`, ownership/snapshot |
| ALTO | token/claims sensibles visibles | minimización y escaneo |
| ALTO | restauración incorrecta/loop/logout incompleto | máquina y BDD |
| ALTO | externo parcialmente habilitado | disabled sin ruta/handler |
| ALTO | pérdida de datos | FormGroup raíz, advertencia, borrador |
| ALTO | historial abre ruta protegida | guard + backend + Atrás |
| MEDIO | stepper inaccesible/solo color | VAC-STEP, teclado/lector |
| MEDIO | controles destruidos al navegar | prueba de conservación |
- Empresa libre puede producir alias/duplicados; mitigar conservando snapshot y plan de catálogo futuro.
- Claims UPN pueden faltar o variar; backend aplica precedencia explícita y UI muestra ausencia segura.
- Contraste del logout sobre header puede degradarse con estilos Material; validar estilo computado y foco.
- Menú overlay puede truncarse o perder foco en viewport/zoom; usar CDK y validar 360 px/200%.
- Ocultar UPN móvil sin conservarlo en overlay sería una pérdida de información; queda prohibido.
- `mat-menu` elevó bundle inicial a 1.02 MB; warning permanece en 750 kB y umbral de error se ajusta de 1.00 a 1.10 MB. Optimización sigue pendiente y no debe elevarse nuevamente sin ADR/revisión.
- Duplicación temporal requester/advisor puede divergir: construcción backend atómica y pruebas de igualdad.
- Claims sin nombre/UPN pueden producir snapshot inválido: error seguro y bloqueo de envío.
- Una futura delegación no debe reescribir snapshots históricos ni reintroducir mass assignment.
## Riesgos del envio Graph

- **CRITICO:** P-39 no define codigos LATAM; un CC incorrecto puede exponer solicitudes. Bloquea implementacion de CC y envio real.
- **ALTO:** permiso Mail.Send, consentimiento, buzon o RBAC ausentes pueden producir 401/403 o envio desde buzon no autorizado.
- **ALTO:** Graph acepta el mensaje y el worker falla antes de SENT; posible duplicado. Mitigar con idempotencia y reconciliacion.
- **ALTO:** tokens/secretos en logs, payloads o runtime config. Mitigar con allowlist y sanitizacion.
- **MEDIO:** dos workers o lease vencido procesan la misma fila; usar SKIP LOCKED/versionado.
- **MEDIO:** reglas de sede cambian entre borrador y submit; resolver nuevamente y congelar snapshot.
- **MEDIO:** HTML inseguro por observaciones; escapar y probar sanitizacion.
