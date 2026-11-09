import { logger } from '../../pkg/logger/logger.js'
import { userNotFound } from '../user/user.errors.js'
import * as userRepo from '../user/user.repo.js'
import * as messageRepo from './message.repo.js'

export async function sendMessage(content, receiver, sender) {
    
    const user = await userRepo.findUserById(receiver)
    logger.info('user', user)
    if (!user) throw userNotFound

    return await messageRepo.sendMessage(content, receiver, sender)
}