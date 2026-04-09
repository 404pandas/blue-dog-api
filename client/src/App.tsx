import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { Outlet } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// COMPONENTS
import Header from "./components/Header";

// CSS
import "./index.css";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Bluey-themed MUI palette
const blueyTheme = createTheme({
  palette: {
    primary: {
      main: "#3b96d2",
      dark: "#1b6fab",
      light: "#a8d8f0",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f4845f",
      dark: "#c85a3a",
      light: "#fac5a4",
      contrastText: "#ffffff",
    },
    background: {
      default: "#ebf6fd",
      paper: "rgba(255,255,255,0.85)",
    },
    text: {
      primary: "#1a3a4a",
      secondary: "#2c5f7a",
    },
  },
  typography: {
    fontFamily: "'hello-headline', cursive",
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background:
            "linear-gradient(135deg, #0d4f82 0%, #3b96d2 100%)",
          boxShadow: "0 4px 24px rgba(59, 150, 210, 0.4)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          "&:before": {
            display: "none",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
          fontFamily: "'hello-headline', cursive",
          textTransform: "none",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: "'hello-headline', cursive",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={blueyTheme}>
      <ApolloProvider client={client}>
        <Header />
        <Outlet />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
