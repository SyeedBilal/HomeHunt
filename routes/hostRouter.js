const express = require('express');

const hostHomeController = require("../controllers/hostController");

const hostRouter = express.Router();

// GET route for adding a home
hostRouter.get("/add-Home", hostHomeController.getAddHome);

// POST route for adding a home
hostRouter.post("/add-Home",hostHomeController.postAddHome);
hostRouter.get("/host-home-list",hostHomeController.getHostHome);
hostRouter.get("/edit-home/:homeId",hostHomeController.getEditHome);
hostRouter.post("/edit-home",hostHomeController.postEditHome);
hostRouter.get("/delete-home/:homeId",hostHomeController.getdeleteHome);



// this is method 1 directly getting is from the input ,but we prefer method 2 in which input text is hidden 
// hostRouter.post("/edit-home/:homeId",hostHomeController.postEditHome);
module.exports = hostRouter;