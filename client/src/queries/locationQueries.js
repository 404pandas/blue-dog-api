import { gql } from "@apollo/client";

export const GET_LOCATIONS = gql`
  query getLocations {
    locations {
      _id
      locationName
      description
      appearance
      rooms
      appearances
      inhabitants
      inconsistences
      trivia
      gallery
    }
  }
`;
