import User from "../model/userModel.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !email || !password) {
    res.status(400).send("All Fields are required");
  }
  try {
    const existemail = await User.findOne({ email: email });
    if (existemail) {
      return res.status(400).send("Email already exist");
    }

    const userregister = new User({ name, email, password });
    const saveuser = await userregister.save();
    res.send(saveuser);
  } catch (error) {
    res.status(400).send(`Error from backend ${error}`);
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;
  if (!email || !password) {
    res.status(400).send("All Fields are required");
  }
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const passwordcheck = await bcrypt.compare(password, user.password);
      if (passwordcheck) {
        const token = await user.generatetoken();
        console.log(token);
        return res.status(200).send({ user, token });
      } else {
        return res.status(400).send({ error: "Invalid Password" });
      }
    }
  } catch (error) {
    res.status(400).send(`Error from backend ${error}`);
  }
};

const profile = async (req, res) => {
  try {
    const uservalidation = await User.findOne({ _id: req.userid });
    res.status(200).send(uservalidation);
  } catch (error) {
    res.status(400).send(error);
  }
};

export { register, login, profile };
