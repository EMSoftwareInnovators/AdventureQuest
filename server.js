const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

// passport config
require("./config/passport")(passport);

// set ejs as view engine
app.set("view engine", "ejs");

// express body parser middleware
app.use(express.urlencoded({ extended: true }));

// express session middleware
app.use(
	session({
		secret: "secret",
		resave: true,
		saveUninitialized: true
	})
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// global vars
app.use((req, res, next) => {
	res.locals.success_msg = req.flash("success_msg");
	res.locals.error_msg = req.flash("error_msg");
	next();
});

// establish routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

// set server to listen
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
