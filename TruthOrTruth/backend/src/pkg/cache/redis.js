import Redis from 'ioredis'

export class RedisCacheProvider{
    
    client;

    constructor(config){
        this.client = new Redis({
            host : config.host,
            port : config.port,
            lazyConnect : true,
            password : config.password,
            maxLoadingRetryTime : 3
        })

        this.client.on('error', (error) => console.log(`redis server error :  ${error}`))
        this.client.connect().catch((error) => console.log(`failed to connect to Redis : ${error}`))
    }

    async set(key, value, ttl){
        return this.client.set(key, value, 'EX', ttl)
    }

    async get(key){
        return this.client.get(key)
    }

    async del(key){
        return this.client.del(key)
    }
}