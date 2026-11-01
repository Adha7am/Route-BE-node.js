import * as z from 'zod'

export const registerDTO = z.object({
    name: z.string().trim().min(3).max(20),
    email: z.email().trim().toLowerCase(),
    password: z.string().trim().min(8).max(16),
    gender: z.enum(['male', 'female', 'unknown']).default('unknown'),
    dob: z.date().optional()
})

export const loginDTO = z.object({
    email: z.email().trim().toLowerCase(),
    password: z.string().trim().min(8).max(16)
})

export const sendOtpDTO = z.object({
    email: z.email().trim().toLowerCase()
})

export const resetPasswordDTO = z.object({
    email: z.email().trim().toLowerCase(),
    newPassword: z.string().trim().min(8).max(16),
    code: z.string().trim().length(6)
})

export const verifyUserDTO = z.object({
    email: z.email().trim().toLowerCase(),
    code: z.string().trim().length(6)
})