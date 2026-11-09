import { getUserOrThrow } from "../user/user.helper.js";
import {Message} from './message.model.js'

export async function sendMessage(content, receiver, sender) {
    return await Message.create({
        content : content,
        receiver : receiver,
        sender : sender
    })
}