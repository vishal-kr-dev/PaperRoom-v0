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

<<<<<<< HEAD
const UserModel = mongoose.model("users", UserSchema);
=======
const UserModel = mongoose.model("Users", UserSchema);
>>>>>>> History
export default UserModel;
