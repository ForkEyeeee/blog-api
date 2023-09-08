const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, maxLength: 100 },
    time: { type: String },
    published: { type: Boolean },
  },
  { collection: "messages" }
);

PostSchema.virtual("url").get(function (): string {
  // We don't use an arrow function as we'll need the this object
  return `${this._id}`;
});

module.exports = mongoose.model("Message", PostSchema);
