import UserModel from "../models/UserSchema.js";

const saveGoals = async (req, res) => {
  try {
    const { description, deadline, subtasks, isCompleted } = req.body;
    const { username } = req.user;

    // console.log("username ", username)
    // console.log("Goal data form frontend", req.body);

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


export {saveGoals} ;