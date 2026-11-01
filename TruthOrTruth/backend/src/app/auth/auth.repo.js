import mongoose from 'mongoose';
import Otp from './otp.model.js'

export function checkHealth() {
    return mongoose.connection.readyState === 1;
}

export async function createOtp(data) {
    return await Otp.create(data)
}

export async function findOtp(email) {
    return await Otp.findOne({ email })
}

export async function deleteOtp(email) {
    return await Otp.deleteMany({ email })
}