import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema(
  {
    user:{
      type: mongoose.Schema.Types.String,
      ref: "Users",
      required: true,
    },
    description: String,
    tag: [{ type: String, required: true }],
    // duration: Number,
  },
  {
    timestamps: true,
  }
);

const HistoryModel = mongoose.model("History", HistorySchema);

export default HistoryModel;
