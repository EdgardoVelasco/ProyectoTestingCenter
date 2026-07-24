# language: es
Característica: Configuración de runtime por ambiente

  @ENV-001 Escenario: Misma imagen en dos ambientes
    Dada una misma imagen frontend
    Cuando se despliega con configuraciones públicas distintas
    Entonces no se recompila y refleja el ambiente correspondiente

  @ENV-002 Escenario: Backend diferente sin recompilar
    Cuando cambia el destino NGINX
    Entonces Angular conserva `/api` y no cambia su bundle

  @ENV-003 Escenario: Configuración antes de MSAL
    Cuando inicia el navegador
    Entonces valida runtime config antes de inicializar MSAL

  @ENV-004 Escenario: Variable pública faltante
    Cuando falta una propiedad obligatoria
    Entonces la aplicación no inicia silenciosamente
    Y muestra solo el nombre faltante

  @ENV-005 Escenario: Secreto en runtime config
    Cuando el documento contiene una clave privada prohibida
    Entonces se rechaza la configuración

  @ENV-006 Escenario: Archivo env ignorado
    Cuando se inspecciona Git
    Entonces `.env` está ignorado y no versionado

  @ENV-007 Escenario: Ejemplo sin valores reales
    Cuando se revisa `.env.example`
    Entonces no contiene secretos ni valores productivos

  @ENV-008 Escenario: Producción con localhost
    Cuando una configuración productiva contiene localhost
    Entonces el arranque falla de forma segura

  @ENV-009 Escenario: Variable desconocida
    Cuando aparece una propiedad fuera de allowlist
    Entonces se rechaza o advierte según política aprobada sin registrar su valor

  @ENV-010 Escenario: Variable deprecada
    Dada una variable dentro de su ventana de compatibilidad
    Cuando inicia
    Entonces registra el nombre deprecado y usa el mapeo documentado
