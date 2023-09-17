"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    handler: function (req, res) {
        res.status(429).json({
            success: false,
            message: "Too many login attempts, please try again after a minute.",
        });
    },
});
router.get("/", (req, res, next) => {
    res.redirect("posts");
});
router.get("/posts", postController.postListGet);
router.get("/posts/:postid", postController.postGet);
router.post("/users/new", authController.signUpFormPost);
router.post("/authorSession/new", authController.authorSessionPost);
router.post("/session/new", limiter, authController.loginFormPost);
module.exports = router;
