export const toMs  = {
     seconds  :  (n) => {
        return n * 1000 
    },
    minutes :  (n) => {
         return n * 1000 * 60
    },
    hours : (n) => {
         return n * 1000 * 60 * 60
    },
    days :  (n) => {
         return n * 1000 * 60 * 60 * 24
    }
}