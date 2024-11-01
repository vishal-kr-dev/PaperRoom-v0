import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;
