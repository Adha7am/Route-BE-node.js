import * as userRepo from './user.repo.js' 

export async function getAllUsers() {
    return await userRepo.getAllUsers();
}