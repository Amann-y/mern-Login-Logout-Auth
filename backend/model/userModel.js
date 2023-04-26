import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretkey = process.env.SECRET_KEY;

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// password hashing
schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// token generate
schema.methods.generatetoken = async function () {
  try {
    let usertoken = jwt.sign({ _id: this._id }, secretkey);
    this.tokens = this.tokens.concat({ token: usertoken });
    await this.save();
    return usertoken;
  } catch (error) {
    res.status(422).send(error);
  }
};

const User = mongoose.model("user", schema);

export default User;
