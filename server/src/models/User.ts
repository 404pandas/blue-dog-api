import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";

// Extend the Document interface to include instance methods
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isCorrectPassword(password: string): Promise<boolean>;
}

// Define the schema
const userSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Pre-save middleware to hash password
userSchema.pre <
  IUser >
  ("save",
  async function (next) {
    if (this.isNew || this.isModified("password")) {
      const saltRounds = 12;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
  });

// Instance method to validate password
userSchema.methods.isCorrectPassword = async function (
  this: IUser,
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Create the model
const User: Model<IUser> = mongoose.model < IUser > ("User", userSchema);

export default User;
