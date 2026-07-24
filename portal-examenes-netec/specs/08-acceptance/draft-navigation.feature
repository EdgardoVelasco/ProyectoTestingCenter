# language: es
Característica: Navegación y persistencia de borrador

  @DRAFT-NAV-001 Escenario: Guardar desde cualquier paso
    Dado un borrador parcial autenticado
    Cuando selecciona Guardar
    Entonces persiste los campos presentes y el cambio de paso no envía

  @DRAFT-NAV-002 Escenario: Volver conserva controles
    Dado un FormGroup con cambios
    Cuando navega entre pasos
    Entonces los controles y sus valores permanecen

  @DRAFT-NAV-003 Escenario: Logout conserva borrador backend
    Dado un guardado exitoso
    Cuando cierra sesión
    Entonces el borrador puede recuperarse al autenticarse como el mismo usuario

  @DRAFT-NAV-004 Escenario: Cambios no guardados antes de logout
    Dado el formulario DIRTY
    Cuando solicita logout
    Entonces advierte antes de descartar memoria

  @DRAFT-NAV-005 Escenario: Restaurar último paso guardado
    Dado un borrador guardado desde Examen
    Cuando lo abre nuevamente
    Entonces restaura Examen como paso actual si sus dependencias siguen válidas

  @DRAFT-NAV-006 Escenario: Sin autoguardado
    Dado cambios sin seleccionar Guardar
    Cuando transcurre tiempo sin expiración
    Entonces el portal no persiste automáticamente el borrador
