
import './lib/db/mongoose.js'
import express from 'express';
import cors from 'cors'
import { globalErrorHandler } from './lib/error/error.handler.js';
import { router } from './route.js';
import { correlationId } from './lib/correlationID/correlationId.js';

//app
export function createApp() {

    const app = express();

    //cors policy
    app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

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
