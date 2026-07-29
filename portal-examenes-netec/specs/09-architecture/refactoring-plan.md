# Plan incremental de refactorización

| Fase | Alcance | Evidencia requerida | Estado |
|---|---|---|---|
| 0 | Inventario, línea base y análisis | comandos, status, documento actual | COMPLETADA CON LIMITACIONES |
| 1 | Arquitectura objetivo y reglas | documentos y BDD | COMPLETADA |
| 2 | Movimiento físico backend | compile/test por módulo | PENDIENTE |
| 3 | Catalog clean boundaries | tests de contrato | PENDIENTE |
| 4 | Approval routing | reglas de resolución intactas | PENDIENTE |
| 5 | Notification/Outbox/Graph | worker y correo intactos | PENDIENTE |
| 6 | Exam request | payloads y dominio intactos | PENDIENTE |
| 7 | Frontend por features | build/tests después de cada grupo | PENDIENTE |
| 8 | División request form | caracterización y pruebas | PENDIENTE |
| 9 | ArchUnit/ESLint | límites automatizados | PENDIENTE |
| 10 | Validación integral | diff, status, Docker y smoke tests | PENDIENTE |

No se avanza cuando una fase rompe compilación, tests o contratos. No se crean migraciones Flyway.

