import * as userController from './user.controller.js'
import asyncHandler from '../../lib/error/async-err-handling-wrapper.js'
import { Router } from 'express'
import { withCache } from '../../lib/cache/withCache.js'
import { requireMultipart, uploadFiles } from '../../pkg/multer/multer.js'
import authGuard from '../auth/auth.guard.js'
import { fileValidation } from '../../pkg/multer/fileValidation.js'

const userRouter = new Router()

userRouter.get('/get-all-users', withCache(), userController.getAllUsers)

userRouter.patch('/update-pfp',
    asyncHandler(authGuard),
    requireMultipart,
    uploadFiles().single('pfp'),
    asyncHandler(fileValidation()),
    asyncHandler(userController.updateProfilePic))

export default userRouter