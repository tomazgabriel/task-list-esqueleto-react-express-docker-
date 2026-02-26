const mysql = require('mysql2');

const connection = mysql.createPool(({
    host: process.env.DB_HOST || "localhost",
    user: "root",
    password: "root",
    database: "crud_db",
}));

module.exports = connection;