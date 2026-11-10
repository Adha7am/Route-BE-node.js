import { env } from '../../lib/config/env.js';
import { AppError } from '../../lib/error/AppError.js';
import { logger } from '../../pkg/logger/logger.js';
import { getUserOrThrow } from '../user/user.helper.js';
import jwt from 'jsonwebtoken'

async function authGuard(req, res, next) {

    const [scheme, token] = (req.headers.authorization ?? '').split(' ');
    //to validate token existence and that it is of scheme "bearer"
    if (scheme !== 'Bearer' || !token) {
        throw new AppError('missing or malformed auth header', 401);
    }

    let payload;
    try {
        payload = jwt.verify(token, env.jwt.secret)
    } catch (error) {
        throw new AppError('Invalid token', 401)
    }

    await getUserOrThrow({ id: payload.id })

    req.user = payload;

    next();
}
export default authGuard