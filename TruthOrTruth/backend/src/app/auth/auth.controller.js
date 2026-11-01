import {logger} from '../../pkg/logger/logger.js'
import { toMs } from "../../pkg/utils/time.js";
import { validateBody } from "../../pkg/validation/validation.js";
import { loginDTO, registerDTO, resetPasswordDTO, sendOtpDTO, verifyUserDTO } from "./auth.dto.js";
import * as authService from "./auth.service.js";

export function checkHealth(req, res, next) {
    try {
        authService.checkHealth()

        res.status(200).json({
            message: "database connected",
            success: true,
        })
    } catch (error) {
        next(error)
    }
}

export async function register(req, res, next) {
    try {

        const data = validateBody(registerDTO, req.body)
        logger.info('validated body : ',data);

        const user = await authService.register(data)

        res.status(201).json({
            message: 'user created successfully',
            success: true,
            data: user
        })
    } catch (error) {
        next(error)
    }
}

export async function verifyUser(req, res, next) {
    try {

        const data = validateBody(verifyUserDTO, req.body)
        const { email, code } = data

        const verifiedUser = await authService.verifyUser(email, code)

        res.status(200).json({
            message: 'user verified successfully',
            success: true,
            data: verifiedUser
        })
    } catch (error) {
        next(error)
    }
}

export async function login(req, res, next) {
    try {

        const data = validateBody(loginDTO, req.body)
        const { email, password } = data

        const token = await authService.login(email, password)
        res.cookie('access-token', token, {
            httpOnly: true,
            maxAge: toMs.hours(1),
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        })

        res.status(200).json({
            message: "logged in successfully",
            success: true
        })
    } catch (error) {
        next(error)
    }
}

export async function sendOtp(req, res, next) {
    try {
        const data = validateBody(sendOtpDTO, req.body)
        const { email } = data
        await authService.sendOtp(email)

        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}

export async function resetPassword(req, res, next) {
    try {
        const data = validateBody(resetPasswordDTO, req.body)
        const { email, newPassword, code } = data
        await authService.resetPassword(email, newPassword, code)

        res.status(200).json({
            message: "password reset successfully",
            success: true
        })
    } catch (error) {
        next(error)
    }
}

export async function loginWithGoogle(req, res, next) {
    try {
        const { token, statusCode } = await authService.loginWithGoogle(req.body.credential)
        res.cookie('access-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: toMs.hours(1)
        })

        res.status(statusCode).json({
            message: 'user loggedin successfully ',
            success: true
        })
    } catch (error) {
        next(error)
    }
}