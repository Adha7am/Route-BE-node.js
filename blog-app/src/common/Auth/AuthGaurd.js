const { findUserById } = require('../../app/auth/auth.repo');
const jwt = require('jsonwebtoken')

async function authGaurd(req, res, next) {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) throw new Error('auth header missing')

        const token = authorization.split(" ")[1];
        if (!token) throw new Error('missing token')
          
        const payload = jwt.verify(token, process.env.JWT_KEY)
            
        const userExists = await findUserById(payload.userId);
        if (!userExists) throw new Error('user not found.')

        req.user = payload;
        next()
    } catch (error) {
        next(error)
    }
}
module.exports = authGaurd