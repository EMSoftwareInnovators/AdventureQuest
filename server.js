const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// set ejs as view engine
app.set("view engine", "ejs");

// express body parser middleware
app.use(express.urlencoded({ extended: true }));

// establish routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

// set server to listen
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
