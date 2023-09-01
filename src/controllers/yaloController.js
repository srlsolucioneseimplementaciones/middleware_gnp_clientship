const {
    TOKEN_HSM_YALO,
    YALO_HSM_URL
} = require("../config");
const axios = require("axios");
const moment = require("moment");
const { InsertHSM } = require("../models");
const { templates } = require("../models/templates");

const SendHSM = (req, res) => {
    console.log("Inicio ", moment().format("YYYY-MM-DD HH:mm:ss.SSS"));
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
                .then(dbResponse => {
                    console.log("Fin ", moment().format("YYYY-MM-DD HH:mm:ss.SSS"));
                })
                .catch(dbError => {
                    console.error(dbError);
                })
            
            res.sendStatus(200);
        })
        .catch(error => {
            console.error("Error: ", error);
            res.sendStatus(501);
        })
}

module.exports = {
    SendHSM
}