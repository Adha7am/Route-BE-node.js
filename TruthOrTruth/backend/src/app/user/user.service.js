import * as userRepo from './user.repo.js' 
import * as fs from 'node:fs'

export async function getAllUsers() {
    return await userRepo.getAllUsers();
}

export async function updateProfilePic(id, path) {

    const user = await userRepo.findUserById(id)

    try {
        if(user.pfp) fs.unlinkSync(user.pfp)
    }catch(error){
        // throw new AppError('', ) 
    }

    return userRepo.updateUserById(id, {pfp : path})
}