import { sendEmail } from '../../lib/email/nodemailer.js'
import * as userRepo from '../user/user.repo.js'
import * as authRepo from './auth.repo.js'
import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import jwt from 'jsonwebtoken'
import { getUserOrThrow, assertUserDoesNotExist } from '../../lib/utils/user.helper.js'
import { userAlreadyExists, userAlreadyVerified, userNotVerified } from '../user/user.errors.js'
import { expiredOtp, invalidCreds, invalidOtp } from './auth.errors.js'
import { comparePassword, hashPassword } from '../../pkg/utils/hash.js'
import { toMs } from '../../pkg/utils/time.js'
import { generateToken } from '../../lib/utils/token.js'
import { verifyGoogleToken } from '../../lib/utils/googleAuth.js'

export function checkHealth() {
    const dbConnected = authRepo.checkHealth()

    if (!dbConnected) throw new Error('not connected')

    return
}

export async function register(userData) {

    //check that user does NOT exist AND throw if it does
    await assertUserDoesNotExist(userData.email)

    //hash password
    userData.password = await hashPassword(userData.password)

    //create user
    let  user;
    try {
         user = await userRepo.createUser(userData)
    } catch (error) {
        //catches MongoDB duplicated-key error [race condition]
        if (error.code === 11000) {
            throw userAlreadyExists
        }

        throw error
    }

    //verify user email [send otp]
    const otp = crypto.randomInt(0, 999999).toString().padStart(6, '0')

    //save otp into db
    await authRepo.createOtp({ code: otp, email: userData.email, expiresAt: Date.now() + 1000 * 60 * 5 })

    //send the otp email
    sendEmail(userData.email, 'Verification Code From Truth Or Truth', `Your OTP Is <h1>${otp}</h1>`)

    return user
}

export async function verifyUser(email, code) {

    //check that user Exists AND throw if it does not
    const user = await getUserOrThrow(email)
    //throw error if user is already verified
    if (user.isVerified === true) throw userAlreadyVerified

    //look for otp
    const otp = await authRepo.findOtp(email)
    //throw error if otp doesnt exist
    if (!otp) throw expiredOtp
    //throw error if response otp doesnt match the one in database
    if (otp.code !== code) throw invalidOtp
    //update user.isVerified = true
    const verifieduser = await userRepo.updateUserByEmail(email, { isVerified: true })

    //force delete every otp to this user after verification
    await authRepo.deleteOtp(email)

    return verifieduser
}

export async function login(email, password) {

    //check that user Exists AND throw if it does not
    const user = await getUserOrThrow(email)

    //compare password hash
    const match = await comparePassword(password, user.password)
    //throw error if password is invalid
    if (!match) throw invalidCreds

    //throw if user email is not verified 
    if (!user.isVerified) throw userNotVerified

    //create token
    return generateToken({ id: user._id, name: user.name, email: user.email })

}

export async function sendOtp(email) {

    //check that user Exists AND throw if it does not
    await getUserOrThrow(email)
    //generate otp /*TODO*/ dependency inversion
    const otp = crypto.randomInt(0, 999999).toString().padStart(6, '0')

    //save otp into db
    await authRepo.createOtp({ code: otp, email: email, expiresAt: new Date(Date.now() + toMs.days(1)) })

    //send the otp email
    sendEmail(email, 'Verification Code From Truth Or Truth', `Your OTP Is <h1>${otp}</h1>`)
}

export async function resetPassword(email, newPassword, otpCode) {
    // validate otp
    const otp = await authRepo.findOtp(email)
    if (!otp) throw expiredOtp
    if (otp.code !== otpCode) throw invalidCreds

    // hash password
    const hashedNewPassword = await hashPassword(newPassword)
    // reset password
    await userRepo.updateUserByEmail(email, { password: hashedNewPassword })

    //delete otp
    await authRepo.deleteOtp(email)
}

export async function loginWithGoogle(idToken) {
    //verify idToken is from google
    const payload = await verifyGoogleToken(idToken)
    console.log( payload);

    // if user exists return the token
    const user = await userRepo.findUserByEmail(payload.email)


    if (user) {
        const token = generateToken({
            id: user._id,
            email: user.email
        })
        return {token : token , statusCode : 200}
    }
    //if not, create user
    const newUser = await userRepo.createUser({
        email: payload.email,
        name: payload.name,
        provider: 'google',
        isVerified: true
    })

    //generate token
    const token =  generateToken({ id: newUser._id, email: newUser.email })
    return {token : token , statusCode : 201}

}