import * as userRepo from './user.repo.js' 

export async function getAllUsers() {
    return await userRepo.getAllUsers();
}

export async function updateProfilePic(id, path) {
    return userRepo.updateUserById(id, {pfp : path})
}