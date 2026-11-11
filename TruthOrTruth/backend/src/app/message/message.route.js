import asyncHandler from '../../lib/error/async-err-handling-wrapper.js'
import authGuard from '../auth/auth.guard.js'
import * as messageController from './message.controller.js'
import { Router } from 'express'

const messageRouter = new Router()

messageRouter.post('/', asyncHandler(messageController.sendMessage))
messageRouter.post('/public', authGuard, asyncHandler(messageController.sendMessage))
messageRouter.get('/get-my-messages', authGuard, asyncHandler(messageController.getMessagesByReceiver))

export default messageRouter