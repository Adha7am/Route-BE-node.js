const pool = require('../../common/db/db.js');
const prisma = require('../../common/db/prisma.js')

// async function createUser(username, email, passwordHash) {
//     const { rows } = await pool.query(`
//         INSERT INTO users(username, email, password_hash)
//         VALUES($1, $2, $3)
//         RETURNING * ;
//         `, [username, email, passwordHash])

//     return rows[0]
// }

// async function findUserByEmail(email) {
//     const { rows } = await pool.query(`
//         SELECT * FROM users 
//         WHERE email = $1
//         `, [email]);

//     return rows[0];
// }

// async function findUserById(id) {
//     const { rows } = await pool.query(`
//         SELECT * FROM users 
//         WHERE id = $1
//         `, [id]);

//     return rows[0];
// }

// async function getPassHash(email) {
//     const { rows } = await pool.query(`
//         SELECT password_hash
//         FROM users WHERE 
//         email = $1 ;`, [email])
//     return rows[0]
// }


// refactored to prisma :-

async function createUser(username, email, passwordHash) {

    const user = await prisma.User.create({
        data: {
            email: email,
            username: username,
            password_hash: passwordHash

        },
        omit: { password_hash: true }
    })
    return user
}

async function findUserByEmail(email) {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    return user
}

async function findUserById(id) {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    return user;
}

async function getPassHash(email) {
    const passHash = await prisma.user.findUnique({
        where : {
            email : email
        },
        select : {
            password_hash : true
        }
    })
    return passHash;
}



module.exports = { createUser, findUserByEmail, getPassHash, findUserById };