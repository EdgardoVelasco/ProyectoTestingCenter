# Preguntas y respuestas de descubrimiento

## Identidad visual y gobierno

| ID | Prioridad | Pregunta |
|---|---|---|
| P-BR-01 | IMPORTANTE | ¿Quién es el propietario/aprobador corporativo del manual vigente? La vigencia del PDF ya fue CONFIRMADA. |
| P-BR-02 | PUEDE DIFERIRSE | ¿Cuándo estará disponible el logotipo oficial en SVG? Actualmente no está disponible. |
| P-BR-03 | CRÍTICA PARA MVP | ¿Qué variante se usa en fondos claros y cuál en oscuros? |
| P-BR-04 | CRÍTICA PARA MVP | ¿Montserrat se carga localmente o mediante proveedor y qué licencia aplica?  |
| P-BR-05 | CRÍTICA PARA MVP | ¿Quién aprueba Specs y excepciones visuales? |
| P-BR-06 | IMPORTANTE | ¿Kollektif Italic tendrá algún uso digital autorizado? |
| P-BR-07 | RESPONDIDA | El degradado está permitido en botones, sujeto a contraste y tokens aprobados. |
| P-BR-08 | RESPONDIDA PARCIAL | El degradado está permitido en header; contenido y contraste concreto siguen sujetos a validación AA. |
| P-BR-09 | IMPORTANTE | ¿Existen lineamientos o plantillas digitales posteriores? |
| P-BR-10 | IMPORTANTE | No existe variante oscura oficial. Se propone modo oscuro del producto; requiere diseño derivado, tokens, contraste y aprobación antes de implementar. |
| P-BR-11 | IMPORTANTE | ¿Existen assets oficiales de iconografía? |
| P-BR-12 | PUEDE DIFERIRSE | ¿Se requieren tamaños mínimos/área de protección específicos del logo? |
| P-BR-13 | PUEDE DIFERIRSE | ¿Fuente de iconos o SVG locales? |
| P-BR-14 | PUEDE DIFERIRSE | ¿Dónde se conservarán baselines visuales aprobadas? |

**Respuestas consolidadas:** el PDF incorporado es la versión vigente; el SVG no está disponible; degradado autorizado en botones y header; no existe identidad oscura oficial y el modo oscuro es PROPUESTA. P-BR-04 usa Montserrat autocontenida con `@fontsource/montserrat` 5.2.6/OFL-1.1.

Actualizado: 2026-07-21. Las respuestas de Testing Center son evidencia; los pendientes no deben asumirse.

## Confirmadas o decididas

| Tema | Estado | Evidencia/decisión |
|---|---|---|
| AC | CONFIRMADO | Asesor Comercial que envía la solicitud; existen varios dentro del grupo de Cuentas Nombradas. Se identifica desde el usuario autenticado, sujeto al mapeo técnico de Entra pendiente. |
| Segmento | CONFIRMADO | Obligatorio. Valor actual CN/Cuentas Nombradas; catálogo extensible. |
| Centro de Costos o Sucursal | CONFIRMADO | Una selección operativa: BOG Bogotá, MED Medellín, WTC México, SCL Chile, LIM Perú, MAD España, CA Centro América, PAN Panamá. |
| Tipo de curso | CONFIRMADO | Opcional; N/A, Intensivo, Digital. |
| Clave Curso Programado | CONFIRMADO | Clave de evento; N/A permitido. |
| Referencia facturación | CONFIRMADO | Cadena libre opcional; OF/VA/FGP son claves variables. Puede existir si el proyecto ya tiene factura. |
| Catálogo | CONFIRMADO | Excel inicial mantenido por investigación; Testing Center administra exámenes/precios. Debe poder agregar/modificar. |
| Precio | CONFIRMADO | Depende de país/proveedor; Ventas puede modificar precio venta; costo base permanece separado. Precio venta cero no permitido. |
| Solicitud/asignación | CONFIRMADO PARCIAL | Varios exámenes/participantes. Participante por examen y varios participantes pueden hacer el mismo; no hay vouchers sin asignar. Cantidad exacta por línea sigue pendiente. |
| Empresa/cliente | CONFIRMADO | Son el mismo concepto; usar `company`, deprecar `client` separado. |
| Correo | CONFIRMADO PARCIAL | Debe ser corporativo; política verificable de dominios pendiente. |
| Moneda | DECIDIDO | USD para ubicaciones distintas de MAD. Al seleccionar MAD, el sistema convierte automáticamente USD→EUR; no convierte para ninguna otra ubicación. |
| Impuestos | CONFIRMADO | Total no incluye impuestos. |
| N/A | CONFIRMADO | Significa no aplica y solo se permite en Tipo de Curso, Clave Curso Programado y Código de examen. |
| Vigencia | CONFIRMADO | Cambio depende del proveedor (3, 6 meses o años); debe almacenarse vigencia. |
| Límites | CONFIRMADO | Máximo 100 participantes y 100 líneas de examen. |
| País precio | CONFIRMADO | Se deriva de Centro de Costos o Sucursal. |
| Retake/comentarios | CONFIRMADO | Deben conservarse y mostrarse. |
| Facturación | CONFIRMADO | No valida presupuesto ni precio dentro de este flujo. |

