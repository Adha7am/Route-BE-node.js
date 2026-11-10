import { validateBody } from '../../pkg/validation/validation.js'
import { sendMessageDTO } from './message.dto.js'
import * as messageService from './message.service.js'

export async function sendMessage(req, res, next) {

    const data = validateBody(sendMessageDTO, req.body)
    const {content, receiver} = data

    const sender = req.user?.id;

    const message = await messageService.sendMessage(content, receiver, sender)

    res.status(201).json({
        message : 'message sent successfully',
        success:true,
        data : message
    })
}