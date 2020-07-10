const express = require("express");
const router = express.Router();

// set static assets
router.use("/public", express.static("public"));

router.get("/response", (req, res) => {
	res.render("response");
});

router.get("/records", (req, res) => {
	res.render("records");
});

router.get("/quest", (req, res) => {
	res.render("quest");
});

router.get("/new", (req, res) => {
	res.render("new");
});

router.get("/messages", (req, res) => {
	res.render("messages");
});

router.get("/info", (req, res) => {
	res.render("info");
});

router.get("/help", (req, res) => {
	res.render("help");
});

module.exports = router;
