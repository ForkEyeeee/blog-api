require("dotenv").config();
import { Request, Response, NextFunction } from "express";
const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Post = require("../models/post");

exports.updateCommentFormPut = [
  body("userComment", "edited comment must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const usertoken = req.headers.authorization;
      const token = usertoken.split(" ");
      jwt.verify(token[1], process.env.signature);
      await Comment.findOneAndUpdate(
        { _id: req.body.commentId },
        { content: req.body.userComment }
      );
      res.json({ Message: "Comment updated" });
    }
  }),
];

exports.createCommentFormPost = [
  body("comment", "new comment must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const usertoken = req.headers.authorization;
      const token = usertoken.split(" ");
      const decoded = jwt.verify(token[1], process.env.signature);
      const newComment = new Comment({
        username: decoded.username,
        content: req.body.comment,
        post: req.params.postid,
        time: new Date().toJSON().slice(0, 10).split("-").reverse().join("/"),
      });
      await newComment.save();
      await Post.findOneAndUpdate(
        { _id: req.params.postid },
        { $push: { comments: newComment } }
      );
      await User.findOneAndUpdate(
        { _id: decoded.userId },
        { $push: { comments: newComment } }
      );
    }
    res.json({ Message: "Comment Added" });
  }),
];

exports.deleteCommentFormDelete = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let { usercomment, commentId } = req.body;
    await Comment.deleteOne({ _id: commentId });
    res.json({ message: "Comment deleted" });
  }
);

exports.commentListGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "GET Comment List" });
  }
);
