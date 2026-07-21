# Pantallas

Todas cumplen teclado, foco visible, labels persistentes, contraste AA, regiones de estado `aria-live`, título único y resumen enlazado de errores.

| Pantalla | Propósito/actor | Componentes, acciones y estados | Validación/mensaje/navegación | CA |
|---|---|---|---|---|
| Acceso | redirigir a Entra / cualquiera | progreso; reintentar; autenticando/error | 401 “Tu sesión no es válida”; éxito→Mis solicitudes | 001 |
| Mis solicitudes | localizar propias / Ventas | tabla/tarjetas, paginador, filtros folio/alumno/estado/tecnología/fecha; nueva/ver | carga, vacío, error conservando filtros | 015,017 |
| Nueva solicitud | crear / Ventas | secciones A–E, FormArray participantes y FormArray líneas de examen, asignación N:M, costo base, precio venta y total | errores por línea/asignación; confirmación muestra matriz y totales | 002-007,021-033 |
| Editar borrador | continuar / propietario | mismo formulario, versión; Guardar/Cancelar/Enviar | 409 ofrece recargar sin sobrescribir | 005,019 |
| Detalle | revisar snapshot / propietario | cabecera folio/estado, secciones solo lectura | ajena/no existe→Error acceso sin revelar | 016 |
| Confirmación previa | revisar / Ventas | solicitante, empresa/comercial, examen, participantes, unitPrice/currency/quantity/total y referencia; Volver/Confirmar | cambios de precio obligan a volver a revisar | 029-030 |
| Confirmación posterior | confirmar registro / Ventas | folio, snapshots, estado de notificación, Ver detalle/Lista | “Solicitud registrada; la notificación está pendiente” si aplica | 014,027 |
| Error acceso | sesión/permiso | mensaje y Volver/Ingresar | no revela recurso | 001,016 |
| Error general | recuperación | correlationId, Reintentar/Volver | lenguaje no técnico; nunca stack | 020 |
