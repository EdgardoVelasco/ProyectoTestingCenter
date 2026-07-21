# ADR-007: Participante sin maestro global
Estado: MODIFICADO por ADR-012. Se conserva la decisión de no crear un maestro Participant, pero el value object único queda DEPRECADO: la colección se persiste como entidades hijas `ExamRequestParticipant`, propiedad exclusiva del agregado, para identidad técnica y edición de filas.
