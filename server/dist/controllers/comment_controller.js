"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Post = require("../models/post");
exports.create_comment_form_get = asyncHandler(async (req, res, next) => {
    res.json({ message: "GET Create a Comment" });
});
(exports.create_comment_form_post =
    // Main middleware
    asyncHandler(async (req, res, next) => {
        // if (!errors.isEmpty()) {
        //   return res.status(400).json({ errors: errors.array() });
        // }
        console.log("] comment");
        const usertoken = req.headers.authorization;
        const token = usertoken.split(" ");
        const decoded = jwt.verify(token[1], process.env.signature);
        if (req.body.comment) {
            const newComment = new Comment({
                username: decoded.username,
                content: req.body.comment,
                post: req.params.postid,
                time: new Date().toJSON().slice(0, 10).split("-").reverse().join("/"),
            });
            await newComment.save();
            await Post.findOneAndUpdate({ _id: req.params.postid }, { $push: { comments: newComment } });
            await User.findOneAndUpdate({ _id: decoded.userId }, { $push: { comments: newComment } });
            // res.redirect(`/`);
        }
        else if (req.body.userComment) {
            console.log("updating comment");
            await Comment.findOneAndUpdate({ _id: req.body.commentId }, { content: req.body.userComment });
            // res.redirect("/");
        }
        else {
            // Neither a new comment nor an edited comment provided.
            res.status(400).send("Invalid request");
        }
    })),
    (exports.update_comment_form_get = asyncHandler(async (req, res, next) => {
        res.json({ message: "GET Update a Comment" });
    }));
exports.update_comment_form_put = asyncHandler(async (req, res, next) => {
    res.json({ message: "PUT Update a Comment" });
});
exports.delete_comment_form_get = asyncHandler(async (req, res, next) => {
    res.json({ message: "GET Delete a Comment" });
});
exports.delete_comment_form_delete = asyncHandler(async (req, res, next) => {
    res.json({ message: "DELETE a Comment" });
});
exports.comment_list_get = asyncHandler(async (req, res, next) => {
    res.json({ message: "GET Comment List" });
});
