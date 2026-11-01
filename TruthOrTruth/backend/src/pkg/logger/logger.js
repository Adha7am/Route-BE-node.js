class Logger {

    constructor() {
        if (!Logger.instance) {
            Logger.instance = this;
        }
        return Logger.instance
    }

    log( message, metaData, level = 'log') {

        let data; 
        if (metaData instanceof Error) {
             data =  {
                name: metaData.name,
                message: metaData.message,
                statusCode: metaData.statusCode ?? metaData.response?.status,
                stack: metaData.stack,
            }
        }


        if (metaData !== null && typeof metaData === 'object') data = metaData;

        data = { data: metaData };

        console.log({ level, message, ...data, timestamp : new Date( Date.now())})
    }
    
    info(msg, metaData) {
        this.log(  msg, metaData, 'info');
    }
     error(msg, metaData) {
        this.log(msg ,metaData, 'error');
    }
}

export const logger = new Logger();
