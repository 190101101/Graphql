const fs = require("fs");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./graphql/resolvers/index");
const db = require("./data");

const types = [
  `${__dirname}/graphql/Types/movie.graphql`,
  `${__dirname}/graphql/Types/director.graphql`,
].map((rows) => fs.readFileSync(rows, { encoding: "utf-8" }));

const server = new ApolloServer({
  typeDefs: [types],
  resolvers,
  context: {
    db,
  },
});

(async () => {
  await server.start();
  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`http://localhost:4000${server.graphqlPath}`);
  });
})();
