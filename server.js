const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const flash = require("connect-flash");
const session = require("express-session");

// set ejs as view engine
app.set("view engine", "ejs");

// express body parser middleware
app.use(express.urlencoded({ extended: true }));

// express session middleware
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);

// connect flash
app.use(flash());

//  global vars
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

/**
 * How to write a query
 *
 * db.query('SELECT * FROM table WHERE condition = ?, [condition], function(err, result) {
 *  // err stores any errors if there are any and allows you to do what ever error handling you'd like
 *  if(err) {
 *      console.log(err)
 *  }
 *
 *  // It returns an array with each element being an object consiting of the selected row probably best
 *  // to console.log it to just check out what it is and see what you want to do next. Remember its logging
 *  // to the vs code (server) terminal not the browser console.
 *  console.log(results);
 * })
 */
