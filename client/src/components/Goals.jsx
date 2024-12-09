import axios, { isCancel } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

import useDataStore from "../zustandStore/dataStore";

const Goals = () => {
  const baseURL = import.meta.env.VITE_BACK_URL;

  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  // const [type, setType] = useState("Once");
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState("");
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);

  const { user, setUserData } = useDataStore((state) => state);
  const goals = user.goals;
  console.log("Goals", goals);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      description,
      deadline,
      // type,
      subtasks,
      isCompleted: isTaskCompleted,
    };

    try {
      const response = await axios.post(`${baseURL}/goals/save`, formData, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
        },
      });

      if (response.status === 201) {
        toast.success("Saved successfully");
        setDescription("");
        setDeadline("");
        setSubtasks([]);
        setIsTaskCompleted(false);
      } else {
        toast.error("Error: Couldn't save");
      }
    } catch (error) {
      console.log("Error while saving goals ", error);
    }
  };

  const handleAddSubtask = () => {
    if (newSubtask) {
      setSubtasks([
        ...subtasks,
        { description: newSubtask, isCompleted: false },
      ]);
      setNewSubtask("");
    }
  };

  // Handle subtask completion toggle
  const toggleSubtaskCompletion = (gIndex, stIndex) => {
    const updatedGoals = [...goals];
    const updatedSubtasks = [...updatedGoals[gIndex].subtask];
    updatedSubtasks[stIndex].isCompleted =
      !updatedSubtasks[stIndex].isCompleted;

    updatedGoals[gIndex].subtask = updatedSubtasks;
    setUserData({ ...user, goals: updatedGoals });

    updateSubtask(
      updatedGoals[goalIndex]._id,
      updatedSubtasks[subtaskIndex]._id,
      {
        isCompleted: updatedSubtasks[subtaskIndex].isCompleted,
      }
    );
  };

  const updateGoalCompletion = (goalId, isCompleted) => {
    const updatedData = { isCompleted };
    updateGoal(goalId, updatedData);
  };

  const updateGoal = async (goalId, updatedData) => {
    try {
      const response = await axios.put(
        `${baseURL}/goals/update/${goalId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Updated");
        const updatedGoals = goals.map((goal) =>
          goal._id === goalId ? { ...goal, ...updatedData } : goal
        );
        setUserData({ ...user, goals: updatedGoals });
      } else {
        toast.error("Error: Couldn't update goal");
      }
    } catch (error) {
      toast.error("Error while updating goal");
      console.log("Error while updating goal: ", error);
    }
  };

  const deleteGoal = async (goalId) => {
    try {
      const response = await axios.delete(`${baseURL}/goals/delete/${goalId}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
        },
      });

      if (response.status === 200) {
        toast.success("Goal deleted successfully");

        const updatedGoals = goals.filter((goal) => goal._id !== goalId);
        setUserData({ ...user, goals: updatedGoals });
      } else {
        toast.error("Error: Couldn't delete goal");
      }
    } catch (error) {
      toast.error("Error while deleting goal");
      console.error("Error while deleting goal:", error);
    }
  };

  const updateSubtask = async (goalId, subtaskId, updatedData) => {
    try {
      const response = await axios.put(
        `${baseURL}/goals/update-subtask/${goalId}/${subtaskId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Subtask updated successfully");

        const updatedGoals = goals.map((goal) =>
          goal._id === goalId
            ? {
                ...goal,
                subtasks: goal.subtasks.map((subtask) =>
                  subtask._id === subtaskId
                    ? { ...subtask, ...updatedData }
                    : subtask
                ),
              }
            : goal
        );
        setUserData({ ...user, goals: updatedGoals });
      } else {
        toast.error("Error: Couldn't update subtask");
      }
    } catch (error) {
      toast.error("Error while updating subtask");
      console.error("Error while updating subtask:", error);
    }
  };

  return (
    <main className="w-full min-h-screen p-2 bg-primary-bg">
      <section className="w-ful h-auto bg-secondary-bg rounded-xl p-4">
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="flex w-full gap-4">
            <input
              type="text"
              placeholder="Enter task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-4 py-2 w-full  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="px-4 py-2 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="submit"
              value="Submit"
              className="bg-orange-500 text-white px-3 py-2 font-bold rounded-lg cursor-pointer hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Subtask */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center space-x-2">
              {/* <select
                name="Type"
                id="Type"
                onChange={(e) => setType(e.target.value)}
                className="px-3 py-2 rounded-lg"
              >
                <option value="Once">Once</option>
                <option value="Daily">Daily</option>
              </select> */}
              <input
                type="text"
                placeholder="Add subtask..."
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleAddSubtask}
                className="bg-orange-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Add Subtask
              </button>
            </div>

            {/* List of subtasks */}
            <ul className="space-y-2">
              {subtasks.map((subtask, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={subtask.isCompleted}
                    onChange={() => toggleSubtaskCompletion(index)}
                    className="size-4 text-blue-500 "
                  />
                  <span
                    className={`text-white ${
                      subtask.isCompleted ? "line-through text-gray-300" : ""
                    }`}
                  >
                    {subtask.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </form>
      </section>

      {/* Displaying goals */}
      <section className="">
        <p className="flex items-center justify-center text-white text-xl font-bold w-full h-auto bg-secondary-bg rounded-lg p-4 my-2">
          Goals
        </p>

        <div className="h-full w-full text-sm">
          {goals.map((g, gIndex) => (
            <div
              key={g._id}
              className="font-bold bg-secondary-bg rounded-xl p-4 mb-2"
            >
              <input
                type="checkbox"
                className="size-4 mr-2"
                checked={g.isCompleted}
                id={g._id}
                onChange={() => toggleSubtaskCompletion(gIndex)}
              />
              <label className="text-white" htmlFor={g._id}>
                {g.description}
              </label>

              <button
                onClick={() => deleteGoal(g._id)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                Delete Goal
              </button>

              {g.subtasks.length > 0 && (
                <ul className="space-y-2 pt-2 pl-6">
                  {g.subtasks.map((subtask, subtaskIndex) => (
                    <li
                      key={subtaskIndex}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={subtask.isCompleted}
                        onChange={() =>
                          toggleSubtaskCompletion(gIndex, subtaskIndex)
                        }
                        className="size-4 text-blue-500 "
                      />
                      <span
                        className={` ${
                          subtask.isCompleted
                            ? "line-through text-gray-500"
                            : "text-white"
                        }`}
                      >
                        {subtask.description}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
      {/* <section className="w-full h-auto bg-secondary-bg rounded-xl p-4 mt-2">
        <p className="flex items-center justify-center text-white font-bold">
          Once
        </p>
      </section> */}

      {/* Visual analysis placeholder
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <p className="text-center text-gray-500">Visual analysis here</p>
      </div> */}
    </main>
  );
};

export default Goals;
