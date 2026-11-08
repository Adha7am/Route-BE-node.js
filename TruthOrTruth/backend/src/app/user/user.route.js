import * as userController from './user.controller.js'

import { Router } from 'express'
import User from './user.model.js'
import { withCache } from '../../lib/cache/withCache.js'

const userRouter = new Router()

userRouter.get('/get-all-users',  withCache(), userController.getAllUsers)

export default userRouter