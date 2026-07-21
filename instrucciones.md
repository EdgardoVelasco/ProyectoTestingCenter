Actúa como arquitecto de software senior, analista funcional, especialista en UX empresarial y desarrollador full stack experto en Spec-Driven Development.

Quiero diseñar y posteriormente implementar la primera fase de automatización del proceso de solicitud de exámenes de NETEC para el área de Testing Center.

No empieces generando código de producción.

Debes trabajar primero con un enfoque estricto de Spec-Driven Development:

1. Descubrimiento.
2. Especificación.
3. Validación de especificaciones.
4. Diseño técnico.
5. Plan de implementación.
6. Implementación controlada.
7. Verificación contra criterios de aceptación.

# Contexto del negocio

Actualmente, el personal de Ventas solicita vouchers de examen mediante correo electrónico.

La solicitud incluye información del participante, curso, examen y datos administrativos.

Después, Facturación revisa la solicitud y decide si se aprueba o rechaza.

Los alumnos aprobados se registran en un archivo Excel.

Posteriormente, Testing Center compra el examen, registra el voucher y lo envía manualmente al estudiante.

En esta primera fase solamente se automatizará el inicio del proceso.

# Objetivo de la primera fase

Construir un portal interno llamado:

“Portal de Registro de Exámenes NETEC”

El portal debe permitir que los usuarios de Ventas registren una solicitud de examen mediante un formulario estructurado.

El sistema debe:

- Autenticar al usuario.
- Identificar automáticamente al solicitante.
- Permitir crear una solicitud.
- Permitir guardar un borrador.
- Validar los datos.
- Evitar solicitudes duplicadas.
- Generar un folio único.
- Almacenar la solicitud.
- Enviar un correo estructurado a Facturación.
- Mostrar una confirmación al usuario.
- Permitir consultar las solicitudes creadas por el usuario.
- Registrar auditoría básica.
- Conservar la solicitud aunque falle el envío del correo.

# Fuera del alcance de esta primera fase

No se debe implementar todavía:

- Aprobación o rechazo dentro del portal.
- Compra del examen.
- Registro del voucher.
- Envío del voucher al estudiante.
- Integraciones con portales externos.
- Inteligencia artificial.
- Automatización RPA.
- Inventario de vouchers.
- Panel completo de Facturación.
- Panel operativo de Testing Center.

# Usuarios

## Ejecutivo de Ventas

Puede:

- Iniciar sesión.
- Crear una solicitud.
- Guardar borradores.
- Editar borradores.
- Enviar solicitudes.
- Consultar sus propias solicitudes.
- Consultar el detalle.
- Ver mensajes de validación.
- Ver el folio generado.

## Facturación

En esta primera fase:

- Recibe un correo estructurado.
- Recibe el folio.
- Recibe un enlace al portal.
- Realiza la aprobación o rechazo fuera del portal.

## Administrador

En esta primera fase puede ser un rol técnico o limitado.

Debe poder administrar o cargar:

- Tecnologías.
- Fabricantes.
- Certificaciones.
- Exámenes.
- Cursos.
- Centros de negocio.
- Centros de costos.
- Clientes.
- Correos destinatarios de Facturación.

No es obligatorio crear una interfaz administrativa completa en el MVP.

Los catálogos pueden cargarse inicialmente mediante migraciones o scripts.

# Arquitectura tecnológica preferida

Utiliza esta arquitectura como propuesta inicial:

Frontend:
- Angular.
- TypeScript.
- Angular Material.
- Reactive Forms.
- Guards.
- Interceptor HTTP.
- Manejo centralizado de errores.

Backend:
- Java 21.
- Spring Boot 3.
- Spring Web.
- Spring Security.
- OAuth2 Resource Server.
- Spring Data JPA.
- Bean Validation.
- PostgreSQL.
- Flyway.
- OpenAPI.
- Auditoría.

Identidad:
- Microsoft Entra ID.

Correo:
- Microsoft Graph como opción principal.
- El diseño debe permitir sustituir Microsoft Graph por otro proveedor.

