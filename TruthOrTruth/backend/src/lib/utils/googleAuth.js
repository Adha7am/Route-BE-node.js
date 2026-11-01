import { OAuth2Client } from "google-auth-library";
import { AppError } from "../../pkg/error/AppError.js";

const client = new OAuth2Client()

export async function verifyGoogleToken(idToken) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: process.env.OAUTH_CLIENT_ID,
        });

        return ticket.getPayload();


    } catch (error) {
        console.error("Verification failed:", error);
        throw new AppError('invalid google token', 403)
    }
}