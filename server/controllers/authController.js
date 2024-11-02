import UserModel from "../models/UserSchema.js";

async function register(req, res) {
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
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "User doesn't exist" });
    }

    // Check password
    if (password === user.password) {
      return res.status(200).json({ msg: "Login successful" });
    } else {
      return res.status(400).json({ msg: "Incorrect password" });
    }
  } catch (error) {
    console.error("Error while logging in:", error);
    return res.status(500).json({ msg: "Server error while logging in" });
  }
}

export { login, register };
