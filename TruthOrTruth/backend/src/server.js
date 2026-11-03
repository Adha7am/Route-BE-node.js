import http from 'http'
import { createApp } from './app.js'
import { env } from './lib/config/env.js';
import { logger } from './pkg/logger/logger.js';
import mongoose from 'mongoose';
import { cacheProvider } from './lib/cache/init.js';

const app = createApp();
const server = http.createServer(app);
/*app.listen() already does this wrapping and returns the server object, and it would work here identically
but generally you would want to create the server explicitly due to :
1- websockets
2- server-level settings
3- https swap without touching the app
4- seperation and testing */

let shuttingDown = false;
async function shutdown(signal) {
    if (shuttingDown) return;
    shuttingDown = true;

    logger.info(`Received ${signal}. Starting graceful shutdown.`);

    server.close(async () => {

        logger.info('closed HTTP server');

        try {
            await mongoose.disconnect();
            logger.info('MongoDB disconnected successfully');
            /* no need to explicitly exit the process since node will do it naturally once the http server is closed and the db is disconnected */
            // process.exit(0) 
        } catch (error) {
            logger.error('Failed to disconnect from MongoDB', error);
            process.exitCode = 1;
        }

        try {
            await cacheProvider.client.quit()
            logger.info('Redis disconnected successfully');

        } catch (error) {
            logger.error('Failed to disconnect from Redis', error);
            process.exitCode = 1;
        }


        // const results = await Promise.allSettled([
        //     mongoose.disconnect(),
        //     cacheProvider.client.quit(),
        // ]);

        // results.forEach((r) => {
        //     if (r.status === 'rejected') {
        //         logger.error('Failed to close a dependency', r.reason);
        //         process.exitCode = 1;
        //     }
        // });
    });
}

process.on('SIGINT', () => shutdown('SIGINT')) //CTRL+C
process.on('SIGTERM', () => shutdown('SIGTERM')) //process managers shutdowns 

server.listen(env.port, () => logger.info(`Server is running on port ${env.port}`));