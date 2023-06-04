import { gql } from "@apollo/client";

const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
        email
        _id
      }
    }
  }
`;

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

const EDIT_USER = gql`
  mutation editUser($username: String!, $email: String!, $password: String) {
    editUser(username: $username, email: $email, password: $password) {
      email
      username
      password
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser {
    deleteUser {
      _id
      username
      email
    }
  }
`;

export { ADD_USER, DELETE_USER, EDIT_USER, LOGIN_USER };