Pruebas:
- JUnit 5.
- Mockito.
- Testcontainers.
- Cucumber o escenarios Gherkin.
- Pruebas Angular.
- Pruebas de integración de API.

Infraestructura:
- Docker Compose para desarrollo local.
- Variables de entorno.
- Configuración por perfiles.
- No almacenar secretos en el repositorio.

No implementes dependencias externas ficticias.

Si alguna integración no puede probarse localmente, crea una interfaz y una implementación simulada para desarrollo.

# Regla principal de Spec-Driven Development

Ninguna funcionalidad puede implementarse si no está definida en una especificación.

Cada elemento debe tener trazabilidad:

Requerimiento
→ regla de negocio
→ historia de usuario
→ criterio de aceptación
→ escenario de prueba
→ tarea técnica
→ implementación
→ prueba automatizada

Crea una matriz de trazabilidad.

# Estructura requerida del repositorio

Crea o propone esta estructura:

portal-examenes-netec/
├── AGENTS.md
├── README.md
├── specs/
│   ├── 00-vision/
│   │   └── vision.md
│   ├── 01-discovery/
│   │   ├── assumptions.md
│   │   ├── open-questions.md
│   │   └── decisions.md
│   ├── 02-requirements/
│   │   ├── functional-requirements.md
│   │   ├── non-functional-requirements.md
│   │   ├── business-rules.md
│   │   ├── form-fields.md
│   │   └── glossary.md
│   ├── 03-user-stories/
│   │   ├── epics.md
│   │   ├── user-stories.md
│   │   └── acceptance-criteria.md
│   ├── 04-domain/
│   │   ├── domain-model.md
│   │   ├── data-dictionary.md
│   │   ├── state-machine.md
│   │   └── use-cases.md
│   ├── 05-api/
│   │   ├── openapi.yaml
│   │   ├── error-contract.md
│   │   └── api-examples.md
│   ├── 06-ui/
│   │   ├── screens.md
│   │   ├── navigation.md
│   │   ├── form-specification.md
│   │   ├── validation-messages.md
│   │   └── accessibility.md
│   ├── 07-notifications/
│   │   ├── billing-email-template.md
│   │   ├── notification-rules.md
│   │   └── retry-policy.md
│   ├── 08-acceptance/
│   │   ├── exam-request.feature
│   │   ├── duplicate-request.feature
│   │   ├── notification-failure.feature
│   │   └── traceability-matrix.md
│   ├── 09-architecture/
│   │   ├── architecture.md
│   │   ├── security.md
│   │   ├── persistence.md
│   │   ├── notification-outbox.md
│   │   └── adr/
│   └── 10-planning/
│       ├── implementation-plan.md
│       ├── backlog.md
│       ├── tasks.md
│       ├── risks.md
│       └── definition-of-done.md
├── frontend/
├── backend/
├── database/
├── docker/
└── tests/

# Campos iniciales de la solicitud

Define una especificación completa para los siguientes campos.

## Información del solicitante

Estos datos deben obtenerse de la sesión:

- Identificador del usuario.
- Nombre.
- Correo corporativo.
- Área o unidad de negocio.
- Fecha y hora de creación.

No deben ser editables manualmente.

## Datos del participante

- Nombre.
- Primer apellido.
- Segundo apellido opcional.
- Correo electrónico.
- Empresa o cliente.
- País.
- Ciudad.
- Identificador externo del participante opcional.

## Datos del curso

- Tecnología.
- Nombre del curso.
- Clave del curso.
- Evento asociado.
- Fecha de término del curso.

## Datos del examen

- Fabricante.
- Certificación.
- Nombre del examen.
- Código del examen.
- Idioma.
- Fecha requerida.

## Información administrativa

- Centro de negocio.
- Centro de costos.
- Línea de facturación.
- Cliente.
- Responsable comercial.
- Observaciones.

Para cada campo documenta:

