const {
    TOKEN_HSM_YALO,
    YALO_HSM_URL
} = require("../config");
const axios = require("axios");
const { InsertHSM } = require("../models");
const { templates } = require("../models/templates");

const SendHSM = (req, res) => {
    let to = req.body.to;
    let template = req.body.template;
    let params = req.body.params;
    let index = templates.find((e) => e.nombre == template);
    let keys = Object.keys(params);

    keys.forEach((k) => {
        index.text = index.text.replace("{{" + k + "}}", params[k]);
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
        "template": index.text
    }

    axios(options)
        .then(response => {
            InsertHSM(datos)
                .then(dbResponse => {
                    console.log(dbResponse);
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