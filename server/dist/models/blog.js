"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
    title: { type: String, required: true, maxLength: 50 },
    published: { type: String, required: true },
    text: { type: String, required: true, maxLength: 300 },
    fullname: { type: String, required: true },
}, { collection: "messages" });
MessageSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `${this._id}`;
});
module.exports = mongoose.model("Message", MessageSchema);
