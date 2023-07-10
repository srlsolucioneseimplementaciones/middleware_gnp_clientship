const {
    DB_PORT,
    DB_SERVER,
    DB_DATABASE,
    DB_USER,
    DB_PASS
} = require("../config");

const sql = require("mssql");

const config = {
    user: DB_USER,
    password: DB_PASS,
    server: DB_SERVER,
    database: DB_DATABASE,
    port: Number(DB_PORT),
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options:{
        trustServerCertificate: true
    }
}

const StoreClientId = (clientId, clientSecret, nombre, iv, authTag) => {
    return new Promise((resolve, reject) => {
        sql.connect(config).then(pool => {
            return pool.request()
                .input("p_client_id", clientId)
                .input("p_client_secret", clientSecret)
                .input("p_nombre", nombre)
                .input("p_iv", iv)
                .input("p_auth_tag", authTag)
                .execute("sp_new_client_id");
        })
        .then(result => {
            resolve(result);
        })
        .catch(error => {
            console.error("Error: ", error);
            reject();
        })
    })
}

const GetClientId = (clientId, clientSecret) => {
    return new Promise((resolve, reject) => {
        sql.connect(config).then(pool => {
            return pool.request()
                .input("p_client_id", clientId)
                .input("p_client_secret", clientSecret)
                .execute("sp_buscar_client_id");
        })
        .then(result => {
            resolve(result);
        })
        .catch(error => {
            console.error("Error: ", error);
            reject();
        })
    })
}

module.exports = {
    StoreClientId,
    GetClientId
}