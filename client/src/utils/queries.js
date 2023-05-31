import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
  query User {
    me {
      _id
      email
      username
      characters {
     _id!
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
  }
`;
