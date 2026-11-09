import asyncHandler from '../../lib/error/async-err-handling-wrapper.js'
import * as messageController from './message.controller.js'
import { Router } from 'express'

const messageRouter = new Router()

messageRouter.post('/send-message', asyncHandler(messageController.sendMessage))

export default messageRouter