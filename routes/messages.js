const express = require("express");
const router = express.Router();
const { db } = require("../config/db");
const bcrypt = require("bcryptjs");
const { ensureAuthenticated } = require("../config/auth");

// set static assets
router.use("/public", express.static("public"));

// messages page
router.get("/", ensureAuthenticated, (req, res) => {
	db.query(`SELECT * FROM threads JOIN messages ON threads.threadID = messages.threadID WHERE doctorID = ? ORDER BY timestamp`, [req.user.doctorID], (err, results) => {
		if (err) console.log(err);
		const threads = [];
		const inbox = [];
		for (const result of results) {
			if (!threads.includes(result.threadID)) {
				threads.push(result.threadID);
				inbox.push({
					threadID: result.threadID,
					doctorID: result.doctorID,
					patientID: result.patientID,
					subject: result.subject,
					favorite: result.favorite,
					messages: [
						{
							messageID: result.messageID,
							timestamp: result.timestamp,
							message: result.message
						}
					]
				});
			} else {
				const i = threads.indexOf(result.threadID);
				inbox[i].messages.push({
					messageID: result.messageID,
					timestamp: result.timestamp,
					message: result.message
				});
			}
		}

		res.render("messages", { user: req.user, inbox: inbox });
	});
});

router.put("/favorite/:threadID/:bool", ensureAuthenticated, (req, res) => {
	if (req.params.bool === "true") {
		db.query(`UPDATE threads SET favorite = ? WHERE threadID = ?`, [1, req.params.threadID], (err, results) => {
			if (err) console.log(err);
		});
	} else {
		db.query(`UPDATE threads SET favorite = ? WHERE threadID = ?`, [0, req.params.threadID], (err, results) => {
			if (err) console.log(err);
		});
	}
});

module.exports = router;
