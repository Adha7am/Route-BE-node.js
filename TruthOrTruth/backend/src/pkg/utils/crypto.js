import crypto from 'node:crypto' 

export function generateOtp(){
    return crypto.randomInt(0, 999999).toString().padStart(6, '0')
}