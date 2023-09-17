import { Request, Response, NextFunction } from "express";
var express = require("express");
var router = express.Router();
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  console.log(req.query);
  res.redirect("posts");
});

router.get("/posts", postController.postListGet);
router.get("/posts/:postid", postController.postGet);

router.post("/users/new", authController.signUpFormPost);
router.post("/authorSession/new", authController.authorSessionPost);

router.post("/session/new", authController.loginFormPost);
router.get("/error", authController.errorPageGet);

module.exports = router;
