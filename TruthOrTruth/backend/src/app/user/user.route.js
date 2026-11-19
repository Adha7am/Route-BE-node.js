import * as userController from './user.controller.js'
import asyncHandler from '../../lib/error/async-err-handling-wrapper.js'
import { Router } from 'express'
import { withCache } from '../../lib/cache/withCache.js'
import { uploadFiles } from '../../pkg/multer/multer.js'
import authGuard from '../auth/auth.guard.js'

const userRouter = new Router()

userRouter.get('/get-all-users',  withCache(), userController.getAllUsers)
userRouter.patch('/update-pfp', authGuard, uploadFiles().single('pfp') , asyncHandler(userController.updateProfilePic) )

export default userRouter