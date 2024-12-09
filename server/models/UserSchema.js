import mongoose from "mongoose";

const GoalsSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  // type: {
  //   type: String,
  //   required: true
  // },
  deadline: {
    type: Date,
    required: false,
  },
  subtasks: [
    {
      description: {
        type: String,
        required: true,
      },
      isCompleted: {
        type: Boolean,
        default: false,
      },
    },
  ],
  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

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
  goals: [GoalsSchema],
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
