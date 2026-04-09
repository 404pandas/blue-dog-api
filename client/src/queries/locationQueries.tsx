import { gql } from "@apollo/client";

export const GET_LOCATIONS = gql`
  query getLocations {
    locations {
      _id
      locationName
      img
      description
      appearance
      rooms
      appearances
      inhabitants
      inconsistencies
      trivia
      gallery
    }
  }
`;
