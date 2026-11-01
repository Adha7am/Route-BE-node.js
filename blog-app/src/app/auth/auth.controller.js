const authService = require('./auth.service')

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) throw new Error('missing credentials')

        const token = await authService.register(username, email, password)

        res.json({ message: "created user successfully", "success": true, data: token })

    } catch (error) {
        next(error)
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body
        if (!email || !password) throw new Error('invalid credentials')

        const token = await authService.login(email, password)
        res.status(200).json({ message: "logged in successfully", success: true, data: token })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    register,
    login
}