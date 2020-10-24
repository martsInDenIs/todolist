const express = require("express");
const loginController = require("../controllers/loginController.js");
const checkUserController = require("../controllers/checkUserController.js");

const loginRouter = express.Router();

loginRouter.post('/',loginController.checkLogin);
loginRouter.get('/', loginController.homeLoginPage);

module.exports = loginRouter;