const { AuthenticationError } = require("apollo-server-express");
const {
  User,
  Character,
  Episode,
  Location,
  Short,
  Book,
  Item,
} = require("../models");
const { signToken } = require("../utils/auth");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    // GETS ALL USERS
    users: async () => {
      return User.find().select("-__v -password");
    },
    /// GETS ONE USER
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).select("-__v -password");
    },
    // GETS CURRENT USER
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // GETS ALL BOOKS
    books: async (parent) => {
      return Book.find();
    },
    // GETS SINGLE BOOK BY ID
    book: async (parent, { bookId }) => {
      return Book.findOne({ _id: bookId });
    },
    // GETS ALL CHARACTERS
    characters: async (parent) => {
      return Character.find();
    },
    // GETS SINGLE CHARACTER BY ID
    character: async (parent, { characterId }) => {
      return Character.findOne({ _id: characterId });
    },
    // GETS ALL EPISODES
    episodes: async (parent) => {
      return Episode.find();
    },
    // GETS SINGLE EPISODE BY ID
    episode: async (parent, { episodeId }) => {
      return Episode.findOne({ _id: episodeId });
    },
    // GETS ALL ITEMS
    items: async (parent) => {
      return Item.find();
    },
    // GETS SINGLE ITEM BY ID
    item: async (parent, { itemId }) => {
      return Item.findOne({ _id: itemId });
    },
    // GETS ALL LOCATIONS
    locations: async (parent) => {
      return Location.find();
    },
    // GETS SINGLE LOCATION BY ID
    location: async (parent, { locationId }) => {
      return Location.findOne({ _id: locationId });
    },
    // GETS ALL SHORTS
    shorts: async (parent) => {
      return Short.find();
    },
    // GETS SINGLE SHORT BY ID
    short: async (parent, { locationId }) => {
      return Short.findOne({ _id: locationId });
    },
  },

  Mutation: {
    /// LOGIN ///
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect Credentials");
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError("Incorrect Credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    /// ADD USER ///
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    // EDIT USER BASED ON INPUT AND TOKEN
    editUser: async (parent, args, context) => {
      if (context.user) {
        if (args.password) {
          const saltRounds = 12;
          const newPassword = await bcrypt.hash(args.password, saltRounds);
          return User.findOneAndUpdate(
            { _id: context.user._id },
            {
              $set: {
                username: args.username,
                password: newPassword,
                email: args.email,
              },
            },
            { new: true }
          );
        }
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $set: {
              username: args.username,
              email: args.email,
              phoneNum: args.phoneNum,
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // DELETE USER BASED ON TOKEN
    deleteUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
