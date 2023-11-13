const express = require("express");
const auth = require("../middleware");
const { SendHSM, GetMessageIdDB, GetPoliza, SendToClientShip } = require("../controllers/yaloController.js");
const router = express.Router();

router.post("/api/whatsapp/message", auth.Verify, SendHSM);
router.post("/api/whatsapp/clientship", SendToClientShip);
router.get("/api/whatsapp/messageid/:telefono", GetMessageIdDB);
router.get("/api/whatsapp/poliza/:telefono", GetPoliza);

module.exports = router;