const express = require("express");
const auth = require("../middleware");
const { SendHSM, GetMessageIdDB } = require("../controllers/yaloController.js");
const router = express.Router();

router.post("/api/whatsapp/message", auth.Verify, SendHSM);
router.get("/api/whatsapp/messageid/:telefono", GetMessageIdDB);

module.exports = router;