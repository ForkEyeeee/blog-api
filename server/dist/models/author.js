"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AuthorSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
}, { collection: "author" });
AuthorSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `${this._id}`;
});
module.exports = mongoose.model("Author", AuthorSchema);
