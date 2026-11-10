
import {Message} from './message.model.js'

export async function sendMessage(content, receiver, sender) {
    return Message.create({
        content : content,
        receiver : receiver,
        sender : sender
    })
}