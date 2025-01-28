import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import useUserDataStore from "../Store/dataStore";
import axiosInstance from "../axiosInstance";
import { Trash } from "lucide-react";

const Goals = () => {
  const baseURL = import.meta.env.VITE_BACK_URL;

  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(3);
  const [subtasks, setSubtasks] = useState([]);
  const [deadline, setDeadline] = useState("");
  const [newSubtask, setNewSubtask] = useState("");
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);
  const [frequency, setFrequency] = useState(1)
  const { goals, setNewGoal, setGoals } = useUserDataStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      description,
      deadline,
      points,
      // subtasks,
      isCompleted: isTaskCompleted,
    };

    try {
      const response = await axiosInstance.post("/goals/save", formData);

      if (response.status === 201) {
        setNewGoal(response.data.goal);
        toast.success("Submitted successfully");
        setDescription("");
        setDeadline("");
        setPoints(3);
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

  const deleteGoal = async (goalId) => {
    const loadingToast = toast.loading("Deleting...");

    try {
      const response = await axiosInstance.delete("/goals/delete", {
        data: { goalId },
      });

      if (response.status === 200) {
        toast.success("Goal deleted successfully", { id: loadingToast });

        const updatedGoals = goals.filter((goal) => goal._id !== goalId);
        setGoals(updatedGoals);
      } else {
        toast.error("Error: Couldn't delete goal", { id: loadingToast });
      }
    } catch (error) {
      toast.error("Error while deleting goal");
      console.error("Error while deleting goal:", error);
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
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 mb-1">
              <label
                htmlFor="difficulty"
                className="text-lg text-gray-700 font-semibold"
              >
                Deadline:
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 mb-1">
              <label
                htmlFor="points"
                className="text-lg text-gray-700 font-semibold"
              >
                Length:
              </label>
              <select
                id="points"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="3">Quick Task (1-3 hr)</option>
                <option value="5">Moderate Task (3-8 hr)</option>
                <option value="7">Challenging Task (8 hr)</option>
              </select>
            </div>

            <div className="flex items-center gap-2 mb-1">
              <label
                htmlFor="frequency"
                className="text-lg text-gray-700 font-semibold"
              >
                Frequency:
              </label>
              <select
                id="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="1">Once</option>
                <option value="0">Daily</option>
              </select>
            </div>
          </div>

          {/* Subtask */}
          {/* <div className="flex flex-col gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Add subtask... (Optional)"
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
            </div> */}

          {/* List of subtasks */}
          {/* <ul className="space-y-2">
              {subtasks.map((subtask, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={subtask.isCompleted}
                    readOnly
                    className="size-4 text-blue-500 "
                  />
                  <span className="text-white">{subtask.description}</span>
                </li>
              ))}
            </ul>
          </div> */}

          <div className="flex items-center justify-center w-full">
            <input
              type="submit"
              value="Submit"
              className="bg-orange-500 w-full text-white px-3 py-2 font-bold rounded-lg cursor-pointer hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </form>
      </section>

      {/* Displaying goals */}
      <section className="">
        <div className="flex flex-col items-center justify-center text-white text-xl font-bold w-full h-auto bg-secondary-bg rounded-lg p-4 my-2">
          <p>Goals</p>
          <p className="text-sm font-normal text-gray-500">
            (Note: The tasks can only be marked as completed from the main page)
          </p>
        </div>

        <div className="h-full w-full text-sm">
          {goals?.length > 0 ? (
            goals.map((g, gIndex) => (
              <div
                key={g._id}
                className="flex justify-between font-bold bg-secondary-bg rounded-xl p-4 mb-2"
              >
                <div>
                  <input
                    type="checkbox"
                    className="size-4 mr-2"
                    checked={g.isCompleted}
                    readOnly
                  />
                  <label
                    className={` ${
                      g.isCompleted
                        ? "line-through text-gray-500"
                        : "text-white"
                    }`}
                  >
                    {g.description}
                  </label>
                </div>
                <button
                  onClick={() => deleteGoal(g._id)}
                  className="ml-4 flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-500 hover:bg-red-500 hover:text-white hover:scale-105 transition duration-200 ease-in-out group"
                >
                  <Trash
                    size={20}
                    className="group-hover:scale-110 transition-transform duration-150"
                  />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Delete
                  </span>
                </button>

                {/* {g.subtasks?.length > 0 && (
                  <ul className="space-y-2 pt-2 pl-6">
                    {g.subtasks.map((subtask, subtaskIndex) => (
                      <li
                        key={subtaskIndex}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          checked={subtask.isCompleted}
                          readOnly
                          className="size-4 text-blue-500"
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
                )} */}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No goals available</p>
          )}
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
