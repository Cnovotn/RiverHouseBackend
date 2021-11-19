// Use the MariaDB Node.js Connector
var mariadb = require('mariadb');
const hosts = {
  "ballard" : "10.0.0.150",
  "kenmore" : "192.168.254.49",
  "river" : "192.168.1.23"
}
const config = {
    HOST: hosts['river'],
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