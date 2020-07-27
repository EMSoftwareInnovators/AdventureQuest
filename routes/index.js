const express = require("express");
const router = express.Router();
const { db } = require("../config/db");
const bcrypt = require("bcryptjs");
const { ensureAuthenticated } = require("../config/auth");

// set static assets
router.use("/public", express.static("public"));

// message response page
router.get("/response", ensureAuthenticated, (req, res) => {
    res.render("response", { user: req.user });
});

// patient record page
router.get("/records", ensureAuthenticated, (req, res) => {
    // get all patients assigned to doctor
    db.query(`SELECT * FROM users_patients WHERE doctorID = ?`, [req.user.doctorID], (err, results) => {
        if (err) console.log(err);
        res.render("records", { user: req.user, patients: results });
    });
});

router.post("/records", ensureAuthenticated, (req, res) => {});

// quest designer page
router.get("/quest", ensureAuthenticated, (req, res) => {
    db.query(`SELECT patientID, fName, lName FROM users_patients WHERE doctorID = ?`, [req.user.doctorID], (err, results) => {
        if (err) console.log(err);
        res.render("quest", { user: req.user, patients: results });
    });
});

router.post("/quest", ensureAuthenticated, (req, res) => {
    const { patientID, questType, questName, questDifficulty, questItems, questObjectives, questDescription, longitude, latitude, questReward, questStatus } = req.body;
    res.send(`<h1>LONG: ${longitude}</h1><br><h1>LAT: ${latitude}</h1>`);
});

// new patient page
router.get("/new", ensureAuthenticated, (req, res) => {
    res.render("new", { user: req.user });
});

router.post("/new", ensureAuthenticated, (req, res) => {
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
        res.render("new", {
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
            db.query("SELECT email FROM users_patients WHERE email = ?", [email], (err, results) => {
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
                res.render("new", {
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
                db.query(
                    `INSERT INTO users_patients (doctorID, fName, mName, lName, email, homePhone, workPhone, medication, notes)
                        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [req.user.doctorID, fName, mName, lName, email, homePhone, workPhone, medication, notes],
                    (err, results) => {
                        req.flash("success_msg", "Patient record generated!");
                        res.redirect("/new");
                    }
                );
            }
        });
    }
});

// messages page
router.get("/messages", ensureAuthenticated, (req, res) => {
    res.render("messages", { user: req.user });
});

// account info page
router.get("/info", ensureAuthenticated, (req, res) => {
    res.render("info", { user: req.user });
});

router.post("/info", ensureAuthenticated, (req, res) => {
    // get form input
    const { username, fName, lName, email, password, password2, org } = req.body;
    let unparsedPhone = req.body.phone;

    // parse phone number of all '-' && hash password && redirect back to info
    while (unparsedPhone.includes("-")) {
        unparsedPhone = unparsedPhone.replace("-", "");
    }
    const phone = unparsedPhone;

    // validate all the data from the user
    const errors = [];

    if (!username || !fName || !lName || !email || !phone || !org) {
        errors.push({ msg: `* Indicates required field` });
    }

    if (username.length > 25) {
        errors.push({ msg: "Username cannot exceed 25 characters!" });
    }

    if (fName.length > 25) {
        errors.push({ msg: "First Name cannot exceed 25 characters!" });
    }

    if (lName.length > 25) {
        errors.push({ msg: "Last Name cannot exceed 25 characters!" });
    }

    if (email.length > 100) {
        errors.push({ msg: "Email cannot exceed 100 characters!" });
    }

    if (phone.length > 10) {
        errors.push({ msg: "Phone cannot exceed 10 characters!" });
    }

    if (org.length > 100) {
        errors.push({ msg: "Organization cannot exceed 100 characters!" });
    }

    if (password != "" || typeof password == "undefined") {
        // check for min password length
        if (password.length < 6) {
            errors.push({ msg: "Password must be at least 6 characters!" });
        }

        // check that passwords match
        if (password != password2) {
            errors.push({ msg: "Passwords must match!" });
        }
    }

    // check front-end errors
    if (errors.length > 0) {
        res.render("info", {
            user: req.user,
            username,
            errors,
            fName,
            lName,
            unparsedPhone,
            email,
            password,
            org,
        });
    } else {
        // check backend errors

        /* Update DB function */
        const updateDB = () => {
            if (password == "" || typeof password == "undefined") {
                // update everything EXCEPT password
                db.query(
                    `UPDATE users_medical 
                        SET username = ?, fName = ?, lName = ?, email = ?, phone = ?, organization = ?
                        WHERE doctorID = ?`,
                    [username, fName, lName, email, phone, org, req.user.doctorID],
                    (err, results) => {
                        if (err) console.log(err);
                        req.flash("success_msg", "Account Updated");
                        res.redirect("/info");
                    }
                );
            } else {
                // update everything INCLUDING password
                function hash() {
                    return new Promise((resolve, reject) => {
                        bcrypt.genSalt(10, (err, salt) =>
                            bcrypt.hash(password, salt, (err, hash) => {
                                resolve(hash);
                            })
                        );
                    });
                }

                hash().then((hashedPassword) => {
                    db.query(
                        `UPDATE users_medical 
                        SET username = ?, fName = ?, lName = ?, email = ?, phone = ?, organization = ?, password = ?
                        WHERE doctorID = ?`,
                        [username, fName, lName, email, phone, org, hashedPassword, req.user.doctorID],
                        (err, results) => {
                            if (err) console.log(err);
                            req.flash("success_msg", "Account Updated");
                            res.redirect("/info");
                        }
                    );
                });
            }
        };
        /* End Update DB Function */

        // check if the username is unchanged
        if (username == req.user.username) {
            updateDB();
        } else {
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

            userExists.then((result) => {
                if (result.match) {
                    req.flash("error_msg", result.msg);
                    res.redirect("/info");
                } else {
                    updateDB();
                }
            });
        }
    }
});

// help FAQ page
router.get("/help", ensureAuthenticated, (req, res) => {
    res.render("help", { user: req.user });
});

module.exports = router;
