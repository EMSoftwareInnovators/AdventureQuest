const express = require("express");
const router = express.Router();
const db = require("../config/db");
//const doc = require();
// set static assets
router.use("/public", express.static("public"));

// message response page
router.get("/response", (req, res) => {
    res.render("response");
});

// patient record page
router.get("/records", (req, res) => {
    var doc = 1;
    var sql = 'SELECT * FROM users_patients WHERE doctorID = ?';
    db.query(sql,[doc], function (err,result){
        if(err) console.log(err)
    res.render("records", {dropdownVals: result})
});

})
// quest designer page
router.get("/quest", (req, res) => {
    // query the db to get all patients assigned to logged in user (doctor) probably store them in a variable
    var doc = 1;
    var sql = 'SELECT * FROM users_patients WHERE doctorID = ?';
    db.query(sql,[doc], function (err,result){
        if(err) console.log(err)
        res.render("quest", {dropdownVals: result})
   
      
    });
    
    // validation to make sure all the fields are properly filled out not empty  
})
   
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
