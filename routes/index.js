const express = require("express");
const router = express.Router();
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
	res.render("records", { user: req.user });
});

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

// help FAQ page
router.get("/help", ensureAuthenticated, (req, res) => {
	res.render("help", { user: req.user });
});

module.exports = router;
