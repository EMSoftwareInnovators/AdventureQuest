const keys = require("./config/keys");
const express = require("express");
const app = express();
const session = require("express-session");
const mysql = require("mysql");
const mysqlStore = require("express-mysql-session")(session);
const flash = require("connect-flash");

// configure DB connection
const connection = mysql.createConnection(keys.connectionObj);

// establish DB connection
connection.connect((err) => {
	if (err) throw err;
	console.log("MySQL DB connected...");
});

// set ejs as view engine
app.set("view engine", "ejs");

// express body parser middleware
app.use(express.urlencoded({ extended: true }));

// establish routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

// set server to listen
app.listen(keys.PORT, () => console.log(`Server running on port ${keys.PORT}...`));
