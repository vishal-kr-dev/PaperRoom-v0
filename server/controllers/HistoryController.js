import HistoryModel from "../models/HistorySchema.js";
import UserModel from "../models/UserSchema.js";

const createHistoryEntry = async (req, res) => {
  try {
    const { userId, description, tag, duration } = req.body;

    const newHistory = new HistoryModel({
      user: userId,
      description,
      tag,
      duration,
    });

    await newHistory.save();
    console.log("History entry saved successfully!");
    res.status(201).json({
      message: "History entry created successfully",
      newHistory,
    });
  } catch (error) {
    console.log("Error while creating history entry: " + error.message);
    res.status(500).json({
      error: "Error while creating history entry: " + error.message,
    });
  }
};

const getHistoryEntries = async (req, res) => {
  try {
    const { userId } = req.params;

    const historyEntries = await HistoryModel.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("user", "username roomId");

    if (historyEntries.length === 0) {
      return res.status(404).json({ message: "No history entries found" });
    }

    console.log("Fetched history entries:", historyEntries);
    res.status(200).json({
      message: "History entries fetched successfully",
      historyEntries,
    });
  } catch (error) {
    console.log("Error while fetching history entries: " + error.message);
    res.status(500).json({
      error: "Error while fetching history entries: " + error.message,
    });
  }
};

export { createHistoryEntry, getHistoryEntries };
