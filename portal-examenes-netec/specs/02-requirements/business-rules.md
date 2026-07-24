# Reglas de negocio actualizadas

## Reglas de gobierno visual

Estas reglas no alteran el dominio de solicitudes:

- **RGV-001 (DERIVADA):** un cambio visual solo puede implementarse contra una especificación APPROVED.
- **RGV-002 (DERIVADA):** una excepción de marca/accesibilidad registra clasificación, aprobación, alcance y retiro.
- **RGV-003 (DERIVADA):** crear componente o variante exige actualizar inventario y trazabilidad.
- **RGV-004 (OFICIAL):** colores, tipografía general e iconografía respetan el manual; la implementación no redefine la identidad.

| ID | Regla |
|---|---|
| RN-001 | Solo se envía con obligatorios válidos. |
| RN-002 | Todo correo cumple sintaxis; participantes usan correo corporativo según política pendiente. |
| RN-003 | Solicitante/instantes provienen de sesión/servidor. |
| RN-004 | Referencias de catálogo usadas al enviar están activas. |
| RN-005 | Cada examen conserva relaciones de tecnología/proveedor/certificación. |
| RN-006 | Curso/evento y examen se validan cuando exista relación confirmada. |
| RN-007 | Duplicidad externa provisional: correo normalizado + examId + estado no CANCELADA. |
| RN-008 | Ventas solo modifica BORRADOR. |
| RN-009 | Backend genera folio único anual. |
| RN-010 | Solicitud completa y outbox se confirman antes del correo. |
| RN-011 | Fallar correo no elimina solicitud, líneas ni participantes. |
| RN-012 | Fallo deja PENDIENTE_NOTIFICACION. |
| RN-013 | Borrador no genera correo/folio. |
| RN-014 | Cambios, envío e intentos se auditan. |
| RN-015 | Submit es idempotente. |
| RN-016 | Ventas solo consulta/modifica propias. |
| RN-017 | Catálogo inactivo no sirve en nuevas solicitudes. |
| RN-018 | Se guardan snapshots históricos visibles. |
| RN-019 | Reglas de fechas continúan pendientes de confirmación. |
| RN-020 | Backend repite toda validación crítica. |
| RN-021 | Cada examen se selecciona desde catálogo activo. |
| RN-022 | Código, nombre, fabricante, tecnología, certificación, costo base y moneda vienen de catálogo; precio de venta es editable por Ventas. |
| RN-023 | Costo base es ≥0 y precio de venta es decimal exacto >0; venta cero no permitida. |
| RN-024 | Cantidad por línea es entero >0 y bajo límite configurable. |
| RN-025 | `lineTotal = saleUnitPrice × quantity`; `totalAmount = suma(lineTotal)` en la moneda de solicitud. |
| RN-026 | Totales no son editables manualmente. |
| RN-027 | Costo base, precio venta, moneda y datos de examen se congelan al enviar. |
| RN-028 | Cada participante tiene nombre y correo válido. |
| RN-029 | No se repite correo normalizado en la colección de participantes. |
| RN-030 | MODIFICADA/CONFIRMADA: la cantidad de cada línea debe coincidir exactamente con el número de participantes asignados a esa línea. |
| RN-031 | Correos se normalizan antes de duplicidad. |
| RN-032 | Referencia de facturación es cadena libre opcional en fase 1. |
| RN-033 | Datos enviados son inmutables para Ventas. |
| RN-034 | Inactivos no se usan; snapshots históricos permanecen. |
| RN-035 | Cada línea requiere examen para obtener base/moneda y calcular. |
| RN-036 | Cambiar examen reemplaza derivados/base y exige revisar precio venta/resumen. |
| RN-037 | Backend calcula todos los totales. |
| RN-038 | Moneda es USD salvo MAD, donde es EUR; ubicación determina la regla. |
| RN-039 | Importes y moneda se almacenan separados. |
| RN-040 | Enviada conserva snapshots comerciales/financieros exactos. |
| RN-041 | Una solicitud admite varios exámenes y participantes. |
| RN-042 | Cada voucher se asigna a un participante; un participante puede presentar varios exámenes. |
| RN-043 | Líneas duplicadas del mismo examen requieren regla pendiente para evitar duplicación accidental. |
| RN-044 | Costo base y precio venta se almacenan separados; Ventas no modifica el costo base/catálogo desde la solicitud. |
| RN-045 | Solo MAD convierte automáticamente USD→EUR; las demás ubicaciones conservan USD. |
| RN-046 | El correo del participante debe ser corporativo; definición técnica pendiente. |
| RN-047 | `N/A` significa no aplica únicamente en campos autorizados. |
| RN-048 | Segmento es obligatorio; inicialmente CN. Tipo de curso es opcional. |
| RN-049 | Empresa y cliente son el mismo concepto; no se capturan dos selecciones. |
| RN-050 | Máximo configurable confirmado: 100 participantes y 100 líneas. |
| RN-051 | País/precio/moneda se determinan desde Centro de Costos o Sucursal. |
| RN-052 | Precio base tiene vigencia; no se usa fuera de su intervalo válido. |
| RN-053 | Retake y comentarios del examen se muestran y conservan como snapshot. |
| RN-054 | Testing Center es responsable de alta/modificación de exámenes y precios con auditoría. |
| RN-055 | Total representa importes antes de impuestos; el portal no calcula impuestos. |
| RN-056 | Para MAD backend obtiene tipo USD→EUR vigente, convierte con decimal exacto y redondeo definido, y guarda monto origen, tasa, instante y resultado como snapshots. |
| RN-057 | Si MAD no tiene tipo de cambio vigente, la solicitud no puede validarse ni enviarse. |
| RN-058 | Cambiar ubicación hacia/desde MAD recalcula todas las líneas y exige revisar de nuevo el resumen. |
| RN-059 | El frontend nunca determina ni acepta como autoridad el tipo de cambio o importe convertido. |
| RN-060 | Toda solicitud enviada debe tener una sede válida. |
| RN-061 | El sistema resuelve automáticamente el aprobador a partir de la sede. |
| RN-062 | BOG, MED, SCL y LIM usan la regla activa asignada a Felipe González mientras permanezca vigente. |
| RN-063 | WTC usa la regla activa asignada a Angélica mientras permanezca vigente. |
| RN-064 | MAD usa la regla activa asignada a Paola Galvis mientras permanezca vigente. |
| RN-065 | El AC no captura manualmente el correo del aprobador cuando existe una regla activa. |
| RN-066 | Sin regla activa y vigente se bloquea enviar; guardar borrador sigue permitido. |
| RN-067 | Antes del envío se muestra el aprobador resuelto. |
| RN-068 | La solicitud conserva una instantánea del aprobador aplicado. |
| RN-069 | Cambios futuros en reglas no alteran solicitudes históricas. |
| RN-070 | Testing Center no reenvía la solicitud inicial. |
| RN-071 | El portal envía directamente al aprobador correspondiente. |
| RN-072 | Todo cambio sede–aprobador se audita. |
| RN-073 | Backend resuelve nuevamente el aprobador al enviar. |
| RN-074 | El frontend no es autoridad del destinatario. |
| RN-075 | No se envía si el aprobador carece de dirección válida y activa. |
| RN-076 | La sede usada para enrutar se conserva en la solicitud. |
| RN-077 | Si la regla cambia durante el borrador, submit aplica la vigente y exige revisar el nuevo aprobador. |
| RN-078 | Las reglas iniciales usan exclusivamente los correos oficiales confirmados de Felipe González, Angélica Barrón y Paola Galvis; todo cambio es configuración auditada. |
| RN-079 | Testing Center recibe copia mediante el grupo de usuarios del directorio `LATAM_Testing_Center@netec.com.mx` únicamente para sedes incluidas en la política “LATAM y MAD”; hasta resolver P-39 no se activa para códigos ambiguos. |
| RN-081 | Ningún usuario puede administrar reglas de enrutamiento en producción hasta que se defina y autorice formalmente el propietario de configuración. |
| RN-080 | El AC solicitante no recibe copia de la solicitud de aprobación. |

