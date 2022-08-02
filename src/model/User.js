const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = new Schema(
  {
    id: { type: String },
    name: { type: String },
    username: { type: String },
    password: { type: String },
    address: { type: String },
    phone: { type: String },
    avatar: { type: String },
    token: { type: String },
    role: { type: Number },
  },
  { collection: "user" }
);

module.exports = mongoose.model("user", User);
