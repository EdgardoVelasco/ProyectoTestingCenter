# Plantilla actualizada para Facturación

Asunto: `[Nueva solicitud de examen] {folio} — {companyName} — {examCount} examen(es)`

HTML/texto incluyen folio/fecha, solicitante/AC, CN, ubicación, empresa, evento, tipo y referencia. La tabla incluye examen, costo base, precio venta, moneda, cantidad, subtotal y participantes. Para MAD muestra también costo USD origen y tasa/fecha USD→EUR aplicada. Total general queda en EUR para MAD y USD en las demás ubicaciones.

Todos los valores se toman de snapshots del submit, se escapan según contexto y usan formato monetario de presentación sin combinar el almacenamiento. No se incluyen IDs, país/ciudad del participante ni otros datos no necesarios para Facturación. La solicitud persistida es fuente oficial; el correo es una notificación derivada y puede repetirse por entrega al menos una vez.
