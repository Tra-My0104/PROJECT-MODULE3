const mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "project_module",
});

module.exports = connection;
