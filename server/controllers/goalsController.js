import RoomModel from "../models/RoomSchema.js";
import UserModel from "../models/UserSchema.js";

const saveGoals = async (req, res) => {
  const { description, points, subtasks, deadline } = req.body;
  const { roomId } = req.user;

  try {
    const newGoal = {
      description,
      points,
      subtasks,
      deadline,
    };

    const room = await RoomModel.findOne({ roomId });

    room.goals.unshift(newGoal);

    await room.save();

    const savedGoal = room.goals[0];

    res.status(201).json({ msg: "Goal added successfully", goal: savedGoal });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error", error });
  }
};

const updateGoals = async (req, res) => {
  const { goalId } = req.params;
  const user = req.user;
  const { goals } = req.user;

  try {
    const goal = user.goals.id(goalId);
    if (!goal) {
      console.log("Goal not found");
      return res.status(404).json({ msg: "Goal not found" });
    }

    goal.isCompleted = !goal.isCompleted;
    await user.save();

    res.status(200).json("Goal successfully updated and saved");
  } catch (error) {
    console.log("Error updating goal:", error);
    res.status(500).json({ msg: "Error updating goal" });
  }
};

const updateSubGoal = async (req, res) => {
  const { goalId, subtaskId } = req.params;
  const user = req.user;

  try {
    const goal = user.goals.id(goalId);
    if (!goal) {
      console.log("Goal not found");
      return res.status(404).json({ msg: "Goal not found" });
    }

    const subtask = goal.subtasks.id(subtaskId);
    if (!subtask) {
      console.log("Subtask not found");
      return res.status(404).json({ msg: "Subtask not found" });
    }

    subtask.isCompleted = !subtask.isCompleted;
    await user.save();

    res.status(200).json("SubGoal updated successfully");
  } catch (error) {
    console.error("Error updating subGoal:", error);
    res.status(500).json({ msg: "Error updating subGoal" });
  }
};

const deleteGoal = async (req, res) => {
  const { username, roomId } = req.user;
  const { goalId } = req.body;

  try {
    const room = await RoomModel.findOne({ roomId });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const result = await RoomModel.updateOne(
      { roomId, "goals._id": goalId },
      { $pull: { goals: { _id: goalId } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Goal not found in this room" });
    }

    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    console.error("Error while deleting goal:", error);
    res.status(500).json({ msg: "Error deleting goal" });
  }
};


export { saveGoals, updateGoals, updateSubGoal, deleteGoal };
