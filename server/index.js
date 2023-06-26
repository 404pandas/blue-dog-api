const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
require("dotenv").config();
const { typeDefs, resolvers } = require("./schema/index");
const db = require("./config/db");
const PORT = process.env.PORT || 3001;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  cache: "bounded",
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if (process.env.NODE_ENV === "development") {
//   app.use(express.static(path.join(__dirname, "../client")));
// }

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// Create a new instance of an Apollo server with the GraphQL schema

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/public/index.html"));
  });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API Server running on port http://localhost:${PORT}`);
      console.log(
        `GraphQL access at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
