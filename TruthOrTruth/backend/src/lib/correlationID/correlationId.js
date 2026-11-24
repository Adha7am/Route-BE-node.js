import crypto from 'node:crypto'

export async function correlationId(req, _res, next){
    const id = crypto.randomUUID();
    req.correlationId = id;
    return next();
}