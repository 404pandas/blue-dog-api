import { signToken, AuthenticationError } from "../utils/auth";
import bcrypt from "bcrypt";
import { IResolvers } from "@graphql-tools/utils";
import User, { type IUser } from "../models/User.js";
import Character from "../models/Character.js";
import Episode from "../models/Episode.js";
import Location from "../models/Location.js";
import Short from "../models/Short.js";
import Book from "../models/Book.js";
import Item from "../models/Item.js";

// Define the context type (customize as needed)
interface Context {
  user?: {
    _id: string;
  };
}

// Resolver args types
interface IdArgs {
  userId?: string;
  bookId?: string;
  characterId?: string;
  episodeId?: string;
  itemId?: string;
  locationId?: string;
}

interface LoginArgs {
  email: string;
  password: string;
}

interface AddUserArgs {
  username: string;
  email: string;
  password: string;
  phoneNum?: string;
}

interface EditUserArgs {
  username?: string | undefined;
  email?: string | undefined;
  password?: string;
  phoneNum?: string;
}

const resolvers: IResolvers = {
  Query: {
    users: async () => {
      return User.find().select("-__v -password");
    },
    user: async (_parent, { userId }: IdArgs) => {
      return User.findOne({ _id: userId }).select("-__v -password");
    },
    me: async (_parent, _args, context: Context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).select("-__v -password");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    books: async () => Book.find(),
    book: async (_parent, { bookId }: IdArgs) => Book.findById(bookId),
    characters: async () => Character.find(),
    character: async (_parent, { characterId }: IdArgs) =>
      Character.findById(characterId),
    episodes: async () => Episode.find(),
    episode: async (_parent, { episodeId }: IdArgs) =>
      Episode.findById(episodeId),
    items: async () => Item.find(),
    item: async (_parent, { itemId }: IdArgs) => Item.findById(itemId),
    locations: async () => Location.find(),
    location: async (_parent, { locationId }: IdArgs) =>
      Location.findById(locationId),
    shorts: async () => Short.find(),
    short: async (_parent, { locationId }: IdArgs) =>
      Short.findById(locationId), // Assuming this was a typo
  },

  Mutation: {
    login: async (_parent, { email, password }: LoginArgs) => {
      const user = await User.findOne({ email });
      if (!user) throw new AuthenticationError("Incorrect credentials");

      const isMatch = await (user as IUser).isCorrectPassword(password);
      if (!isMatch) throw new AuthenticationError("Incorrect credentials");

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    addUser: async (_parent, args: AddUserArgs) => {
      const user = await User.create(args);
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    editUser: async (_parent, args: EditUserArgs, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const updates: Partial<EditUserArgs> = {
        username: args.username,
        email: args.email,
      };

      if (args.password) {
        updates.password = await bcrypt.hash(args.password, 12);
      }

      return User.findByIdAndUpdate(
        context.user._id,
        { $set: updates },
        { new: true }
      );
    },

    deleteUser: async (_parent, _args, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      return User.findByIdAndDelete(context.user._id);
    },
  },
};

export default resolvers;
