import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./utils/auth";

import Home from "./pages/Home";
import Account from "./pages/Account";
import Character from "./pages/Character";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";
import ProtectRoute from "./components/ProtectRoute";
import "./index.css";
import Login from "./pages/Login";
import Episode from "./pages/Episode";
import Location from "./pages/Location";
import Short from "./pages/Short";
import Signup from "./pages/Signup";

// todo- components

const httpLink = createHttpLink({
  uri: "/graphql",
});

/// SET CONTEXT ///
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

/// SET UP CLIENT ///
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/characters' element={<Character />} />

            <Route path='/account' element={<Account />} />
            <Route path='/locations' element={<Location />} />
            <Route path='/episodes' element={<Episode />} />
            <Route path='/shorts' element={<Short />} />
            <Route
              path='dashboard/:userId'
              element={
                Auth.loggedIn() ? (
                  <Dashboard style={{ zIndex: -1, position: "sticky" }} />
                ) : (
                  <ProtectRoute />
                )
              }
            />
            <Route path='/logout' element={<Logout />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
