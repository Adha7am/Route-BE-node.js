import { toMs } from "../../pkg/utils/time.js";
import { cacheProvider } from "./init.js";

export function withCache (ttl = toMs.hours(1)) {
    return async (req, res, next) => {

        let key = `${req.method} : ${req.originalUrl}`;

        //check for cached
        const cached = await cacheProvider.get(key)

        // if yes return cached response
        if (cached) {
            res.setHeader('X-Cache', 'HIT')
            return res.json(JSON.parse(cached))
        }

        const originalJson = res.json.bind(res);

        //interceptor
        res.json = async (body) => {
            //cache the body
            await cacheProvider.set(key, JSON.stringify(body), ttl)

            //send the response
            res.setHeader('X-Cache', 'MISS')
            return originalJson(body)
        }

        next()
    }
}