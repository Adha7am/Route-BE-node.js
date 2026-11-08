import { logger } from "../../pkg/logger/logger.js";
import { cacheProvider } from "./init.js";

export function withCache(ttl = 3600) {
    return async (req, res, next) => {

        //to only cache get requests
        if (req.method !== 'GET') next();
        let key = `${req.method} : ${req.originalUrl}`;
        throw new AppError('a7a')
        //check for cached
          const cached = await cacheProvider.get(key).catch((err) => logger.error("cache read failed", err))

        // if yes return cached response
        if (cached) {
            res.setHeader('X-Cache', 'HIT')
            return res.json(JSON.parse(cached))
        }

        const originalJson = res.json.bind(res);

        //interceptor
        res.json = async (body) => {
            // to only cache successfull responses
            if (res.statusCode >= 200 && res.statusCode < 300) {
                //cache the body
                const miss = await cacheProvider.set(key, JSON.stringify(body), ttl)
                    .catch((err) => logger.error("cache write failed", err))

            }
            //send the response
            res.setHeader('X-Cache', 'MISS')
            return originalJson(body)
        }

        return next()
    }
}