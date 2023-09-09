require("dotenv").config();
import { Request, Response, NextFunction } from "express";
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

exports.sign_up_form_get = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);

    res.json({ message: "SIGN UP FORM" });
  }
);

// exports.login_form_get = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     // const lastError = req.session.messages
//     //   ? req.session.messages[req.session.messages.length - 1] // show form error messages for login
//     //   : "";
//     res.render("login_form", {
//       title: "Login",
//       error: lastError,
//     });
//   }
// );
