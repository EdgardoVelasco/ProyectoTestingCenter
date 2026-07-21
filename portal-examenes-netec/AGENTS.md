# Reglas para agentes

1. Leer `specs/` antes de modificar código y respetar el alcance del MVP.
2. No implementar funcionalidad no especificada; detenerse ante ambigüedad funcional importante.
3. Mantener trazabilidad RF→RN→HU→CA→BDD→TT→código→prueba.
4. Actualizar OpenAPI y pruebas con cada cambio observable.
5. No eliminar archivos sin autorización ni almacenar secretos.
6. No cambiar estados, reglas o decisiones arquitectónicas sin actualizar/crear ADR.
7. Ejecutar pruebas antes de cerrar; informar archivos modificados.
8. Preferir cambios pequeños, reversibles y verificables.
9. Consultar la evidencia del formato real antes de modificar el formulario.
10. No combinar campos financieros ni centro de costos/sucursal sin decisión documentada.
11. El backend es autoridad de precios y totales; usar decimal exacto, nunca punto flotante binario.
12. Mantener snapshots históricos y consistencia configurable entre `quantity` y `participants`.
13. No asumir el significado de AC, CN o BOG.
14. Actualizar trazabilidad al modificar campos.
15. No implementar múltiples exámenes por solicitud sin ADR aprobado.
16. No implementar aprobación de Facturación en fase 1.
