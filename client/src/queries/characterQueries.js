import { gql } from "@apollo/client";

// Get Characters query
const GET_CHARACTERS = gql`
  query getCharacters {
    characters {
      id
      characterName
      description1
      decription2
      catchphrase
      appearance
      personality
      nicknames
      characteristics
      traits
      personal_status
      first_appearance
      trivia
      appearances
      absences
      gallery
      animated
      references
    }
  }
`;

export { GET_CHARACTERS };
