import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query getBooks {
    books {
      _id
      bookName
      img
      characters
      plot
      publisher
      publish_date
      pages
      isbn
      trivia
    }
  }
`;
