import * as userService from './user.service.js' 

export async function getAllUsers(req, res, next) {
    try {
        const users = await userService.getAllUsers()
        return res.json({
            success: true,
            data: users
        })
    } catch (error) {
        next(error)
    }
}