const { AuthenticationError } = require("apollo-server-express");
const { User, Character } = require("../models");
const { signToken } = require("../utils/auth");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    // GETS ALL USERS
    users: async () => {
      return User.find().populate("characters").select("-__v -password");
    },
    /// GETS ONE USER
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId })
        .populate("characters")
        .select("-__v -password");
    },
    // GETS CURRENT USER
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate("characters")
          .select("-__v -password");
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // GETS ALL CHARACTERS, IF PASS USERNAME THEN ALL CHARACTERS FOR SPECIFIC USER
    characters: async (parent, { userId }) => {
      const params = userId ? { userId } : {};
      return Character.find(params).sort({ createdAt: -1 });
    },
    // GETS SINGLE CHARACTER BY ID
    character: async (parent, { characterId }) => {
      return Character.findOne({ _id: characterId });
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

    // CREATE NEW CHARACTER
    addCharacter: async (parent, args, context) => {
      if (context.user) {
        const character = await Character.create({
          ...args,
          userId: context.user._id,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { characters: character._id } }
        );
        return character;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // EDIT CHARACTER
    editCharacter: async (parent, args, context) => {
      if (context.user) {
        return Character.findOneAndUpdate(
          { _id: args.characterId },
          { $set: args },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // DELETE CHARACTER
    deleteCharacter: async (parent, args, context) => {
      if (context.user) {
        const character = await Character.findOneAndDelete({
          _id: args.characterId,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { characters: character._id } }
        );
        return character;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
