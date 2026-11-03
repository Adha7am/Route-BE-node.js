import { logger } from "../../pkg/logger/logger.js";
import { cacheProvider } from "./init.js";

export function withCache (ttl = 3600) {
    return async (req, res, next) => {

        let key = `${req.method} : ${req.originalUrl}`;

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
            //cache the body
            const miss = await cacheProvider.set(key, JSON.stringify(body), ttl)
                .catch((err) => logger.error("cache write failed", err))

            logger.info('missed cache', miss)
      
            //send the response
            res.setHeader('X-Cache', 'MISS')
            return originalJson(body)
        }

        return next()
    }
}