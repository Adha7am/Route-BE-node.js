import multer, { diskStorage } from 'multer'
import { AppError } from '../../lib/error/AppError.js'
import crypto from 'node:crypto'
import path from 'node:path'
import { allowedTypes } from "./fileValidation.js";


export function requireMultipart (req, res, next ) {
    if(!req.is('multipart/form-data')) next(new AppError('body must be multipart/form-data', 400))
    next()
}


export function wuploadFiles(allowed = allowedTypes) {
    return multer({

        fileFilter: function (req, file, cb) { 
            const ext = path.extname(file?.originalname.toLowerCase())

            // validate mimetype & extension
            if (allowed[ext] && allowed[ext] === file.mimetype) return cb(null, true)
            return cb(new AppError('mismatched header or invalid file extension', 400), false)
        },

        storage: diskStorage({
            filename: function (req, file, cb) {
                return cb(null, `${crypto.randomUUID()}_${file.originalname}`)
            },
            destination: 'uploads/'
        })
    })
}

//.single(fieldName)
//.array(fieldName, maxCount)
//.fields(fields)
// : fields = [{name : "", maxCount : 3 }, {...}] 

