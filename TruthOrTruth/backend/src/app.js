
import './lib/db/mongoose.js'
import express from 'express';
import cors from 'cors'
import { globalErrorHandler } from './lib/error/global-error-handler.js';
import { router } from './route.js';
import { correlationId } from './lib/correlationID/correlationId.js';
import { env } from './lib/config/env.js';


//app
export function createApp() {

    const app = express();

    //cors policy
    app.use(cors({ origin: env.corsOrigin, credentials: true }))

    //parsing every response body
    app.use(express.json())

    //Attach a correlationId
    app.use(correlationId)

    //routes
    app.use('/api', router)

    //global error handler
    app.use(globalErrorHandler)

    return app

}
