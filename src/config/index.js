const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    HTTP_PORT: process.env.HTTP_PORT,
    TOKEN_PASSWORD: process.env.TOKEN_PASSWORD,
    CRYPTO_PASSWORD: process.env.CRYPTO_PASSWORD,
    DB_SERVER: process.env.DB_SERVER,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_PORT: process.env.DB_PORT,
    ISSUER: process.env.ISSUER,
    YALO_HSM_URL: process.env.YALO_HSM_URL,
    TOKEN_HSM_YALO: process.env.TOKEN_HSM_YALO
}