- Identificador técnico.
- Etiqueta visible.
- Descripción.
- Tipo de dato.
- Longitud.
- Obligatorio u opcional.
- Origen.
- Editable o no editable.
- Validaciones frontend.
- Validaciones backend.
- Mensaje de error.
- Relación con catálogo.
- Reglas condicionales.
- Ejemplo válido.
- Ejemplo inválido.

# Requerimientos funcionales mínimos

Define y enumera al menos los siguientes requerimientos:

- RF-001 Autenticación.
- RF-002 Identificación del solicitante.
- RF-003 Crear solicitud.
- RF-004 Guardar borrador.
- RF-005 Editar borrador.
- RF-006 Validar formulario.
- RF-007 Validar relaciones entre catálogos.
- RF-008 Detectar duplicados.
- RF-009 Generar folio.
- RF-010 Persistir solicitud.
- RF-011 Enviar correo a Facturación.
- RF-012 Registrar resultado del correo.
- RF-013 Reintentar correo fallido.
- RF-014 Mostrar confirmación.
- RF-015 Consultar solicitudes propias.
- RF-016 Consultar detalle.
- RF-017 Filtrar solicitudes.
- RF-018 Auditoría.
- RF-019 Manejo de concurrencia.
- RF-020 Manejo uniforme de errores.

Cada requerimiento debe incluir:

- Descripción.
- Actor.
- Precondiciones.
- Flujo principal.
- Flujos alternos.
- Postcondiciones.
- Reglas relacionadas.
- Criterios de aceptación.
- Prioridad.
- Dependencias.

# Reglas de negocio mínimas

Define y mejora estas reglas:

- RN-001 Solo se envían solicitudes con campos obligatorios válidos.
- RN-002 El correo del participante debe ser válido.
- RN-003 El solicitante proviene de la sesión.
- RN-004 Los catálogos deben estar activos.
- RN-005 El examen debe pertenecer a la tecnología seleccionada.
- RN-006 El curso debe relacionarse con el examen o certificación.
- RN-007 No debe existir una solicitud activa duplicada.
- RN-008 Una solicitud enviada no puede ser modificada por Ventas.
- RN-009 El folio es único y lo genera el backend.
- RN-010 La solicitud se guarda antes de enviar el correo.
- RN-011 Un fallo de correo no elimina la solicitud.
- RN-012 Un fallo de correo cambia el estado a PENDIENTE_NOTIFICACION.
- RN-013 Un borrador no genera correo.
- RN-014 Todos los cambios deben auditarse.
- RN-015 El envío debe ser idempotente.
- RN-016 El usuario solo puede consultar sus propias solicitudes.
- RN-017 Los catálogos inactivos no pueden usarse en nuevas solicitudes.
- RN-018 Los datos históricos deben conservar sus valores aunque un catálogo cambie.
- RN-019 La fecha requerida no puede ser anterior a la fecha actual.
- RN-020 Las validaciones críticas deben ejecutarse nuevamente en backend.

No inventes reglas financieras no confirmadas.

Registra esas posibles reglas en open-questions.md.

# Estados de la solicitud

Utiliza inicialmente:

- BORRADOR.
- REGISTRADA.
- PENDIENTE_NOTIFICACION.
- ENVIADA_A_FACTURACION.
- CANCELADA.

Define:

- Transiciones permitidas.
- Actor que ejecuta la transición.
- Evento que dispara la transición.
- Validaciones previas.
- Efectos secundarios.
- Transiciones no permitidas.

Flujo esperado:

BORRADOR
→ REGISTRADA
→ ENVIADA_A_FACTURACION

Si falla el correo:

REGISTRADA
→ PENDIENTE_NOTIFICACION
→ ENVIADA_A_FACTURACION

# Folio

Propón este formato inicial:

EXA-AAAA-000001

Ejemplo:

EXA-2026-000001

Documenta:

- Cómo garantizar unicidad.
- Qué ocurre con concurrencia.
- Si la secuencia se reinicia por año.
- Estrategia de base de datos.
- Pruebas de concurrencia.

No uses count + 1.

