import HistoryModel from "../models/HistorySchema.js";
import UserModel from "../models/UserSchema.js";

const createHistoryEntry = async (req, res) => {
  try {
    const { username, description, tag } = req.body;
    console.log(`Data from frontend User: ${username} Tag: ${tag} Description: ${description}`);

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // Check if the user already has a record for today
    let history = await HistoryModel.findOne({
      username,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    if (history) {
      const updatedTags = [...new Set([...history.tag, ...tag])];

      await HistoryModel.updateOne(
        { _id: history._id },
        {
          $set: { description },
          $addToSet: { tag: { $each: tag } },
        }
      );
    } else {
      await HistoryModel.create({
        user: username,
        description,
        tag: tag,
      });
    }
    res.status(200).json({ msg: "Submitted successfully" });
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
    console.log(userId);

    const historyEntries = await HistoryModel.find({ user: userId }).sort({
      createdAt: -1,
    });
    // .populate("user", "username roomId");

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
