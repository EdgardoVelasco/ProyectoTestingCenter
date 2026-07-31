Feature: Experiencia posterior al registro
  Todos los escenarios de esta feature están SPECIFIED y NOT_IMPLEMENTED.

  Scenario: Mostrar confirmación después del registro exitoso
    Given el backend confirma persistencia, folio y Outbox
    When termina el submit
    Then se muestra "Solicitud enviada" con el folio

  Scenario: Crear otra solicitud
    Given se muestra la confirmación
    When el usuario selecciona "Crear otra solicitud"
    Then se limpia el formulario y se regresa al paso 1
    And la sesión permanece activa
    And se genera una nueva clave de idempotencia

  Scenario: Conservar el formulario cuando el envío falla
    Given el backend responde con error
    When termina el submit
    Then no se muestra confirmación de éxito
    And se conservan los datos capturados

  Scenario: Evitar doble envío
    Given el usuario ya inició el submit
    When hace doble clic
    Then solo existe un evento de registro

  Scenario: El correo permanece pendiente pero la solicitud fue registrada
    Given la solicitud y Outbox fueron persistidos
    When el correo aún no fue procesado
    Then se muestra el estado de registro/proceso pendiente
    And no se afirma entrega efectiva en Outlook

Feature: Importación CSV de alumnos
  Todos los escenarios están SPECIFIED y NOT_IMPLEMENTED.

  Scenario: Mostrar el botón para cargar alumnos desde CSV
    Then existe "Cargar alumnos desde CSV"
    And existe "Descargar plantilla CSV"

  Scenario: Cargar un archivo válido
    Given un CSV UTF-8 con encabezados requeridos y filas válidas
    When el usuario lo selecciona y confirma la vista previa
    Then los alumnos se agregan a la lista editable

  Scenario: Importar un alumno sin apellido materno
    Given apellido_materno está vacío
    When se valida la fila
    Then la fila es válida

  Scenario: Editar y eliminar un alumno importado
    Given una importación confirmada
    When el usuario edita o elimina un alumno
    Then se modifica la misma lista usada por captura manual

  Scenario: Rechazar un archivo con 101 alumnos
    Given el archivo contiene más de 100 alumnos
    When se valida
    Then no se importa ninguna fila

  Scenario: Rechazar una importación que eleva el total sobre 100
    Given ya existen alumnos manuales
    When la suma supera 100
    Then se rechaza la importación completa

  Scenario: Rechazar columnas faltantes o correo inválido
    Given faltan encabezados o una fila tiene correo inválido
    When se valida el CSV
    Then se muestran fila, campo y motivo
    And la lista existente no cambia

  Scenario: Detectar duplicados
    Given correos iguales con diferencias de mayúsculas o espacios
    When se normalizan
    Then se detecta un duplicado dentro del archivo o contra la lista

  Scenario: Rechazar XLS o XLSX
    Given el usuario selecciona XLS o XLSX
    Then el archivo es rechazado por estar fuera de alcance

  Scenario: No almacenar permanentemente el archivo
    When termina la vista previa
    Then no se conserva el archivo original

  Scenario: No registrar datos personales en logs
    When se procesa el CSV
    Then los logs no contienen nombres, correos ni contenido de celdas
