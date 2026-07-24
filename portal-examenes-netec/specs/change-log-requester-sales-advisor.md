# Change log — Solicitante como Asesor Comercial

- **Fecha:** 2026-07-23
- **Estado:** APPROVED

## Resumen

En el MVP, el usuario autenticado es también el Asesor Comercial. Se elimina la selección manual y el dato simulado; el backend resuelve la identidad y conserva snapshots separados para permitir una evolución futura hacia delegación.

## Cambios

- **AGREGADO:** RF-COM-006..012, RN-COM-008..016, HU-COM-002..003 y AC-COM-021..030.
- **MODIFICADO:** formulario, dominio, API, persistencia, resumen y escenarios comerciales.
- **DEPRECADO:** selector `AC / Asesor Comercial`, `salesAdvisorId` en requests y catálogo `/catalogs/sales-advisors`.
- **AGREGADO:** ADR-044 y migración compatible V5.
- **PENDIENTE FUTURO:** delegación, catálogo, supervisores y administración de relaciones organizativas.

## Impacto

- UI read-only con nombre y ayuda de sesión.
- API sin asesor en input y con asesor de lectura en output.
- Backend como autoridad del principal autenticado.
- Tres snapshots de asesor rellenados desde requester para históricos.
- Eliminación del riesgo de mass assignment.

## Evidencia de implementación

- Angular: 44/44 pruebas exitosas.
- Spring Boot: 28/28 pruebas exitosas; incluye rechazo de manipulación y snapshots.
- Flyway/Testcontainers: V1..V5 aplicadas sobre PostgreSQL 16.
- Base local: 4/4 solicitudes históricas con snapshots de asesor iguales a requester.
- Build Angular y builds Docker backend/frontend exitosos.
- Integración: frontend `/login` HTTP 200; `/api/auth/me` sin token HTTP 401.
- Auditoría: sin selector/mock/endpoint/campo de request de asesores en código productivo.

## Pendiente manual

Validar visualmente con dos cuentas reales del tenant que el nombre cambia entre sesiones. No se automatizaron credenciales ni se expusieron tokens.
