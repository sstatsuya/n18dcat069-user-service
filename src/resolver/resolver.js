const User = require("../model/User");

const resolvers = {
  Query: {
    users: async (parent, args) => {
      return await User.find();
    },
    login: async (parent, args) => {
      return await User.findOne({
        username: args.username,
        password: args.password,
      });
    },
    getUserInfo: async (parent, args) => {
      return await User.findOne({ token: args.token });
    },
  },
};

module.exports = resolvers;
