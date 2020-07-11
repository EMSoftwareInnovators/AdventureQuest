const mysql = require("mysql");

// configure DB connection
/**
 * Might want to change this to a connection pool on deployment
 */
const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "adventurequest"
});

// establish DB connection
connection.connect((err) => {
	if (err) throw err;
});

module.exports = connection;
