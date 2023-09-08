"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
exports.create_post_form_get = asyncHandler(async (req, res, next) => {
    console.log(req);
    res.json({ message: "Create a Post" });
});
exports.create_post_form_post = [
    asyncHandler(async (req, res, next) => {
        const newPost = new Post({
            title: req.body.title,
            time: new Date().toJSON().slice(0, 10).split("-").reverse().join("/"),
            published: req.body.published,
        });
        await newPost.save();
        res.json({ message: "Success" });
    }),
];
