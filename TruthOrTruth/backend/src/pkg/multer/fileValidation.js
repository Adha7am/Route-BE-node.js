import * as fs from 'node:fs'
import { fileTypeFromFile } from 'file-type'
import { AppError } from '../../lib/error/AppError.js';

export const allowedTypes = {
    '.png': 'image/png',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.jpg': 'image/jpg',
    '.webp': 'image/webp'
};

export const fileValidation = (allowed = allowedTypes) => {
    return async (req, res, next) => {

        const type = await fileTypeFromFile(req.file.path)

        if (!type || !Object.values(allowed).includes(type.mime)) {
            fs.unlinkSync(req.file.path)
            return next(new AppError('invalid file type', 400))
        }
        next()
    }
}