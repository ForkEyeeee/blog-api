require("dotenv").config();

import { Request, Response, NextFunction } from "express";
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

exports.create_post_form_get = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req);
    res.json({ message: "Create a Post" });
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
    res.json({ message: "Success" });
  }),
];
