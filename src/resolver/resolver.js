const User = require("../model/User");
const Comment = require("../model/Comment");
const { v4: uuidv4 } = require("uuid");

const resolvers = {
  Query: {
    users: async (parent, args) => {
      return await User.find();
    },
    user: async (parent, args) => {
      return await User.findOne({ id: args.id });
    },
    login: async (parent, args) => {
      let user = await User.findOne({
        username: args.username,
        password: args.password,
      });
      if (!user) {
        return {};
      } else {
        const newToken = "Bearer " + uuidv4();
        await User.findOneAndUpdate(
          { username: args.username },
          { token: newToken },
          { new: true }
        );
        user.token = newToken;
        return user;
      }
    },
    getUserInfo: async (parent, args) => {
      return await User.findOne({ token: args.token });
    },
    comment: async (parent, args) => {
      return await Comment.findOne({ id: args.id });
    },
  },
  Comment: {
    user: async (parent, args) => {
      return await User.findOne({ id: parent.userID });
    },
  },
  User: {
    comments: async (parent, args) => {
      return await Comment.find({ userID: parent.id });
    },
  },
};

module.exports = resolvers;
