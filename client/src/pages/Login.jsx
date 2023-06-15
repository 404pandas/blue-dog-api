import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../mutations/userMutations";
import Header from "../components/Header";

import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [login, { error }] = useMutation(LOGIN_USER);

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
      <div className='container my-1'>
        <Link to='/signup'>← Go to Signup</Link>

        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='flex-row space-between my-2'>
            <label htmlFor='email'>Email address:</label>
            <input
              placeholder='youremail@test.com'
              name='email'
              type='email'
              id='email'
              onChange={handleChange}
            />
          </div>
          <div className='flex-row space-between my-2'>
            <label htmlFor='pwd'>Password:</label>
            <input
              placeholder='******'
              name='password'
              type='password'
              id='pwd'
              onChange={handleChange}
            />
          </div>
          {error ? (
            <div>
              <p className='error-text'>
                The provided credentials are incorrect
              </p>
            </div>
          ) : null}
          <div className='flex-row flex-end'>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
