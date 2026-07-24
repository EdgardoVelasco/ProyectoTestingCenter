# ADR-041: logout y cambios no guardados

Estado: **ACCEPTED**. Fecha: 2026-07-23.

## Decisión

“Cerrar sesión” es una acción accesible del header. Si el formulario está `dirty`, se confirma. Al aceptar, se limpia identidad/estado sensible y se ejecuta `logoutRedirect` de MSAL con retorno a `/login`. Los borradores persistidos permanecen. Cancelar conserva sesión y formulario.

## Alternativas

Logout local y salida sin confirmación se rechazan porque dejan sesión en el proveedor o arriesgan pérdida de datos.

## Consecuencias, riesgos y validación

El flujo es seguro y predecible; depende del redirect de Entra. Un error muestra mensaje seguro y nunca tokens. Se valida teclado, confirmación, redirect real, historial protegido y conservación de borrador.

