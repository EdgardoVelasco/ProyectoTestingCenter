ALTER TABLE exam_request ADD COLUMN IF NOT EXISTS site_code_snapshot VARCHAR(20);
ALTER TABLE exam_request ADD COLUMN IF NOT EXISTS site_name_snapshot VARCHAR(120);
ALTER TABLE exam_request ADD COLUMN IF NOT EXISTS approval_routing_rule_id UUID;
ALTER TABLE exam_request ADD COLUMN IF NOT EXISTS approval_recipient_name_snapshot VARCHAR(160);
ALTER TABLE exam_request ADD COLUMN IF NOT EXISTS approval_recipient_email_snapshot VARCHAR(254);
ALTER TABLE exam_request ADD COLUMN IF NOT EXISTS approval_cc_snapshot VARCHAR(254);
ALTER TABLE exam_request ADD COLUMN IF NOT EXISTS mail_sender_upn_snapshot VARCHAR(254);
ALTER TABLE exam_request ADD COLUMN IF NOT EXISTS approval_notification_status VARCHAR(30);
ALTER TABLE exam_request ADD COLUMN IF NOT EXISTS approval_notification_sent_at TIMESTAMPTZ;
ALTER TABLE exam_request DROP CONSTRAINT IF EXISTS exam_request_status_check;
ALTER TABLE exam_request ADD CONSTRAINT exam_request_status_check CHECK (status IN ('BORRADOR','REGISTRADA','PENDIENTE_NOTIFICACION','ENVIADA_A_APROBADOR','ENVIADA_A_FACTURACION','CANCELADA'));

CREATE TABLE IF NOT EXISTS approval_routing_rule (
  id UUID PRIMARY KEY,
  site_code VARCHAR(20) NOT NULL UNIQUE,
  site_name VARCHAR(120) NOT NULL,
  approver_name VARCHAR(160) NOT NULL,
  approver_email VARCHAR(254) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  version BIGINT NOT NULL DEFAULT 0
);
INSERT INTO approval_routing_rule (id,site_code,site_name,approver_name,approver_email,created_at,updated_at)
VALUES
(gen_random_uuid(),'BOG','Bogota','Felipe Gonzalez','felipe.aprobador.dev@nwr1.onmicrosoft.com',now(),now()),
(gen_random_uuid(),'MED','Medellin','Felipe Gonzalez','felipe.aprobador.dev@nwr1.onmicrosoft.com',now(),now()),
(gen_random_uuid(),'SCL','Santiago','Felipe Gonzalez','felipe.aprobador.dev@nwr1.onmicrosoft.com',now(),now()),
(gen_random_uuid(),'LIM','Lima','Felipe Gonzalez','felipe.aprobador.dev@nwr1.onmicrosoft.com',now(),now()),
(gen_random_uuid(),'CA','Centro America','Felipe Gonzalez','felipe.aprobador.dev@nwr1.onmicrosoft.com',now(),now()),
(gen_random_uuid(),'PAN','Panama','Felipe Gonzalez','felipe.aprobador.dev@nwr1.onmicrosoft.com',now(),now()),
(gen_random_uuid(),'WTC','World Trade Center','Angelica','angelica.aprobador.dev@nwr1.onmicrosoft.com',now(),now()),
(gen_random_uuid(),'MAD','Madrid','Paola Galvis','paola.aprobador.dev@nwr1.onmicrosoft.com',now(),now())
ON CONFLICT (site_code) DO NOTHING;

CREATE TABLE IF NOT EXISTS notification_outbox (
  id UUID PRIMARY KEY,
  aggregate_id UUID NOT NULL,
  notification_type VARCHAR(80) NOT NULL,
  sender_upn_snapshot VARCHAR(254) NOT NULL,
  recipient VARCHAR(254) NOT NULL,
  cc VARCHAR(254) NOT NULL,
  subject VARCHAR(300) NOT NULL,
  payload TEXT NOT NULL,
  idempotency_key VARCHAR(200) NOT NULL UNIQUE,
  status VARCHAR(20) NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  next_attempt_at TIMESTAMPTZ NOT NULL,
  last_error_message VARCHAR(1000),
  created_at TIMESTAMPTZ NOT NULL,
  processing_started_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  version BIGINT NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS ix_outbox_pending ON notification_outbox(status,next_attempt_at);
