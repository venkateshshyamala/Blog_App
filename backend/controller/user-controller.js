import User from "../model/User";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }
  if (!User) {
    return res.status(404).json({ message: "User Not Found" });
  }
  return res.status(200).json({ users });
};

// Signup users
export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res.status(400).json({ message: "User already exist" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });

  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ user });
};

// login users
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
    console.log(existingUser);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "couldn't find user" });
  }
  const isPasswordMacthed = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordMacthed) {
    return res.status(400).json({ message: "password is not matched" });
  }
  return res
    .status(200)
    .json({ message: "login successful", user: existingUser });
};
