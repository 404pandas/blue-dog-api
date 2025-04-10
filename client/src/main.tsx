import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
import App from "./App.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/book",
        element: <Book />,
      },
      {
        path: "/character",
        element: <Character />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/drawing-app",
        element: <DrawingApp />,
      },
      {
        path: "/episode",
        element: <Episode />,
      },
      {
        path: "/location",
        element: <Location />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/logout",

        element: <Logout />,
      },
      {
        path: "/not-found",
        element: <NotFound />,
      },
      {
        path: "/item",
        element: <Item />,
      },
      {
        path: "/keepy-uppy",
        element: <KeepyUppy />,
      },
      {
        path: "/short",
        element: <Short />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
