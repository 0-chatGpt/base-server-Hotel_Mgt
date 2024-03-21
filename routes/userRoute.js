"use strict";

const router = require("express").Router();
const userController = require("../controllers/UserController");
const validateUser = require("../middlewares/validJOI.js");
// cosnt validateUser

const controller = new userController();

router.post("/register", validateUser, controller.register);
router.post("/login", validateUser, controller.fetchByLogin);
// router.get();
// router.get();


module.exports = router;