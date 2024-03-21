"use strict";

const router = require("express").Router();
const verifyUserToken = require("../middlewares/authJWT.js");
const {IsAdmin, IsUser} = require("../middlewares/authAccess.js");
const roomRoute = require("./roomRoute.js");
const roomTypeRoute = require("./roomTypeRoute.js");
const userRoute = require("./userRoute.js");

router.use("/", userRoute);
router.use("/room-types", verifyUserToken, IsUser, roomTypeRoute);
router.use("/room", verifyUserToken, IsUser,  roomRoute);

module.exports = router;