# Detección de duplicados

Considera inicialmente duplicada una solicitud cuando exista otra solicitud activa con:

- El mismo correo normalizado del participante.
- El mismo examen.
- Un estado diferente de CANCELADA.

Analiza si debe incluirse:

- Código del evento.
- Curso.
- Cliente.
- Fecha requerida.

No tomes una decisión definitiva sin documentarla como supuesto o pregunta abierta.

# Persistencia

Diseña al menos estas entidades:

- ExamRequest.
- Participant.
- Technology.
- Vendor.
- Certification.
- Exam.
- Course.
- BusinessCenter.
- CostCenter.
- Client.
- NotificationOutbox.
- AuditEntry.

Evalúa si Participant debe ser una entidad independiente o datos embebidos en ExamRequest.

Documenta la decisión mediante ADR.

La solicitud debe conservar una instantánea de los valores visibles de los catálogos para mantener el historial.

# Notificación a Facturación

El correo debe enviarse después de persistir la solicitud.

No debe ejecutarse como una transacción distribuida entre base de datos y proveedor de correo.

Utiliza el patrón Transactional Outbox.

Diseña:

notification_outbox:
- id.
- aggregate_id.
- aggregate_type.
- notification_type.
- recipient.
- cc.
- subject.
- payload.
- status.
- attempts.
- next_attempt_at.
- last_error.
- created_at.
- sent_at.
- version.

Estados:

- PENDING.
- PROCESSING.
- SENT.
- FAILED.
- DEAD_LETTER.

Define:

- Política de reintentos.
- Backoff.
- Número máximo de intentos.
- Idempotencia.
- Recuperación de registros atascados.
- Auditoría.
- Tratamiento de errores permanentes.

# Plantilla del correo

Asunto:

[Nueva solicitud de examen] {folio} — {nombreParticipante}

Cuerpo:

Se ha registrado una nueva solicitud de examen.

Folio:
Solicitante:
Correo del solicitante:

Participante:
- Nombre:
- Correo:
- Empresa:
- País:
- Ciudad:

Curso:
- Tecnología:
- Nombre:
- Clave:
- Evento:
- Fecha de término:

Examen:
- Fabricante:
- Certificación:
- Nombre:
- Código:
- Idioma:
- Fecha requerida:

Información administrativa:
- Centro de negocio:
- Centro de costos:
- Línea de facturación:
- Cliente:
- Responsable comercial:

Observaciones:

Enlace al portal:

El correo debe existir en formato HTML y texto plano.

Escapa datos proporcionados por el usuario.

No expongas datos sensibles innecesarios.

# API inicial

Define en OpenAPI al menos:

POST /api/v1/exam-requests
PUT /api/v1/exam-requests/{id}
POST /api/v1/exam-requests/{id}/validate
POST /api/v1/exam-requests/{id}/submit
POST /api/v1/exam-requests/{id}/cancel
GET /api/v1/exam-requests
GET /api/v1/exam-requests/{id}

GET /api/v1/catalogs/technologies
GET /api/v1/catalogs/vendors
GET /api/v1/catalogs/certifications
GET /api/v1/catalogs/exams
GET /api/v1/catalogs/courses
GET /api/v1/catalogs/business-centers
GET /api/v1/catalogs/cost-centers
GET /api/v1/catalogs/clients

Para cada endpoint define:

- Propósito.
- Autorización.
- Request.
- Response.
- Códigos HTTP.
- Errores.
- Idempotencia.
- Paginación.
- Filtros.
- Ejemplos.
- Criterios de aceptación relacionados.

# Contrato de errores

Utiliza Problem Details for HTTP APIs.

Incluye:

- type.
- title.
- status.
- detail.
- instance.
- code.
- timestamp.
- fieldErrors.
- correlationId.

Ejemplo:

