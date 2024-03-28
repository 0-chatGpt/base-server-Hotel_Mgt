"use strict";

// const mongoose = require("mongoose");
const RoomTypeController = require("../controllers/RoomTypeController.js");
const router = require("express").Router();
const {IsAdmin} = require("../middlewares/authAccess.js")

const controller = new RoomTypeController();

router.get("/", controller.AllRoomTypes);
router.post("/", IsAdmin, controller.createRoomType);


module.exports = router;