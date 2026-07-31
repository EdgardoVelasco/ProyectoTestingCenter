# Change request — nuevas fases 2026-07-30

| Campo | Valor |
|---|---|
| Fecha | 2026-07-30 |
| Fuente | Requerimientos de reunión con cliente |
| Estado | CONFIRMED para Fase 1A/1B; PROPOSED para Fase 2; NEEDS_DISCOVERY para Fases 3/4 |
| Prioridad | Fase 2 Facturación: alta; Fase 1A/1B: confirmada; Fases 3/4: backlog |
| Implementación | NOT_IMPLEMENTED |

## Cambios solicitados

1. Después de un registro exitoso, mostrar confirmación con folio y permitir
   iniciar otra solicitud sin cerrar sesión.
2. Conservar datos si el registro falla, reiniciar el stepper en el paso 1
   únicamente después del éxito y generar una nueva clave de idempotencia.
3. Sustituir la denominación visible `CN / Cuentas Nombradas` por `Comercial`;
   las solicitudes históricas no se modifican.
4. Mejorar la jerarquía visual del correo sin cambiar su contenido funcional,
   seguridad ni compatibilidad Outlook.
5. Agregar carga de alumnos por CSV, manteniendo captura manual, vista previa,
   validación atómica, edición posterior y máximo total de 100 alumnos.
6. Priorizar Facturación como Fase 2 para revisar, aprobar, rechazar o solicitar
   corrección dentro del portal.
7. Separar AP y AC en una Fase 3 posterior, cuando exista fuente autorizada.
8. Fortalecer el catálogo en Fase 4 con regiones, precios, vigencias y revisión
   humana.

## Impacto

| Cambio | Impacto | Dependencias |
|---|---|---|
| Confirmación/reinicio | HIGH | contrato de submit, idempotencia, estado de UI |
| CSV | HIGH | validaciones de participante, seguridad de archivos, límite 100 |
| Comercial | MEDIUM | glosario, UI, correo y trazabilidad |
| Correo | MEDIUM | renderer existente, snapshots, pruebas Outlook |
| Facturación | NEW_PHASE | roles Entra, estados, auditoría y concurrencia |
| AP–AC | NEW_PHASE | fuente de asesores y migración compatible |
| Catálogo | NEW_PHASE | fuentes oficiales y revisión humana |

## Decisiones confirmadas

- La confirmación se muestra solo con respuesta exitosa del backend.
- El folio proviene del backend.
- Un fallo conserva el formulario.
- El reinicio vuelve al paso 1 y conserva la sesión.
- CSV es el único formato de Fase 1B; XLS/XLSX quedan OUT_OF_SCOPE.
- El máximo es 100 alumnos sumando captura manual e importación.
- Una fila inválida invalida la importación completa; no hay importación parcial.
- Apellido materno es opcional.
- El CSV no se conserva permanentemente.
- Facturación precede a AP–AC.

## Preguntas abiertas

- ¿Qué usuarios o grupos Entra forman Facturación?
- ¿Facturación tendrá alcance por sede?
- ¿Comentarios son obligatorios al rechazar o solicitar corrección?
- ¿Cuál es el SLA de revisión?
- ¿Qué ocurre con ausencias, suplencias y revocaciones?
- ¿Quién recibe la decisión?
- ¿Cuál es la fuente oficial de asesores para Fase 3?
- ¿Puede cambiar AP/AC después del envío?
- ¿Qué fuentes oficiales y periodicidad tendrá el catálogo?
- ¿Qué campos regionales y reglas de precio son definitivos?

## Fuera de alcance

No se implementan en esta solicitud código Java/Angular, migraciones, base de
datos, Docker, Entra, Graph, correo productivo, CI/CD, dependencias ni estados
reales. Todas las capacidades descritas permanecen NOT_IMPLEMENTED.

## Aprobación

La aprobación humana del Spec queda pendiente antes de ejecutar plan, tareas o
implementación.
