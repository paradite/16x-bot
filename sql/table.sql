-- Table: public.lc_records

DROP TABLE IF EXISTS public.lc_records;

CREATE TABLE IF NOT EXISTS public.lc_records
(
    id serial NOT NULL,
    username VARCHAR(64) COLLATE pg_catalog."default",
    qn_date VARCHAR(64) COLLATE pg_catalog."default",
    has_image BOOLEAN,
    msg_text TEXT COLLATE pg_catalog."default",
    "timestamp" timestamp,
    CONSTRAINT lc_records_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.lc_records
    OWNER to "16x_user";

-- add data

INSERT INTO lc_records (username, qn_date, has_image, msg_text, timestamp)
VALUES('paradite', '11/7/2022', TRUE, 'test msg', now())