import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../components/Header";

import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export default function NotFound() {
  return (
    <>
      <Header />
      <div src="" alt="" id="not-found-img">
        Not Found Image
      </div>
      <Typography variant="h1">Not Found</Typography>
      <Typography variant="h4">
        The page you were looking for could not be found.
      </Typography>
      <Link to="/">
        <Button color="primary" variant="extended" aria-label="cancel">
          <ArrowBackIcon sx={{ mr: 1 }} />
          Go Back
        </Button>{" "}
      </Link>
    </>
  );
}
