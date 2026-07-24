ALTER TABLE exam_request
    ADD COLUMN sales_advisor_user_id VARCHAR(128),
    ADD COLUMN sales_advisor_name_snapshot VARCHAR(160),
    ADD COLUMN sales_advisor_upn_snapshot VARCHAR(254);

UPDATE exam_request
SET sales_advisor_user_id = requester_id,
    sales_advisor_name_snapshot = requester_name,
    sales_advisor_upn_snapshot = requester_email;

ALTER TABLE exam_request
    ALTER COLUMN sales_advisor_user_id SET NOT NULL,
    ALTER COLUMN sales_advisor_name_snapshot SET NOT NULL,
    ALTER COLUMN sales_advisor_upn_snapshot SET NOT NULL;

