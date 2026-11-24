import mongoose from 'mongoose' 
import { env } from '../config/env.js'


try {
    await mongoose.connect(env.db.mongodbURI);

    logger.info('MongoDB connected successfully');
} catch (error) {
    //handle the rejection mannually instead of silently crashing the server
    logger.error('MongoDB connection failed', error);
    //set exitCode to 1, instead of force terminate the process and interrupting pending cleanup operations 
    process.exitCode = 1 ;
}