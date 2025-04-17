import { gql } from "@apollo/client";

export const GET_ITEMS = gql`
  query getItems {
    items {
      _id
      itemName
      img
    }
  }
`;
