import { signToken, AuthenticationError } from "../utils/auth.js";
import bcrypt from "bcrypt";
import { IResolvers } from "@graphql-tools/utils";
import User, { type IUser } from "../models/User.js";
import Character, { type ICharacter } from "../models/Character.js";
import Episode, { type IEpisode } from "../models/Episode.js";
import Location, { type ILocation } from "../models/Location.js";
import Short, { type IShort } from "../models/Short.js";
import Book, { type IBook } from "../models/Book.js";
import Item, { type IItem } from "../models/Item.js";

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
  shortId?: string;
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
    // Tested and working 9:24AM 4/10
    users: async (): Promise<IUser[] | null> => {
      return User.find({}).select("-__v -password");
    },

    // Tested and working 9:24AM 4/10
    user: async (_parent, { userId }: IdArgs) => {
      return User.findOne({ _id: userId }).select("-__v -password");
    },

    // NEED TO TEST
    me: async (_parent, _args, context: Context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).select("-__v -password");
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // Tested and working 8:58AM 4/10
    books: async (): Promise<IBook[] | null> => {
      const books = await Book.find({});
      console.log("Books found:", books);
      return books;
    },

    // Tested and working 8:58AM 4/10
    book: async (_parent, { bookId }: IdArgs) => Book.findById(bookId),

    // Tested and working 9:22AM 4/10
    characters: async (): Promise<ICharacter[] | null> => Character.find({}),

    // Tested and working 9:23AM 4/10
    character: async (_parent, { characterId }: IdArgs) =>
      Character.findById(characterId),

    // Tested and working 9:24AM 4/10
    episodes: async (): Promise<IEpisode[] | null> => Episode.find({}),

    // Tested and working 9:25AM 4/10
    episode: async (_parent, { episodeId }: IdArgs) =>
      Episode.findById(episodeId),

    // Tested and working 9:25AM 4/10
    items: async (): Promise<IItem[] | null> => Item.find({}),

    // Tested and working 9:26AM 4/10
    item: async (_parent, { itemId }: IdArgs) => Item.findById(itemId),

    // Tested and working 9:26AM 4/10
    locations: async (): Promise<ILocation[] | null> => Location.find({}),

    // Tested and working 9:26AM 4/10
    location: async (_parent, { locationId }: IdArgs) =>
      Location.findById(locationId),

    // Tested and working 9:27AM 4/10
    shorts: async (): Promise<IShort[] | null> => Short.find({}),

    // Tested and working 9:27AM 4/10
    short: async (_parent, { shortId }: IdArgs) => Short.findById(shortId), // Assuming this was a typo
  },

  Mutation: {
    // NEED TO TEST
    login: async (_parent, { email, password }: LoginArgs) => {
      const user = await User.findOne({ email });
      if (!user) throw new AuthenticationError("Incorrect credentials");

      const isMatch = await (user as IUser).isCorrectPassword(password);
      if (!isMatch) throw new AuthenticationError("Incorrect credentials");

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    // NEED TO TEST
    addUser: async (_parent, args: AddUserArgs) => {
      const user = await User.create(args);
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    // NEED TO TEST
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

    // NEED TO TEST
    deleteUser: async (_parent, _args, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      return User.findByIdAndDelete(context.user._id);
    },
  },
};

export default resolvers;
