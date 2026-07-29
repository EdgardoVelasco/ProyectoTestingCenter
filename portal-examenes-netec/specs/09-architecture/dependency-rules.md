# Reglas de dependencias

## Backend

- `domain` no depende de Spring, Spring Data, JPA, Hibernate, Jackson, Graph, HTTP, Servlet, base de datos ni scheduler.
- `application` depende de `domain` y define puertos; no importa adapters concretos.
- `infrastructure` implementa puertos y contiene framework, persistencia, web, Graph, plantillas y worker.
- Un módulo no accede a paquetes internos de otro módulo; se usan puertos o contratos de aplicación.
- `shared` no contiene reglas específicas de catálogo, solicitudes, routing o notificaciones.

## Frontend

- `shared` no importa `features`.
- `core` no contiene APIs, modelos o reglas de una feature.
- `domain` no importa Angular Material.
- Componentes/páginas no usan `HttpClient` directamente; consumen facade o data-access.
- `data-access` concentra HTTP.
- `testing` no se importa en producción.
- No se crean barrel files que oculten ciclos.

