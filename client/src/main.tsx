import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import Account from "./pages/Account.js";
import Book from "./pages/Book.js";
import Character from "./pages/Character.js";
import DrawingApp from "./pages/DrawingApp.js";
import Episode from "./pages/Episode.js";
import Home from "./pages/Home.js";
import Location from "./pages/Location.js";
import Login from "./pages/Login.js";
import Logout from "./pages/Logout.js";
import NotFound from "./pages/NotFound.js";
import Item from "./pages/Item.js";
import KeepyUppy from "./pages/KeepyUppy.js";
import Short from "./pages/Short.js";
import Signup from "./pages/Signup.js";
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
