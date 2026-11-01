import { AppError } from "../../pkg/error/AppError.js"

export const expiredOtp = new AppError('OTP Expired, request new OTP', 404)//404
export const invalidOtp = new AppError('Invalid OTP', 404)//403
export const invalidCreds = new AppError('Invalid Credentials', 403)//403