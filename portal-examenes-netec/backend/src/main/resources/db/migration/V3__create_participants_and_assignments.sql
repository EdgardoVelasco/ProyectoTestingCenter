CREATE TABLE exam_request_participant (
  id UUID PRIMARY KEY,
  exam_request_id UUID NOT NULL REFERENCES exam_request(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  second_last_name VARCHAR(100),
  normalized_email VARCHAR(254) NOT NULL,
  original_email VARCHAR(254) NOT NULL,
  external_participant_id VARCHAR(80),
  country CHAR(2),
  city VARCHAR(120),
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  version BIGINT NOT NULL DEFAULT 0,
  CONSTRAINT uq_request_participant_email UNIQUE (exam_request_id, normalized_email),
  CONSTRAINT uq_request_participant_pair UNIQUE (exam_request_id, id)
);
CREATE INDEX ix_participant_request ON exam_request_participant(exam_request_id);

CREATE TABLE participant_exam_assignment (
  id UUID PRIMARY KEY,
  exam_request_id UUID NOT NULL REFERENCES exam_request(id) ON DELETE CASCADE,
  participant_id UUID NOT NULL,
  exam_catalog_id UUID NOT NULL REFERENCES exam_catalog(id),
  unit_price_snapshot NUMERIC(19,4) NOT NULL,
  currency_snapshot CHAR(3) NOT NULL,
  exam_code_snapshot VARCHAR(100) NOT NULL,
  exam_name_snapshot VARCHAR(500) NOT NULL,
  vendor_name_snapshot VARCHAR(120) NOT NULL,
  retake_snapshot VARCHAR(120),
  comments_snapshot TEXT,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  version BIGINT NOT NULL DEFAULT 0,
  CONSTRAINT fk_assignment_participant_request
    FOREIGN KEY (exam_request_id, participant_id)
    REFERENCES exam_request_participant(exam_request_id, id) ON DELETE CASCADE,
  CONSTRAINT uq_request_participant_exam
    UNIQUE (exam_request_id, participant_id, exam_catalog_id)
);
CREATE INDEX ix_assignment_request ON participant_exam_assignment(exam_request_id);
CREATE INDEX ix_assignment_exam ON participant_exam_assignment(exam_catalog_id);

