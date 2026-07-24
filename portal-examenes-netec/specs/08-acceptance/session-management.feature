# language: es
Característica: Gestión segura de sesión con Microsoft Entra ID

  Escenario: Restaurar una cuenta activa
    Dado que MSAL conserva una cuenta válida
    Cuando el usuario recarga el portal
    Entonces la cuenta se establece como activa
    Y se consulta `/api/auth/me`

  Escenario: Mostrar sesión expirada
    Dado que el usuario editaba una solicitud
    Cuando la API responde 401
    Entonces se bloquean las operaciones protegidas
    Y se muestra la pantalla de sesión expirada
    Y puede reautenticarse sin exponer tokens

  Escenario: Logout con redirect
    Dado un usuario autenticado
    Cuando selecciona cerrar sesión
    Entonces MSAL ejecuta logout redirect
    Y vuelve a `/login`
    Y una ruta interna vuelve a exigir autenticación

  Escenario: Usuario del tenant sin App Role en desarrollo
    Dado un token válido del tenant de desarrollo
    Y el token contiene `ExamRequests.Access`
    Cuando accede a una API protegida
    Entonces el perfil development permite la prueba
    Pero esta excepción no existe fuera de development

  Escenario: Rechazar token de otro tenant
    Dado un token firmado con tenant diferente al configurado
    Cuando se valida el JWT
    Entonces la API responde 401

  Escenario: Rechazar audience no permitida
    Dado un token dirigido a otra API
    Cuando se valida el JWT
    Entonces la API responde 401
  Scenario: Logout con cambios pendientes
    Given el formulario tiene cambios sin guardar
    When el usuario solicita cerrar sesión
    Then se muestra confirmación

  Scenario: Cancelar logout
    Given la confirmación está visible
    When el usuario cancela
    Then conserva sesión y cambios

  Scenario: Confirmar logout real
    Given el usuario confirma la salida
    When MSAL ejecuta logout redirect
    Then la cuenta activa y estado sensible se limpian
    And las rutas protegidas quedan inaccesibles
    And el borrador persistido permanece

  Scenario: Error seguro de logout
    Given el proveedor falla durante logout
    Then se muestra un mensaje sin información sensible

  Scenario: Logout mediante teclado
    Given el foco está en el menú de usuario
    Then cerrar sesión puede operarse por teclado
