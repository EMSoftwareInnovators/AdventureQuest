const mysql = require("mysql");
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 80;

// create connection object
const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "adventurequest"
});

// set ejs as view engine
app.set("view engine", "ejs");

app.use("/public", express.static("public"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
