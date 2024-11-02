import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema(
  {
    description: String,
    tag: { type: String, required: true },
    duration: Number,
  },
  {
    timestamps: true,
  }
);

const HistoryModel = mongoose.model("History", HistorySchema);

export default HistoryModel;
