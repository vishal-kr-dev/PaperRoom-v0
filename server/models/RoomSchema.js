import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  lastActive: { type: Date, default: Date.now },
});

const RoomModel = mongoose.model("Room", RoomSchema);
export default RoomModel;
