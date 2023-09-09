require("dotenv").config();

import { Request, Response, NextFunction } from "express";
const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

exports.create_comment_form_get = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "GET Create a Comment" });
  }
);

exports.create_comment_form_post = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "POST Create a Comment" });
  }
);

exports.update_comment_form_get = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "GET Update a Comment" });
  }
);

exports.update_comment_form_put = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "PUT Update a Comment" });
  }
);

exports.delete_comment_form_get = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "GET Delete a Comment" });
  }
);

exports.delete_comment_form_delete = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "DELETE a Comment" });
  }
);

exports.comment_list_get = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "GET Comment List" });
  }
);
