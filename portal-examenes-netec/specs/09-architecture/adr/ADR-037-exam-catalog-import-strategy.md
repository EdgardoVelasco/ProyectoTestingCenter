# ADR-037: estrategia de importación del catálogo de exámenes

Estado: **ACCEPTED**. Fecha: 2026-07-23.

## Contexto

Discovery contiene 124 filas y siete columnas. Se requiere una carga inicial reproducible, revisable e idempotente sin depender de Excel durante el arranque.

## Decisión

Convertir la hoja aprobada a CSV UTF-8 normalizado y versionado. Flyway crea `exam_catalog`; un importador Spring controlado carga el CSV de forma transaccional e idempotente usando la clave de negocio documentada. El importador registra aceptados/rechazados sin exponer datos sensibles y puede deshabilitarse por configuración.

## Alternativas

- SQL generado: simple, pero difícil de revisar y mantener.
- Leer Excel en runtime: reutilizable, pero agrega dependencia binaria y acopla despliegue al libro.
- Inserción manual: rechazada por no ser reproducible.

## Consecuencias

Positivas: fuente auditable, carga repetible, validaciones probables y sin dependencia Apache POI.  
Negativas: existe un artefacto derivado que debe regenerarse cuando cambie el Excel.  
Riesgos: divergencia Excel/CSV; se mitiga con metadatos de origen, conteo esperado y pruebas.

## Criterios de validación

119 altas únicas, 5 duplicados reportados, cero costos inválidos, segunda ejecución sin duplicados.

