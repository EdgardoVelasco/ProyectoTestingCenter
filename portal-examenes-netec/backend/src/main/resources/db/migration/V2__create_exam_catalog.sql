CREATE TABLE exam_catalog (
  id UUID PRIMARY KEY,
  vendor VARCHAR(120) NOT NULL,
  course_name VARCHAR(250) NOT NULL,
  exam_code VARCHAR(100) NOT NULL,
  exam_name VARCHAR(500) NOT NULL,
  retake VARCHAR(120),
  base_cost NUMERIC(19,4) NOT NULL CHECK (base_cost >= 0),
  base_currency CHAR(3) NOT NULL CHECK (base_currency = 'USD'),
  comments TEXT,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  business_key VARCHAR(700) NOT NULL UNIQUE,
  source_file VARCHAR(255) NOT NULL,
  source_row_number INTEGER NOT NULL,
  imported_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  version BIGINT NOT NULL DEFAULT 0
);
CREATE INDEX ix_exam_catalog_vendor ON exam_catalog (lower(vendor));
CREATE INDEX ix_exam_catalog_code ON exam_catalog (lower(exam_code));
CREATE INDEX ix_exam_catalog_active ON exam_catalog (active);
CREATE INDEX ix_exam_catalog_search ON exam_catalog
  USING gin (to_tsvector('simple', vendor || ' ' || exam_code || ' ' || exam_name || ' ' || course_name));

