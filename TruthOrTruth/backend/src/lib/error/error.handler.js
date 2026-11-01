export const globalErrorHandler = (err, _req, res, _next) => {

    //remove at production !!
    logger.error('global error-handler', err)

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.isOperational ? err.message : 'something went wrong',
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });

}