## Pendientes reales

| ID | Clasificación | Pregunta |
|---|---|---|
| P-11 | CRÍTICA PARA MVP | ¿Qué grupos/claims de Entra mapean EXAM_SALES/Testing Center y área/unidad? |
| P-12 | IMPORTANTE | Explicación simplificada: si el mismo correo y examen ya existe activo, ¿debe permitirse otra solicitud cuando cambia empresa, evento, referencia o fecha? |
| P-14 | IMPORTANTE | ¿Destinatarios/CC, URL, SLA, retención, cancelación y reintentos? En investigación. |
| P-16 | RESPONDIDA | La cantidad de cada línea debe ser exactamente el número de participantes asignados. |
| P-20 | RESPONDIDA PARCIAL | En MVP la tasa USD→EUR para MAD se configura manualmente y el precio base permanece USD. Siguen pendientes responsable, precisión, vigencia y proceso de autorización. |
| P-21 | IMPORTANTE | ¿Qué dominios o criterio hacen que un correo sea corporativo? |
| P-22 | IMPORTANTE | ¿Testing Center administrará catálogos con UI en MVP o mediante scripts/API técnica? |

## Evidencia adjunta

`catalogo_examenes.xlsx`: 124 registros; Proveedor, Curso, Código examen, Examen, Retake, Costo, Comentarios. Todos los costos se interpretan como USD según respuesta; no contiene país ni vigencia explícitos.

## Enrutamiento de aprobación — evidencia 2026-07-22

| ID | Clasificación | Pregunta |
|---|---|---|
| P-23 | RESPONDIDA | Correos oficiales: Felipe González `felipe.gonzalez@netec.com.co`; Angélica Barrón `angelica.barron@netec.com.mx`; Paola Galvis `paola.galvis@netec.com.co`. |
| P-24 | RESPONDIDA | El rol/área indicado es Finanzas. |
| P-25 | CRÍTICA PARA MVP | Reformulada: cuando cambie el aprobador de una sede, ¿qué persona o equipo podrá actualizarlo en el sistema y quién deberá autorizar ese cambio? |
| P-26 | RESPONDIDA PARCIAL / CRÍTICA | Actualmente no existe responsable ni proceso de autorización porque es la primera automatización del área. Debe definirse antes de producción; no se asigna uno por suposición. |
| P-27 | RESPONDIDA | Felipe González pertenece a Facturación. |
| P-28 | RESPONDIDA | Angélica Barrón pertenece a Facturación. |
| P-29 | RESPONDIDA | Paola Galvis pertenece a Facturación. |
| P-30 | RESPONDIDA PARCIAL | `LATAM_Testing_Center@netec.com.mx` es un grupo de usuarios del directorio compuesto por miembros de NETEC y debe recibir copia para “LATAM y MAD”. Falta precisar los códigos incluidos en LATAM. |
| P-31 | RESPONDIDA | El AC solicitante no recibe copia. |
| P-32 | RESPONDIDA PARCIAL | Se confirmó el grupo de directorio `LATAM_Testing_Center@netec.com.mx`; no se confirmó un buzón compartido adicional. |
| P-33 | IMPORTANTE | ¿Hay suplentes y qué ocurre durante vacaciones? |
| P-34 | IMPORTANTE | ¿Puede existir más de un aprobador por sede? |
| P-35 | IMPORTANTE | ¿La aprobación requiere respuesta por correo y cómo confirma Testing Center que fue aprobada? |
| P-36 | IMPORTANTE | ¿Existen más sedes? |
| P-37 | IMPORTANTE | ¿Puede cambiar el aprobador por tipo de curso, empresa o monto? |
| P-38 | PUEDE DIFERIRSE | ¿La fase 2 llevará la aprobación al portal? |
| P-39 | CRÍTICA PARA MVP | ¿Qué códigos de sede comprende exactamente “LATAM” para aplicar la copia a Testing Center? |

