# language: es
Característica: Datos comerciales, examen, importes y participantes

  @BDD-021 Escenario: Seleccionar examen y autocompletar
    Cuando selecciona un examen activo
    Entonces ve código, nombre, fabricante, tecnología, certificación, costo base y moneda no editables y precio de venta editable
  @BDD-022 Escenario: Examen sin precio configurado
    Entonces recibe EXAM_PRICE_UNAVAILABLE y no puede enviar
  @BDD-023 Escenario: Examen inactivo
    Entonces recibe EXAM_INACTIVE
  @BDD-024 Escenario: Total para cantidad uno
    Dado precio 59 USD y cantidad 1
    Entonces total backend es 59 USD
  @BDD-025 Escenario: Total para varios vouchers
    Dado precio 59 USD y cantidad 3
    Entonces total backend es 177 USD
  @BDD-026 Escenario: Agregar varios participantes
    Cuando agrega tres participantes válidos
    Entonces el contador muestra 3
  @BDD-027 Escenario: Eliminar participante
    Cuando elimina una fila en BORRADOR
    Entonces colección y contador disminuyen
  @BDD-028 Escenario: Cantidad global distinta a participantes
    Dado que un participante puede presentar varios exámenes
    Entonces no se compara el total global de vouchers con participantes
  @BDD-029 Escenario: Correo inválido
    Entonces el error se asocia a participants[0].email
  @BDD-030 Escenario: Correo repetido interno
    Entonces recibe DUPLICATE_PARTICIPANT_EMAIL
  @BDD-031 Escenario: Participante duplicado externo
    Dado mismo correo normalizado y examId en solicitud activa
    Entonces recibe DUPLICATE_EXAM_REQUEST
  @BDD-032 Escenario: Cambiar examen después de agregar participantes
    Entonces conserva participantes, reemplaza derivados, recalcula y exige revisar
  @BDD-033 Escenario: Cambiar cantidad y recalcular
    Entonces recalcula total y valida contador
  @BDD-034 Escenario: Precio cambia antes de enviar borrador
    Entonces backend usa vigente y exige nueva confirmación
  @BDD-035 Escenario: Conservar precio histórico tras envío
    Cuando cambia catálogo
    Entonces detalle conserva precio/moneda enviados
  @BDD-036 Escenario: Referencia obligatoria
    Dada regla por tipo o segmento
    Entonces vacío produce BILLING_REFERENCE_REQUIRED
  @BDD-037 Escenario: Referencia opcional
    Entonces vacío no bloquea por esa regla
  @BDD-038 Escenario: N/A permitido
    Dado campo opcional
    Entonces N/A se normaliza a ausencia
  @BDD-039 Escenario: N/A en obligatorio
    Entonces no satisface obligatoriedad
  @BDD-040 Escenario: Enviar con varios participantes y exámenes
    Dado que cada voucher está asignado y todos son válidos
    Entonces se congelan líneas, asignaciones y participantes y se crea un outbox
  @BDD-041 Escenario: Confirmar resumen
    Entonces ve solicitante, comercial, examen, participantes, total y referencia antes de enviar
  @BDD-042 Escenario: Recalcular total en backend
    Entonces usa aritmética decimal exacta
  @BDD-043 Escenario: Frontend envía precio alterado
    Entonces API lo rechaza o ignora y usa catálogo
  @BDD-044 Escenario: Moneda inválida
    Entonces recibe INVALID_CURRENCY
  @BDD-045 Escenario: Precio de venta cero rechazado
    Cuando Ventas captura precio de venta cero
    Entonces recibe SALE_PRICE_ZERO y no puede enviar
  @BDD-046 Escenario: Catálogo de segmentos vacío
    Entonces UI informa vacío y no inventa CN
  @BDD-047 Escenario: Centro y sucursal seleccionados
    Entonces conserva ambos IDs y snapshots separados
  @BDD-048 Escenario: Sucursal no relacionada
    Dada relación configurada
    Entonces recibe INVALID_CATALOG_RELATION
  @BDD-049 Escenario: Correo con tabla de participantes
    Entonces HTML y texto contienen número, nombre y correo de cada participante
  @BDD-050 Escenario: Falla correo sin pérdida de participantes
    Entonces solicitud y todos sus participantes permanecen persistidos
