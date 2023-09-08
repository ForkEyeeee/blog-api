"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
const post_controller = require("../controllers/post_controller");
/* GET home page. */
router.get("/", (req, res) => {
    res.json({ message: "Homepage" });
});
//Post routes
router.get("/create-post", post_controller.create_post_form_get);
router.post("/create-post", post_controller.create_post_form_post);
// router.post("/create-message", message_controller.new_message_form_post);
// router.get("/delete/:id", message_controller.message_delete_get);
// router.post("/delete/:id", message_controller.message_delete_post);
module.exports = router;
