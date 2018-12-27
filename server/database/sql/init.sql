CREATE SEQUENCE public.person_id_seq;

CREATE TABLE public.person (
                person_id INTEGER NOT NULL DEFAULT nextval('public.person_id_seq'),
                name VARCHAR NOT NULL,
                lastname VARCHAR NOT NULL,
                code VARCHAR NOT NULL,
                phonenumber VARCHAR NOT NULL,
                username VARCHAR NOT NULL,
                password VARCHAR NOT NULL,
                type VARCHAR NOT NULL,
                birthdate DATE NOT NULL,
                address VARCHAR NOT NULL,
                gender VARCHAR NOT NULL,
                profile_img VARCHAR,
                CONSTRAINT person_id PRIMARY KEY (person_id)
);


ALTER SEQUENCE public.person_id_seq OWNED BY public.person.person_id;

CREATE SEQUENCE public.product_id_seq;

CREATE TABLE public.product (
                product_id INTEGER NOT NULL DEFAULT nextval('public.product_id_seq'),
                person_id INTEGER NOT NULL,
                title VARCHAR,
                location VARCHAR,
                type VARCHAR NOT NULL,
                post_time INTEGER NOT NULL,
                description VARCHAR NOT NULL,
                category VARCHAR,
                CONSTRAINT id PRIMARY KEY (product_id)
);


ALTER SEQUENCE public.product_id_seq OWNED BY public.product.product_id;

CREATE SEQUENCE public.trade_id_seq;

CREATE TABLE public.trade (
                trade_id INTEGER NOT NULL DEFAULT nextval('public.trade_id_seq'),
                product_id INTEGER NOT NULL,
                seller_id INTEGER NOT NULL,
                buyer_id INTEGER NOT NULL,
                CONSTRAINT trade_id PRIMARY KEY (trade_id)
);


ALTER SEQUENCE public.trade_id_seq OWNED BY public.trade.trade_id;

CREATE SEQUENCE public.chat_hist_id_seq;

CREATE TABLE public.chat_hist (
                chat_hist_id INTEGER NOT NULL DEFAULT nextval('public.chat_hist_id_seq'),
                trade_id INTEGER NOT NULL,
                sender_id INTEGER NOT NULL,
                message VARCHAR NOT NULL,
                time TIMESTAMP NOT NULL,
                CONSTRAINT chat_hist_id PRIMARY KEY (chat_hist_id)
);


ALTER SEQUENCE public.chat_hist_id_seq OWNED BY public.chat_hist.chat_hist_id;

CREATE SEQUENCE public.ticket_id_seq;

CREATE TABLE public.ticket (
                ticket_id INTEGER NOT NULL DEFAULT nextval('public.ticket_id_seq'),
                trade_id INTEGER NOT NULL,
                product_id INTEGER NOT NULL,
                total NUMERIC NOT NULL,
                CONSTRAINT ticket_id PRIMARY KEY (ticket_id)
);


ALTER SEQUENCE public.ticket_id_seq OWNED BY public.ticket.ticket_id;

CREATE SEQUENCE public.vehicle_id_seq;

CREATE TABLE public.vehicle (
                vehicle_id INTEGER NOT NULL DEFAULT nextval('public.vehicle_id_seq'),
                product_id INTEGER NOT NULL,
                brand VARCHAR NOT NULL,
                model VARCHAR NOT NULL,
                distance INTEGER NOT NULL,
                year INTEGER NOT NULL,
                fuel VARCHAR NOT NULL,
                negotiable BOOLEAN NOT NULL,
                finance BOOLEAN NOT NULL,
                int_material VARCHAR NOT NULL,
                unique_owner BOOLEAN NOT NULL,
                windows VARCHAR NOT NULL,
                pilot_seat VARCHAR NOT NULL,
                air_cond VARCHAR NOT NULL,
                CONSTRAINT vehicle_id PRIMARY KEY (vehicle_id)
);


ALTER SEQUENCE public.vehicle_id_seq OWNED BY public.vehicle.vehicle_id;

CREATE SEQUENCE public.offer_id_seq;

CREATE TABLE public.offer (
                offer_id INTEGER NOT NULL DEFAULT nextval('public.offer_id_seq'),
                product_id INTEGER NOT NULL,
                price NUMERIC NOT NULL,
                address JSON NOT NULL,
                CONSTRAINT offer_id PRIMARY KEY (offer_id)
);


ALTER SEQUENCE public.offer_id_seq OWNED BY public.offer.offer_id;

CREATE SEQUENCE public.place_id_seq;

