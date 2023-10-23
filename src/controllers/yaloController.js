const {
    TOKEN_HSM_YALO,
    YALO_HSM_URL,
    CONNECTORRS_URL
} = require("../config");
const axios = require("axios");
const moment = require("moment");
const { InsertHSM, InsertMSG, GetMessageId } = require("../models");
const { templates } = require("../models/templates");
const { v4: uuidv4 } = require('uuid');

const SendHSM = (req, res) => {
    console.log("Inicio ", moment().format("YYYY-MM-DD HH:mm:ss.SSS"));
    console.log("Se enviara mensaje al numero " + req.body.to);
    let to = req.body.to;
    let template = req.body.template;
    let params = req.body.params;
    let index = templates.findIndex((e) => e.nombre == template);

    let curTemplate = templates[index].text;
    let keys = Object.keys(params);

    keys.forEach((k) => {
        curTemplate = curTemplate.replace("{{" + k + "}}", params[k]);
    })

    const data = {
        type: template,
        users:[
            {
                phone: to,
                params: params
            }
        ]
    }

    const options = {
        method: "POST",
        url: YALO_HSM_URL,
        headers: {
            "Content-Type": "application/json",
            "Authorization": TOKEN_HSM_YALO
        },
        data: JSON.stringify(data)
    }

    let datos = {
        "nombre": template,
        "telefono": to.replace("+52", "521"),
        "usuario": "clientship",
        "template": curTemplate
    }

    axios(options)
        .then(response => {
            InsertHSM(datos)
                .then(async dbResponse => {
                    console.log("Fin ", moment().format("YYYY-MM-DD HH:mm:ss.SSS"));
                    let id = uuidv4();
                    let t = {
                        telefono: req.body.to.slice(-10),
                        params: JSON.stringify(req.body.params),
                        uuid: id 
                    }
                    await InsertMSG(t);
                    let g = {
                        "to": req.body.to.slice(-10),
                        "message": curTemplate,
                        "platform": "yalo",
                        "channel": "whatsapp",
                        "template": template,
                        "type": "agent",
                        "service": "Geolocalización",
                        "agentId": "9a2204f1-ba67-4773-b1d7-f9c4b1da6715",
                        "isTemplate": true
                    }

                    await SendMessageToGenesys(g);

                    res.status(200).json({"to": req.body.to, "id": id});
                })
                .catch(dbError => {
                    console.error(dbError);
                })
            
            
        })
        .catch(error => {
            console.error("Error: ", error);
            res.sendStatus(501);
        })
}

const SendMessageToGenesys = (payload) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            "to": payload.to,
            "message": payload.message,
            "platform": payload.platform,
            "channel": payload.channel,
            "template": payload.template,
            "type": payload.type,
            "service": payload.service,
            "agentId": payload.agentId,
            "isTemplate": payload.isTemplate
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: '/api/genesys/messaging/clientship',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                resolve();
            })
            .catch((error) => {
                console.log(error);
                reject();
            });
    })
}

const GetMessageIdDB = (req, res) => {
    let telefono = req.params.telefono.slice(-10);
    GetMessageId(telefono)
        .then(response => {
            res.json({"uuid": response});
        })
        .catch(error => {
            res.sendStatus(500);
        })
}

module.exports = {
    SendHSM,
    GetMessageIdDB
}