
//declare once, when the module is loaded, rather than on every requeset
const isProduction = process.env.NODE_ENV == 'production'

export default isProduction