# language: es
Característica: Acceso, sesión e identidad con Microsoft Entra ID

  @AUTH-001 Escenario: Usuario no autenticado ve acceso
    Dado que no existe cuenta activa
    Cuando abre una ruta del portal
    Entonces ve “Iniciar sesión con Microsoft”

  @AUTH-002 Escenario: Iniciar autenticación
    Dado el acceso
    Cuando activa “Iniciar sesión con Microsoft”
    Entonces comienza REDIRECTING una sola vez

  @AUTH-003 Escenario: Redirección a Microsoft
    Cuando comienza el login
    Entonces las credenciales se capturan solo en Microsoft Entra ID

  @AUTH-004 Escenario: Autenticación exitosa
    Dado un retorno válido
    Cuando MSAL procesa la respuesta
    Entonces establece la cuenta activa antes de entrar al portal

  @AUTH-005 Escenario: Restaurar sesión
    Dado una sesión válida
    Cuando recarga
    Entonces restaura la cuenta sin mostrar nuevamente el acceso

  @AUTH-006 Escenario: Consultar identidad
    Dado un token con ExamRequests.Access
    Cuando consulta `/api/auth/me`
    Entonces recibe identidad mínima sin tokens

  @AUTH-007 Escenario: Mostrar usuario
    Dada identidad validada
    Cuando carga el portal
    Entonces header y Solicitante muestran el mismo nombre

  @AUTH-008 Escenario: Token ausente
    Cuando consulta `/api/auth/me` sin token
    Entonces recibe 401 sin detalles sensibles

  @AUTH-009 Escenario: Token expirado
    Dado un token expirado
    Cuando intenta operar
    Entonces renueva silenciosamente o solicita interacción y no envía

  @AUTH-010 Escenario: Scope incorrecto
    Dado un token sin ExamRequests.Access
    Cuando consulta identidad
    Entonces recibe 403

  @AUTH-011 Escenario: Tenant incorrecto
    Dado un token de tenant no permitido
    Cuando backend lo valida
    Entonces rechaza la solicitud

  @AUTH-012 Escenario: Acceso denegado
    Dado un usuario autenticado no autorizado
    Cuando entra al portal
    Entonces ve una pantalla 403 sin política interna

  @AUTH-013 Escenario: Error de autenticación
    Dado un fallo del proveedor
    Cuando retorna al portal
    Entonces ve error seguro, Reintentar y soporte

  @AUTH-014 Escenario: Cerrar sesión
    Dado un usuario autenticado sin cambios
    Cuando cierra sesión
    Entonces termina la sesión Entra y vuelve al acceso

  @AUTH-015 Escenario: Atrás después de logout
    Dado logout completado
    Cuando usa Atrás
    Entonces la ruta protegida vuelve al acceso

  @AUTH-016 Escenario: Expiración mientras edita
    Dado cambios no guardados
    Cuando expira la sesión
    Entonces bloquea envío, reautentica por redirect y recupera datos temporales

  @AUTH-017 Escenario: Borrador persistido tras logout
    Dado un borrador guardado
    Cuando cierra sesión
    Entonces el backend conserva el borrador asociado al usuario

  @AUTH-018 Escenario: Acceso externo deshabilitado
    Cuando se muestra “Acceso externo”
    Entonces está deshabilitado, anuncia “Disponible próximamente” y no navega

  @AUTH-019 Escenario: Navegación por teclado
    Cuando usa solo teclado en acceso y menú
    Entonces alcanza acciones habilitadas con foco perceptible

  @AUTH-020 Escenario: Sin contraseña interna
    Cuando se inspecciona la pantalla NETEC
    Entonces no existen campos usuario/password ni validación de credenciales

  @AUTH-RT-001 Escenario: Runtime antes de MSAL
    Cuando inicia Angular
    Entonces MSAL recibe configuración validada antes del bootstrap

  @AUTH-RT-002 Escenario: Scope e interceptor same-origin
    Cuando Angular llama `/api`
    Entonces solicita el scope configurado y agrega bearer

  @AUTH-RT-003 Escenario: Sin token a externos
    Cuando Angular llama un origen externo
    Entonces no agrega bearer
  Scenario: Resolver UPN desde preferred_username
    Given una identidad con preferred_username y upn
    Then username contiene preferred_username

  Scenario: Resolver UPN desde upn
    Given una identidad sin preferred_username y con upn
    Then username contiene upn

  Scenario: Mostrar correo no disponible
    Given una identidad sin preferred_username, upn ni email
    Then Datos del solicitante muestra "No disponible"
    And no permite editar el correo

  Scenario: Logout visible y accesible
    Given un header autenticado
    Then existe un button outlined con texto "Cerrar sesión"
    And tiene borde y foco visibles
    And no depende únicamente del icono
