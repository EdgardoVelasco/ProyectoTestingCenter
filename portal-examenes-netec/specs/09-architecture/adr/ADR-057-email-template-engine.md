# ADR-057: Motor de plantillas de correo

Estado: APPROVED — 2026-07-24.

## Decisión

Reutilizar el motor existente; si no existe uno compatible, usar Thymeleaf sin MVC, con plantillas bajo `src/main/resources/templates/email/`. La plantilla recibe solo el DTO inmutable.

## Alternativas

Mustache/FreeMarker o HTML concatenado. Se descarta introducir otra dependencia si ya existe una solución aprobada y se descarta concatenación manual.

## Validación

Render HTML y texto, escaping, caracteres Unicode y datos largos.

