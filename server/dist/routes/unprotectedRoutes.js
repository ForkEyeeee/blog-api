"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
const post_controller = require("../controllers/post_controller");
const auth_controller = require("../controllers/auth_controller");
/* GET home page. */
router.get("/", (req, res, next) => {
    console.log(req.query);
    res.redirect("posts");
});
router.get("/posts", post_controller.post_list_get);
router.get("/posts/:postid", post_controller.post_get);
router.post("/users/new", auth_controller.sign_up_form_post);
router.post("/authorsession/new", auth_controller.authorsession_post);
router.post("/session/new", auth_controller.login_form_post);
router.get("/error", auth_controller.error_page_get);
module.exports = router;
