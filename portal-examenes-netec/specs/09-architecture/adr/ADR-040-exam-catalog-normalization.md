# ADR-040: normalización del catálogo de exámenes

Estado: **ACCEPTED para MVP**. Fecha: 2026-07-23.

## Decisión

Usar una tabla única `exam_catalog` con proveedor textual porque el Excel no contiene identificadores estables de Vendor, Technology o Certification. No se sobrediseña una jerarquía ausente. Se indexan proveedor, código, activo y texto buscable.

El costo base USD se separa del precio de venta de la solicitud. La identidad de importación usa huella completa normalizada porque proveedor+código se repite con variantes de nombre o costo y no existe vigencia. Solo filas exactas se deduplican.

## Alternativas y consecuencias

Catálogos Vendor/Technology/Certification separados se difieren hasta disponer de gobierno y claves maestras. La tabla simple acelera MVP, pero una normalización futura requerirá migración controlada.

## Riesgos y validación

Capitalización inconsistente, proveedores parecidos y variantes sin vigencia no se fusionan automáticamente. Pruebas verifican 119 filas únicas, búsqueda y no colisión de `N/A`.
