#!/bin/sh
set -eu

required_variables="
BACKEND_HOST
BACKEND_PORT
NGINX_LISTEN_PORT
NGINX_CLIENT_MAX_BODY_SIZE
PROXY_CONNECT_TIMEOUT
PROXY_SEND_TIMEOUT
PROXY_READ_TIMEOUT
ENTRA_TENANT_ID
ENTRA_FRONTEND_CLIENT_ID
ENTRA_BACKEND_SCOPE
ENTRA_AUTHORITY
ENTRA_REDIRECT_URI
API_BASE_PATH
ENVIRONMENT_NAME
"

for variable_name in $required_variables; do
  eval "variable_value=\${$variable_name:-}"
  if [ -z "$variable_value" ]; then
    echo "Missing required environment variable: $variable_name" >&2
    exit 1
  fi
done

is_match() {
  value="$1"
  pattern="$2"
  printf '%s' "$value" | grep -Eq "$pattern"
}

is_match "$BACKEND_HOST" '^[A-Za-z0-9._-]+$' || { echo "Invalid environment variable: BACKEND_HOST" >&2; exit 1; }
is_match "$BACKEND_PORT" '^[0-9]{1,5}$' || { echo "Invalid environment variable: BACKEND_PORT" >&2; exit 1; }
is_match "$NGINX_LISTEN_PORT" '^[0-9]{1,5}$' || { echo "Invalid environment variable: NGINX_LISTEN_PORT" >&2; exit 1; }
is_match "$NGINX_CLIENT_MAX_BODY_SIZE" '^[1-9][0-9]*(k|m)$' || { echo "Invalid environment variable: NGINX_CLIENT_MAX_BODY_SIZE" >&2; exit 1; }
for variable_name in PROXY_CONNECT_TIMEOUT PROXY_SEND_TIMEOUT PROXY_READ_TIMEOUT; do
  eval "variable_value=\${$variable_name}"
  is_match "$variable_value" '^[1-9][0-9]*s$' || { echo "Invalid environment variable: $variable_name" >&2; exit 1; }
done

is_match "$ENTRA_TENANT_ID" '^[A-Za-z0-9._-]+$' || { echo "Invalid environment variable: ENTRA_TENANT_ID" >&2; exit 1; }
is_match "$ENTRA_FRONTEND_CLIENT_ID" '^[A-Za-z0-9._-]+$' || { echo "Invalid environment variable: ENTRA_FRONTEND_CLIENT_ID" >&2; exit 1; }
is_match "$ENTRA_BACKEND_SCOPE" '^[-A-Za-z0-9._:/]+$' || { echo "Invalid environment variable: ENTRA_BACKEND_SCOPE" >&2; exit 1; }
is_match "$ENTRA_AUTHORITY" '^https://[-A-Za-z0-9._:/]+$' || { echo "Invalid environment variable: ENTRA_AUTHORITY" >&2; exit 1; }
is_match "$ENTRA_REDIRECT_URI" '^https?://[-A-Za-z0-9._:/]+$' || { echo "Invalid environment variable: ENTRA_REDIRECT_URI" >&2; exit 1; }
is_match "$API_BASE_PATH" '^/[A-Za-z0-9/_-]*$' || { echo "Invalid environment variable: API_BASE_PATH" >&2; exit 1; }
is_match "$ENVIRONMENT_NAME" '^[A-Za-z0-9._-]+$' || { echo "Invalid environment variable: ENVIRONMENT_NAME" >&2; exit 1; }

case "$ENVIRONMENT_NAME" in
  production|prod)
    printf '%s\n%s' "$ENTRA_AUTHORITY" "$ENTRA_REDIRECT_URI" | grep -Eqi '://(localhost|127\.0\.0\.1)(:|/|$)' &&
      { echo "Localhost is not allowed in production configuration" >&2; exit 1; }
    ;;
esac

command -v envsubst >/dev/null 2>&1 || { echo "envsubst is required" >&2; exit 1; }

envsubst '${NGINX_LISTEN_PORT} ${NGINX_CLIENT_MAX_BODY_SIZE} ${BACKEND_HOST} ${BACKEND_PORT} ${PROXY_CONNECT_TIMEOUT} ${PROXY_SEND_TIMEOUT} ${PROXY_READ_TIMEOUT}' \
  < /etc/nginx/templates/default.conf.template \
  > /etc/nginx/conf.d/default.conf

envsubst '${ENTRA_TENANT_ID} ${ENTRA_FRONTEND_CLIENT_ID} ${ENTRA_BACKEND_SCOPE} ${ENTRA_AUTHORITY} ${ENTRA_REDIRECT_URI} ${API_BASE_PATH} ${ENVIRONMENT_NAME}' \
  < /opt/netec/runtime-config.template.json \
  > /usr/share/nginx/html/runtime-config.json

nginx -t
exec "$@"
