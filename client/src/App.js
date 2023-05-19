import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Account from "./pages/Account";
import CharactersPage from "./pages/CharactersPage";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import NotFound from "./pages/NotFound";
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        characters: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/characters" element={<CharactersPage />} />
            <Route path="/account" element={<Account />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <div className="container"></div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
