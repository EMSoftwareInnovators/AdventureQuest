const express = require("express");
const router = express.Router();
const { db } = require("../config/db");
const bcrypt = require("bcryptjs");
const { ensureAuthenticated } = require("../config/auth");

// set static assets
router.use("/public", express.static("public"));

// patient record page
router.get("/", ensureAuthenticated, (req, res) => {
	// get all patients assigned to doctor
	db.query(`SELECT * FROM users_patients JOIN users ON users_patients.userID = users.userID WHERE doctorID = ?`, [req.user.doctorID], (err, results) => {
		if (err) console.log(err);
		res.render("records", { user: req.user, patients: results });
	});
});

router.post("/", ensureAuthenticated, (req, res) => {
	const { patientID, userID, fName, mName, lName, email, medication, notes, action } = req.body;
	let unparsedHomePhone = req.body.homePhone;
	let unparsedWorkPhone = req.body.workPhone;

	// parse phone numbers
	while (unparsedHomePhone.includes("-")) {
		unparsedHomePhone = unparsedHomePhone.replace("-", "");
	}
	const homePhone = unparsedHomePhone;
	while (unparsedWorkPhone.includes("-")) {
		unparsedWorkPhone = unparsedWorkPhone.replace("-", "");
	}
	const workPhone = unparsedWorkPhone;

	// validation
	const errors = [];

	if (!patientID || !fName || !mName || !lName || !homePhone || !workPhone || !email || !medication || !notes || !action) {
		errors.push({ msg: "* Indicates a required field" });
	}

	if (fName.length > 50) {
		errors.push({ msg: "First Name cannot exceed 50 characters!" });
	}

	if (mName.length > 50) {
		errors.push({ msg: "Middle Name cannot exceed 50 characters!" });
	}

	if (lName.length > 50) {
		errors.push({ msg: "Last Name cannot exceed 50 characters!" });
	}

	if (homePhone.length > 10) {
		errors.push({ msg: "Home Phone cannot exceed 10!" });
	}

	if (workPhone.length > 10) {
		errors.push({ msg: "Work Phone cannot exceed 10!" });
	}

	if (medication.length > 1500) {
		errors.push({ msg: "Medication cannot exceed 1500 characters!" });
	}

	if (notes.legth > 1500) {
		errors.push({ msg: "Notes cannot exceed 1500 characters!" });
	}

	if (errors.length > 0) {
		db.query(`SELECT * FROM users_patients JOIN users ON users_patients.userID = users.userID WHERE doctorID = ?`, [req.user.doctorID], (err, results) => {
			if (err) console.log(err);
			res.render("records", {
				errors,
				user: req.user,
				patients: results,
				patientID,
				fName,
				mName,
				lName,
				homePhone,
				workPhone,
				email,
				medication,
				notes
			});
		});
	} else if (action === "update") {
		db.query(
			`UPDATE users_patients
		    SET fName = ?, mName = ?, lName = ?, homePhone = ?, workPhone = ?, medication = ?, notes = ?
			WHERE patientID = ?`,
			[fName, mName, lName, homePhone, workPhone, medication, notes, patientID],
			(err, results) => {
				if (err) console.log(err);
				db.query(`UPDATE users SET email = ? WHERE userID = ?`, [email, userID], (err, results) => {
					if (err) console.log(err);
					req.flash("success_msg", `${fName} ${lName}'s record updated!`);
					res.redirect("records");
				});
			}
		);
	} else if (action === "delete") {
		db.query(`DELETE FROM users_patients WHERE patientID = ?`, [patientID], (err, results) => {
			if (err) console.log(err);
			req.flash("success_msg", `${fName} ${lName}'s record deleted!`);
			res.redirect("records");
		});
	}
});

module.exports = router;
