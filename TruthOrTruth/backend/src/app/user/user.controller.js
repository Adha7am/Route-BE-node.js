import { id } from 'zod/v4/locales'
import * as userService from './user.service.js'

export async function getAllUsers(req, res, next) {

    const users = await userService.getAllUsers()
    return res.json({
        success: true,
        data: users
    })
}

export async function updateProfilePic(req, res, next) {

    const path = `${req.file.destination}${req.file.filename}`

    const user = await userService.updateProfilePic(req.user.id, path)

    return res.json({
        message : 'pfp updated successfully',
        success : true,
        data : req.file,
        user 
    })

}