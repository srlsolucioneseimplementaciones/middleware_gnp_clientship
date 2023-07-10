const {
    HTTP_PORT
} = require("./config");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const login = require("./routes/login");
const yalo = require("./routes/yalo");


app.disable("x-powered-by");

let corsOptions = {
    "origin": "localhost"
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors(corsOptions));


app.use("/", login);
app.use("/", yalo);
app.get("/", (req, res) => {
    res.sendStatus(200);
})

app.listen(HTTP_PORT, console.log("Corriendo en el puerto " + HTTP_PORT));

module.exports = app;