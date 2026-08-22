const authService = require('./auth.service')

const register = (req, res, next) => {
    const data = authService.register(req.body.name, req.body.age, req.body.email)

    res.json({"message" : "done", "data" : data})
}

module.exports = {
    register
}