import axios from "axios";
import React, { useState } from "react";

const Goals = () => {
  const baseURL = import.meta.env.VITE_BACK_URL;

  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState("");

  // State for task completion
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);

  // Function to handle main task submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      description,
      deadline,
      subtasks,
      isCompleted: isTaskCompleted,
    };
    console.log(formData);

    try {
      const response = await axios.post(`${baseURL}/goals/save`, formData, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
        },
      });
      // console.log("Response in return for sending the data ", response.data, response.status);

      if (response.status === 201) {
        console.log("Saved successfully");
        setDescription("");
        setDeadline("");
        setSubtasks([]);
        setIsTaskCompleted(false);
      } else {
        console.log("Error while submitting goals");
      }
    } catch (error) {
      console.log("Error while saving goals ", error);
    }
  };

  // Function to calculate days left until deadline
  const calculateDaysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24)); // convert ms to days
    return daysLeft;
  };

  // Handle adding a new subtask
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
  const toggleSubtaskCompletion = (index) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index].isCompleted = !updatedSubtasks[index].isCompleted;
    setSubtasks(updatedSubtasks);

    // Check if all subtasks are completed to mark main task as completed
    if (updatedSubtasks.every((subtask) => subtask.isCompleted)) {
      setIsTaskCompleted(true);
    } else {
      setIsTaskCompleted(false);
    }
  };

  return (
    <main className="w-full min-h-screen p-2 bg-primary-bg">
      <section className="w-full h-full bg-secondary-bg rounded-xl p-4">
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* Main task description and deadline */}
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
              required
            />
            <input
              type="submit"
              value="Submit"
              className="bg-blue-500 text-white px-3 py-2 font-semibold rounded-lg cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Subtask input and list */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="subTasks"
                className="size-4"
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <label htmlFor="subTasks" className="text-white">
                Add subtasks
              </label>
            </div>
            {isChecked && (
              <div className="flex items-center space-x-2">
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
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add Subtask
                </button>
              </div>
            )}

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

      {/* Visual analysis placeholder
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <p className="text-center text-gray-500">Visual analysis here</p>
      </div> */}
    </main>
  );
};

export default Goals;
