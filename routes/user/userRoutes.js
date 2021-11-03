const express = require("express");
const router = express.Router();

const userController  = require("../../controller/userController");


router.post("/register",userController.register);
router.get("/getAllUser",userController.getUserList);
router.post("/addUserAnswer",userController.addUserAnswer);
router.post("/getUserResult",userController.getUserResult)
router.get("/getUserallResult",userController.getUserallResult)

module.exports= router;