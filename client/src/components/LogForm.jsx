import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { Clock } from "lucide-react";

import useUserDataStore from "../Store/dataStore";
import axiosInstance from "../axiosInstance";

const LogForm = ({ setIsModalOpen }) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];
  const { goals, setGoals } = useUserDataStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const toggleGoalCompletion = async (goalIndex) => {
  //   const targetGoal = {
  //     ...goals[goalIndex],
  //     isCompleted: !goals[goalIndex].isCompleted,
  //   };

  //   try {
  //     const response = await axiosInstance.put(
  //       `/goals/update/${targetGoal._id}`,
  //       targetGoal
  //     );

  //     if (response.status === 200) {
  //       setGoals((prevState) => ({
  //         goals: prevState.goals.map((goal, index) =>
  //           index === goalIndex ? targetGoal : goal
  //         ),
  //       }));
  //       toast.success("Goal updated successfully!");
  //     }
  //   } catch (error) {
  //     // toast.error("Failed to update goal. Please try again.");
  //     console.log("Error while updating goal: ", error);
  //   }
  // };

  // const toggleSubtaskCompletion = async (goalIndex, subtaskIndex) => {
  //   const targetGoal = { ...goals[goalIndex] };
  //   const targetSubtask = { ...targetGoal.subtasks[subtaskIndex] };

  //   targetSubtask.isCompleted = !targetSubtask.isCompleted;
  //   targetGoal.subtasks = targetGoal.subtasks.map((subtask, index) =>
  //     index === subtaskIndex ? targetSubtask : subtask
  //   );

  //   try {
  //     const response = await axios.put(
  //       `${baseURL}/goals/update-subtask/${targetGoal._id}/${targetSubtask._id}`,
  //       targetSubtask,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       const updatedGoals = goals.map((goal, index) =>
  //         index === goalIndex ? targetGoal : goal
  //       );
  //       setUserData({ ...user, goals: updatedGoals });
  //       // toast.success("Updated successfully");
  //     }
  //   } catch (error) {
  //     // toast.error("Failed to update subtask. Please try again.");
  //     console.log("Error while updating subtask: ", error);
  //   }
  // };

  const formatDeadline = (deadline) => {
    if (!deadline) return null;
    const daysRemaining = Math.ceil(
      (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24)
    );

    let days = 0;

    if (daysRemaining === 0) days = 0;
    days = daysRemaining > 0 ? daysRemaining : Math.abs(daysRemaining);
    return (
      <div className="flex items-center justify-center gap-1 ">
        <Clock size={15} />
        {days}
      </div>
    );
  };

  const onSubmit = async (data) => {
    try {
      const checkedGoals = Object.keys(data).filter((k) => data[k] === true);

      const filteredGoals = goals.filter((goal) =>
        checkedGoals.includes(goal._id)
      );

      const response = await axiosInstance.post("/history/", filteredGoals);

      if (response.status === 200) {
        setIsModalOpen(false);
        toast.success("Submitted successfully");
      }
    } catch (error) {
      console.log("Error while submitting log details:", error);
      toast.error("Error while submitting log details");
    }

    // try {
    //   // const tag = Object.keys(data).filter((key) => data[key] === true);
    //   // // console.log(data);
    //   const tag = new Set(
    //     Object.keys(data).filter((key) => data[key] === true)
    //   );
    //   console.log(tag);

    //   goals.forEach((goal, goalIndex) => {
    //     const isGoalChecked = tag.has(goal.description);
    //     if (isGoalChecked === true) {
    //       toggleGoalCompletion(goalIndex);
    //     }

    //     goal.subtasks.forEach((subtask, subtaskIndex) => {
    //       const isSubtaskChecked =
    //         data[`${goal.description}-${subtask.description}`];
    //       if (isSubtaskChecked !== subtask.isCompleted) {
    //         toggleSubtaskCompletion(goalIndex, subtaskIndex);
    //       }
    //     });
    //   });

    //   const response = await axios.post(
    //     `${baseURL}/history`,
    //     { tag },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
    //       },
    //     }
    //   );
    //   if (response.status === 200) {
    //     setIsModalOpen(false);
    //     toast.success("Submitted successfully");
    //   }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center mb-6">
        {formattedDate}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="">
          {goals.length === 0 ? (
            <p className="flex items-center justify-center text-gray-400">
              No goals left, go to goals tab to create new tasks to accomplish
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {goals.map((g, index) => (
                <div className="flex" key={index}>
                  <div className="flex items-center gap-2">
                    <input
                      id={g._id}
                      type="checkbox"
                      {...register(`${g._id}`)}
                      className="w-4 h-4 text-blue-500"
                    />
                    <label
                      htmlFor={g._id}
                      className="text-sm font-semibold text-white truncate"
                      title={g.description}
                    >
                      {g.description.length > 25
                        ? `${g.description.slice(0, 25)}...`
                        : g.description}
                    </label>
                    <div className="text-gray-500">
                      {formatDeadline(g.deadline)}
                    </div>
                  </div>

                  {/* {g.subtasks.length > 0 && (
                  <ul className="space-y-2 pt-2 pl-6">
                    {g.subtasks.map(
                      (subtask, subtaskIndex) =>
                        subtask.isCompleted === false && (
                          <li
                            key={subtaskIndex}
                            className="flex items-center gap-3"
                          >
                            <input
                              type="checkbox"
                              className="w-4 h-4 text-blue-500"
                              {...register(
                                `${g.description}-${subtask.description}`
                              )}
                            />
                            <span className="text-white text-sm">
                              {subtask.description}
                            </span>
                          </li>
                        )
                    )}
                  </ul>
                )} */}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogForm;
