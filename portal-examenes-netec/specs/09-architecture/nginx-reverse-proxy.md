# NGINX como servidor SPA y reverse proxy

Estado: **APPROVED / IMPLEMENTADO PARCIAL**. Template, entrypoint y proxy implementados; pruebas automatizadas de timeout/tamaño pendientes.

## Responsabilidades

NGINX sirve archivos Angular, resuelve rutas SPA mediante `try_files ... /index.html`, entrega la configuración pública sin caché y reenvía `/api/*` al backend configurado. No autentica, no valida JWT y no sustituye la seguridad Spring Boot.

## Semántica de rutas

Decisión preferida: Angular llama `/api/...`, Spring Boot expone `/api/...` y NGINX conserva el prefijo. La configuración actual `location /api/` + `proxy_pass http://backend:8080/api/` conserva el prefijo. Un `proxy_pass http://backend:8080/` lo eliminaría; cualquier cambio requiere prueba explícita.

## Plantilla conceptual

```nginx
server {
  listen ${NGINX_LISTEN_PORT};
  server_name _;
  root /usr/share/nginx/html;
  index index.html;

  location / { try_files $uri $uri/ /index.html; }

  location /api/ {
    proxy_pass http://${BACKEND_HOST}:${BACKEND_PORT}/api/;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Port $server_port;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_connect_timeout 5s;
    proxy_send_timeout 30s;
    proxy_read_timeout 30s;
  }
}
```

Antes de implementar se definirán `client_max_body_size`, endpoint de salud, timeouts configurables, headers CSP/HSTS/nosniff/referrer/frame, formato de logs sin tokens/PII y páginas seguras para 502/504. HSTS solo corresponde donde NGINX termina TLS o conoce correctamente `X-Forwarded-Proto`.

## Variables y templates

La imagen oficial de NGINX admite templates procesados al inicio. La futura implementación usará allowlist de variables; no ejecutará sustitución indiscriminada sobre archivos Angular. El contenedor debe fallar si faltan backend host/port o configuración pública obligatoria.

## Desarrollo

El repositorio ya usa `proxy.conf.json` hacia `localhost:8080`, conservando `/api`. Es una alternativa válida para desarrollo sin NGINX. Producción usa same-origin y no depende de CORS; cualquier CORS de desarrollo será restringido.
