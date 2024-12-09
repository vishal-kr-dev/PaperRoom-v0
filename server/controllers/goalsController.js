import UserModel from "../models/UserSchema.js";

const saveGoals = async (req, res) => {
  const { description, deadline, subtasks, isCompleted } = req.body;
  const { username } = req.user;

  // console.log("username ", username)
  // console.log("Goal data form frontend", req.body);
  try {
    const newGoal = {
      description,
      deadline,
      subtasks,
      isCompleted,
    };

    req.user.goals.push(newGoal);

    await req.user.save();

    res.status(201).json({ msg: "Goal added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error", error });
  }
};


const deleteGoal = async (req, res) => {
  const user = req.user;
  const { username } = req.user;
  const { goalId } = req.params;
  try {
    const result = await UserModel.updateOne(
      { username, "goals._id": goalId },
      { $pull: { goals: { _id: goalId } } }
    );

    // If no goal was deleted, return a not found response
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    console.log("Error while deleting goal: ", error);
    res.status(500).json({ msg: "Error deleting goal" });
  }
};

export { saveGoals, deleteGoal };
