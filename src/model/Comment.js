const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = new Schema(
  {
    id: { type: String },
    userID: { type: String },
    productID: { type: String },
    content: { type: String },
    time: { type: Number },
  },
  { collection: "comment" }
);

module.exports = mongoose.model("comment", Comment);
