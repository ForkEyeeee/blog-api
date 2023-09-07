var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/api", (req, res) => {
  res.json({ message: "Hello from Express!!!!!" });
});

module.exports = router;
