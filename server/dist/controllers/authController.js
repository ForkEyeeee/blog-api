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
exports.errorPageGet = asyncHandler(async (req, res, next) => {
    res.json({ message: "Incorrect Username or Password" });
});
exports.signUpFormPost = [
    body("username", "email must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("password", "Password must not be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
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
exports.loginFormPost = asyncHandler(async (req, res, next) => {
    let { username, password } = req.body;
    console.log("here");
    let existingUser;
    try {
        existingUser = await User.findOne({ username: username });
        console.log(existingUser);
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
exports.authorSessionGet = asyncHandler(async (req, res, next) => {
    const posts = await Post.find({});
    console.log(req.url);
    res.json({ message: posts });
});
exports.authorSessionPost = asyncHandler(async (req, res, next) => {
    let { username, password } = req.body;
    let existingUser;
    try {
        existingUser = await Author.findOne({ username: username });
    }
    catch (err) {
        const error = new Error("Error! Something went wrong.");
        return next(error);
    }
    if (!existingUser) {
        const error = new Error("Wrong username or password.");
        return next(error);
    }
    // Compare the password using bcrypt
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
        const error = new Error("Wrong username or password.");
        return next(error);
    }
    let token;
    try {
        // Creating jwt token
        token = jwt.sign({ userId: existingUser._id, username: existingUser.username }, process.env.signature, { expiresIn: "30m" });
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
exports.authorSessionPut = asyncHandler(async (req, res, next) => {
    try {
        const usertoken = req.headers.authorization;
        const token = usertoken.split(" ");
        jwt.verify(token[1], process.env.signature);
        await Post.findOneAndUpdate({ _id: req.body.postid }, { published: req.body.published === "true" ? true : false });
        res.json({ Message: "Comment updated" });
    }
    catch (error) {
        res.json({ Message: error });
    }
});
exports.createPostPost = asyncHandler(async (req, res, next) => {
    try {
        const usertoken = req.headers.authorization;
        const token = usertoken.split(" ");
        jwt.verify(token[1], process.env.signature);
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            comments: [],
            time: new Date().toJSON().slice(0, 10).split("-").reverse().join("/"),
            published: false,
        });
        await newPost.save();
        res.json({ Message: "post added" });
    }
    catch (error) {
        res.json({ Message: error });
    }
});
