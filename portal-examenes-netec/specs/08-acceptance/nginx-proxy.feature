# language: es
Característica: NGINX sirve Angular y conserva la API

  @NGX-001 Escenario: Servir index
    Cuando se solicita `/`
    Entonces NGINX entrega el index Angular

  @NGX-002 Escenario: Resolver ruta SPA
    Cuando se solicita `/solicitudes/nueva`
    Entonces NGINX entrega el index sin redirigir al backend

  @NGX-003 Escenario: Reenviar identidad
    Cuando se solicita `/api/auth/me`
    Entonces NGINX la reenvía al backend configurado

  @NGX-004 Escenario: Conservar prefijo
    Cuando reenvía `/api/auth/me`
    Entonces Spring Boot recibe `/api/auth/me`

  @NGX-005 Escenario: Backend no disponible
    Cuando el backend no acepta conexión
    Entonces responde 502 seguro sin detalles internos

  @NGX-006 Escenario: Timeout
    Cuando backend excede el timeout aprobado
    Entonces responde 504 seguro y registra correlación

  @NGX-007 Escenario: Forwarded proto
    Dado un acceso HTTPS
    Cuando NGINX reenvía
    Entonces conserva `X-Forwarded-Proto` correcto

  @NGX-008 Escenario: Request grande
    Cuando excede el límite aprobado
    Entonces NGINX lo rechaza sin enviar el cuerpo al backend

  @NGX-009 Escenario: Health check
    Cuando la plataforma consulta salud NGINX
    Entonces obtiene una respuesta que no depende de datos sensibles

  @NGX-010 Escenario: Backend sin configurar
    Cuando falta host o puerto obligatorio
    Entonces el contenedor falla antes de servir tráfico
