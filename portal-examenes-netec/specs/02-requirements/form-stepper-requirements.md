# Requisitos del formulario guiado

Estado: **APPROVED / IMPLEMENTACIÓN AUTORIZADA**. Fecha: 2026-07-23.

Decisión confirmada: tarjeta fija Solicitante sobre un stepper horizontal con cuatro pasos: 1 Información comercial, 2 Participantes, 3 Exámenes, 4 Resumen. Un solo `FormGroup` raíz o equivalente conserva controles; cambiar de paso nunca envía.

| ID | Actor; precondiciones | Flujo principal | Alternos/casos negativos | Postcondición; RN | CA; prioridad; dependencias |
|---|---|---|---|---|---|
| RF-UI-041 Mostrar formulario por pasos | Usuario autenticado e identidad cargada | mostrar Solicitante fijo, cuatro pasos y uno activo | móvil usa variante compacta | CURRENT único; RN-UI-041 | CA-STEP-001; P0; ADR-032 |
| RF-UI-042 Mostrar progreso | Stepper visible | mostrar número, nombre y estado textual/iconográfico | no depender solo del color | progreso comprensible; RN-UI-048 | CA-STEP-002; P0; 041 |
| RF-UI-043 Navegar hacia adelante | Paso actual válido | validar paso y activar siguiente | inválido conserva foco y marca error | sin submit; RN-UI-041/047 | CA-STEP-003; P0 |
| RF-UI-044 Regresar | Paso visitado | volver conservando controles | sesión expirada bloquea operación protegida | datos intactos; RN-UI-042/043 | CA-STEP-004; P0 |
| RF-UI-045 Bloquear dependientes | Dependencia incompleta | mantener pasos futuros BLOCKED | pasos visitados permiten retorno libre; no saltar hacia delante | orden válido; RN-UI-043/044 | CA-STEP-005; P0 |
| RF-UI-046 Mantener estado | Cambio de paso | conservar FormGroup raíz | no destruir/recrear valores ni subscriptions | datos en memoria intactos; RN-UI-042 | CA-STEP-006; P0 |
| RF-UI-047 Errores por paso | Validación ejecutada | badge/icono y resumen enlazado a campos | lector anuncia; foco al primer error | paso ERROR; RN-UI-047/048 | CA-STEP-007; P0 |
| RF-UI-048 Guardar desde cualquier paso | Sesión válida | guardar campos parciales | error conserva datos; doble clic bloqueado | SAVED o ERROR; RN-UI-045 | CA-STEP-008; P0; RF-004 |
| RF-UI-049 Restaurar paso | Borrador abierto | restaurar datos y último paso guardado | si dejó de ser válido, volver al primer inválido | contexto recuperado; RN-UI-047 | CA-STEP-009; P0 |
| RF-UI-050 Revalidar dependientes | Cambia sede/examen/cantidad | invalidar y recalcular dependencias | nunca conservar aprobador/precio/asignación obsoletos | pasos afectados DIRTY/ERROR; RN-UI-049..051 | CA-STEP-010; P0 |
| RF-UI-051 Mostrar resumen | Pasos obligatorios válidos | presentar snapshots, participantes, importes y aprobador | incompleto enlaza a corrección | revisión final; RN-UI-044 | CA-STEP-011; P0 |
| RF-UI-052 Confirmar envío | Resumen válido y sesión | confirmar, backend revalida y envía | cancelar conserva datos; 401/409/422 no pierde formulario | submit solo aquí; RN-UI-046 | CA-STEP-012; P0 |
| RF-UI-053 Navegación accesible | Cualquier viewport | teclado, foco, nombres/estados anunciados | sin trampa de foco ni dependencia de gesto/color | WCAG AA; RN-UI-048 | CA-STEP-013; P0 |

## Reglas

- **RN-UI-041:** cambiar de paso no envía la solicitud.
- **RN-UI-042:** cambiar de paso no pierde datos.
- **RN-UI-043:** se puede volver a pasos visitados.
- **RN-UI-044:** Resumen requiere pasos obligatorios válidos.
- **RN-UI-045:** guardar borrador no requiere completar todos los pasos.
- **RN-UI-046:** enviar a aprobación requiere validación completa y sesión válida.
- **RN-UI-047:** errores se identifican por paso y campo.
- **RN-UI-048:** estados no dependen solo del color.
- **RN-UI-049:** cambiar sede revalida aprobador, moneda y conversión.
- **RN-UI-050:** cambiar examen recalcula datos derivados, precio y total.
- **RN-UI-051:** cambiar cantidad revalida asignaciones/participantes.
- **RN-UI-052:** el MVP no guarda automáticamente; solo una acción explícita persiste el borrador. La recuperación temporal por expiración no cambia esta regla.

## Estados

Visibles: PENDING, CURRENT, COMPLETED, ERROR y BLOCKED, siempre con texto, número, icono outline o atributos accesibles además de color. Internos/transitorios: DIRTY, SAVING y SAVED; SAVING/SAVED se comunican en la barra de acciones o región de estado, no convierten el encabezado en una segunda máquina de estados.

## Criterios visuales

VAC-STEP-001 tarjeta Solicitante y cuatro pasos; 002 CURRENT identificable; 003 COMPLETED; 004 ERROR; 005 teclado; 006 responsive; 007 un panel activo; 008 Guardar disponible; 009 Enviar solo en Resumen; 010 datos conservados; 011 tokens/Montserrat; 012 iconografía outline. CA-STEP-001..013 se prueban en `form-stepper.feature`.
