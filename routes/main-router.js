const express = require("express");
const router = express.Router();
const controller = require("../controllers/main-controller.js");

router.post("/send-message", controller.sendMessage);

module.exports = router;
