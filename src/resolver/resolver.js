const User = require("../model/User");
const { v4: uuidv4 } = require("uuid");

const resolvers = {
  Query: {
    users: async (parent, args) => {
      return await User.find();
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
  },
};

module.exports = resolvers;
