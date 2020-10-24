const express = require("express");
const addTasksController = require("../controllers/addTasksController.js");
const checkUserController = require("../controllers/checkUserController.js");

const addTasksRouter = express.Router();

addTasksRouter.get('/',checkUserController.isCustomerIn,addTasksController.showMainPage);
addTasksRouter.get('/exit',addTasksController.userExit);
addTasksRouter.get('/createTask',addTasksController.addTask);
addTasksRouter.post('/add',addTasksController.checkTask);
addTasksRouter.get('/delete/:id',addTasksController.deleteTask);
addTasksRouter.get('/update/:id',addTasksController.showChangeTaskForm);
addTasksRouter.post("/update/:id",addTasksController.saveChangedTask);
addTasksRouter.get("/byDay",addTasksController.getTasksByDay);
addTasksRouter.get("/byMonth",addTasksController.getTasksByMonth);
addTasksRouter.get("/byYear",addTasksController.getTasksByYear);

module.exports = addTasksRouter;