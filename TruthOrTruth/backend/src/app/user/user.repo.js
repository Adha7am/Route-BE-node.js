import User from './user.model.js'

export async function findUserByEmail(email) {
    return User.findOne({ email, isDeleted: false })
}

export async function createUser(userData) {
    return User.create(userData)
}

export async function updateUserByEmail(email, data) {
    return User.findOneAndUpdate({ email, isDeleted: false }, data, { returnDocument: 'after' })
}

export async function getAllUsers(){
    return User.find({isDeleted: false})
}

export async function findUserById(id){
    return User.findOne({_id : id, isDeleted : false})
}


export async function updateUserById(id, data) {
    return User.findOneAndUpdate({ _id : id, isDeleted: false }, data, { returnDocument: 'after' })
}