Confirmado: el AC envía; Testing Center no reenvía; BOG/MED/SCL/LIM se dirigen a Felipe González, WTC a Angélica Barrón y MAD a Paola Galvis. Correos, pertenencia a Facturación y rol Finanzas están confirmados. El AC no recibe copia. `LATAM_Testing_Center@netec.com.mx` es un grupo del directorio que recibe copia para “LATAM y MAD”; el alcance de LATAM queda P-39. No existe aún propietario de configuración; P-25 debe resolverse antes de producción. CA y PAN siguen sin regla evidenciada y bloquean envío, no guardado.

## Configuración de ambientes e identidad — 2026-07-23

| ID | Prioridad | Pregunta |
|---|---|---|
| P-CONF-01 | RESPONDIDA | Se implementó `@azure/msal-angular` 6.x con clave absoluta same-origin `${window.location.origin}/api/*` y coincidencia estricta. |
| P-CONF-02 | RESPONDIDA PARCIAL | Desarrollo local usa `http://localhost:4200`. Redirects de pruebas/staging/producción siguen pendientes. |
| P-CONF-03 | IMPORTANTE | ¿Se normalizan nombres reales a prefijos `ENTRA_*`/`DATABASE_*` y con qué compatibilidad? |
| P-CONF-04 | IMPORTANTE | ¿Quién administra secretos y variables por ambiente? |
| P-CONF-05 | IMPORTANTE | ¿Qué límite de request y timeouts requiere operación? |
| P-CONF-06 | IMPORTANTE | ¿Dónde termina TLS y quién define CSP/HSTS? |

## Login, identidad y stepper — decisiones recibidas 2026-07-23

| ID | Estado | Respuesta / pendiente |
|---|---|---|
| P-LOGIN-01 | RESPONDIDA | Solicitante es tarjeta fija sobre el stepper; no es paso editable. |
| P-LOGIN-02 | RESPONDIDA PARA MVP | Área es opcional hasta definir fuente. |
| P-LOGIN-03 | RESPONDIDA PARA MVP | Unidad de negocio es opcional hasta definir fuente. |
| P-LOGIN-04 | IMPORTANTE | ¿Debe consultarse un directorio interno adicional en una fase posterior? |
| P-LOGIN-05 | CRÍTICA PARA IMPLEMENTACIÓN | ¿Qué usuarios o grupos concretos pueden acceder al MVP? |
| P-LOGIN-06 | RESPONDIDA | Autenticado sin rol autorizado ve pantalla 403. |
| P-LOGIN-07 | RESPONDIDA PARCIAL | Nombre y correo provienen de `/api/auth/me`; sigue pendiente si el correo se muestra directamente en header o solo en menú/contexto. |
| P-LOGIN-08 | DIFERIBLE | ¿Se muestra avatar de iniciales? |
| P-LOGIN-09 | DIFERIBLE | ¿Acceso externo futuro usará Entra External ID? |
| P-LOGIN-10 | DIFERIBLE | ¿Cuándo se habilitará acceso externo? |
| P-LOGIN-11 | DIFERIBLE | ¿Requiere otra App Registration? |
| P-LOGIN-12 | RESPONDIDA | Login interactivo exclusivamente mediante redirect; popup no se usa. |
| P-LOGIN-13 | RESPONDIDA | Logout con cambios muestra confirmación. |
| P-LOGIN-14 | RESPONDIDA FUNCIONAL / TÉCNICA PENDIENTE | Expiración bloquea envío, reautentica y recupera datos temporales; el mecanismo seguro de recuperación requiere decisión técnica por PII. |
| P-LOGIN-15 | RESPONDIDA | Un borrador restaura el último paso guardado. |
| P-LOGIN-16 | RESPONDIDA | Pasos futuros bloqueados; pasos visitados permiten navegación libre hacia atrás. |
| P-LOGIN-17 | RESPONDIDA | No existe autoguardado en MVP. |
| P-LOGIN-18 | RESPONDIDA | Endpoint definitivo de identidad: `GET /api/auth/me`. `/api/v1/me` queda deprecado y debe retirarse coordinadamente al implementar. |
| P-LOGIN-19 | CRÍTICA PARA IMPLEMENTACIÓN | ¿Qué mecanismo temporal, minimizado y seguro recuperará datos no guardados tras redirect sin convertirlo en autoguardado ni exponer PII? |
## Evolución de Empresa — diferible

- ¿Qué sistema será fuente maestra del catálogo futuro de empresas?
- ¿Cómo se vincularán snapshots históricos de texto con una futura `companyId` sin reescribir solicitudes enviadas?
- ¿Quién administrará alias, homónimos y normalización corporativa?

## Cerradas por decisión MVP — 2026-07-23

- ¿AC corresponde al solicitante o a otro asesor? **CERRADA:** al solicitante autenticado.
- ¿Puede seleccionarse otro asesor? **CERRADA PARA MVP:** no; delegación queda como capacidad futura.
