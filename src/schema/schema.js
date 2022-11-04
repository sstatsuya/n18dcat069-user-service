const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID
    name: String
    username: String
    password: String
    address: String
    phone: String
    avatar: String
    token: String
    role: Int
    comments: [Comment]
  }

  type Comment {
    id: String
    userID: String
    productID: String
    content: String
    time: Int
    user: User
  }

  type Query {
    users: [User]
    login(username: String, password: String): User
    getUserInfo(token: String): User
    user(id: String): User
    comments: [Comment]
    comment(id: String): Comment
  }
`;

module.exports = typeDefs;
