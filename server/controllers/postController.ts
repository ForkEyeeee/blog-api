require("dotenv").config();
import { Request, Response, NextFunction } from "express";
const Post = require("../models/post");
const Comment = require("../models/comment");

const asyncHandler = require("express-async-handler");

exports.postListGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await Post.find({});
    console.log(req.url);
    res.json({ message: posts });
  }
);

exports.postGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await Post.findOne({ _id: req.params.postid });
    const commentIds = post.comments.map((comment: any) => comment.toString());
    const comments = await Comment.find({ _id: { $in: commentIds } }).select({
      username: 1,
      content: 1,
      time: 1,
      _id: 1,
    });
    res.json({ post, comments });
  }
);

exports.createPostFormPost = [
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const newPost = new Post({
      title: req.body.title,
      time: new Date().toJSON().slice(0, 10).split("-").reverse().join("/"),
      published: req.body.published,
    });
    await newPost.save();
    res.json({ message: newPost });
  }),
];
