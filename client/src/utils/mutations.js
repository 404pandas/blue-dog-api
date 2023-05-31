import { gql } from "@apollo/client";

export const ADD_USER = gql`
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

export const LOGIN_USER = gql`
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

export const EDIT_USER = gql`
  mutation editUser($username: String!, $email: String!, $password: String) {
    editUser(username: $username, email: $email, password: $password) {
      email
      username
      password
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser {
    deleteUser {
      _id
      username
      email
    }
  }
`;

export const ADD_CHARACTER = gql`
  mutation addCharacter(
    $trackingNum: String!
    $carrier: String!
    $notes: String
  ) {
    addCharacter(trackingNum: $trackingNum, carrier: $carrier, notes: $notes) {
      _id
      carrier
      createdAt
      trackingNum
      userId
      notes
    }
  }
`;

export const EDIT_CHARACTER = gql`
  mutation editCharacter(
    $characterId: ID!
    $trackingNum: String
    $carrier: String
    $notes: String
  ) {
    editCharacter(
      characterId: $characterId
      trackingNum: $trackingNum
      carrier: $carrier
      notes: $notes
    ) {
      _id
    }
  }
`;

export const DELETE_CHARACTER = gql`
  mutation deleteCharacter($characterId: ID!) {
    deleteCharacter(characterId: $characterId) {
      _id
    }
  }
`;
