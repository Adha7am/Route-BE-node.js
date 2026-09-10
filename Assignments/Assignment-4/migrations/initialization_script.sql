CREATE TABLE supplier
(
    id             SERIAL PRIMARY KEY,
    name           TEXT NOT NULL,
    contact_number TEXT NOT NULL
);

CREATE TABLE products
(
    id          SERIAL PRIMARY KEY,
    name        TEXT           NOT NULL,
    price       NUMERIC(10, 2) NOT NULL CHECK (price > 0),
    stock       INT            NOT NULL CHECK (stock >= 0),
    supplier_id INT            NOT NULL REFERENCES supplier (id) ON DELETE RESTRICT
);

CREATE TABLE sales
(
    id         SERIAL PRIMARY KEY,
    product_id INT NOT NULL REFERENCES products (id) ON DELETE RESTRICT,
    quantity   INT NOT NULL CHECK ( quantity > 0 ),
    sale_date  DATE DEFAULT CURRENT_DATE
);

--FRESHFOODS SUPPLIER
WITH freshfoods AS (
INSERT
INTO suppliers (name, contact_number)
VALUES ('FreshFoods', '01001234567') RETURNING id
    ), new_products AS (
INSERT
INTO products (name, price, stock, supplier_id)
VALUES ('milk', 15.00, 50, (SELECT id FROM freshfoods)), ('Bread', 10.00, 30, (SELECT id FROM freshfoods)), ('Eggs', 20.00, 40, (SELECT id FROM freshfoods))
    RETURNING id, name
    )
INSERT
INTO sales(product_id, quantity, sale_date)
SELECT id, 2, '2025-05-20'
FROM new_products
WHERE name = 'milk';

--update bread
UPDATE products
SET price = 25.00
WHERE name = 'Bread';

--delete eggs
DELETE
FROM products
WHERE name = 'Eggs';

--total quantity sold for each product
SELECT products.id, products.name, COALESCE(sum(sales.quantity), 0) AS total_quantity_sold
FROM products
         LEFT JOIN sales ON sales.product_id = products.id
GROUP BY products.id
ORDER BY total_quantity_sold DESC;

--the product with the highest stock
SELECT id, name, stock
FROM products
ORDER BY stock DESC LIMIT 1;

--suppliers whom name starts with F
SELECT *
FROM suppliers
WHERE name LIKE 'F%';

--products that where never sold
SELECT P.id, p.name
FROM products p
         left JOIN sales s ON p.id = s.product_id
WHERE s.product_id is NULL;

--all sales with the product name
SELECT p.name, s.quantity, s.sale_date
FROM products p
         JOIN sales s ON p.id = s.product_id;

--create pg user
CREATE USER store_manager WITH PASSWORD '1234';
GRANT SELECT, UPDATE, INSERT ON ALL TABLES IN SCHEMA public TO store_manager;

REVOKE UPDATE ON ALL TABLES IN SCHEMA public FROM store_manager;

GRANT DELETE ON sales TO store_manager;