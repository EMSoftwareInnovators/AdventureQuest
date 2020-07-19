const LocalStrategy = require("passport-local").Strategy;
const db = require("./db");
const bcrypt = require("bcryptjs");

module.exports = function (passport) {
	// =========================================================================
	// LOCAL LOGIN =============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use(
		"local",
		new LocalStrategy(
			{
				// by default, local strategy uses username and password, we will override with email
				usernameField: "username",
				passwordField: "password",
				passReqToCallback: true // allows us to pass back the entire request to the callback
			},
			function (req, username, password, done) {
				// callback with email and password from our form

				db.query(`SELECT * FROM users_medical WHERE username = ?`, [username], (err, results) => {
					if (err) return done(err);
					if (!results.length) {
						return done(null, false, req.flash("error_msg", "No user found."));
					}

					if (results[0].password != password) {
						return done(null, false, req.flash("error_msg", "Incorrect username & password!"));
					}

					return done(null, results[0]);
				});

				// connection.query("SELECT * FROM `users` WHERE `email` = '" + email + "'", function (err, rows) {
				// 	if (err) return done(err);
				// 	if (!rows.length) {
				// 		return done(null, false, req.flash("loginMessage", "No user found.")); // req.flash is the way to set flashdata using connect-flash
				// 	}

				// 	// if the user is found but the password is wrong
				// 	if (!(rows[0].password == password)) return done(null, false, req.flash("loginMessage", "Oops! Wrong password.")); // create the loginMessage and save it to session as flashdata

				// 	// all is well, return successful user
				// 	return done(null, rows[0]);
				// });
			}
		)
	);

	// =========================================================================
	// passport session setup ==================================================
	// =========================================================================
	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session

	// used to serialize the user for the session
	passport.serializeUser((user, done) => {
		done(null, user.doctorID);
	});

	// used to deserialize the user
	passport.deserializeUser((id, done) => {
		db.query("SELECT * FROM users_medical WHERE doctorID = ?", [id], (err, rows) => {
			done(err, rows[0]);
		});
	});
};
