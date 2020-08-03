const express = require("express");
const router = express.Router();
const { db } = require("../config/db");
const bcrypt = require("bcryptjs");
const { ensureAuthenticated } = require("../config/auth");

// set static assets
router.use("/public", express.static("public"));

// quest designer page
router.get("/", ensureAuthenticated, (req, res) => {
	db.query(`SELECT patientID, fName, lName FROM users_patients WHERE doctorID = ?`, [req.user.doctorID], (err, results) => {
		if (err) console.log(err);
		res.render("quest", { user: req.user, patients: results });
	});
});

router.post("/", ensureAuthenticated, (req, res) => {
	const { patientID, questType, questName, questDifficulty, questItems, questObjectives, questDescription, longitude, latitude, questReward, questStatus } = req.body;

	// validation
	const errors = [];

	if (!patientID || !questType || !questName || !questDifficulty || !questObjectives || !questDescription || !longitude || !latitude || !questReward || !questStatus) {
		errors.push({ msg: "* Indicates required field" });
	}

	if (questName.length > 50) {
		errors.push({ msg: "Quest Name cannot exceed 50 characters!" });
	}

	if (questItems.length > 255) {
		errors.push({ msg: "Additional Quest Items cannot exceed 255 characters!" });
	}

	if (questObjectives.length > 1000) {
		errors.push({ msg: "Quest Objectives cannot exceed 1000 characters!" });
	}

	if (questDescription.length > 1500) {
		errors.push({ msg: "Quest Description cannot exceed 1500 characters!" });
	}

	if (questReward) {
		if (parseInt(questReward) == questReward) {
			if (parseInt(questReward) > 100) {
				errors.push({ msg: "Quest Reward cannot exceed 100 points!" });
			}
		} else {
			errors.push({ msg: "Quest Reward must be an integer!" });
		}
	}

	if (errors.length > 0) {
		db.query(`SELECT patientID, fName, lName FROM users_patients WHERE doctorID = ?`, [req.user.doctorID], (err, results) => {
			if (err) console.log(err);
			res.render("quest", {
				user: req.user,
				patients: results,
				errors,
				selectedPatient: patientID,
				questType,
				questName,
				questDifficulty,
				questItems,
				questObjectives,
				questDescription,
				longitude,
				latitude,
				questReward,
				questStatus
			});
		});
	} else {
		if (questItems !== "") {
			db.query(
				`INSERT INTO quests (doctorID, patientID, additionalItems, description, difficulty, latitude, longitude, name, objectives, reward, status, type)
					VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
				[req.user.doctorID, patientID, questItems, questDescription, questDifficulty, latitude, longitude, questName, questObjectives, questReward, parseInt(questStatus), questType],
				(err, results) => {
					if (err) console.log(err);
					req.flash("success_msg", "Quest Created!");
					res.redirect("quest");
				}
			);
		}
	}
});

module.exports = router;
