"use strict";

const router = require("express").Router();
const roomRoute = require("./roomRoute.js");
const roomTypeRoute = require("./roomTypeRoute.js");

router.use("/room-types", roomTypeRoute);
router.use("/room", roomRoute);

module.exports = router;