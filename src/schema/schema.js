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
  }

  type Query {
    users: [User]
    login(username: String, password: String): User
    getUserInfo(token: String): User
  }
`;

module.exports = typeDefs;