CREATE TABLE public.place (
                place_id INTEGER NOT NULL DEFAULT nextval('public.place_id_seq'),
                product_id INTEGER NOT NULL,
                specification VARCHAR,
                schedule VARCHAR,
                address JSON NOT NULL,
                link VARCHAR NOT NULL,
                CONSTRAINT place_id PRIMARY KEY (place_id)
);


ALTER SEQUENCE public.place_id_seq OWNED BY public.place.place_id;

CREATE SEQUENCE public.article_id_seq;

CREATE TABLE public.article (
                article_id INTEGER NOT NULL DEFAULT nextval('public.article_id_seq'),
                product_id INTEGER NOT NULL,
                stock INTEGER NOT NULL,
                price NUMERIC NOT NULL,
                used BOOLEAN NOT NULL,
                link VARCHAR,
                CONSTRAINT article_id PRIMARY KEY (article_id)
);


ALTER SEQUENCE public.article_id_seq OWNED BY public.article.article_id;

CREATE SEQUENCE public.image_id_seq;

CREATE TABLE public.image (
                image_id INTEGER NOT NULL DEFAULT nextval('public.image_id_seq'),
                product_id INTEGER NOT NULL,
                url VARCHAR NOT NULL,
                CONSTRAINT image_id PRIMARY KEY (image_id)
);


ALTER SEQUENCE public.image_id_seq OWNED BY public.image.image_id;

CREATE SEQUENCE public.service_id_seq;

CREATE TABLE public.service (
                service_id INTEGER NOT NULL DEFAULT nextval('public.service_id_seq'),
                product_id INTEGER NOT NULL,
                CONSTRAINT service_id PRIMARY KEY (service_id)
);


ALTER SEQUENCE public.service_id_seq OWNED BY public.service.service_id;

ALTER TABLE public.trade ADD CONSTRAINT trade_buyer_id_fk
FOREIGN KEY (buyer_id)
REFERENCES public.person (person_id)
ON DELETE CASCADE
ON UPDATE CASCADE
NOT DEFERRABLE;

ALTER TABLE public.trade ADD CONSTRAINT trade_seller_id
FOREIGN KEY (seller_id)
REFERENCES public.person (person_id)
ON DELETE CASCADE
ON UPDATE CASCADE
NOT DEFERRABLE;

ALTER TABLE public.product ADD CONSTRAINT person_product_fk
FOREIGN KEY (person_id)
REFERENCES public.person (person_id)
ON DELETE CASCADE
ON UPDATE CASCADE
NOT DEFERRABLE;

ALTER TABLE public.service ADD CONSTRAINT product_service_fk
FOREIGN KEY (product_id)
REFERENCES public.product (product_id)
ON DELETE CASCADE
ON UPDATE CASCADE
NOT DEFERRABLE;

ALTER TABLE public.image ADD CONSTRAINT product_image_fk
FOREIGN KEY (product_id)
REFERENCES public.product (product_id)
ON DELETE CASCADE
ON UPDATE CASCADE
NOT DEFERRABLE;

ALTER TABLE public.article ADD CONSTRAINT product_article_fk
FOREIGN KEY (product_id)
REFERENCES public.product (product_id)
ON DELETE CASCADE
ON UPDATE CASCADE
NOT DEFERRABLE;

ALTER TABLE public.place ADD CONSTRAINT product_place_fk
FOREIGN KEY (product_id)
REFERENCES public.product (product_id)
ON DELETE CASCADE
ON UPDATE CASCADE
NOT DEFERRABLE;

ALTER TABLE public.offer ADD CONSTRAINT product_offer_fk
FOREIGN KEY (product_id)
REFERENCES public.product (product_id)
ON DELETE CASCADE
ON UPDATE CASCADE
NOT DEFERRABLE;

ALTER TABLE public.vehicle ADD CONSTRAINT product_vehicle_fk
FOREIGN KEY (product_id)
REFERENCES public.product (product_id)
ON DELETE CASCADE
ON UPDATE CASCADE
NOT DEFERRABLE;

ALTER TABLE public.trade ADD CONSTRAINT product_trade_fk
FOREIGN KEY (product_id)
REFERENCES public.product (product_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.ticket ADD CONSTRAINT trade_ticket_fk
FOREIGN KEY (trade_id)
REFERENCES public.trade (trade_id)
ON DELETE CASCADE
ON UPDATE CASCADE
NOT DEFERRABLE;

ALTER TABLE public.chat_hist ADD CONSTRAINT trade_chat_hist_fk
FOREIGN KEY (trade_id)
REFERENCES public.trade (trade_id)
ON DELETE CASCADE
ON UPDATE CASCADE
NOT DEFERRABLE;
