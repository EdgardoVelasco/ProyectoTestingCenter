# Validation report — clean modular architecture refactor

## Alcance

Refactor incremental iniciado desde la rama `refactor/clean-modular-architecture`.
El objetivo fue reorganizar paquetes y responsabilidades sin cambiar contratos,
reglas de negocio, migraciones, autenticación, Graph, Outbox, correo ni UI.

## Commit base y commits de la rama

El punto de partida fue el commit estable existente antes de crear la rama. Los
incrementos aplicados son:

| Commit | Resultado |
|---|---|
| `75f29da` | Documentación de estructura actual, objetivo, dependencias y plan |
| `8a75ced` | Reubicación del módulo `request` a `examrequest` |
| `3055090` | Organización inicial de Angular por features |
| `71b459a` | Corrección de imports y rutas Angular después de los movimientos |
| `febdd97` | Extracción de la factory tipada del formulario |
| `2000358` | Separación física de Catalog en aplicación, persistencia, importador y web |
| `f59400a` | Separación de notificación, Graph, plantillas y Outbox |
| `b5958c0` | Aislamiento de la persistencia de approval routing |

## Comparativa

| Área | Antes | Después | Funcionalidad modificada |
|---|---|---|---|
| Catálogo backend | Paquete plano | Aplicación, persistencia, importador y web | No |
| Solicitudes backend | Paquete `request` | Módulo `examrequest` | No |
| Routing | Dentro de notification | Módulo `approvalrouting` para persistencia | No |
| Notificaciones | Graph, plantilla y Outbox juntos | Aplicación, Graph, template y outbox | No |
| Angular core | Negocio y capacidades globales mezclados | Features, core, shared y testing separados físicamente | No |
| Formulario | Componente grande | Página conserva coordinación y factory tipada extraída | No |

## Verificaciones ejecutadas

- Compilación backend en contenedor Maven después de cada movimiento relevante: **PASÓ**.
- Prueba de plantilla `ApprovalEmailTemplateRendererTest`: **PASÓ**.
- Build Angular en contenedor con volumen persistente de `node_modules`: **PASÓ**.
- `git diff --check`: presenta únicamente avisos de líneas en blanco preexistentes en dos pruebas movidas; no hay errores de whitespace funcional.
- Pruebas completas Spring: no concluyentes en el entorno porque Testcontainers no dispone de Docker socket.
- Pruebas Karma: no ejecutables porque la imagen de ChromeHeadless no está disponible en el contenedor.
- Lint ESLint: no ejecutable; el proyecto no tenía configuración ESLint ni script `lint` antes del refactor.
- Docker Compose y smoke test funcional: pendientes de ejecución en esta validación.

## Garantías preservadas

- No se modificaron endpoints ni payloads HTTP.
- No se crearon ni alteraron migraciones Flyway.
- No se cambiaron reglas de sedes, aprobadores, CC, remitente o destinatarios.
- No se modificó el cliente Microsoft Graph ni el flujo Transactional Outbox.
- No se modificaron estilos, tokens, configuración runtime o Docker Compose.
- No se mostraron ni copiaron valores de `.env`.

## Arquitectura resultante parcial

El backend ya tiene límites físicos para `examrequest`, `catalog`,
`approvalrouting` y `notification`. La separación completa de dominio puro,
puertos de aplicación y adapters queda como siguiente fase, porque hacerla en
el mismo cambio habría implicado alterar demasiadas dependencias y aumentar el
riesgo funcional.

En Angular, las páginas, acceso a datos, modelos de catálogo, menú global y
diálogo compartido están organizados por feature/capacidad. La factory del
formulario está separada; la extracción de todos los pasos visuales y un store
de Signals permanecen pendientes.

## Riesgos y pendientes

1. Ejecutar `mvn clean verify` con Docker/Testcontainers disponible.
2. Ejecutar Karma con un navegador ChromeHeadless instalado.
3. Añadir ArchUnit cuando existan paquetes `domain` y `application` puros que
   puedan validarse sin falsos positivos.
4. Configurar ESLint y reglas de límites cuando se apruebe incorporar esa
   dependencia al frontend.
5. Extraer progresivamente los casos de uso y adapters restantes del módulo de
   solicitudes.
6. Extraer los componentes restantes del formulario sin alterar su contrato.

## Estado Git al cierre de la fase

El estado exacto debe confirmarse con `git status --short` antes de continuar.
No se debe avanzar a la siguiente fase si aparecen cambios no relacionados o
si una prueba de caracterización falla.

## Conclusión

La refactorización realizada es incremental y revisable. Las compilaciones
ejecutadas confirman que los movimientos aplicados conservan la compilación del
backend y frontend. La arquitectura objetivo no se declara completamente
implementada todavía: quedan pendientes las reglas automatizadas y la
separación profunda de dominio/aplicación. Esto evita afirmar una cobertura que
no ha sido verificada en el entorno actual.
