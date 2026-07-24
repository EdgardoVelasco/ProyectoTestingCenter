# Plantilla de solicitud de aprobación

Estado: IN_REVIEW. Correos del destinatario confirmados; alcance exacto de la copia “LATAM” pendiente P-39.

Destinatario: aprobador resuelto por sede en backend. Configuración inicial: Felipe González `felipe.gonzalez@netec.com.co`, Angélica Barrón `angelica.barron@netec.com.mx`, Paola Galvis `paola.galvis@netec.com.co`. No se codifica ni se recibe del frontend.

Asunto: `[Solicitud de aprobación de examen] {folio} — {siteCode} — {companyName}`

HTML y texto plano incluyen folio/fecha, solicitante/AC, sede, segmento, empresa, evento, tipo, referencia, observaciones, exámenes con costo base/precio venta/moneda/cantidad/subtotal, total y tabla mínima de participantes (número, nombre, correo). MAD muestra origen USD y conversión EUR aplicada. Todos los valores proceden de snapshots persistidos y se escapan según contexto.

No incluye IDs internos, país/ciudad ni datos innecesarios. El AC no recibe copia. Testing Center recibe copia mediante el grupo de usuarios del directorio `LATAM_Testing_Center@netec.com.mx` para “LATAM y MAD”; no se activa por código hasta resolver P-39. No se confirmó un buzón compartido adicional. La solicitud persistida es fuente oficial; el correo es derivado y tolera reintento.
