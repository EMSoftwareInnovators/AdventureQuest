const express = require("express");
const router = express.Router();
const { db } = require("../config/db");
const bcrypt = require("bcryptjs");
const { ensureAuthenticated } = require("../config/auth");

// set static assets
router.use("/public", express.static("public"));

// message response page
router.get("/", ensureAuthenticated, (req, res) => {
    res.render("response", { user: req.user });
});

module.exports = router;