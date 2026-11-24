//.env variables configurations [side-effect import]
// automatically executes dotenv's configuration when the module is loaded.
import 'dotenv/config';
import { z } from 'zod'
import { logger } from '../../pkg/logger/logger.js';

const schema = z.object({
    CORS_ORIGIN : z.string().trim(),
    PORT: z.coerce.number().int().min(1).max(65535).default(3000),

    REDIS_HOST: z.string().trim(),
    REDIS_PORT: z.coerce.number().int().min(1).max(65535).default(6379),
    REDIS_PASSWORD: z.string().trim().optional(),

    MONGODB_URI: z.string().trim(),

    NODEMAILER_EMAIL: z.email().trim().toLowerCase(),
    NODEMAILER_PASS: z.string(),

    JWT_SECRET: z.string(),
    GOOGLE_OAUTH_WEB_CLIENT_ID: z.string().trim()
})

const parsed = schema.parse(process.env)

export const env = {
    corsOrigin : parsed.CORS_ORIGIN,
    port : parsed.PORT,
    db: {
        mongodbURI: parsed.MONGODB_URI
    },
    nodemailer: {
        user: parsed.NODEMAILER_EMAIL,
        password: parsed.NODEMAILER_PASS
    },
    jwt: {
        secret: parsed.JWT_SECRET
    },
    google: {
        webClientId: parsed.GOOGLE_OAUTH_WEB_CLIENT_ID
    },
    redis: {
        host: parsed.REDIS_HOST,
        port: parsed.REDIS_PORT,
        password: parsed.REDIS_PASSWORD
    }

}