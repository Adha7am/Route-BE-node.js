
CREATE TABLE Blog (
    id SERIAL PRIMARY KEY,
    author_id INTEGER NOT NULL REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()  
);

--(to do) adding on delete cascade constraint to fk
ALTER TABLE blog
DROP CONSTRAINT blog_author_id_fkey;

ALTER TABLE blog
ADD CONSTRAINT blog_auther_id_fkey
FOREIGN KEY (author_id)
REFERENCES users(id)
ON DELETE CASCADE;

--(to do) add ise_deleted and updated_at columns
ALTER TABLE blog
    ADD COLUMN is_deleted boolean default false,
    ADD COLUMN updated_at TIMESTAMP DEFAULT NOW();