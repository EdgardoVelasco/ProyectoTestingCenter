# language: es
Característica: Evitar duplicados y colisiones

  @BDD-005 Escenario: Solicitud duplicada
    Dado un activo para maria@example.com y examen EX-200
    Cuando se envía otro con correo normalizado equivalente y EX-200
    Entonces recibe DUPLICATE_EXAM_REQUEST y no se genera folio

  @BDD-010 Escenario: Dos solicitudes concurrentes duplicadas
    Cuando dos transacciones envían simultáneamente el mismo correo y examen
    Entonces solo una queda activa y la otra recibe conflicto

  @BDD-016 Escenario: Folio único bajo concurrencia
    Cuando 100 solicitudes diferentes se envían concurrentemente
    Entonces los 100 folios son únicos y el contador no pierde valores confirmados

