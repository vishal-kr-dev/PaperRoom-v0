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
  monthlyPoints: {
    type: Number,
    default: 0,
  },
  streak: {
    type: Number,
    default: 0,
  },
  lastActiveDate: {
    type: Date,
    default: Date.now
  }
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
