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
    db.query(`SELECT * FROM users_patients WHERE doctorID = ?`, [req.user.doctorID], (err, results) => {
        if (err) console.log(err);
        res.render("records", { user: req.user, patients: results });
    });
});

router.post("/", ensureAuthenticated, (req, res) => {
    const { fName, mName, lName, homePhone, workPhone, email, medication, notes, action } = req.body;

    if (action === "update") {
        res.send("update");
    }

    if (action === "delete") {
        res.send("delete");
    }
});

module.exports = router;
