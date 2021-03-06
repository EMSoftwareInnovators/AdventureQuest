const express = require("express");
const router = express.Router();
const { db } = require("../config/db");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// set static assets
router.use("/public", express.static("public"));

// login page
router.get("/login", (req, res) => {
	res.render("login");
});

router.post("/login", (req, res, next) => {
	const { username, password } = req.body;
	const errors = [];

	// Check required fields
	if (!username || !password) {
		errors.push({ msg: "Please fill out all fields!" });
	}

	if (errors.length == 0) {
		passport.authenticate("local", {
			successRedirect: "/records",
			failureRedirect: "/users/login",
			failureFlash: true
		})(req, res, next);
	} else {
		res.render("login", { username, password, errors });
	}
});

// register page
router.get("/register", (req, res) => {
	res.render("register");
});

router.post("/register", (req, res) => {
	const { fName, lName, email, phone, username, organization, password, password2 } = req.body;
	const errors = [];

	// Check required fields
	if (!fName || !lName || !email || !phone || !username || !organization || !password || !password2) {
		errors.push({ msg: "Please fill out all fields!" });
	}

	// Check first name max length
	if (fName.length > 25) {
		errors.push({ msg: "First name cannot exceed 25 characters!" });
	}

	// Check last name max length
	if (lName.length > 25) {
		errors.push({ msg: "Last name cannot exceed 25 characters!" });
	}

	// Check for valid email

	// Check email max length
	if (email.length > 100) {
		errors.push({ msg: "Email cannot exceed 100 characters!" });
	}

	// Check phone max length
	if (phone.length > 10) {
		errors.push({ msg: "Phone cannot exceed 10 characters!" });
	}

	// Check username max length
	if (username.length > 25) {
		errors.push({ msg: "Username cannot exceed 25 characters!" });
	}

	// Organization max length
	if (organization.length > 100) {
		errors.push({ msg: "Organization cannot exceed 100 characters!" });
	}

	// Check passwords match
	if (password !== password2) {
		errors.push({ msg: "Passwords do not match!" });
	}

	// Check pass min length
	if (password.length != 0 && password.length < 6) {
		errors.push({ msg: "Password must be at least 6 characters!" });
	}

	// Check pass max length
	if (password.length > 12) {
		errors.push({ msg: "Password cannot exceed 12 characters!" });
	}

	// Check for any errors
	if (errors.length > 0) {
		// Validation failed
		res.render("register", {
			errors,
			fName,
			lName,
			email,
			phone,
			username,
			organization,
			password,
			password2
		});
	} else {
		// check if email exists
		const emailExists = new Promise((resolve, reject) => {
			db.query("SELECT email FROM users WHERE email = ?", [email], (err, results) => {
				if (results.length > 0) {
					resolve({ match: true, msg: "That email is already registered!" });
				} else {
					resolve({ match: false, msg: "" });
				}
			});
		});
		// check if username exists
		const userExists = new Promise((resolve, reject) => {
			db.query("SELECT username FROM users WHERE username = ?", [username], (err, results) => {
				if (results.length > 0) {
					resolve({ match: true, msg: "That username is already registered!" });
				} else {
					resolve({ match: false, msg: "" });
				}
			});
		});
		// await for all promises to resolve
		Promise.all([emailExists, userExists]).then((values) => {
			for (const value of values) {
				if (value.match) {
					errors.push({ msg: value.msg });
				}
			}
			if (errors.length > 0) {
				res.render("register", {
					errors,
					fName,
					lName,
					email,
					phone,
					username,
					organization,
					password,
					password2
				});
			} else {
				// Hash password
				function hash() {
					return new Promise((resolve, reject) => {
						bcrypt.genSalt(10, (err, salt) =>
							bcrypt.hash(password, salt, (err, hash) => {
								resolve(hash);
							})
						);
					});
				}

				// insert into users
				function insertUsers(username, password, email) {
					return new Promise((resolve, reject) => {
						db.query(
							`INSERT INTO users (username, password, email)
							VALUES(?, ?, ?)`,
							[username, password, email],
							(err, results) => {
								if (err) console.log(err);
								resolve();
							}
						);
					});
				}

				// insert into users_medical
				function insertUsersMedical(username, fName, lName, phone, organization) {
					db.query(`SELECT userID FROM users WHERE username = ?`, [username], (err, results) => {
						if (err) console.log(err);
						db.query(
							`INSERT INTO users_medical (userID, fName, lName, phone, organization)
								VALUES(?, ?, ?, ?, ?)`,
							[results[0].userID, fName, lName, phone, organization],
							(err, results) => {
								if (err) console.log(err);
								req.flash("success_msg", "You successfully registered. You may now log in.");
								res.redirect("/users/login");
							}
						);
					});
				}

				// Insert into DB
				hash().then((hashedPassword) => {
					insertUsers(username, hashedPassword, email).then(() => {
						insertUsersMedical(username, fName, lName, phone, organization);
					});
				});
			}
		});
	}
});

// logout
router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success_msg", "You are now logged out.");
	res.redirect("/users/login");
});

module.exports = router;
