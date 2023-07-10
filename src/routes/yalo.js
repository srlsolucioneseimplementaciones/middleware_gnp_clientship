const express = require("express");
const auth = require("../middleware");
const { SendHSM } = require("../controllers/yaloController.js");
const router = express.Router();

router.post("/api/whatsapp/message", auth.Verify, SendHSM);

module.exports = router;