RN-030 queda deprecada. Permanecen críticas la igualdad línea/asignaciones y el gobierno de la tasa USD→EUR.

RN-060..077 corresponden a las reglas solicitadas como RN-041..058, renumeradas para no sobrescribir reglas vigentes. La tabla inicial es configuración auditable, no lógica codificada. RN-078..080 incorporan las respuestas posteriores; P-39 impide asumir qué sedes forman “LATAM”.

## Extensión DRAFT: autenticación y stepper

Se agregan RN-AUTH-001..014 y RN-UI-041..051. Su texto normativo, alcance y relación con RF/CA/BDD están en `authentication-experience.md` y `form-stepper-requirements.md`. No renumeran ni alteran las RN numéricas vigentes.
## Reglas aprobadas del incremento catálogo/asignaciones

| ID | Regla |
|---|---|
| RN-AUTH-014 | Logout se ejecuta mediante MSAL y Entra ID. |
| RN-AUTH-015 | Logout local no sustituye logout del proveedor. |
| RN-AUTH-016 | Borradores persistidos no se eliminan al cerrar sesión. |
| RN-AUTH-017 | Cambios no guardados requieren confirmación antes de logout. |
| RN-UI-056 | Participantes precede a Exámenes. |
| RN-UI-057 | No se asignan exámenes sin participantes válidos. |
| RN-UI-058 | Eliminar participante elimina o invalida sus asignaciones. |
| RN-UI-059 | Cantidad de examen = conteo de asignaciones únicas. |
| RN-CAT-001 | Catálogo proviene de fuente controlada. |
| RN-CAT-002 | Importación es idempotente. |
| RN-CAT-003 | Duplicados no se insertan nuevamente. |
| RN-CAT-004 | Exámenes inactivos no pueden asignarse. |
| RN-CAT-005 | Costo base no se modifica desde frontend. |
| RN-CAT-006 | Proveedor y datos visibles se congelan al enviar. |
| RN-ASG-001 | Participante no se asigna dos veces al mismo examen/solicitud. |
| RN-ASG-002 | Todo examen seleccionado tiene al menos un participante. |
| RN-ASG-003 | Toda asignación referencia participante propio y catálogo válido. |
| RN-ASG-004 | Backend calcula cantidades y totales con decimal exacto. |
| RN-ASG-005 | Importes/cantidades del frontend no son autoritativos. |
| RN-ASG-006 | Solicitudes enviadas conservan snapshots históricos. |
## Logout visible, UPN y Empresa MVP

