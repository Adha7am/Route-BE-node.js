import {Router} from 'express'
import * as authController from './auth.controller.js'

 const authRouter = new Router()

authRouter.get('/health', authController.checkHealth)
authRouter.post('/register', authController.register)
authRouter.patch('/verify-user', authController.verifyUser)
authRouter.post('/login', authController.login)
authRouter.post('/send-otp', authController.sendOtp)
authRouter.patch('/reset-password', authController.resetPassword)
authRouter.post('/google', authController.loginWithGoogle)


export default authRouter