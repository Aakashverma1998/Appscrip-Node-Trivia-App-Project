const express = require("express");
const questionController  = require("../../controller/questionController");
const router = express.Router();


router.post("/addQuestion",questionController.addQuestion);
router.post("/getQuestionByFillter",questionController.getQuestionByFillter);
router.post("/getQuestion",questionController.getQuestion);


module.exports= router;