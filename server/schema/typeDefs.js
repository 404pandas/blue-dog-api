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
    appearance: String
    personality: String
    nicknames: String
    characteristics: String
    traits: String
    personal_status: String
    firstAppearance: String
    trivia: String
    absences: String
    gallery: String
    animated: String
    references: String
  }

  type Episode {
    _id: ID!
    episodeName: String!
    description: String!
    season: Int!
    episode: Int!
  }

  type Location {
    _id: ID!
    locationName: String!
    description: String!
    appearance: String
    rooms: String
    appearances: String
    inhabitants: String
    inconsistences: String
    trivia: String
    gallery: String
  }

  type Short {
    _id: ID!
    shortName: String!
    plot: String!
    characters: String
    trivia: String
    url: String
    premiereDate: String
  }

  type Book {
    _id: ID!
    bookName: String!
    img: String!
    characters: String
    plot: String
    publisher: String
    publish_date: String
    pages: String
    isbn: String
    trivia: String
  }

  type Prop {
    _id: ID!
    proptName: String!
    img: String!
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
    episodes: [Episode]
    episode(episodeId: ID!): Episode
    locations: [Location]
    location(locationId: ID!): Location
    shorts: [Short]
    short(shortId: ID!): Short
  }

  type Mutation {
    login(username: String!, email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    editUser(username: String!, email: String!, password: String!): User
    deleteUser: User
  }
`;

module.exports = typeDefs;
