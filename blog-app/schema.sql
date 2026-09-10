-- ===== DDL
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE blog (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    body TEXT NOT NULL,
    author INT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);

SELECT * FROM users;

SELECT * FROM blog;

--creates "role" type
CREATE TYPE user_role AS ENUM ('admin', 'customer');

-- adds user_role colummn
ALTER TABLE users ADD role user_role NOT NULL DEFAULT 'customer';

INSERT INTO users(username, email, password) 
VALUES('doma', 'doma@gmail', 'domapassord');

--validates that email has '@'
ALTER TABLE users
ADD CONSTRAINT email CHECK (position('@' in email) > 0);

--updating a user role
UPDATE users
SET role = 'customer'
WHERE username = 'adham';
