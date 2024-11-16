import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  tags: [{type: String}],
  users: [{ type: mongoose.Schema.Types.String, ref: "Users" }],
  lastActive: { type: Date, default: Date.now },
});

const RoomModel = mongoose.model("Room", RoomSchema);
export default RoomModel;
