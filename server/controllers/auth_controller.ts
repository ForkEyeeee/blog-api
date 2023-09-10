require("dotenv").config();
import { Request, Response, NextFunction } from "express";
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const asyncHandler = require("express-async-handler");

exports.verify_token = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

exports.sign_up_form_post = [
  body("username", "email must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("confirmpassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      comments: [],
    });

    try {
      await newUser.save();

      res.status(201).json({
        success: true,
        data: {
          username: newUser.username,
          password: newUser.password,
        },
      });
    } catch (err) {
      console.error(err);
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
  }),
];

exports.login_form_post = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;

    let existingUser;
    try {
      existingUser = await User.findOne({ username: username });
    } catch (err) {
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }

    if (!existingUser) {
      const error = new Error("Wrong details please check at once");
      return next(error);
    }

    // Compare the password using bcrypt
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      const error = new Error("Wrong details please check at once");
      return next(error);
    }

    let token;
    try {
      // Creating jwt token
      token = jwt.sign(
        { userId: existingUser._id, username: existingUser.username },
        process.env.signature,
        { expiresIn: "1h" }
      );
    } catch (err) {
      console.log(err);
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: {
        username: existingUser.username,
        token: token,
      },
    });
  }
);

// exports.logout_get = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     req.logout(function (err: string) {
//       if (err) {
//         return next(err);
//       }
//       res.redirect("/home");
//     });
//   }
// );
