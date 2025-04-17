import { gql } from "@apollo/client";

export const GET_SHORTS = gql`
  query getShorts {
    shorts {
      _id
      shortName
      plot
      characters
      trivia
      url
      premiereDate
    }
  }
`;
