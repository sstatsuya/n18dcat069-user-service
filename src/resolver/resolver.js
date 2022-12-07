const User = require("../model/User");
const Comment = require("../model/Comment");
const db = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const AbortController = require("abort-controller");

const queryUserMySql = (username, password) => {
  let query = `SELECT * FROM sys.user where username="${username}" and password="${password}"`;
  console.log("query: " + query);
  return new Promise((resolve, reject) => {
    db.con.query(query, (err, res) => {
      return err ? reject(err) : resolve(res[0]);
    });
  });
};

const validateInput = (input) => {
  const regex = /^([a-z]|[A-Z]|[0-9]){1,20}$/;
  return regex.test(input);
};

const resolvers = {
  Query: {
    users: async (parent, args) => {
      return await User.find();
    },
    user: async (parent, args) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
        console.log("timeout");
      }, 10);
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
    loginMySql: async (parent, args) => {
      // if (!validateInput(args.username) || !validateInput(args.password))
      //   return null;
      let a = await queryUserMySql(args.username, args.password);
      return a;
    },
    loginJSON: async (parent, args) => {
      let user = await User.findOne({
        username: args.input.username,
        password: args.input.password,
      });
      if (!user) {
        return {};
      } else {
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
