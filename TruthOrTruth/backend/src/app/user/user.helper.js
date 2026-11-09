import * as userRepo from './user.repo.js'
import { userAlreadyExists, userNotFound } from './user.errors.js'

export async function getUserOrThrow(email) {

    const user = await userRepo.findUserByEmail(email)

    if (!user) throw userNotFound

    return user
}

export async function assertUserDoesNotExist(email) {
    const user = await userRepo.findUserByEmail(email)

    if (user) throw userAlreadyExists

    return
}