import mongoose from 'mongoose';
import Otp from './otp.model.js'
import { toMs } from '../../pkg/utils/time.js';

export function checkHealth() {
    return mongoose.connection.readyState === 1;
}

export async function createOtp(data) {
    const {code, email, expiresAt} = data
    return Otp.create({ code: code, email: email, expiresAt: expiresAt || (new Date(Date.now() + toMs.minutes(10))) })
}

export async function findOtp(email) {
    return Otp.findOne({ email, expiresAt: { $gt: new Date() } }) 
}

export async function deleteOtp(email) {
    return Otp.deleteMany({ email })
}
