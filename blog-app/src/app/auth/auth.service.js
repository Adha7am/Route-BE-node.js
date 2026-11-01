const bcrypt = require('bcrypt')
const authRepo = require('./auth.repo')
const jwt = require('jsonwebtoken');


async function register (username, email, password) {
    //check if user email already exists
    const userExists = await authRepo.findUserByEmail(email);
    if (userExists) throw new Error('this email is already registered')

    //hashpassword
    const passwordHash = await bcrypt.hash(password, 10);

    //send to repo to create new user
    const createdUser = await authRepo.createUser(username, email, passwordHash);

    const token = jwt.sign({ userId: createdUser.id, username: createdUser.username }, process.env.jwt_key, { expiresIn: '1d' })
    return token

}


async function login(email, password) {

    //send to repo to check if user exists with email
    const user = await authRepo.findUserByEmail(email);

    if (!user) throw new Error('invalid credentials')

    //compare pass hash
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) throw new Error('invalid credentials')
    //return a token
    const token = jwt.sign({ userId: user.id, username: user.username }, process.env.jwt_key, { expiresIn: '1d' })
    return token

}

module.exports = {
    register,
    login
}   