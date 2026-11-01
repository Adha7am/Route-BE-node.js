import { config } from 'dotenv';
//.env variables configurations
config()
import './lib/db/mongoose.js'
import express from 'express';
import authRouter from './app/auth/auth.route.js';
import mongoose from 'mongoose';
import userRouter from './app/user/user.route.js';
import messageRouter from './app/message/message.route.js';
import cors from 'cors'

//app
const app = express();

app.use(cors({origin : 'http://localhost:5173', credentials : true}))

//parsing every response body
app.use(express.json())

//routes
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/message', messageRouter)


//global error handler
app.use((err, req, res, next) => {

    if (err.isOperational) {
        res.status(err.statusCode).json({
            message: err.message,
            success: false,
        })
        return
    } else {
        //remove at prod
        console.log(err.stack);
        
        res.status(500).json({
            message: 'something went wrong',
            success: false,
            stack : err.stack
        })
        return
    }

})


app.listen(3000, () => console.log("running on port 3000"))