{
  "type": "https://netec.com/errors/validation",
  "title": "La solicitud contiene datos inválidos",
  "status": 400,
  "detail": "Corrige los campos indicados.",
  "instance": "/api/v1/exam-requests/123/submit",
  "code": "EXAM_REQUEST_VALIDATION_FAILED",
  "timestamp": "2026-07-20T18:30:00-06:00",
  "correlationId": "abc-123",
  "fieldErrors": [
    {
      "field": "participantEmail",
      "code": "INVALID_EMAIL",
      "message": "Ingresa un correo electrónico válido."
    }
  ]
}

# Pantallas mínimas

Define detalladamente:

1. Inicio de sesión o redirección a Entra ID.
2. Mis solicitudes.
3. Nueva solicitud.
4. Editar borrador.
5. Detalle de solicitud.
6. Confirmación de envío.
7. Error de acceso.
8. Error general.

Para cada pantalla especifica:

- Propósito.
- Actor.
- Componentes.
- Campos.
- Botones.
- Estados.
- Validaciones.
- Mensajes.
- Navegación.
- Accesibilidad.
- Criterios de aceptación.

# Comportamiento del formulario

El formulario debe:

- Usar Reactive Forms.
- Mostrar campos por secciones.
- Marcar obligatorios.
- Mostrar mensajes junto al campo.
- Mostrar resumen de errores al intentar enviar.
- Mantener datos al recibir errores del backend.
- Evitar doble clic en Enviar.
- Mostrar indicador de procesamiento.
- Pedir confirmación antes de enviar.
- Permitir guardar borrador.
- Permitir descartar cambios.
- Cargar catálogos dependientes.
- Limpiar valores incompatibles cuando cambia una selección superior.
- No confiar únicamente en validaciones frontend.

# Historias de usuario

Crea historias completas al menos para:

- Crear una solicitud.
- Guardar borrador.
- Editar borrador.
- Validar información.
- Detectar duplicado.
- Enviar solicitud.
- Consultar solicitudes propias.
- Consultar detalle.
- Cancelar borrador.
- Manejar fallo del correo.
- Reintentar notificación.
- Auditar cambios.
- Cargar catálogos dependientes.
- Restringir acceso por usuario.

Cada historia debe tener:

- Identificador.
- Épica.
- Descripción.
- Valor.
- Prioridad.
- Dependencias.
- Criterios de aceptación Given/When/Then.
- Requerimientos relacionados.
- Reglas relacionadas.
- Casos negativos.

# Escenarios BDD obligatorios

Incluye al menos:

1. Guardar solicitud como borrador.
2. Editar borrador.
3. Intentar enviar solicitud incompleta.
4. Enviar solicitud válida.
5. Solicitud duplicada.
6. Falla el envío del correo.
7. Reintento exitoso del correo.
8. Reintentos agotados.
9. Doble clic en enviar.
10. Dos solicitudes concurrentes.
11. Usuario intenta consultar solicitud ajena.
12. Catálogo inactivo.
13. Relación examen-tecnología inválida.
14. Error del backend.
15. Pérdida temporal de conexión.
16. Folio único bajo concurrencia.
17. Usuario no autenticado.
18. Usuario sin rol.
19. Consulta paginada.
20. Filtros por folio, alumno, estado, tecnología y fecha.

# Requerimientos no funcionales

Define objetivos medibles para:

- Seguridad.
- Disponibilidad.
- Rendimiento.
- Mantenibilidad.
- Escalabilidad.
- Observabilidad.
- Accesibilidad.
- Compatibilidad.
- Auditoría.
- Privacidad.
- Respaldo.
- Recuperación.
- Trazabilidad.
- Calidad del código.

Como base:

- API p95 menor a 500 ms en operaciones sin integraciones externas.
- El guardado de una solicitud no debe depender de la disponibilidad del correo.
- Todas las operaciones deben tener correlationId.
- Logs estructurados.
- No registrar tokens ni datos sensibles.
- Cumplimiento básico de WCAG 2.1 AA.
- Cobertura mínima de pruebas definida por tipo, sin perseguir cobertura vacía.
- Escaneo de dependencias.
- Validación de imágenes Docker.
- Rate limiting solo si está justificado.

