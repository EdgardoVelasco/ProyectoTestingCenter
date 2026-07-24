# Inventario de componentes

Estado general: **IN_REVIEW**. “Aprobado” exige aprobación del paquete; aquí solo se registran candidatos normativos.

| ID / componente | Propósito y anatomía | Variantes/estados | Tokens | Accesibilidad / interacción | BR / VAC | Antipatrones |
|---|---|---|---|---|---|---|
| CMP-001 App header | Marca, nombre, navegación global | compacto; autenticado | brand primary/gradient, type | landmark banner; logo alt | BR-002/003/010; VAC-004/011 | header gigante, logo recreado |
| CMP-002 Side navigation | Navegación si se aprueba | expandida/colapsada/activa | surface, border, spacing | teclado, estado actual | BR-007/009; VAC-007/012 | iconos solos sin nombre |
| CMP-003 Page header | título, descripción, acciones | con/sin acción | type, spacing | `h1` único | BR-003/008; VAC-014 | títulos serif/decorativos |
| CMP-004 Section card | agrupar sección | normal/error/readonly | surface, radius, shadow | encabezado semántico | BR-007/008; VAC-013 | card por campo |
| CMP-005 Read-only field | mostrar snapshot/sesión | disponible/ausente | muted/text/border | `dl` o label-valor | BR-007/009; VAC-014 | input engañoso |
| CMP-006 Text input | texto corto | default/focus/error/disabled/readonly | field/type/focus | label/description/error | BR-003/009; VAC-006/007/009 | placeholder como label |
| CMP-007 Select | catálogo cerrado | loading/empty/error/disabled | field/type | teclado y estado | BR-005/009; VAC-006/007 | opciones inventadas |
| CMP-008 Autocomplete | catálogo buscable | loading/no results/error | field/type | combobox ARIA | BR-009; VAC-006/008 | filtro solo cliente masivo |
| CMP-009 Date picker | fecha si existe requisito | default/error/disabled | field/icon outline | entrada manual/teclado | BR-005/009 | formato ambiguo |
| CMP-010 Textarea | observaciones | default/focus/error | field/spacing | label y contador | BR-009; VAC-006 | ancho parcial sin motivo |
| CMP-011 Primary button | acción principal | default/hover/focus/loading/disabled | brand primary/on-primary | no doble clic, texto | BR-001/009; VAC-007/009 | amarillo/gradiente no aprobado |
| CMP-012 Secondary button | acción secundaria | outline/tonal propuesto | brand primary/border | texto claro | BR-001/009 | competir con primaria |
| CMP-013 Tertiary button | baja prioridad | text/link | link/focus | target 44px | BR-009; VAC-007 | enlace sin subrayado/foco |
| CMP-014 Icon button | acción compacta | outline icon | icon/focus | aria-label/tooltip | BR-005/009; VAC-005 | filled/solo color |
| CMP-015 Status chip | estado de solicitud | estados de dominio | semánticos pendientes | texto además de color | BR-011; VAC-010/015 | teal=éxito automático |
| CMP-016 Alert | informar error/aviso/éxito | inline/banner | estados pendientes | role apropiado, foco si bloquea | BR-009/011; VAC-010 | color solo |
| CMP-017 Dialog | confirmar/revisar | confirmación/error | surface/dialog shadow | trap/restore focus | BR-009; VAC-007/008 | acción irreversible preseleccionada |
| CMP-018 Participant table | editar colección | tabla/cards móvil/empty | table/spacing | caption, headers, nombres de acción | BR-007/009; VAC-008/009 | scroll horizontal obligatorio |
| CMP-019 Financial summary | mostrar importes backend | parcial/recalculado/final | brand/text/divider | moneda explícita | BR-007/009; VAC-013/014 | total editable |
| CMP-020 Empty state | ausencia recuperable | catálogo/lista/participantes | muted/type | acción y explicación | BR-008/009; VAC-014 | pantalla vacía |
| CMP-021 Loading state | espera | local/página | brand/spacing | `aria-busy`, anuncio no repetitivo | BR-008/009 | bloqueo sin mensaje |
| CMP-022 Error state | recuperación | campo/sección/página | error pendiente | código correlación, acción | BR-009/011; VAC-010 | stack/PII |
| CMP-023 Confirmation panel | cambios sin guardar/eliminación | inline/dialog | warning pendiente | foco y dos opciones | BR-009/011; VAC-010 | `alert()` navegador |

