const {Router}= require("express");
const { register } = require("./auth.controller");

const authRouter = Router();

authRouter.post('/register', register)

module.exports = authRouter;