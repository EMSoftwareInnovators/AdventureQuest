const express = require("express");
const router = express.Router();
const { db } = require("../config/db");
const bcrypt = require("bcryptjs");
const { ensureAuthenticated } = require("../config/auth");

// set static assets
router.use("/public", express.static("public"));

// messages page
router.get("/", ensureAuthenticated, (req, res) => {
    res.render("messages", { user: req.user });
});

module.exports = router;
