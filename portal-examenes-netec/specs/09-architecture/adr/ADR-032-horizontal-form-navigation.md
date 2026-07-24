# ADR-032 Navegación horizontal del formulario

- Estado: **ACEPTADO**
- Fecha: 2026-07-23
- Responsables: pendientes

## Contexto y decisión

El formulario vertical debe convertirse en flujo guiado sin perder datos, validación o accesibilidad. Solicitante queda como tarjeta fija; ADR-038 sustituye el orden original y establece Comercial, Participantes, Exámenes y Resumen. Un panel está activo; pasos futuros están bloqueados, visitados permiten retorno; un FormGroup raíz conserva controles; solo Resumen permite enviar.

## Alternativas

Formulario vertical; tabs libres; cuatro pasos con Solicitante fijo; rutas separadas.

## Consecuencias y riesgos

Mejora progreso y localización de errores, pero agrega estado, responsive y manejo de foco. Riesgos: destrucción de controles, semántica tabs incorrecta y bloqueo inaccesible.

## Validación requerida

CA-STEP, `form-stepper.feature`, teclado/lector/360 px y restauración del último paso guardado.
