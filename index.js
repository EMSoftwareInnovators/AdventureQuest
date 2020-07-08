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

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
