import asyncHandler from '../../lib/error/async-err-handling-wrapper.js'
import authGuard from '../auth/auth.guard.js'
import * as messageController from './message.controller.js'
import { Router } from 'express'

const messageRouter = new Router()

messageRouter.post('/send-message', authGuard, asyncHandler(messageController.sendMessage))

export default messageRouter