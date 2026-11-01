const pool = require('../../common/db/db');
const prisma = require('../../common/db/prisma');

// async function createBlog(title, body, authorId) {
//     const { rows } = await pool.query(`INSERT INTO blogs(title, body, author_id) VALUES($1, $2, $3) RETURNING *`, [title, body, authorId]);
//     return rows[0];
// }

// async function softDeleteBlog(id, authorId) {
//     const { rows } = await pool.query(`UPDATE blog 
//         SET is_deleted = true, updated_at = NOW()
//         WHERE id = $1 AND author_id = $2 AND is_deleted = false
//         RETURNING *`, [id, authorId])

//     return rows[0]
// }

// async function hardDeleteBlog(id, authorId) {
//     const { rows } = await pool.query(`DELETE FROM blog 
//         WHERE id = $1 AND author_id = $2 AND is_deleted = false
//         RETURNING *`, [id, authorId])

//     return rows[0]
// }

// async function restoreBlog(id, authorId) {
//     const { rows } = await pool.query(`UPDATE blog 
//         SET is_deleted = false, updated_at = NOW()
//         WHERE id = $1 AND author_id = $2 AND is_deleted = true
//         RETURNING *`, [id, authorId])

//     return rows[0]
// }

// async function getBlog(id, authorId) {
//     const { rows } = await pool.query(`SELECT * FROM blog 
//         WHERE id = $1 AND author_id = $2`, [id, authorId]);

//     return rows[0]
// }

// async function updateBlog(id, authorId, title, body) {
//     const { rows } = await pool.query(`UPDATE blog
//         SET title = $1, body = $2, updated_at = NOW()
//         WHERE id = $3 AND author_id = $4
//         RETURNING *`, [title, body, id, authorId])

//     return rows[0]
// }

//refactored to prisma :-

async function getBlog(id, authorId) {
    const blog = await prisma.blog.findUnique({
        where: {
            id: id,
            author_id: authorId,
        }
    })

    return blog
}

async function createBlog(title, body, authorId) {
    const blog = await prisma.blog.create({
        data: {
            title: title,
            body: body,
            author_id: authorId
        },
    });

    return blog
}

async function softDeleteBlog(id, authorId) {
    try {

        return await prisma.blog.update({
            where: { id, author_id: authorId, is_deleted: false },
            data: { is_deleted: true }
        })
        
    } catch (e) {
        if (e.code === 'P2025') return null
        throw e
    }
}

async function restoreBlog(id, authorId) {
    try {
        return await prisma.blog.update({
            where: { id, author_id: authorId, is_deleted: true },
            data: { is_deleted: false }
        })
    } catch (e) {
        if (e.code === 'P2025') return null
        throw e
    }
}

async function hardDeleteBlog(id, authorId) {
    const deletedBlog = await prisma.blog.delete({
        where: {
            id,
            author_id : authorId
        },
    });

    return deletedBlog
}

async function updateBlog(id, authorId, title, body) {
    const blog = await prisma.blog.update({
        where: {
            id: id,
            author_id: authorId,
            is_deleted: false
        },
        data: {
            title: title,
            body: body
        }
    })

    return blog
}

module.exports = {
    createBlog,
    softDeleteBlog,
    hardDeleteBlog,
    restoreBlog,
    getBlog,
    updateBlog
}