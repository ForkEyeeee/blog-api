"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: { type: String, maxLength: 100 },
    content: { type: String },
    comments: [{ type: Schema.Types.ObjectId, ref: "comments" }],
    time: { type: String },
    published: { type: Boolean },
}, { collection: "posts" });
PostSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `${this._id}`;
});
module.exports = mongoose.model("Post", PostSchema);
