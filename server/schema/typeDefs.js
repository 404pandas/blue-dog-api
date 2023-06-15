const { gql } = require("graphql-tag");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Character {
    _id: ID!
    characterName: String!
    description1: String!
    description2: String
    catchphrase: String
    appearance: String!
    personality: String
    nicknames: String
    characteristics: String
    traits: String
    personal_status: String
    firstAppearance: String
    trivia: String
    absences: String!
    gallery: String
    animated: String
    references: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    me: User
    characters: [Character]
    character(characterId: ID!): Character
  }

  type Mutation {
    login(username: String!, email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    editUser(username: String!, email: String!, password: String!): User
    deleteUser: User
    addCharacter(
      _id: ID!
      characterName: String!
      description1: String!
      description2: String
      catchphrase: String
      appearance: String!
      personality: String
      nicknames: String
      characteristics: String
      traits: String
      personal_status: String
      firstAppearance: String
      trivia: String
      absences: String!
      gallery: String
      animated: String
      references: String
    ): Character
    editCharacter(
      _id: ID!
      characterName: String!
      description1: String!
      description2: String
      catchphrase: String
      appearance: String!
      personality: String
      nicknames: String
      characteristics: String
      traits: String
      personal_status: String
      firstAppearance: String
      trivia: String
      absences: String!
      gallery: String
      animated: String
      references: String
    ): Character
    deleteCharacter(characterId: ID!): Character
  }
`;

module.exports = typeDefs;
