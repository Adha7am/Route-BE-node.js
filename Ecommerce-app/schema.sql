CREATE TYPE role AS ENUM ('customer', 'admin', 'seller');
CREATE TABLE users
(
    id         SERIAL PRIMARY KEY,
    email      VARCHAR(50) NOT NULL UNIQUE CHECK (position('@' IN email) > 0),
    pass_hash  TEXT        NOT NULL,
    role       role        NOT NULL DEFAULT 'customer',
    is_active  BOOLEAN     NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP   NOT NULL DEFAULT NOW()
);

CREATE TABLE customer_profiles
(
    user_id         INT         NOT NULL REFERENCES users (id),
    name            varchar(20) NOT NULL,
    phone           VARCHAR(15),
    loyality_points INT DEFAULT 0 CHECK ( loyality_points >= 0 ),
    dob             DATE
);

CREATE TABLE products
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(50)    NOT NULL,
    price      NUMERIC(10, 2) NOT NULL CHECK ( price > 0 ),
    created_at TIMESTAMP      NOT NULL DEFAULT now(),
    stock      INT            NOT NULL DEFAULT 1 CHECK ( stock >= 0 ),
    meta_data  jsonb                   DEFAULT '{}'
);

CREATE TYPE status AS ENUM ('pending', 'delivered', 'cancelled');

CREATE TABLE orders
(
    id           SERIAL PRIMARY KEY,
    user_id      INT            NOT NULL REFERENCES users (id) ON DELETE RESTRICT,
    created_at   TIMESTAMP      NOT NULL DEFAULT NOW(),
    status       status         NOT NULL DEFAULT 'pending',
    delivered_at TIMESTAMP,
    total        NUMERIC(10, 2) NOT NULL CHECK ( total > 0)
);

CREATE TABLE order_items
(
    products_id   INT NOT NULL REFERENCES products (id) ON DELETE RESTRICT,
    order_id      INT NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
    quantity      INT NOT NULL CHECK ( quantity > 0 ),
    product_price INT NOT NULL
);

ALTER TABLE products
    ADD UNIQUE (id);

SELECT conname
FROM pg_constraint
WHERE conrelid = 'products'::regclass;

ALTER TABLE products
    DROP CONSTRAINT products_id_key;

ALTER TABLE products
    ADD CONSTRAINT products_id_key UNIQUE (id);

SELECT *
FROM orders;

SELECT *
FROM users;

SELECT *
FROM order_items;
TRUNCATE TABLE orders, order_items;

SELECT *
FROM customer_profiles;

INSERT INTO users (email, pass_hash, role)
VALUES ('ka3bora@g.com', 'hash_pw_123', 'customer'),
       ('rabe3@g.com', 'hash_pw_456', 'admin');

INSERT INTO customer_profiles(user_id, name, phone, dob)
values (1, 'ka3bora', '01024708090', '1999-09-27');

INSERT INTO products (name, price, stock, meta_data)
VALUES ('mac book air m5', 75000.00, 12, '{
  "ram": 16
}');

--to make an order using Transactions
BEGIN;
--1 check for product stock is > 0
SELECT id, name, price, stock
FROM products
WHERE id = 1;
--2 orders
INSERT INTO orders (id, user_id, total)
VALUES (1, 1, 75000.00)
RETURNING id;
--3 order_items
INSERT INTO order_items (products_id, order_id, quantity, product_price)
VALUES (1, 1, 1, 75000.00);
--4 stock = stock - 1
UPDATE products
SET stock = stock - 1
where id = 1;
COMMIT;

ROLLBACK;

