"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
/* GET home page. */
router.get("/api", (req, res) => {
    res.json({ message: "Hello from Express!!!!!" });
});
module.exports = router;