- RN-AUTH-018: el botón de logout muestra texto visible.
- RN-AUTH-019: logout no depende únicamente de un icono.
- RN-AUTH-020: el correo del solicitante proviene de identidad autenticada validada.
- RN-AUTH-021: el correo del solicitante no se edita manualmente.
- RN-AUTH-022: backend resuelve UPN con precedencia `preferred_username` → `upn` → `email` → ausencia.
- RN-AUTH-023: no se muestran correos ficticios con sesión real.
- RN-COM-001: Empresa se captura como texto libre durante el MVP.
- RN-COM-002: Empresa es obligatoria para enviar.
- RN-COM-003: Empresa puede estar ausente al guardar borrador.
- RN-COM-004: Empresa se valida nuevamente en backend.
- RN-COM-005: Empresa se conserva como snapshot histórico.
- RN-COM-006: no se consulta catálogo de empresas en esta versión.
- RN-COM-007: migrar a catálogo requiere ADR y compatibilidad histórica.
## Reglas Authenticated User Menu

- RN-UI-USER-001: identidad permanece visible en header.
- RN-UI-USER-002: logout no depende de hover.
- RN-UI-USER-003: “Cerrar sesión” aparece como texto dentro del menú.
- RN-UI-USER-004: el componente no duplica autenticación/MSAL.
- RN-UI-USER-005: iniciales derivan del nombre autenticado.
- RN-UI-USER-006: correo puede truncarse en activador y debe mostrarse completo en menú.
- RN-UI-USER-007: menú es usable mediante teclado.
- RN-UI-USER-008: activador/menú mantienen contraste AA.
- RN-UI-USER-009: carga no muestra identidad ficticia.
- RN-UI-USER-010: cierre restaura foco correctamente.

