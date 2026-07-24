# ADR-054: configuracion de destinatarios DEV

Estado: PROPUESTO.

Las ocho reglas de sede se cargan por seed/migracion exclusiva del perfil development. No se reutilizan en produccion. Las direcciones se validan como configuracion y no se escriben en clases. Cambios futuros se realizan mediante datos versionados y auditoria.
