const {
    TOKEN_HSM_YALO,
    YALO_HSM_URL,
    CONNECTORRS_URL,
    CLIENTSHIP_CLIENTID,
    CLIENTSHIP_SECRET,
    URL_CLIENTSHIP
} = require("../config");
const axios = require("axios");
const moment = require("moment");
const { InsertHSM, InsertMSG, GetMessageId, GetPolizaByTelefono } = require("../models");
const { templates } = require("../models/templates");
const { v4: uuidv4 } = require('uuid');

const SendHSM = (req, res) => {
    console.log("Inicio ", moment().format("YYYY-MM-DD HH:mm:ss.SSS"));
    console.log("Se enviara mensaje al numero " + req.body.to);
    let to = req.body.to;
    let poliza = req.body.poliza;
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
        "template": curTemplate,
        "poliza": poliza
    }

    console.log("DATOS: ", datos);

    axios(options)
        .then(response => {
            InsertHSM(datos)
                .then(async dbResponse => {
                    console.log("Fin ", moment().format("YYYY-MM-DD HH:mm:ss.SSS"));
                    let id = uuidv4();
                    let t = {
                        telefono: req.body.to.slice(-10),
                        params: JSON.stringify(req.body.params),
                        uuid: id ,
                        poliza: poliza
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
            url: CONNECTORRS_URL + '/api/genesys/messaging/clientship',
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

const GetPoliza = (req, res) => {
    let telefono = req.params.telefono.slice(-10);
    GetPolizaByTelefono(telefono)
        .then(response => {
            res.json({"uuid": response.uuid, "poliza": response.poliza});
        })
        .catch(error => {
            res.sendStatus(500);
        })
}

const SendToClientShip = (req, res) => {
    let telefono = req.body.telefono.slice(-10);
    let estado = req.body.estado;

    GetPolizaByTelefono(telefono)
        .then(async (response) => {
            let d = {
                "nombrepoliza": "actualizar_estado_genesys",
                "idNotificacion": response.uuid,
                "field": [
                    {
                        "name": "num_poliza",
                        "value": response.poliza
                    },
                    {
                        "name": "Estado",
                        "value": estado
                    },
                    {
                        "name": "Telefono",
                        "value": telefono
                    }
                ]
            }

            await clientshipApi(d);

            res.json({ "response": "OK" });
        })
        .catch(error => {
            res.sendStatus(500);
        })
}

async function clientshipApi (data) {
    let config = {
        method: "POST",
        url: URL_CLIENTSHIP + "/backend/core/public/api/messages",
        headers: { 
            "Content-Type": "application/json", 
            "X-ClientId": CLIENTSHIP_CLIENTID, 
            "X-ClientSecret": CLIENTSHIP_SECRET
        },
        data : data
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return "OK";
        })
        .catch((error) => {
            console.error("ERROR: ", error);
            return "ERROR";
        });
}

module.exports = {
    SendHSM,
    GetMessageIdDB,
    GetPoliza,
    SendToClientShip
}