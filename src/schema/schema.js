const { gql } = require("apollo-server-express");
const { GraphQLJSON, GraphQLJSONObject } = require("graphql-type-json");

const typeDefs = gql`
  scalar JSON
  scalar JSONObject
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

  type Res {
    data: JSONObject
  }

  type Query {
    users: [User]
    login(username: String, password: String): User
    getUserInfo(token: String): User
    user(id: String): User
    comments: [Comment]
    comment(id: String): Comment
    loginMySql(username: String, password: String): User
    loginJSON(input: JSONObject): User
  }
`;

module.exports = typeDefs;
