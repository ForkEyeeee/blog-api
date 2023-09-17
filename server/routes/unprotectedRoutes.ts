import { Request, Response, NextFunction } from "express";
var express = require("express");
var router = express.Router();
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");

const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  max: 10, // max of 10 requests
  handler: function (req, res) {
    res.status(429).json({
      success: false,
      message: "Too many login attempts, please try again after a minute.",
    });
  },
});

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.redirect("posts");
});

router.get("/posts", postController.postListGet);
router.get("/posts/:postid", postController.postGet);

router.post("/users/new", authController.signUpFormPost);
router.post("/authorSession/new", authController.authorSessionPost);

router.post("/session/new", limiter, authController.loginFormPost);
router.get("/error", authController.errorPageGet);

module.exports = router;
