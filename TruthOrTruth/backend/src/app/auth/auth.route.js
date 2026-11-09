import {Router} from 'express'
import * as authController from './auth.controller.js'
import { idempotency } from '../../lib/idempotency/idempotency.js'
import asyncHandler from '../../lib/error/async-err-handling-wrapper.js'

 const authRouter = new Router()

authRouter.get('/health', authController.checkHealth)
authRouter.post('/register', asyncHandler(authController.register))
authRouter.patch('/verify-user', asyncHandler(authController.verifyUser))
authRouter.post('/login', asyncHandler(authController.login))
authRouter.post('/send-otp', asyncHandler(authController.sendOtp))
authRouter.patch('/reset-password', asyncHandler(authController.resetPassword))


export default authRouter