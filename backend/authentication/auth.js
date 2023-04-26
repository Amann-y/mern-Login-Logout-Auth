import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const secretkey = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const verifytoken = jwt.verify(token, secretkey);
    const user = await User.findOne({ _id: verifytoken._id });
    if (!user) {
      throw new Error("User Not Found");
    }
    req.token = token;
    req.user = user;
    req.userid = user._id;
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};

export { auth };
