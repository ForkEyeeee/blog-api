"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const Post = require("../models/post");
const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
exports.post_list_get = asyncHandler(async (req, res, next) => {
    const posts = await Post.find({});
    res.json({ message: posts });
});
exports.delete_post_form_get = asyncHandler(async (req, res, next) => {
    res.json({ message: "GET Delete a Post" });
});
exports.delete_post_form_delete = asyncHandler(async (req, res, next) => {
    res.json({ message: "DELETE Delete a Post" });
});
exports.update_post_form_get = asyncHandler(async (req, res, next) => {
    const post = await Post.findOne({ _id: req.params.postid });
    // const getComments = await Promise.all(
    //   post.comments.map(async comment => {
    //     comment.findOne({ _id: comment.comment });
    //   })
    // );
    // let array = [];
    const commentIds = post.comments.map(comment => comment.toString());
    // commentIds.forEach(comment => {
    //   array.push(comment.toString());
    //   // console.log(comment.toString());
    // });
    // console.log(commentIds);
    // const comments = await Promise.all(
    //   commentIds.map(async comment => {
    //     await Comment.findOne({ _id: comment }).select({
    //       username: 1,
    //       content: 1,
    //       time: 1,
    //       _id: 0,
    //     });
    //   })
    // );
    const comments = await Comment.find({ _id: { $in: commentIds } }).select({
        username: 1,
        content: 1,
        time: 1,
        _id: 1,
    });
    // const test = await Comment.findOne({
    //   _id: "64fc0b2b0efb13c88b2e59ba",
    // }).select({ username: 1, content: 1, time: 1, _id: 0 });
    // const comments = await Comment.find({ _id: { $in: followedIDs } });
    console.log(comments);
    // post.comments.forEach(comment => {
    //   await Post.findOne({ _id: req.params.postid });
    // });
    // console.log(req.params.postid);
    res.json({ post, comments });
});
exports.update_post_form_put = asyncHandler(async (req, res, next) => {
    res.json({ message: "PUT Update a Post" });
});
// exports.create_post_form_get = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     console.log(req);
//     res.json({ message: "GET Create a Post" });
//   }
// );
exports.create_post_form_post = [
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
