import * as messageService from './message.service.js'

export async function sendMessage(req, res, next) {
    const {content, receiver} = req.body

    const message = await messageService.sendMessage(content, receiver,  undefined)

    res.status(201).json({
        message : 'message sent successfully',
        success:true,
        data : message
    })
}