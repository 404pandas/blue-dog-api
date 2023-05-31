const express = require("express");
const colors = require("colors");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
require("dotenv").config();
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/db");
const port = process.env.PORT || 3001;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  cache: "bounded",
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(express.static(path.join(__dirname, "../client")));
}

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/public/index.html"));
  });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`Server running on port http://127.0.0.1:${port}`);
      console.log(
        `Navigate to GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

startApolloServer(typeDefs, resolvers);
