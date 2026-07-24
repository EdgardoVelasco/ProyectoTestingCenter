# language: es
Característica: Asesor Comercial derivado de la sesión

  Antecedentes:
    Dado que el usuario accedió mediante Microsoft Entra ID

  Escenario: Mostrar al solicitante como Asesor Comercial
    Dado que "/api/auth/me" devuelve el nombre "Adele Vance"
    Cuando abre Información comercial
    Entonces Asesor Comercial muestra "Adele Vance"
    Y coincide con Datos del solicitante

  Escenario: Cambiar de usuario
    Dado que otra cuenta autenticada abre el formulario
    Entonces el asesor cambia automáticamente a esa identidad

  Escenario: Campo sin selector y no editable
    Cuando se inspecciona Asesor Comercial
    Entonces no existe select, autocomplete, input editable ni opciones

  Escenario: Nombre autoritativo y fallback visual
    Dado que el backend devuelve name
    Entonces se usa ese nombre
    Pero si aún carga puede usarse temporalmente el nombre de cuenta MSAL

  Escenario: Identidad no disponible
    Dado que no existe nombre confiable
    Entonces se muestra "No disponible" y un error seguro
    Y el envío permanece bloqueado

  Escenario: Guardar y enviar con asesor autenticado
    Cuando se crea un borrador
    Entonces backend copia requester a salesAdvisor
    Y al enviar revalida una identidad mínima

  Escenario: Cliente intenta manipular asesor
    Cuando envía salesAdvisorId, salesAdvisorName o salesAdvisorUpn
    Entonces la API rechaza el request con 400
    Y nunca sustituye al principal autenticado

  Escenario: Conservar snapshot histórico
    Dado que se creó una solicitud
    Cuando cambia posteriormente el nombre de la cuenta
    Entonces la solicitud conserva nombre y UPN originales

  Escenario: Restaurar borrador
    Cuando se consulta un borrador
    Entonces la respuesta muestra el asesor persistido en modo read-only

  Escenario: No consultar catálogo
    Cuando carga Información comercial
    Entonces no se solicita un catálogo de asesores

  Escenario: Accesibilidad, carga y error
    Entonces label, valor y helper forman un grupo legible
    Y loading y error no dependen únicamente del color
    Y el dato no editable no agrega una parada de tabulación
