const express = require("express");
const auth = require("../middleware");;
const router = express.Router();

router.post("/auth/login", (req, res) => {
    let clientId = req.body.clientId;
    let clientSecret = req.body.clientSecret;
    auth.GenerateToken(clientId, clientSecret, "1h")
        .then(response => {
            auth.GenerateToken(clientId, clientSecret, "8h")
                .then(response2 => {
                    res.status(200).json({"token": response, "refreshToken": response2});
                })
                .catch(error2 => {
                    // istanbul ignore next
                    res.sendStatus(401);
                })
        })
        .catch(error => {
            res.sendStatus(401);
        })
});

router.post("/auth/signup", auth.CreateClientId);

router.post("/auth/token", (req, res) => {
    let token = req.body.refreshToken;
    try {
        let t = auth.VerifyRefreshToken(token);

        if(t && t.token) {
            res.status(200).json(t);
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        // istanbul ignore next
        res.sendStatus(401);
    }
});

module.exports = router;