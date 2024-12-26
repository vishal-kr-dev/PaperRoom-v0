import HistoryModel from "../models/HistorySchema.js";
import UserModel from "../models/UserSchema.js";

const createHistoryEntry = async (req, res) => {
  const { username, ...rawGoals } = req.body;

  try {
    const goalArray = Array.isArray(req.body)
      ? req.body
      : Object.values(rawGoals);

    const tags = goalArray.map((goal) => goal.description).filter(Boolean);

    const today = new Date();
    const currentDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    let history = await HistoryModel.findOne({
      user: username,
      createdAt: { $gte: currentDate },
    });

    let newTags = [];
    if (history) {
      newTags = tags.filter((tag) => !history.tag.includes(tag));
      if (newTags.length > 0) {
        await HistoryModel.updateOne(
          { _id: history._id },
          { $addToSet: { tag: { $each: newTags } } }
        );
      }
    } else {
      newTags = tags;
      await HistoryModel.create({
        user: username,
        tag: tags,
      });
    }

    if (newTags.length > 0) {
      const pointsToAdd = goalArray
        .filter((goal) => newTags.includes(goal.description))
        .reduce((sum, goal) => sum + goal.points, 0);

      await UserModel.updateOne(
        { username },
        { $inc: { monthlyPoints: pointsToAdd } }
      );
    }

    res.status(200).json({ msg: "Submitted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Error while creating history entry: " + error.message,
    });
  }
};

const getHistoryEntries = async (req, res) => {
  try {
    const { userId } = req.params;

    const historyEntries = await HistoryModel.find({ user: userId })
      .select("user tag createdAt -_id")
      .sort({
        createdAt: -1,
      });

    if (historyEntries.length === 0) {
      return res.status(404).json({ message: "No history entries found" });
    }

    res.status(200).json({
      message: "History entries fetched successfully",
      historyEntries,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error while fetching history entries: " + error.message,
    });
  }
};

export { createHistoryEntry, getHistoryEntries };
