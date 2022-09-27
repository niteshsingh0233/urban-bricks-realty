const mysql = require(`mysql`);

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "manager",
  database: "ubr",
  connectionLimit: 20,
  port: 3306,
});

module.exports = {
  pool,
};
