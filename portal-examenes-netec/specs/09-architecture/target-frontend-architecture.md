# Arquitectura frontend objetivo

Angular se organizará por features. `core` quedará reservado para autenticación, configuración runtime, HTTP, sesión y layout global. `features/authentication`, `features/exam-requests` y `features/catalog` contendrán páginas, dominio, data-access, estado, formularios y componentes propios. `shared` solo contendrá UI, formularios, pipes, directivas y utilidades sin reglas de negocio. `testing` aislará mocks, builders y fixtures.

`RequestFormPageComponent` se convertirá gradualmente en una página coordinadora. Los pasos, formularios, resumen, API y estado se extraerán sin cambiar DOM observable, textos, estilos, rutas ni payloads.

No se introduce NgRx; el estado de la feature usará Signals solo si la extracción lo requiere y conserva el comportamiento actual.

