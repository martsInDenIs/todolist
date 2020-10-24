const express = require("express");
const createUserController = require("../controllers/createUserController.js");

const createUserRouter = express.Router();


createUserRouter.get("/",createUserController.showCreateUser);
createUserRouter.post("/",createUserController.createUser);


module.exports = createUserRouter;