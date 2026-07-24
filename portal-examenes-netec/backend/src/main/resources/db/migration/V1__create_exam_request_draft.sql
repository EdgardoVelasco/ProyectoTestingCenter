CREATE TABLE exam_request (
  id UUID PRIMARY KEY,
  status VARCHAR(30) NOT NULL CHECK (status IN ('BORRADOR','REGISTRADA','PENDIENTE_NOTIFICACION','ENVIADA_A_FACTURACION','CANCELADA')),
  requester_id VARCHAR(128) NOT NULL,
  requester_name VARCHAR(160) NOT NULL,
  requester_email VARCHAR(254) NOT NULL,
  requester_area VARCHAR(120),
  requester_business_unit VARCHAR(120),
  scheduled_course_code VARCHAR(80),
  billing_reference VARCHAR(250),
  observations VARCHAR(2000),
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  version BIGINT NOT NULL DEFAULT 0
);
CREATE INDEX ix_exam_request_owner_updated ON exam_request(requester_id, updated_at DESC);
CREATE TABLE audit_entry (id UUID PRIMARY KEY, aggregate_id UUID NOT NULL, actor_id VARCHAR(128) NOT NULL, action VARCHAR(40) NOT NULL, occurred_at TIMESTAMPTZ NOT NULL);
CREATE INDEX ix_audit_aggregate ON audit_entry(aggregate_id, occurred_at);
