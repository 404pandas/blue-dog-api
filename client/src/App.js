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

// Pages
import Account from "./pages/Account";
import Book from "./pages/Book";
import Character from "./pages/Character";
import Dashboard from "./pages/Dashboard";
import DrawingApp from "./pages/DrawingApp";
import Episode from "./pages/Episode";
import Home from "./pages/Home";
import Location from "./pages/Location";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";
import Item from "./pages/Item";
import KeepyUppy from "./pages/KeepyUppy";
import Short from "./pages/Short";
import Signup from "./pages/Signup";

// CSS
import "./index.css";

// Components
import ProtectRoute from "./components/ProtectRoute";

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
            <Route path='/account' element={<Account />} />
            <Route path='/books' element={<Book />} />
            <Route path='/characters' element={<Character />} />
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
            <Route path='/episodes' element={<Episode />} />
            <Route path='/keepyuppy' element={<KeepyUppy />} />
            <Route path='/drawingapp' element={<DrawingApp />} />
            <Route path='/' element={<Home />} />
            <Route path='/locations' element={<Location />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/items' element={<Item />} />
            <Route path='/shorts' element={<Short />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
