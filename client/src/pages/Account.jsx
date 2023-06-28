import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";

import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../queries/userQueries";

import Header from "../components/Header";

function Account() {
  const { data } = useQuery(CURRENT_USER);
  const userData = data?.me || {};

  console.log(userData);
  return (
    <>
      <Header />
      <Container>
        {" "}
        {userData ? (
          <>
            <Typography variant='h3'>Welcome, {userData.username}</Typography>
          </>
        ) : null}
      </Container>
    </>
  );
}

export default Account;
