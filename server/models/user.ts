const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, maxLength: 200 },
    password: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "comments" }],
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", UserSchema);
