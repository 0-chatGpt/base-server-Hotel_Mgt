"use strict";

const RoomController = require("../controllers/RoomController.js");
const { IsAdmin } = require("../middlewares/authAccess.js");
const router = require("express").Router();

const controller = new RoomController();

router.get("/", controller.roomByQuery);
router.get("/:roomId", controller.fetchRoom);
router.post("/", IsAdmin, controller.createRoom);
router.patch("/:roomId", IsAdmin, controller.roomEdit);
router.delete("/:roomId", IsAdmin, controller.roomTrash);



module.exports = router;