# Seguridad

Documenta:

- Autenticación con Entra ID.
- Autorización por roles.
- Principio de mínimo privilegio.
- Validación de tokens.
- Protección de endpoints.
- CORS.
- CSRF según arquitectura.
- XSS.
- Inyección SQL.
- Mass assignment.
- Validación de archivos, si se permiten posteriormente.
- Gestión de secretos.
- Auditoría.
- Protección de datos personales.
- Política de logs.

Roles iniciales:

- EXAM_SALES.
- EXAM_BILLING.
- EXAM_ADMIN.

En esta fase, EXAM_SALES debe ser suficiente para crear y consultar solicitudes propias.

# Observabilidad

Incluye especificación para:

- Logs estructurados.
- correlationId.
- requestId.
- userId.
- folio.
- Métricas.
- Health checks.
- Readiness.
- Liveness.
- Métrica de solicitudes creadas.
- Métrica de notificaciones enviadas.
- Métrica de notificaciones fallidas.
- Métrica de duplicados bloqueados.
- Tiempo de procesamiento.
- Alertas sobre DEAD_LETTER.

# ADR obligatorios

Crea Architecture Decision Records para:

- ADR-001 Angular como frontend.
- ADR-002 Spring Boot como backend.
- ADR-003 PostgreSQL como base de datos.
- ADR-004 Microsoft Entra ID para identidad.
- ADR-005 Transactional Outbox para notificaciones.
- ADR-006 Microsoft Graph detrás de una interfaz.
- ADR-007 Datos de participante embebidos o entidad independiente.
- ADR-008 Estrategia de generación de folios.
- ADR-009 Instantáneas de catálogos.
- ADR-010 Monorepo o repositorios separados.

Cada ADR debe incluir:

- Contexto.
- Decisión.
- Alternativas.
- Consecuencias positivas.
- Consecuencias negativas.
- Riesgos.
- Estado.

# Trazabilidad

Crea una matriz con columnas:

- Requerimiento.
- Regla de negocio.
- Historia de usuario.
- Criterio de aceptación.
- Escenario BDD.
- Endpoint.
- Pantalla.
- Entidad.
- Tarea técnica.
- Prueba automatizada.
- Estado.

No dejes requerimientos sin trazabilidad.

# Preguntas que no debes asumir

Registra en open-questions.md todas las decisiones pendientes, incluyendo:

- Campos definitivos del formulario.
- Campos obligatorios.
- Catálogo real de tecnologías.
- Catálogo real de cursos.
- Catálogo real de exámenes.
- Relación curso-examen.
- Relación certificación-examen.
- Centros de negocio.
- Centros de costos.
- Clientes.
- Correos de Facturación.
- Reglas de duplicidad.
- Plazo mínimo de solicitud.
- Países soportados.
- Idiomas de examen.
- Reglas para fechas.
- URL final del portal.
- Grupos reales de Entra ID.
- Política de cancelación.
- Conservación de datos.
- Responsables de los catálogos.
- SLA esperado.
- Política de reintentos.
- Necesidad de adjuntos.

No bloquees toda la especificación por estas preguntas.

Utiliza supuestos explícitos y márcalos como:

- CONFIRMADO.
- SUPUESTO.
- PENDIENTE.
- DECIDIDO.

# Plan de trabajo requerido

Ejecuta el trabajo en estas fases.

## Fase 1: inspección

- Revisa el contenido actual del repositorio.
- No sobrescribas archivos importantes.
- Identifica si el repositorio está vacío o contiene una aplicación.
- Resume lo encontrado.

## Fase 2: especificaciones

Crea todos los documentos de specs.

No crees todavía frontend ni backend.

## Fase 3: validación cruzada

Revisa:

- Contradicciones.
- Requerimientos duplicados.
- Reglas sin prueba.
- Historias sin aceptación.
- Endpoints sin historia.
- Campos sin validación.
- Estados sin transición.
- Preguntas abiertas ocultas.
- Funciones fuera del alcance.