## Asesor Comercial MVP

- RN-COM-008: solicitante autenticado y Asesor Comercial son la misma persona.
- RN-COM-009: el asesor no puede modificarse manualmente.
- RN-COM-010: frontend no es autoridad del asesor.
- RN-COM-011: backend obtiene el identificador de `oid` o `sub`.
- RN-COM-012: nombre y UPN se conservan como snapshots.
- RN-COM-013: cambios posteriores de identidad no alteran históricos.
- RN-COM-014: identidad incompleta puede seguir política de borrador, pero bloquea envío.
- RN-COM-015: registro para otro asesor queda fuera del MVP.
- RN-COM-016: no se consulta catálogo de asesores.
## Reglas de notificacion de aprobacion (propuestas)

- RN-NOT-001: toda solicitud enviada tiene sede valida.
- RN-NOT-002: el backend resuelve el aprobador; el frontend no decide destinatarios.
- RN-NOT-003: las rutas BOG/MED/SCL/LIM, WTC y MAD usan reglas persistidas confirmadas; CA/PAN bloquean envio sin regla.
- RN-NOT-004: no se envia correo antes de persistir solicitud y Outbox.
- RN-NOT-005: fallo de correo no elimina la solicitud.
- RN-NOT-006: no se envia sin aprobador activo y correo valido.
- RN-NOT-007: destinatario, sede, regla y CC se congelan en snapshots.
- RN-NOT-008: un borrador re-resuelve regla al enviar.
- RN-NOT-009: submit y worker son idempotentes por solicitud/tipo/version.
- RN-NOT-010: SENT no se reprocesa automaticamente.
- RN-NOT-011: errores transitorios se reintentan respetando Retry-After.
- RN-NOT-012: errores permanentes o maximo de intentos terminan DEAD_LETTER.
- RN-NOT-013: contenido de usuario se escapa antes de HTML.
- RN-NOT-014: el AC no recibe copia.
- RN-NOT-015: Testing Center recibe copia unicamente para codigos expresamente aprobados; P-39 impide inferir LATAM.
- RN-NOT-016: CA y PAN permiten borrador, pero bloquean envio.
- RN-NOT-017: el correo no es aprobacion automatica.
- RN-NOT-018: compra y aprobacion dentro del portal siguen fuera de fase 1.

## Correccion definitiva DEV

- RN-NOT-019: el remitente es la asesora autenticada.
- RN-NOT-020: el frontend no determina el remitente.
- RN-NOT-021: backend obtiene el remitente desde identidad validada.
- RN-NOT-022: remitente se conserva como snapshot.
- RN-NOT-023: reintentos conservan remitente original.
- RN-NOT-024: BOG/MED/SCL/LIM/CA/PAN usan la regla DEV de Felipe.
- RN-NOT-025: WTC usa la regla DEV de Angélica.
- RN-NOT-026: MAD usa la regla DEV de Paola.
- RN-NOT-027: todas las sedes incluyen CC del grupo configurado.
- RN-NOT-028: CC proviene de configuracion externa completa.
- RN-NOT-029: CA/PAN tienen ruta activa y no bloquean envio cuando la configuracion es valida.
- RN-NOT-030: frontend solo muestra resolucion.
- RN-NOT-031: backend vuelve a resolver durante submit.
- RN-NOT-032: cambios se realizan en datos/configuracion, no en codigo.
