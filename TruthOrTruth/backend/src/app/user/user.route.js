
import { Router } from 'express'
import User from './user.model.js'
import { withCache } from '../../lib/cache/withCache.js'

const userRouter = new Router()

userRouter.get('/get-all-users',  withCache(), async (req, res, next) => {
    try {
        const users = await User.find({})
        return res.json({
            success : true,
            data : users
        })
    } catch (error) {
        next(error)
    }

})

export default userRouter