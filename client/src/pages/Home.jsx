import Header from "../components/Header";
import GifCarousel from "../components/GifCarousel";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

import linkedin from "../assets/images/presentation/linkedin-qr.png";
import repo from "../assets/images/presentation/repo-qr.png";
import portfolio from "../assets/images/presentation/portfolios-qr.png";

export default function Home() {
  return (
    <>
      <Header />
      <Container
        sx={{
          marginLeft: "auto",
        }}
        component='main'
        maxWidth='s'
      >
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant='h4'>Welcome to my Portfolio Project!</Typography>
          <GifCarousel />
          <Typography variant='h6'>
            I'm looking for full stack development work!
          </Typography>
          <Grid
            className='flexbox-turn-on'
            sx={{
              justifyContent: "center",
            }}
            container
            spacing={1}
          >
            <Grid
              item
              xs={3}
              className='flexbox-turn-on'
              sx={{
                justifyContent: "center",
              }}
            >
              <Link to='https://www.linkedin.com/in/404pandas/'>
                {" "}
                <img
                  className='qr-codes'
                  src={linkedin}
                  alt='QR code for linkedin'
                />
              </Link>
            </Grid>

            <Grid
              item
              xs={3}
              className='flexbox-turn-on'
              sx={{
                justifyContent: "center",
              }}
            >
              <Link to='https://github.com/404pandas/blue-dog-api'>
                {" "}
                <img
                  className='qr-codes'
                  src={repo}
                  alt='QR code for github repository'
                />
              </Link>
            </Grid>
            <Grid
              item
              xs={3}
              className='flexbox-turn-on'
              sx={{
                justifyContent: "center",
              }}
            >
              <Link to='https://404pandas.github.io'>
                {" "}
                <img
                  className='qr-codes'
                  src={portfolio}
                  alt='QR code for portfolio'
                />
              </Link>
            </Grid>
          </Grid>
          {/* Resume */}
          {/* Portfolio */}
          {/* Linkedin */}
          {/* Project Repo */}
        </Box>
      </Container>
    </>
  );
}
