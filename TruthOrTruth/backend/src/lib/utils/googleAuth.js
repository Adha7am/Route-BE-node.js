import { OAuth2Client } from "google-auth-library";
import { AppError } from "../error/AppError.js";
import { env } from "../config/env.js";

const client = new OAuth2Client()

export async function verifyGoogleToken(idToken) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: env.google.webClientId
        });

        return ticket.getPayload();


    } catch (error) {
        console.error("Verification failed:", error);
        throw new AppError('invalid google token', 403)
    }
}