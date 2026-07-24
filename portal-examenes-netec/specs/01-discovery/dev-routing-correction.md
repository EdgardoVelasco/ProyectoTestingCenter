# Correccion definitiva del enrutamiento DEV

## Remitente

La asesora autenticada es el remitente. El backend obtiene su UPN de la identidad validada y lo congela en `mailSenderUpnSnapshot`. No se usa `GRAPH_SENDER_MAILBOX`, una cuenta fija de Testing Center ni `/me/sendMail`.

## Destinatarios

BOG/MED/SCL/LIM/CA/PAN se enrutan al aprobador DEV de Felipe González; WTC a Angélica; MAD a Paola. Las reglas se cargan desde datos/configuracion de desarrollo y no desde clases Java o Angular.

## Copia

Todas las sedes reciben copia al grupo `GRAPH_TESTING_CENTER_CC_GROUP`. El valor debe ser la direccion SMTP completa real del ambiente. La variable no existe actualmente en `.env`; por ello no se implementa hasta configurarla.
