
import { getUserOrThrow } from '../user/user.helper.js'
import * as messageRepo from './message.repo.js'

export async function sendMessage(content, receiver, sender) {

    await getUserOrThrow({id : receiver})

    return messageRepo.sendMessage(content, receiver, sender)
}

export async function getMessagesByReceiver(receiver) {
    return messageRepo.getMessagesByReceiver(receiver)
}