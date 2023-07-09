const mysql2 = require("mysql2");

let database = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "project_module",
});

let db = database.promise()

module.exports = db;
