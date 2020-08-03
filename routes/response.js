const express = require("express");
const router = express.Router();
const { db } = require("../config/db");
const bcrypt = require("bcryptjs");
const { ensureAuthenticated } = require("../config/auth");

// set static assets
router.use("/public", express.static("public"));

// message response page
router.get("/:id", ensureAuthenticated, (req, res) => {
    db.query("SELECT * FROM threads JOIN messages ON threads.threadID = messages.threadID JOIN users ON messages.userID = users.userID WHERE threads.threadID = ? ORDER BY timestamp", [req.params.id], (err, results) => {
        res.render("response", { user: req.user, messages: results });
    });
});

router.post("/", ensureAuthenticated, (req, res) => {
    const { message, threadID } = req.body;

    // validation
    const errors = [];

    if (!message) {
        errors.push({ msg: `* Indicates a required field` });
    }

    if (message.length > 255) {
        errors.push({ msg: `Message cannot exceed 255 characters!` });
    }

    if (errors.length > 0) {
        console.log(errors);
        db.query("SELECT * FROM threads JOIN messages ON threads.threadID = messages.threadID JOIN users ON messages.userID = users.userID WHERE threads.threadID = ? ORDER BY timestamp", [threadID], (err, results) => {
            res.render("response", {
                user: req.user,
                messages: results,
                errors,
            });
        });
    } else {
        db.query(`INSERT INTO messages (threadID, userID, message) VALUES(?, ?, ?)`, [threadID, req.user.userID, message], (err, results) => {
            if (err) console.log(err);
            res.redirect(`/response/${threadID}`);
        });
    }
});

router.post("/delete", ensureAuthenticated, (req, res) => {
    const { threadID } = req.body;
    db.query(`DELETE FROM messages WHERE threadID = ?`, [threadID], (err, results) => {
        if (err) console.log(err);
        db.query(`DELETE FROM threads WHERE threadID = ?`, [threadID], (err, results) => {
            if (err) console.log(err);
            res.redirect("/messages");
        });
    });
});

module.exports = router;
