import User from './user.model.js'

export async function findUserByEmail(email) {
    return await User.findOne({ email })
}

export async function createUser(userData) {
    return await User.create(userData)
}

export async function updateUserByEmail(email, data) {
    return await User.findOneAndUpdate({ email }, data, { returnDocument: 'after' })
}

export async function getAllUsers(){
    return await User.find({})
}