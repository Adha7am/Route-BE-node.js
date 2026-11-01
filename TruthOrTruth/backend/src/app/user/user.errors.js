import { AppError } from "../../pkg/error/AppError.js"

export const userNotFound = new AppError('user not found', 404)//404
export const userAlreadyExists = new AppError('user already exists', 409)//409
export const userAlreadyVerified = new AppError('user is already verified', 400)//400
export const userNotVerified = new AppError('user is not verified', 403)//403