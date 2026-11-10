import * as userRepo from './user.repo.js'
import { userAlreadyExists, userNotFound } from './user.errors.js'

export async function getUserOrThrow({ id, email }) {
    const user = id !== undefined
        ? await userRepo.findUserById(id)
        : await userRepo.findUserByEmail(email);

    if (!user) throw new AppError('user not found', 404)
    return user;
}

export async function assertUserDoesNotExist({id, email}) {
        const user = id !== undefined
        ? await userRepo.findUserById(id)
        : await userRepo.findUserByEmail(email);

    if (user) throw new AppError('user already exists', 409)
    return;
}