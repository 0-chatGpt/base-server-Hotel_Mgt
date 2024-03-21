"use strict";

const RoomController = require("../controllers/RoomController.js");
const router = require("express").Router();

const controller = new RoomController();

router.get("/", controller.roomByQuery);
router.get("/:roomId", controller.fetchRoom);
router.post("/", controller.createRoom);
router.patch("/:roomId", controller.roomEdit);
router.delete("/:roomId", controller.roomTrash);



module.exports = router;