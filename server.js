const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const flash = require("connect-flash");
const session = require("express-session");
const { sessionStore } = require("./config/db");
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
        // secret needs to be an array of random chars in deployment
        secret: "secret",
        store: sessionStore,
        resave: true,
        saveUninitialized: true,
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
app.use("/records", require("./routes/records"));
app.use("/patient", require("./routes/patient"));
app.use("/quest", require("./routes/quest"));
app.use("/update", require("./routes/update"));
app.use("/info", require("./routes/info"));
app.use("/help", require("./routes/help"));
app.use("/messages", require("./routes/messages"));
app.use("/response", require("./routes/response"));
app.use("/users", require("./routes/users"));

// set server to listen
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
