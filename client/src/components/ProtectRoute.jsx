import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";

const ProtectRoute = () => {
  return (
    <main>
      <Container
        sx={{
          height: "75vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: {
            xs: "160px",
            sm: "160px",
            md: "100px",
            lg: "100px",
            xl: "100px",
          },
          marginBottom: {
            xs: "-10px",
            sm: "-10px",
            md: "-40px",
            lg: "-40px",
            xl: "-40px",
          },
        }}
      >
        <img
          src=''
          alt='placeholder for protect route'
          style={{ height: "250px", width: "250px", margin: 3 }}
        />
        <Container sx={{ m: 3 }}>
          <Typography variant='h5' align='center'>
            Sorry, but you must be logged in to your account to view this
            information.
          </Typography>
        </Container>
        <Container
          sx={{
            m: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to='/login' style={{ textDecoration: "none" }}>
            <Button variant='outlined' sx={{ m: 1 }}>
              Login
            </Button>
          </Link>
          <Link to='/signup' style={{ textDecoration: "none" }}>
            <Button variant='outlined' sx={{ m: 1 }}>
              Sign Up
            </Button>
          </Link>
        </Container>
      </Container>
    </main>
  );
};

export default ProtectRoute;
