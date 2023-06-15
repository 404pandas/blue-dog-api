import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../queries/userQueries";

import Header from "../components/Header";

function Account() {
  const { data } = useQuery(CURRENT_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <>
      <Header />
      <div className='container my-1'>
        <Link to='/'>← Back to Home</Link>

        {user ? (
          <>
            <Typography variant='h2'>Welcome, {user.username}</Typography>
          </>
        ) : null}
      </div>
    </>
  );
}

export default Account;
