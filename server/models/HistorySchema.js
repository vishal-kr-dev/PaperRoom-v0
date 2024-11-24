import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema(
  {
    user:{
      type: mongoose.Schema.Types.String,
      ref: "Users",
      required: true,
    },
    tag: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
);

const HistoryModel = mongoose.model("History", HistorySchema);

export default HistoryModel;
