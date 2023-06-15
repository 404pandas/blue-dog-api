import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
  query User {
    me {
      _id
      email
      username
    }
  }
`;
