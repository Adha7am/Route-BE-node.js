import { logger } from "../../pkg/logger/logger.js";
import isProduction from "../utils/NODE_ENV.js";


export const globalErrorHandler = (err, req, res, _next) => {

    //remove at production !!
    logger.error('global error-handler', { err, id : req.correlationId})

    res.status(err.statusCode || 500).json({
        success: false,
        requestId : req.correlationId,
        message: err.isOperational ? err.message : 'something went wrong',
        ...( !isProduction && { stack: err.stack })
    });

}