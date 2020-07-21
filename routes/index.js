const express = require("express");
const router = express.Router();
const { db } = require("../config/db");
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
    res.render("quest", { user: req.user });
});

// new patient page
router.get("/new", ensureAuthenticated, (req, res) => {
    res.render("new", { user: req.user });
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
    const { fName, lName, email, password, org } = req.body;
    let unformattedPhone = req.body.phone;

    // parse phone number of all '-' && hash password && redirect back to info
    while (unformattedPhone.includes("-")) {
        unformattedPhone = unformattedPhone.replace("-", "");
    }
    const phone = unformattedPhone;

    // validate all the data from the user
    const errors = [];

    if (!fName || !lName || !email || !phone || !org) {
        errors.push({ msg: "All fields are required!" });
    }

    // more validation

    if (errors.length > 0) {
        res.render("info", {
            user: req.user,
            errors,
            fName,
            lName,
            unformattedPhone,
            email,
            password,
            org,
        });
    } else {
        // hash password you can copy this from routes/users.js -> register POST

        // one write for w/ updated password && one write w/ no updated password this will be an if/else stmt

        // write to the DB

        // re render info page
        res.render("info", { user: req.user });
    }
});

// help FAQ page
router.get("/help", ensureAuthenticated, (req, res) => {
    res.render("help", { user: req.user });
});

module.exports = router;
