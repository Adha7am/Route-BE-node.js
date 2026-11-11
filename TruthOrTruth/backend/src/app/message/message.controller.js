import { validateBody } from '../../pkg/validation/validation.js'
import { getMessagesByReceiverDTO, sendMessageDTO } from './message.dto.js'
import * as messageService from './message.service.js'

export async function sendMessage(req, res, next) {

    const data = validateBody(sendMessageDTO, req.body)
    const {content, receiver} = data

    //getting user-id from token via authGuard when req is coming from /public
    const sender = req.user?.id;

    const message = await messageService.sendMessage(content, receiver, sender)

    res.status(201).json({
        message : 'message sent successfully',
        success:true,
        data : message
    })
}

export async function getMessagesByReceiver(req, res, next) {
    //no need to check user existence here since we already checked at authGuard
    const messages = await messageService.getMessagesByReceiver(req.user.id)

    res.status(200).json({
        success : true,
        data : messages
    })
}