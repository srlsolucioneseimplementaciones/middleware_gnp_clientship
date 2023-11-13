const {
    TOKEN_PASSWORD,
    CRYPTO_PASSWORD,
    ISSUER
} = require("../config");

const db = require("../models");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const Encrypt = (text) => {
    try {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv("AES-256-GCM", CRYPTO_PASSWORD, iv);
        const encryptedData = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
        const authTag = cipher.getAuthTag();
        
        return {
            iv: iv.toString("hex"),
            encryptedData: encryptedData.toString("hex"),
            authTag: authTag.toString("hex")
          };
    } catch (error) {
        // istanbul ignore next
        return error;
    }
}

const Decrypt = (text, iv, authTag) => {
    try {
        const decipher = crypto.createDecipheriv("aes-256-gcm", CRYPTO_PASSWORD, Buffer.from(iv, "hex"));
        decipher.setAuthTag(Buffer.from(authTag, "hex"));
        const decryptedData = Buffer.concat([decipher.update(Buffer.from(text, "hex")), decipher.final()]);

        return decryptedData.toString("utf8");
    } catch (error) {
        // istanbul ignore next
        console.error("Error: ", error);
        // istanbul ignore next
        return;
    }
}

const CreateClientId = (req, res) => {
    let clientId = uuidv4();
    let secret = Encrypt(uuidv4());

    db.StoreClientId(clientId, secret.encryptedData, req.body.nombre, secret.iv, secret.authTag)
        .then(response => {
            let r = {
                "client_id": clientId, 
                "client_secret": secret.encryptedData
            }

            res.status(200).json(r);
        })
        .catch(error => {
            // istanbul ignore next
            res.sendStatus(500)
        })
}

const GenerateToken = (clientId, clientSecret, exp) => {
    return new Promise((resolve, reject) => {
        db.GetClientId(clientId, clientSecret)
            .then(response => {
                // istanbul ignore next
                if(response.recordset[0]) {
                    if(Decrypt(clientSecret, response.recordset[0].iv, response.recordset[0].auth_tag)) {
                        resolve(Sign(clientId, response.recordset[0].nombre, exp));
                    } else {
                        // istanbul ignore next
                        reject("error");
                    }
                } else {
                    reject("error");
                }
            })
            .catch(error => {
                // istanbul ignore next
                console.error("Error: ", error);
                // istanbul ignore next
                reject("error");
            })
    })
}

const Sign = (id, nombre, exp) => {
    let token = jwt.sign({password: id, audience: nombre, issuer: ISSUER}, TOKEN_PASSWORD, {expiresIn: exp});
    return token;
}

const Verify = (req, res, next) => {
    try {
        console.log(req);
        const token = req.header("authorization");
        // istanbul ignore next
        if(!token) {
            // istanbul ignore next
            return res.status(401).send("El token de autenticacion es obligatorio");
        }

        jwt.verify(token.replace("Bearer ", ""), TOKEN_PASSWORD);
        return next();
    } catch (error) {
        // istanbul ignore next
        console.error("Error: ", error);
        // istanbul ignore next
        return res.status(401).send("Token invalido");
    }
}

const VerifyRefreshToken = (token) => {
    try {
        if(!token) {
            return;
        }

        let t = jwt.verify(token, TOKEN_PASSWORD);
        let newToken = Sign(t.password, t.audience, "1h");
        let newRefreshToken = Sign(t.password, t.audience, "8h");

        return { "token": newToken, "refreshToken": newRefreshToken }
    } catch (error) {
        return;
    }
}

module.exports = {
    Encrypt,
    Decrypt,
    Sign,
    Verify,
    VerifyRefreshToken,
    CreateClientId,
    GenerateToken
}