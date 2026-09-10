CREATE TYPE user_role AS ENUM('customer', 'seller');

CREATE TABLE users
(
    id       SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email    VARCHAR(255) NOT NULL UNIQUE CHECK ( position('@' IN email) > 0 ),
    password TEXT        NOT NULL,
    phone    VARCHAR(15) NOT NULL,
    role     user_role DEFAULT 'customer'
);

CREATE TABLE product
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(50)    NOT NULL,
    price      NUMERIC(10, 2) NOT NULL CHECK (price > 0),
    stock      INT            NOT NULL CHECK ( stock >= 0 ) DEFAULT 1,
    is_deleted BOOLEAN        NOT NULL                      DEFAULT FALSE
);