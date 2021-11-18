// Use the MariaDB Node.js Connector
var mariadb = require('mariadb');
const config = {
    HOST: "192.168.254.49",
    USER: "user",
    PORT: 8457,
    PASSWORD: "raspberry",
    DB: "internet_testing",
    RAISE_ON_WARNINGS: true
};
// Create a connection pool
var pool = 
  mariadb.createPool({
    host: config.HOST, 
    port: config.PORT,
    user: config.USER, 
    password: config.PASSWORD,
    database: config.DB
  });
 
// Expose a method to establish connection with MariaDB SkySQL
module.exports = Object.freeze({
  pool: pool
});