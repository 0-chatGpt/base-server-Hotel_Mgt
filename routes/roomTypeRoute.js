"use strict";

// const mongoose = require("mongoose");
const RoomTypeController = require("../controllers/RoomTypeController.js");
const router = require("express").Router();

const controller = new RoomTypeController();

router.get("/", controller.AllRoomTypes);
router.post("/", controller.createRoomType);


module.exports = router;