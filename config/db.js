const mysql = require("mysql");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

// configure DB connection
// Might want to change this to a connection pool on deployment
const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "adventurequest"
});

// mysql session storage
const sessionStore = new MySQLStore({}, connection);

// establish DB connection
connection.connect((err) => {
	if (err) throw err;
});

module.exports = {
	db: connection,
	sessionStore
};
