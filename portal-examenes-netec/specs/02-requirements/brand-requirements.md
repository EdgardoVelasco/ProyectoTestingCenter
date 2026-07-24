# Requisitos de marca

Estado del paquete: **IN_REVIEW**. Fuente principal: `specs/NETEC Manual de identidad corporativa (1).pdf`. Prioridad P0 salvo indicación.

| ID | Descripción | Fuente / clasificación | Prioridad | Criterios de aceptación | Componentes | Pruebas | Riesgos | Estado |
|---|---|---|---|---|---|---|---|---|
| BR-001 | Usar la paleta NETEC documentada. | Manual pp. 7–8 / OFICIAL | P0 | Solo tokens aprobados representan marca. | Todos | VAC-003/015; BDD-BR-003 | Uso semántico incorrecto. | IN_REVIEW |
| BR-002 | Todo degradado institucional comienza en azul `#02419F` y termina en teal `#00A1AF`. | Manual p. 7 / OFICIAL | P0 | Inspección de extremos y dirección lógica. | Header/superficies autorizadas | VAC-004; BDD-BR-002 | Contraste según contenido. | IN_REVIEW |
| BR-003 | Montserrat es la familia principal de la interfaz. | Manual p. 9 / OFICIAL | P0 | Computed style usa Montserrat y fallback aprobado. | Todos | VAC-001; BDD-BR-001 | Carga/licencia pendientes. | IN_REVIEW |
| BR-004 | No usar tipografías serif. | Manual p. 5 indica tipografía “sin patines” / OFICIAL | P0 | Escaneo y computed styles sin serif efectiva. | Todos | VAC-002; BDD-BR-001 | Fallback defectuoso. | IN_REVIEW |
| BR-005 | La iconografía conserva apariencia outline. | Manual p. 10 / OFICIAL | P0 | Familia y variante outline; excepciones registradas. | Botones, tablas, estados | VAC-005; BDD-BR-004 | Mezcla de familias. | IN_REVIEW |
| BR-006 | No introducir colores arbitrarios en componentes. | Traslado a producto / DERIVADA | P0 | Cero hex/rgb/hsl fuera de archivos autorizados. | Todos | VAC-003; lint propuesto | Falsos positivos en assets. | IN_REVIEW |
| BR-007 | Colores, espacio, radios y sombras se consumen mediante tokens. | Gobierno/mantenibilidad / DERIVADA | P0 | Componentes referencian tokens centrales. | Todos | VAC-003/012 | Tokens sin gobierno. | IN_REVIEW |
| BR-008 | Apariencia tecnológica, moderna, corporativa y limpia. | Intención del rediseño y aplicación web pp. 4, 13 / DERIVADA | P1 | Jerarquía, densidad y consistencia cumplen guías aprobadas. | Layout/páginas | VAC-008/009/013/014 | Criterio subjetivo; usar VAC. | IN_REVIEW |
| BR-009 | Cumplir WCAG 2.1 AA. | Requisito del producto / DERIVADA | P0 | Contraste, teclado, foco y errores conformes. | Todos | VAC-007/010/015; axe propuesto | Marca no garantiza contraste. | IN_REVIEW |
| BR-010 | No alterar, deformar, recolorear ni reconstruir el logotipo. | Manual trata rediseño y aplicaciones / DERIVADA conservadora | P0 | Asset oficial intacto, proporción preservada. | App header/login | VAC-011; BDD-BR-012 | Assets/variantes no disponibles. | IN_REVIEW |
| BR-011 | Separar marca de estados semánticos; excepciones accesibles deben documentarse. | Accesibilidad digital / DERIVADA | P0 | Error/éxito/alerta no reutilizan marca automáticamente. | Alertas, chips, campos | VAC-010/015 | Colores semánticos pendientes. | IN_REVIEW |
| BR-012 | Todo cambio visual inicia actualizando un Spec. | Gobierno SDD / DERIVADA | P0 | PR/cambio enlaza Spec APPROVED y trazabilidad. | Proceso completo | BDD-BR-006 | Bypass operativo. | IN_REVIEW |

## Trazabilidad y precedencia

Cada BR se vincula a tokens, componentes, VAC y BDD en la matriz. Donde el manual guarda silencio, la regla se marca DERIVADA, PROPUESTA o PENDIENTE. Ningún estado IN_REVIEW autoriza implementación.
