"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
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
        if (value === req.body.password) {
            return true;
        }
        else {
            throw new Error("Passwords do not match");
        }
    }),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        console.log(req.body);
        if (!errors.isEmpty()) {
            // res.redirect("/users/new");
            return res.status(400).json({ errors: errors.array() });
            // console.log(errors);
        }
        else {
            const newUser = new User({
                username: req.body.username,
                password: req.body.password,
                comments: [],
            });
            bcrypt.hash(newUser.password, 10, async (err, hashedPassword) => {
                if (err) {
                    throw new Error("Hashing error");
                }
                newUser.password = hashedPassword;
                await newUser.save();
                console.log("saved");
                // req.user ? res.redirect("/home") : res.redirect("/login");
                res.redirect("/");
            });
        }
    }),
];
// exports.sign_up_form_post = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     console.log(req.body);
//     res.json({ message: "yoo" });
//     // res.redirect("/posts");
//   }
// );
exports.login_form_post = asyncHandler(passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true,
})
// console.log(req.user)
// async (req: Request, res: Response, next: NextFunction) => {
//   res.json({ message: "login post" });
// }
);
exports.logout_get = asyncHandler(async (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/home");
    });
});
