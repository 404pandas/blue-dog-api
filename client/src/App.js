import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Auth from "./utils/auth";

/// IMPORT PAGES ///
import Home from "./pages/Home";
import Account from "./pages/Account";
import CharactersPage from "./pages/CharactersPage";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

/// IMPORT COMPONENTS ///
import ProtectRoute from "./components/ProtectRoute";
import "./App.css";
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

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#149be6",
      dark: "#0d579b",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='*' element={<NotFound />} />
              <Route path='/characters' element={<CharactersPage />} />
              <Route path='/account' element={<Account />} />
              <Route
                path='dashboard/:userId'
                element={
                  Auth.loggedIn() ? (
                    <Dashboard style={{ zIndex: -1, position: "sticky" }} />
                  ) : (
                    <ProtectRoute />
                  )
                }
              />{" "}
              <Route path='/logout' element={<Logout />} />
              <Route path='/profile' element={<Profile />} />
            </Routes>
            <div className='container'></div>
          </ThemeProvider>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
