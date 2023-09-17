"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const Post = require("../models/post");
const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
exports.postListGet = asyncHandler(async (req, res, next) => {
    const posts = await Post.find({});
    console.log(req.url);
    res.json({ message: posts });
});
exports.deletePostFormGet = asyncHandler(async (req, res, next) => {
    res.json({ message: "GET Delete a Post" });
});
exports.deletePostFormDelete = asyncHandler(async (req, res, next) => {
    res.json({ message: "DELETE Delete a Post" });
});
exports.postGet = asyncHandler(async (req, res, next) => {
    const post = await Post.findOne({ _id: req.params.postid });
    const commentIds = post.comments.map(comment => comment.toString());
    const comments = await Comment.find({ _id: { $in: commentIds } }).select({
        username: 1,
        content: 1,
        time: 1,
        _id: 1,
    });
    res.json({ post, comments });
});
exports.updatePostFormPut = asyncHandler(async (req, res, next) => {
    res.json({ message: "PUT Update a Post" });
});
exports.createPostFormPost = [
    asyncHandler(async (req, res, next) => {
        const newPost = new Post({
            title: req.body.title,
            time: new Date().toJSON().slice(0, 10).split("-").reverse().join("/"),
            published: req.body.published,
        });
        await newPost.save();
        res.json({ message: newPost });
    }),
];
