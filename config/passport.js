const LocalStrategy = require("passport-local").Strategy;
const { db } = require("./db");
const bcrypt = require("bcryptjs");

module.exports = function (passport) {
	passport.use(
		"local",
		new LocalStrategy(
			{
				usernameField: "username",
				passwordField: "password",
				passReqToCallback: true
			},
			function (req, username, password, done) {
				db.query(`SELECT * FROM users WHERE username = ?`, [username], (err, results) => {
					if (err) return done(err);
					if (!results.length) {
						return done(null, false, req.flash("error_msg", "Username not found."));
					}

					// compare plain text password to hashed password
					bcrypt.compare(password, results[0].password, (err, isMatch) => {
						if (err) console.log(err);
						if (isMatch) {
							return done(null, results[0]);
						} else {
							return done(null, false, req.flash("error_msg", "Incorrect username & password!"));
						}
					});
				});
			}
		)
	);

	// used to serialize the user for the session
	passport.serializeUser((user, done) => {
		done(null, user.userID);
	});

	// used to deserialize the user
	passport.deserializeUser((id, done) => {
		/**
		 * restrict what fields are contained within req.user object
		 */
		db.query("SELECT * FROM users JOIN users_medical ON users.userID = users_medical.userID WHERE users.userID = ?", [id], (err, rows) => {
			done(err, rows[0]);
		});
	});
};
