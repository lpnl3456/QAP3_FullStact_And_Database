CREATE TABLE public."Animals"
(
    "Animal_ID" serial NOT NULL,
    "Name" character varying(40) NOT NULL,
    "Age" integer NOT NULL,
    "Species_Name" character varying(40) NOT NULL,
    PRIMARY KEY ("Animal_ID"),
    CONSTRAINT "Species_Name" FOREIGN KEY ("Species_Name")
        REFERENCES public."Species" ("Species_Name") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public."Animals"
    OWNER to postgres;