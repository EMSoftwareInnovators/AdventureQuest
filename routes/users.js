const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");

// set static assets
router.use("/public", express.static("public"));

// login page
router.get("/login", (req, res) => {
	res.render("login");
});

router.post("/login", (req, res) => {});

// register page
router.get("/register", (req, res) => {
	res.render("register");
});

router.post("/register", (req, res) => {
	const { fName, lName, email, phone, username, organization, password, password2 } = req.body;
	let errors = [];

	// Check required fields
	if (!fName || !lName || !email || !phone || !username || !organization || !password || !password2) {
		errors.push({ msg: "Please fill out all fields!" });
	}

	// Check no special characters

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

	// Check phone all #'s

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
			db.query("SELECT email FROM users_medical WHERE email = ?", [email], (err, results) => {
				if (results.length > 0) {
					resolve({ match: true, msg: "That email is already registered!" });
				} else {
					resolve({ match: false, msg: "" });
				}
			});
		});
		// check if username exists
		const userExists = new Promise((resolve, reject) => {
			db.query("SELECT username FROM users_medical WHERE username = ?", [username], (err, results) => {
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
				// Insert into DB
				hash().then((hashedPassword) => {
					db.query(
						`INSERT INTO users_medical (fName, lName, email, phone, username, organization, password)
								VALUES(?, ?, ?, ?, ?, ?, ?)`,
						[fName, lName, email, phone, username, organization, hashedPassword]
					);
					res.redirect("/users/login");
				});
			}
		});
	}
});

module.exports = router;
