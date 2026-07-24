# language: es
Característica: Crear solicitud mediante stepper horizontal

  @STEP-001 Escenario: Mostrar solicitante y cuatro pasos
    Dado usuario autenticado
    Cuando abre Nueva solicitud
    Entonces ve Solicitante como tarjeta fija
    Y ve Comercial, Participantes, Exámenes y Resumen como pasos

  @STEP-002 Escenario: Cargar identidad fija
    Cuando carga Nueva solicitud
    Entonces muestra identidad backend no editable

  @STEP-003 Escenario: Bloquear identidad ausente
    Dado que `/api/auth/me` falla
    Cuando intenta continuar
    Entonces la tarjeta Solicitante muestra ERROR y el stepper no avanza

  @STEP-004 Escenario: Avanzar a Comercial
    Dado Solicitante cargado
    Cuando abre el formulario
    Entonces Comercial es CURRENT

  @STEP-005 Escenario: Bloquear por validación
    Dado un paso inválido
    Cuando continúa
    Entonces permanece y enfoca el primer error

  @STEP-006 Escenario: Regresar sin pérdida
    Dado datos comerciales capturados
    Cuando vuelve y regresa
    Entonces conserva todos los valores

  @STEP-007 Escenario: Mostrar completado
    Dado un paso válido visitado
    Cuando avanza
    Entonces muestra COMPLETED con texto o icono además del color

  @STEP-008 Escenario: Mostrar error
    Cuando una dependencia invalida un paso
    Entonces muestra ERROR accesible

  @STEP-009 Escenario: Cambiar sede
    Cuando cambia sede
    Entonces revalida aprobador, moneda y conversión

  @STEP-010 Escenario: Cambiar examen
    Cuando cambia examen
    Entonces recalcula datos derivados, precio y total

  @STEP-011 Escenario: Cambiar cantidad
    Cuando cambia cantidad
    Entonces revalida participantes y asignaciones

  @STEP-012 Escenario: Administrar participantes
    Cuando agrega, edita o elimina participantes
    Entonces conserva la colección al cambiar paso

  @STEP-013 Escenario: Llegar al resumen
    Dado pasos obligatorios válidos
    Cuando continúa desde Participantes
    Entonces muestra Resumen con datos vigentes

  @STEP-014 Escenario: Corregir desde resumen
    Cuando elige corregir una sección
    Entonces vuelve al paso y conserva datos

  @STEP-015 Escenario: Confirmar envío
    Dado Resumen válido y sesión activa
    Cuando confirma
    Entonces backend revalida antes de enviar a aprobación

  @STEP-016 Escenario: Guardar borrador
    Dado cualquier paso
    Cuando guarda
    Entonces persiste datos parciales sin exigir pasos futuros

  @STEP-017 Escenario: Restaurar borrador
    Dado un borrador guardado
    Cuando lo abre
    Entonces restaura datos y un paso permitido

  @STEP-018 Escenario: Teclado
    Cuando navega solo con teclado
    Entonces cambia pasos y acciones sin trampa de foco

  @STEP-019 Escenario: Responsive
    Cuando usa móvil, tablet o escritorio
    Entonces identifica “Paso X de 4” y un panel activo

  @STEP-020 Escenario: Sesión expirada
    Dado cambios en memoria
    Cuando expira sesión
    Entonces bloquea envío, advierte y conserva borrador persistido
