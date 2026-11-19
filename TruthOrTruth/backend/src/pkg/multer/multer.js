import multer, { diskStorage } from 'multer'
import { AppError } from '../../lib/error/AppError.js'
import crypto from 'node:crypto'
import path from 'node:path'

export function uploadFiles(
    allowedTypes = {
        '.png': 'image/png',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.jpg': 'image/jpg',
        '.webp': 'image/webp'
    }) {
    return multer({

        fileFilter: function (req, file, cb) {

            const ext = path.extname(file.originalname.toLowerCase())

            // validate mimetype & extension
            if (allowedTypes[ext] && allowedTypes[ext] === file.mimetype) return cb(null, true)
            return cb(new AppError('mismatched header or invalid file extension', 400))
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

