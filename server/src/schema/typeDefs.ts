const typeDefs = `
  type Book {
    _id: ID!
    bookName: String
    img: String
    characters: String
    plot: String
    publisher: String
    publish_date: String
    pages: String
    isbn: String
    trivia: String
  }

  type Character {
    _id: ID!
    characterName: String
    species: String
    breed: String
    gender: String
    age: String
    family: Family
    appearance: Appearance
    personality: Personality
    catchphrase: String
    hobbies: [String]
    friends: [String]
    nicknames: String
    firstAppearance: String
    notableEpisodes: [String]
    funfacts: FunFacts
    characteristics: String
    traits: String
    personal_status: String
    trivia: String
    absences: String
    gallery: String
    animated: String
    references: String
  }

  type Family {
    father: String
    mother: String
    sister: String
    uncle: String
    aunt: String
    cousins: [String]
    grandparents: Grandparents
    children: [String]
  }

  type Grandparents {
    maternal: [String]
    paternal: [String]
  }

  type Appearance {
    fur: [String]
    eyes: String
    nose: String
    markings: Markings
  }

  type Markings {
    paws: String
    outerMuzzle: String
    eyebrows: String
    chest: String
    legs: String
    arms: String
    torso: String
    head: String
    tail: Tail
    ears: Ear
    muzzle: String
    furColor: [String]
    distinctiveFeatures: [String]
  }

  type Tail {
    stem: String
    tip: String
  }

  type Ear {
    outer: String
    inner: String
  }

  type Personality {
    traits: [String]
    likes: [String]
    dislikes: [String]
  }

  type FunFacts {
    favoriteAnimal: String
    favoriteColorOfCapsicum: String
    favoriteBreakfast: String
    school: String
    middleName: String
    beltRank: BeltRank
    canRead: String
    instrument: String
    birthdayStatus: BirthdayStatus
    spokenInShorts: [String]
    mistakenForBoy: Boolean
    emojiAvailableOnDisneyNOW: Boolean
    absentEpisodes: AbsentEpisodes
    limited_information: String
  }

  type BeltRank {
    start: String
    current: String
  }


  type BirthdayStatus {
    lastSeen: String
    ageConfirmed: Int
    comment: String
  }

  type AbsentEpisodes {
    main: [String]
    shorts: [String]
    }

  type Episode {
    _id: ID!
    episodeName: String
    description: String
    season: Int
    episode: Int
  }

  type Location {
    _id: ID!
    locationName: String
    description: String
    appearance: String
    rooms: String
    appearances: String
    inhabitants: String
    inconsistencies: String
    trivia: String
    gallery: String
  }

  type Item {
    _id: ID!
    itemName: String
    img: String
  }

  type Short {
    _id: ID!
    shortName: String
    plot: String
    characters: String
    trivia: String
    url: String
    premiereDate: String
  }

  type User {
    _id: ID!
    username: String!
    email: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    me: User
    books: [Book]
    book(bookId: ID!): Book
    characters: [Character]
    character(characterId: ID!): Character
    episodes: [Episode]
    episode(episodeId: ID!): Episode
    locations: [Location]
    location(locationId: ID!): Location
    items: [Item]
    item(itemId: ID!): Item
    shorts: [Short]
    short(shortId: ID!): Short
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    editUser(username: String!, email: String!, password: String!): User
    deleteUser: User
  }
`;

export default typeDefs;
