import { gql } from "@apollo/client";

const ADD_CHARACTER = gql`
  mutation addCharacter(
    $characterName: String!
    $description1: String!
    $appearance: String!
    $absences: String!
  ) {
    addCharacter(
      characterName: $characterName
      description1: $description1
      appearance: $appearance
      absences: $absences
    ) {
      id
      characterName
      description1
      appearance
      absences
    }
  }
`;

const DELETE_CHARACTER = gql`
  mutation deleteCharacter($id: ID!) {
    deleteCharacter(id: $id) {
      id
      characterName
      description1
      appearance
      absences
    }
  }
`;

export { ADD_CHARACTER, DELETE_CHARACTER };