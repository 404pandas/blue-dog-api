import { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../mutations/userMutations";
import Header from "../components/Header";

import Auth from "../utils/auth";

// MUI
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const Login = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  /// FORM SUBMISSION ///
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;

      Auth.login(token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <main style={{ marginTop: "160px", marginBottom: "60px" }}>
        {data ? (
          <>
            <Typography variant='body1'>Success!</Typography>
            <Link to='/'>Back to hompage.</Link>
          </>
        ) : (
          <Container component='main' maxWidth='xs'>
            <CssBaseline />

            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component='h1' variant='h5'>
                Login
              </Typography>
              <Box
                component='form'
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id='email'
                      label='Email Address'
                      name='email'
                      autoComplete='email'
                      value={formState.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name='password'
                      label='Password'
                      type='password'
                      id='password'
                      autoComplete='new-password'
                      value={formState.password}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>{" "}
                <Grid container justifyContent='flex-end'>
                  <Grid item>
                    <Link to='/signup' variant='body2'>
                      Need an account? Signup
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        )}

        {error ? (
          <div>
            <p className='error-text'>The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className='flex-row flex-end'></div>
      </main>
    </>
  );
};

export default Login;
