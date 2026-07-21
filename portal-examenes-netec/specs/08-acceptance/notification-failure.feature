# language: es
Característica: Notificación resiliente

  @BDD-006 Escenario: Falla el envío del correo
    Dado que la solicitud y outbox fueron confirmados
    Cuando el proveedor falla temporalmente
    Entonces la solicitud queda PENDIENTE_NOTIFICACION y no se elimina

  @BDD-007 Escenario: Reintento exitoso
    Dado un outbox vencido en FAILED
    Cuando el proveedor acepta el siguiente intento
    Entonces queda SENT y la solicitud ENVIADA_A_FACTURACION

  @BDD-008 Escenario: Reintentos agotados
    Cuando falla permanentemente hasta el máximo
    Entonces queda DEAD_LETTER, se audita y se emite alerta

