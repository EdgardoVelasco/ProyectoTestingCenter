# Navegación

```mermaid
flowchart LR
  A[Entra ID] --> B[Mis solicitudes]
  B --> C[Nueva]
  B --> D[Detalle]
  C --> R[Resumen previo]
  R --> E[Confirmación posterior]
  C --> F[Editar borrador]
  F --> R
  E --> D
  X[401/403] --> A
```

Guard exige autenticación y EXAM_SALES. El resumen previo es modal/ruta interna no direccionable y no muta. Rutas restantes se conservan. Edit solo para BORRADOR propio; enviado bloquea campos comerciales, examen, participantes e importes.
