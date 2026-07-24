# Reporte de implementación: login, identidad y stepper

Fecha: 2026-07-23  
Estado: IMPLEMENTADO / REVISIÓN FUNCIONAL PENDIENTE

## Alcance implementado

- Acceso por redirect de Microsoft Entra ID, sin campos internos de contraseña.
- Restauración de sesión, guard de rutas, pantalla 403, header autenticado y logout con confirmación por cambios.
- `GET /api/auth/me` como contrato único; `/api/v1/me` fue retirado.
- Spring Security exige `ExamRequests.Access` para identidad y roles autorizados para operaciones restantes.
- Solicitante fijo sobre un stepper de cuatro pasos: Comercial, Participantes, Exámenes y Resumen (modificado por ADR-038).
- Pasos futuros bloqueados, retorno libre a visitados y envío únicamente desde Resumen.
- Recuperación temporal del formulario en `sessionStorage`, con caducidad de 15 minutos, sin tokens ni identidad y sin comportamiento de autoguardado.
- Registro local del último paso al guardar un borrador.

## Evidencia

- Build Angular: correcto.
- Pruebas Angular: 25/25 correctas.
- Build backend en Docker: correcto.
- Pruebas Maven: correctas, sin fallos; una integración se omitió por falta de socket Docker dentro del contenedor de pruebas.
- Integración Docker Compose: PostgreSQL, Spring Boot y NGINX activos.
- Proxy same-origin: `/api/auth/me` respondió por NGINX con identidad y scope.

## Hallazgos

| Severidad | Hallazgo | Disposición |
|---|---|---|
| ALTO | Tenant, grupos y roles productivos no confirmados | El ambiente productivo no se declara listo. |
| MEDIO | Recuperación temporal con PII en `sessionStorage` | TTL de 15 minutos, datos limitados y revisión de privacidad pendiente. |
| MEDIO | El último paso no está aún en el modelo backend | Pendiente para restauración entre dispositivos. |
| MEDIO | Bundle inicial de 973.02 kB excede el presupuesto de 750 kB | Optimización futura mediante lazy loading. |
| BAJO | Testcontainers no tuvo acceso al socket Docker dentro de Maven | Se validó la integración real mediante Docker Compose. |

No se realizó commit.
