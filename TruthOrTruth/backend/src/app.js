//.env variables configurations [side-effect import]
// automatically executes dotenv's configuration when the module is loaded.

import './lib/db/mongoose.js'
import express from 'express';
import authRouter from './app/auth/auth.route.js';
import userRouter from './app/user/user.route.js';
import messageRouter from './app/message/message.route.js';
import cors from 'cors'
import { logger } from './pkg/logger/logger.js';
import { env } from './lib/config/env.js';
import { globalErrorHandler } from './lib/error/error.handler.js';
import { router } from './route.js';

//app
export function createApp() {

    const app = express();

    //cors policy
    app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

    //parsing every response body
    app.use(express.json())

    //routes
    app.use('/api', router)

    //global error handler
    app.use(globalErrorHandler)

    return app

}
