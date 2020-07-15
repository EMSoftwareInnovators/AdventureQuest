const express = require("express");
const router = express.Router();

// set static assets
router.use("/public", express.static("public"));

// message response page
router.get("/response", (req, res) => {
    res.render("response");
});

// patient record page
router.get("/records", (req, res) => {
    res.render("records");
});

// quest designer page
router.get("/quest", (req, res) => {
    // query the db to get all patients assigned to logged in user (doctor) probably store them in a variable

    // validation to make sure all the fields are properly filled out not empty

    // you'll want to pass in anything you want to use in quest.ejs here as a second parameter of the render function
    res.render("quest");
});

// new patient page
router.get("/new", (req, res) => {
    res.render("new");
});

// messages page
router.get("/messages", (req, res) => {
    res.render("messages");
});

// account info page
router.get("/info", (req, res) => {
    res.render("info");
});

// help FAQ page
router.get("/help", (req, res) => {
    res.render("help");
});

module.exports = router;
