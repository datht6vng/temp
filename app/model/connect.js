var mysql = require("mysql2");
var connection = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '123456',
    database: process.env.DB_NAME || 'mysql',
    port: process.env.DB_PORT || 3307
    // host: 'localhost',
    // user: 'root',
    // password: '25012001',
    // database: 'mysql',
});
module.exports = connection;