import { gql } from "@apollo/client";

export const GET_PROPS = gql`
  query getProps {
    props {
      _id
      propName
      img
    }
  }
`;
