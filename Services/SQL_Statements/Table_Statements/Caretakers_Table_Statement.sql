CREATE TABLE public."Caretakers"
(
    "Caretaker_ID" serial NOT NULL,
    "First_Name" character varying(40) NOT NULL,
    "Last_Name" character varying(40) NOT NULL,
    "Age" integer NOT NULL,
    "Email" character varying(40),
    PRIMARY KEY ("Caretaker_ID")
);

ALTER TABLE IF EXISTS public."Caretakers"
    OWNER to postgres;