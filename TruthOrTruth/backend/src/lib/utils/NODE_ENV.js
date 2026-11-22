
/*
declare once, when the module is loaded, rather than on every requeset
because accessing the enviroment vairable frequently causes overhead 
*/
const isProduction = process.env.NODE_ENV == 'production'

export default isProduction