import express from "express";
import type { Request, Response } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
// Import the ApolloServer class
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { authenticateToken } from "./utils/auth.js";
// Import the two parts of a GraphQL schema
import { typeDefs, resolvers } from "./schema/index.js";
import db from "./config/db.js";
import routes from "./routes/index.js"; // example REST routes

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes); // or whatever routes you created

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  await db;

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(
    "/graphql",
    expressMiddleware(server as any, {
      context: authenticateToken as any,
    })
  );

  if (process.env.NODE_ENV === "production") {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const clientDist = join(__dirname, "../../client/dist");

    app.use(express.static(clientDist));

    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(join(clientDist, "index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

// Call the async function to start the server
startApolloServer();