Genera:

specs/validation-report.md

Clasifica hallazgos en:

- Crítico.
- Alto.
- Medio.
- Bajo.

Corrige automáticamente los problemas no ambiguos.

## Fase 4: plan de implementación

Genera un backlog ordenado.

Divide las tareas en incrementos verticales.

Cada tarea debe incluir:

- Identificador.
- Objetivo.
- Archivos.
- Dependencias.
- Requerimientos relacionados.
- Criterios de aceptación.
- Pruebas.
- Riesgos.
- Definition of Done.

## Fase 5: pausa obligatoria

Después de crear y validar las especificaciones:

- No generes todavía el código completo.
- Presenta un resumen.
- Enumera las preguntas abiertas críticas.
- Indica los supuestos utilizados.
- Muestra el árbol de archivos creado.
- Recomienda el primer incremento.
- Espera confirmación antes de implementar.

# Primer incremento recomendado

Propón como primer incremento vertical:

“Crear y guardar un borrador de solicitud autenticada”

Debe incluir:

- Especificación cerrada.
- Migración inicial.
- Entidad.
- Repositorio.
- Servicio.
- Endpoint.
- OpenAPI.
- Formulario Angular.
- Validaciones básicas.
- Pruebas.
- Docker Compose.
- Documentación.

Pero no lo implementes hasta recibir confirmación.

# AGENTS.md

Crea un archivo AGENTS.md en la raíz con reglas para futuros agentes:

- Leer specs antes de modificar código.
- No implementar funcionalidades no especificadas.
- Mantener trazabilidad.
- Actualizar OpenAPI.
- Agregar pruebas.
- No eliminar archivos sin autorización.
- No almacenar secretos.
- No modificar estados ni reglas sin ADR.
- Ejecutar pruebas antes de cerrar una tarea.
- Informar archivos modificados.
- Respetar el alcance del MVP.
- Preferir cambios pequeños y verificables.
- Detenerse ante ambigüedades funcionales importantes.

# README.md

Crea un README inicial con:

- Propósito.
- Estado.
- Alcance.
- Arquitectura propuesta.
- Estructura.
- Forma de revisar las especificaciones.
- Próximos pasos.
- Preguntas abiertas.
- Regla de no implementación antes de aprobar specs.

# Reglas de ejecución

- No inventes información corporativa.
- No inventes correos, grupos ni catálogos reales.
- No escribas secretos.
- No generes una aplicación completa en esta ejecución.
- No marques como confirmado algo que sea supuesto.
- No ocultes ambigüedades.
- No reduzcas las especificaciones a descripciones generales.
- Utiliza lenguaje claro y profesional en español.
- Usa identificadores consistentes.
- Evita contradicciones entre documentos.
- Mantén el alcance de la fase 1.
- Utiliza diagramas Mermaid cuando ayuden.
- Valida que el Mermaid sea sintácticamente sencillo.
- No uses imágenes binarias.
- No dependas de herramientas propietarias para leer las especificaciones.

# Resultado esperado de esta ejecución

Al finalizar debes entregar:

1. Árbol de archivos creado.
2. Resumen ejecutivo.
3. Visión del producto.
4. Requerimientos funcionales.
5. Requerimientos no funcionales.
6. Reglas de negocio.
7. Campos del formulario.
8. Historias de usuario.
9. Criterios de aceptación.
10. Escenarios BDD.
11. Modelo de dominio.
12. Diccionario de datos.
13. Máquina de estados.
14. Contrato OpenAPI.
15. Contrato de errores.
16. Especificación UI.
17. Plantilla de correo.
18. Arquitectura.
19. ADR.
20. Matriz de trazabilidad.
21. Backlog.
22. Riesgos.
23. Definition of Done.
24. Reporte de validación.
25. Preguntas abiertas.
26. Supuestos.
27. Recomendación del primer incremento.

Comienza inspeccionando el repositorio.

Después crea únicamente las especificaciones y el plan.

Detente antes de implementar el código y solicita aprobación explícita.