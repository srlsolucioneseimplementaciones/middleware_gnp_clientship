const {
    TOKEN_HSM_YALO,
    YALO_HSM_URL
} = require("../config");
const axios = require("axios");


const SendHSM = (req, res) => {
    let to = req.body.to;
    let template = req.body.template;
    let params = req.body.params;
    console.log(to);
    console.log(template);
    console.log(params);

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

    axios(options)
        .then(response => {
            console.log(response);
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