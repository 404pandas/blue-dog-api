const { characters } = require("../sampleData");

// Mongoose models
const Character = require("../models/Character");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

// Cbaracter Type
const CharacterType = new GraphQLObjectType({
  name: "Character",
  fields: () => ({
    id: { type: GraphQLID },
    characterName: { type: GraphQLString },
    description1: { type: GraphQLString },
    decription2: { type: GraphQLString },
    catchphrase: { type: GraphQLString },
    appearance: { type: GraphQLString },
    personality: { type: GraphQLString },
    nicknames: { type: GraphQLString },
    characteristics: { type: GraphQLString },
    traits: { type: GraphQLString },
    personal_status: { type: GraphQLString },
    first_appearance: { type: GraphQLString },
    trivia: { type: GraphQLString },
    appearances: { type: GraphQLString },
    absences: { type: GraphQLString },
    gallery: { type: GraphQLString },
    animated: { type: GraphQLString },
    references: { type: GraphQLString },
  }),
});

const CharacterRootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    characters: {
      type: new GraphQLList(CharacterType),
      resolve(parent, args) {
        Character.find();
      },
    },
    character: {
      type: CharacterType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Character.findById(args.id);
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add a character
    addCharacter: {
      type: CharacterType,
      args: {
        characterName: { type: GraphQLNonNull(GraphQLString) },
        description1: { type: GraphQLNonNull(GraphQLString) },
        appearance: { type: GraphQLNonNull(GraphQLString) },
        absences: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const character = new Character({
          characterName: args.characterName,
          description1: args.description1,
          appearance: args.appearance,
          absences: args.absences,
        });
        return character.save();
      },
    },
    // Delete a character
    deleteCharacter: {
      type: CharacterType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Character.findByIdAndRemove(args.id);
      },
    },
    // Update a character
    updateCharacter: {
      type: CharacterType,
      args: {
        characterName: { type: GraphQLNonNull(GraphQLString) },
        description1: { type: GraphQLNonNull(GraphQLString) },
        appearance: { type: GraphQLNonNull(GraphQLString) },
        absences: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Character.findByIdAndUpdate(
          args.id,
          {
            $set: {
              characterName: args.characterName,
              description1: args.description1,
              appearance: args.appearance,
              absences: args.absences,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: CharacterRootQuery,
  mutation,
});
