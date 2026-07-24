# Formulario revisado

## Orden y layout de marca — IN_REVIEW

La pantalla “Crear solicitud” presenta: 1) Datos del solicitante, 2) Información comercial, 3) Información del examen, 4) Participantes y 5) Resumen; las acciones forman una barra consistente fuera de la numeración. Este orden visual no modifica el modelo multi-examen ni sus asignaciones.

En escritorio usa grid de dos columnas; móvil una. Observaciones, líneas/tabla de participantes y resumen financiero ocupan ancho completo. Contenedor máximo DERIVADO: 1280 px. Header compacto; labels visibles; ayuda contextual; errores junto al campo y en resumen; foco perceptible; barra de acciones sin cubrir contenido.

## Implementación incremental de UI — 2026-07-21

**AGREGADO.** Angular usa `commercial`, `examFilters`, `participants` e `items` como grupos/arreglos reactivos. Los validadores reutilizables cubren texto compuesto solo por espacios, entero positivo, correo duplicado normalizado y coherencia cantidad–asignaciones por línea. El cálculo visual escala el decimal a cuatro posiciones antes de multiplicar; no sustituye el cálculo backend.

La UI respeta ADR-015 ACEPTADO: no usa cantidad global ni presupone que todos presentan el mismo examen. `organizationalLocationId` representa el catálogo único vigente y no vuelve a separar o jerarquizar Centro de Costos/Sucursal. El precio de venta es editable conforme RN-044; costo base y moneda son solo lectura.

Secciones: A solicitante/AC solo lectura; B comercial (clave evento, tipo opcional, CN obligatorio, Sede/Centro de Costos o Sucursal, empresa/cliente, referencia opcional y tarjeta de aprobador); C hasta 100 participantes; D hasta 100 líneas de examen; E resumen antes de impuestos.

Cada línea muestra código, nombre, costo base, moneda, vigencia, retake y comentarios solo lectura; permite precio venta >0, cantidad y participantes. Al elegir MAD, muestra costo USD origen, tasa/fecha y costo EUR convertido; en otras ubicaciones muestra USD sin tasa. Si cambia la ubicación, recalcula todas las líneas y obliga a revisar el resumen.

UI muestra subtotales y total backend, matriz participante–examen, contador/límites y errores por fila. Guardar admite parcial; confirmar revalida vigencia, asignaciones, duplicidad y cálculos. Enviada es solo lectura.

Al seleccionar sede, la UI consulta RF-038 y presenta una tarjeta solo lectura con título “Aprobador asignado”, nombre y “La solicitud será enviada a esta persona para aprobación”. No muestra ni permite editar el correo. Un cambio de sede limpia la resolución anterior. Sin regla/correo utilizable se muestra error asociado a sede, Enviar queda bloqueado y Guardar borrador continúa disponible. Submit no envía el destinatario y backend re-resuelve; si cambió, la confirmación se invalida.

## Variante DRAFT: stepper horizontal con apariencia de pestañas

Solicitante es una tarjeta fija de contexto sobre cuatro pasos: Información comercial, Participantes, Exámenes y Resumen. Escritorio muestra encabezado horizontal numerado; móvil usa variante compacta sin convertir el patrón funcional en tabs. Solo un panel está visible y un `FormGroup` raíz conserva controles.

La tarjeta carga nombre/correo desde `/api/auth/me`; área/unidad son opcionales y pueden mostrar “No disponible”. Comercial revalida sede/aprobador; Participantes valida identidad y duplicados; Exámenes revalida catálogo/asignaciones/costos; Resumen es el único paso con Enviar. Guardar está disponible en todos; no hay autoguardado. Atrás/Continuar no envían.
## Orden y selección aprobados (2026-07-23)

Tarjeta fija Solicitante. Stepper: **1 Comercial → 2 Participantes → 3 Exámenes → 4 Resumen**.

Exámenes ofrece selector de proveedor, búsqueda y resultados agrupados por proveedor; cada examen muestra código, nombre, curso, costo base USD, retake y comentarios. La asignación usa selección explícita de participantes, impide duplicados y muestra cantidad derivada. Resumen agrupa por proveedor y presenta matriz participante→exámenes, subtotales y total general.
## Empresa libre MVP

Empresa usa input de texto, `companyName`, máximo 150. Es obligatoria para avanzar/enviar y opcional para guardar borrador. El valor se normaliza al perder foco o guardar sin alterar capitalización. No existe selector, autocomplete ni carga de catálogo de empresas.

Correo del solicitante muestra el UPN validado de `username`; ante ausencia muestra “No disponible”. Sigue siendo definición label–valor, no input.

## Asesor Comercial read-only

En Información comercial, `AC / Asesor Comercial` selector queda deprecado. CMP-029 muestra label “Asesor Comercial”, el mismo nombre del solicitante y ayuda “Se obtiene automáticamente de la sesión.” Usa el patrón label–valor de solo lectura, con carga y error seguros; no presenta flecha, input, dropdown, opciones ni UPN adicional para evitar redundancia visual.
