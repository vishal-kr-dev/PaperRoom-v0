import mongoose from "mongoose";

const GoalsSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  points: {
    type: Number, 
    required: true,
  },
  subtasks: [
    {
      description: {
        type: String,
        required: true,
      },
      point: {
        type: Number,
        default: 1,
        immutable: true
      },
    },
  ],
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate:{
    type: Date,
    default: null    
  }
});

const RoomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.String,
      ref: "Users",
    },
  ],
  lastActive: {
    type: Date,
    default: Date.now,
  },
  tasks: [GoalsSchema]
});

const RoomModel = mongoose.model("Room", RoomSchema);
export default RoomModel;
