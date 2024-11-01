import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema(
  {
    description: String,
    tag: {type: String, required: true},
    duration: Number,
  },
  {
    timestamps: true,
  }
);

const HistoryModel = mongoose.model("history", HistorySchema);

export default HistoryModel;
