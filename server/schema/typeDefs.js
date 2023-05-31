const { gql } = require("graphql-tag");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    characters: [Character]!
  }

  type Character {
    _id: ID!
    characterName: String!
    description1: String!
    description2: String
    catchphrase: String
    appearance: String!
    personality: String
    nicknames: Array
    characteristics: Object
    traits: Object
    personal_status: Object
    firstAppearance: String
    trivia: Array
    absences: Array!
    gallery: Array
    animated: Array
    references: Array
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    me: User

    characters(userId: ID): [Character]
    character(characterId: ID!): Character
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    editUser(username: String, email: String, password: String): User
    deleteUser: User

    addCharacter(
      _id: ID!
      characterName: String!
      description1: String!
      description2: String
      catchphrase: String
      appearance: String!
      personality: String
      nicknames: Array
      characteristics: Object
      traits: Object
      personal_status: Object
      firstAppearance: String
      trivia: Array
      absences: Array!
      gallery: Array
      animated: Array
      references: Array
    ): Character
    editCharacter(
      _id: ID!
      characterName: String!
      description1: String!
      description2: String
      catchphrase: String
      appearance: String!
      personality: String
      nicknames: Array
      characteristics: Object
      traits: Object
      personal_status: Object
      firstAppearance: String
      trivia: Array
      absences: Array!
      gallery: Array
      animated: Array
      references: Array
    ): Character
    deleteCharacter(characterId: ID!): Character
  }
`;

module.exports = typeDefs;
