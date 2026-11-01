import http from 'http'
import { createApp } from './app.js'

async function shutdown(){
    await mongoose.disconnect();
    process.exit(0)
} 

const app = createApp();
const server = http.createServer(app);

server.listen(env.port, () => logger.info('running on port' + env.port))

server.on('SIGINT', shutdown) //CTRL+C
server.on('SIGTERM', shutdown) //unexpected shutdowns