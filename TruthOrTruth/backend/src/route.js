import {Router} from 'express'
import authRouter from './app/auth/auth.route'
import userRouter from './app/user/user.route'
import messageRouter from './app/message/message.route'

export const router = new Router()

//routes
router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/message', messageRouter)
