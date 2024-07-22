CREATE TABLE public."Species"
(
    "Species_Name" character varying(40) NOT NULL,
    "Scientific_Name" character varying(70) NOT NULL,
    "Caretaker_ID" integer NOT NULL,
    PRIMARY KEY ("Species_Name"),
    CONSTRAINT "Caretake_ID" FOREIGN KEY ("Caretaker_ID")
        REFERENCES public."Caretakers" ("Caretaker_ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public."Species"
    OWNER to postgres;