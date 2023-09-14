"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Author = require("../models/author");
const asyncHandler = require("express-async-handler");
const Post = require("../models/post");
exports.error_page_get = asyncHandler(async (req, res, next) => {
    res.json({ message: "Incorrect Username or Password" });
});
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
        if (value !== req.body.confirmpassword) {
            console.log(value);
            console.log(req.body);
            throw new Error("Passwords do not match");
        }
        return true;
    }),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = new Error(errors
                .array()
                .map(el => el["msg"])
                .toString());
            return next(err);
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
        }
        catch (err) {
            console.error(err);
            const error = new Error("Error! Something went wrong.");
            return next(error);
        }
    }),
];
exports.login_form_post = asyncHandler(async (req, res, next) => {
    let { username, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ username: username });
    }
    catch (err) {
        const error = new Error("Error! Something went wrong.");
        return next(error);
    }
    if (!existingUser) {
        const error = new Error("Wrong username");
        return next(error);
    }
    // Compare the password using bcrypt
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
        const error = new Error("Wrong password");
        return next(error);
    }
    let token;
    try {
        // Creating jwt token
        token = jwt.sign({ userId: existingUser._id, username: existingUser.username }, process.env.signature, { expiresIn: "30m" });
        console.log(token);
    }
    catch (err) {
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
});
exports.authorsession_get = asyncHandler(async (req, res, next) => {
    const posts = await Post.find({});
    console.log(req.url);
    res.json({ message: posts });
});
exports.authorsession_post = asyncHandler(async (req, res, next) => {
    let { username, password } = req.body;
    let existingUser;
    try {
        existingUser = await Author.findOne({ username: username });
    }
    catch (err) {
        const error = new Error("Error! Something went wrong.");
        return next(error);
    }
    console.log(existingUser);
    if (!existingUser) {
        const error = new Error("Wrong username");
        return next(error);
    }
    // Compare the password using bcrypt
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
        const error = new Error("Wrong password");
        return next(error);
    }
    let token;
    try {
        // Creating jwt token
        token = jwt.sign({ userId: existingUser._id, username: existingUser.username }, process.env.signature, { expiresIn: "30m" });
        console.log(token);
    }
    catch (err) {
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
    // res.redirect("/authorsession/posts");
});
exports.authorsession_put = asyncHandler(async (req, res, next) => {
    const usertoken = req.headers.authorization;
    const token = usertoken.split(" ");
    jwt.verify(token[1], process.env.signature);
    console.log(req.body);
    await Post.findOneAndUpdate({ _id: req.body.postid }, { published: req.body.published === "true" ? true : false });
    res.json({ Message: "Comment updated" });
});
