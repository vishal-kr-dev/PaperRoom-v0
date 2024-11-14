import UserModel from "../models/UserSchema.js";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
// console.log("This is the jwt secret");
// console.log(JWT_SECRET);

const register = async (req, res) => {
  try {
    const { username, password, roomId } = req.body;

    // Check if user exists
    const userExist = await UserModel.findOne({ username });
    if (userExist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user
    const newUser = new UserModel({
      username,
      password,
      roomId,
    });

    await newUser.save();
    return res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error("Error while registering:", error);
    return res.status(500).json({ msg: "Server error while registering" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(`Id: ${username} password: ${password}`)

    // Check if user exists
    const user = await UserModel.findOne({ username });
    if (!user || password !== user.password) {
      return res.status(401).json({ msg: "Username or password incorrect" });
    }

    // Generate JWT token
    const token = jwt.sign({ username: user.username }, JWT_SECRET);
    // console.log("This is the token", token);

    res.status(200).json({
      msg: "Login Successful",
      token: token,
    });
  } catch (error) {
    console.error("Error while logging in:", error);
    return res.status(500).json({ msg: "Server error while logging in" });
  }
};

export { login, register };
