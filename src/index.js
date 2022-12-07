const express = require("express"); // import thư viện express đã cài ở trên
const createValidation = require("graphql-no-batched-queries");
const depthLimit = require("graphql-depth-limit");
const { GraphQLError } = require("graphql");
const {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const app = express(); // app ở đây đại diện cho cái dự án nodejs mà mình sẽ làm việc xuyên suốt
const port = 3000; // muốn run app ở port 3000
const { ApolloServer } = require("apollo-server-express");

const validation = createValidation({
  allow: 2,
  errorFn: () => {
    return new GraphQLError("Get out here hacker", {
      extensions: { code: "FORBIDDEN", exception: { stacktrace: [] } },
    });
  },
});

const database = require("./config/database");
database.connect();

const BodyParser = require("body-parser");
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    persistedQueries: {
      ttl: 2,
    },
    formatError: (err) => {
      console.log("Error: " + err);
      return new Error("Bad Request");
    },
    // validationRules: [validation, depthLimit(5)],
    // introspection: false,
    // plugins: [ApolloServerPluginLandingPageDisabled()],
  });

  var options = {
    timeout: 1000,
    onTimeout: function (req, res, next) {
      console.log("HET GIO!!!");
      // res.status(500).send("Hết giờ");
      next();
      return new GraphQLError("Get out here hacker", {
        extensions: { code: "FORBIDDEN", exception: { stacktrace: [] } },
      });
    },
  };
  var timeout = require("express-timeout-handler");
  await server.start();
  const app = express();
  // app.use(timeout.handler(options));

  server.applyMiddleware({
    app,
    path: "/",
  });
  const PORT = process.env.PORT || 7001;
  await new Promise((resolve) => {
    app.listen({ port: PORT }, resolve);
    // app.listen({ port: PORT }, resolve).setTimeout(500, () => {
    //   console.log("HET GIO!!!");
    // });
  });
  console.log(
    `🚀 User service ready at http://localhost:${PORT}${server.graphqlPath}`
  );
}
startApolloServer(typeDefs, resolvers);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   // Cho app lắng nghe địa chỉ localhost (127.0.0.1) trên port 3000
//   console.log(`Example app listening on port ${PORT}`);
// });
