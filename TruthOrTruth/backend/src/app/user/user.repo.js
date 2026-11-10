import User from './user.model.js'

export async function findUserByEmail(email) {
    return User.findOne({ email })
}

export async function createUser(userData) {
    return User.create(userData)
}

export async function updateUserByEmail(email, data) {
    return User.findOneAndUpdate({ email }, data, { returnDocument: 'after' })
}

export async function getAllUsers(){
    return User.find({})
}

export async function findUserById(id){
    return User.findById(id)
}