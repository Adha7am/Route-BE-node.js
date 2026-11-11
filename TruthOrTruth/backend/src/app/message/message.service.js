import { logger } from '../../pkg/logger/logger.js'
import { userNotFound } from '../user/user.errors.js'
import { getUserOrThrow } from '../user/user.helper.js'
import * as userRepo from '../user/user.repo.js'
import * as messageRepo from './message.repo.js'

export async function sendMessage(content, receiver, sender) {

    await getUserOrThrow({id : receiver})

    return messageRepo.sendMessage(content, receiver, sender)
}

export async function getMessagesByReceiver(receiver) {
    return await messageRepo.getMessagesByReceiver(receiver)
}