## Ejemplo normativo

Un campo combina CMP-006 + label visible + helper + error; nunca copia colores/espacios localmente. Un componente nuevo obtiene ID, anatomía, estados, tokens, VAC, BDD y aprobación antes de implementarse.

## Ejemplos de uso permitidos

- CMP-001/003: header global compacto y título “Crear solicitud”.
- CMP-004/005: card “Datos del solicitante” con pares label–valor, no inputs falsos.
- CMP-006..010: campos comerciales con label, helper y error asociados.
- CMP-011..014: Enviar como primaria; Guardar/Validar secundarias; Cancelar terciaria; eliminar con icono outline y nombre.
- CMP-018: participantes como tabla editable y cards equivalentes en móvil.
- CMP-019: precio, moneda, cantidades y total backend claramente diferenciados.
- CMP-020..023: catálogo vacío, spinner anunciado, error recuperable y confirmación de eliminación.

## Componentes APROBADOS para login y stepper

| ID | Componente | Anatomía/estados | Accesibilidad | RF/VAC | Antipatrón |
|---|---|---|---|---|---|
| CMP-024 | Access page | marca, intro, acciones, soporte; loading/error | heading, foco, live error | AUTH-001..003 / AUTH-001..008 | imitar Microsoft |
| CMP-025 | Microsoft sign-in | acción primaria; loading/disabled | nombre explícito | AUTH-002 / AUTH-002 | pedir contraseña |
| CMP-026 | External access | disabled + ayuda | disabled y descripción | AUTH-012 / AUTH-004..005 | ruta parcial |
| CMP-027 | Authenticated header | logo, portal, identidad, menú | teclado/truncado accesible | AUTH-007/008 | identidad ficticia |
| CMP-028 | Authenticated User Menu | activador button: avatar/iniciales, nombre, UPN, expansión; menú: resumen/divisor/logout | loading, ready, open, logging-out, error; desktop/tablet/mobile | header/on-primary/surface/text-secondary/focus/radius/shadow/spacing | Tab, Enter/Space, Escape, exterior, foco restaurado; RF-UI-USER-001..010 / VAC-USER-001..012 | logout hover-only, icono solo, identidad fija, MSAL interno, correo sin alternativa |
| CMP-029 | Form stepper | cuatro encabezados/panel; Solicitante fijo | “Paso X de 4” y estado textual | UI-041..053 / STEP-001..012 | incluir Solicitante como paso |
| CMP-030 | Step action bar | Atrás/Continuar/Guardar/Enviar | orden/foco | UI-043/044/048/052 | enviar fuera de Resumen |
| CMP-031 | Session status | restoring/expired/error | `aria-live`/diálogo | AUTH-004/011/013 | loop silencioso |

### Variantes aprobadas 2026-07-23

- **DEPRECADA para header por ADR-043:** variante CMP-012 `header-outlined`; permanece histórica y no debe coexistir con CMP-028.
- CMP-005 `identity-upn`: label Correo, valor backend o “No disponible”, readonly semántico.
- CMP-006 `company-free-text`: label visible, required para completar, helper y errores asociados; no autocomplete.

Usan tokens aprobados, Montserrat e iconos outline; implementación autorizada el 2026-07-23.

- **CMP-029 Authenticated Sales Advisor Field:** propósito: confirmar asociación comercial. Anatomía: label, valor read-only, helper y error opcional. Estados: loading/ready/error. Tokens: superficie muted, texto primary/secondary, border/radius/spacing. Interacción: ninguna; accesible como grupo descriptivo. Antipatrones: select, input disabled, asesor ficticio, catálogo, edición o lógica de identidad duplicada.
