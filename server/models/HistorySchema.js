import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema(
  {
    description: String,
    tag: String,
    duration: Number,
  },
  {
    timestamps: true,
  }
);

const HistoryModel = mongoose.model("History", HistorySchema);

export default HistoryModel;
