// core module
const path = require('path');

// External Module
const express = require('express');
const homeController = require("../controllers/homesController");
const faviouritesController=require("../controllers/faviourites")

const userRouter = express.Router();

// Home page route
userRouter.get("/", homeController.getHome);
userRouter.get("/bookings",homeController.Bookings);
userRouter.get("/favourites",faviouritesController.getFavourites);
userRouter.get("/homes/:homeId",homeController.getHomesDetail);
userRouter.post("/favourites",faviouritesController.postAddFavourites);
userRouter.get('/delete-fav-home/:homeId',faviouritesController.deleteFromFavourites);
module.exports = userRouter;