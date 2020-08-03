const express = require("express");
const router = express.Router();
const { db } = require("../config/db");
const bcrypt = require("bcryptjs");
const { ensureAuthenticated } = require("../config/auth");

// set static assets
router.use("/public", express.static("public"));

// new patient page
router.get("/", ensureAuthenticated, (req, res) => {
    res.render("patient", { user: req.user });
});

router.post("/", ensureAuthenticated, (req, res) => {
    const { fName, mName, lName, email, medication, notes } = req.body;
    let unparsedHomePhone = req.body.homePhone;
    let unparsedWorkPhone = req.body.workPhone;

    while (unparsedHomePhone.includes("-")) {
        unparsedHomePhone = unparsedHomePhone.replace("-", "");
    }
    while (unparsedWorkPhone.includes("-")) {
        unparsedWorkPhone = unparsedWorkPhone.replace("-", "");
    }
    const homePhone = unparsedHomePhone;
    const workPhone = unparsedWorkPhone;

    const errors = [];

    // validation
    if (!fName || !mName || !lName || !email || !homePhone || !workPhone) {
        errors.push({ msg: `* Indicates required field` });
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

    if (email.length > 100) {
        errors.push({ msg: "Email cannot exceed 100 characters!" });
    }

    if (medication.length > 1500) {
        errors.push({ msg: "Medications cannot exceed 1500 characters!" });
    }

    if (notes.length > 1500) {
        errors.push({ msg: "Patient Notes cannot exceed 1500 characters!" });
    }

    if (homePhone.length > 10 || workPhone.length > 10) {
        errors.push({ msg: "Phone number cannot exceed 10 digits!" });
    }

    if (errors.length > 0) {
        res.render("patient", {
            errors,
            user: req.user,
            fName,
            mName,
            lName,
            email,
            medication,
            notes,
            homePhone,
            workPhone,
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

        emailExists.then((results) => {
            if (results.match) {
                errors.push({ msg: results.msg });
                res.render("patient", {
                    errors,
                    user: req.user,
                    fName,
                    mName,
                    lName,
                    email,
                    medication,
                    notes,
                    homePhone,
                    workPhone,
                });
            } else {
                db.query(`INSERT INTO users (email) VALUES(?)`, [email], (err, results) => {
                    if (err) console.log(err);
                    db.query(`SELECT userID FROM users WHERE email = ?`, [email], (err, results) => {
                        if (err) console.log(err);
                        db.query(
                            `INSERT INTO users_patients (doctorID, userID, fName, mName, lName, homePhone, workPhone, medication, notes)
                                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                            [req.user.doctorID, results[0].userID, fName, mName, lName, homePhone, workPhone, medication, notes],
                            (err, results) => {
                                req.flash("success_msg", "Patient record generated!");
                                res.redirect("/patient");
                            }
                        );
                    });
                });
            }
        });
    }
});

module.exports = router;
