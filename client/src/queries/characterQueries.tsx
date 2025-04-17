import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query getCharacters {
    characters {
      _id
      characterName
      description1
      description2
      catchphrase
      appearance
      personality
      nicknames
      characteristics
      traits
      personal_status
      firstAppearance
      trivia
      absences
      gallery
      animated
      references
    }
  }
`;
