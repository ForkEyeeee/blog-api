require("dotenv").config();

import { Request, Response, NextFunction } from "express";
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

exports.post_list_get = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await Post.find({});
    res.json({ message: posts });
  }
);

exports.delete_post_form_get = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "GET Delete a Post" });
  }
);
exports.delete_post_form_delete = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "DELETE Delete a Post" });
  }
);

exports.update_post_form_put = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "PUT Update a Post" });
  }
);

// exports.create_post_form_get = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     console.log(req);
//     res.json({ message: "GET Create a Post" });
//   }
// );

exports.update_post_form_get = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "GET Update a Post" });
  }
);

exports.create_post_form_post = [
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
