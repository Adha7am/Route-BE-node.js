import crypto from 'node:crypto'
import { logger } from '../../pkg/logger/logger.js';

export async function correlationId(req, _res, next){
    const id = crypto.randomUUID();
    req.correlationId = id;
    return next();
}