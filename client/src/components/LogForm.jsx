import React, { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import useAuthStore from "../zustandStore/authStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogForm = ({ setIsModalOpen }) => {
  const baseURL = import.meta.env.VITE_BACK_URL;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const tag = Object.keys(data).filter((key) => data[key] === true);
      const response = await axios.post(
        `${baseURL}/history`,
        { tag },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
          },
        }
      );
      if (response.status == 200) {
        setIsModalOpen(false);
        toast.success("Submitted successfully");
      }
    } catch (error) {
      console.log("Error while submitting log details:", error);
      toast.error("Error while submitting log details");
    }
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center mb-6">
        {formattedDate}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-10">
          <div className="flex items-center space-x-2">
            <input
              id="dsa"
              type="checkbox"
              {...register("dsa")}
              className="h-5 w-5"
            />
            <label htmlFor="dsa" className="text-sm">
              Dsa
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="development"
              type="checkbox"
              {...register("development")}
              className="h-5 w-5"
            />
            <label htmlFor="development" className="text-sm">
              Development
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="academics"
              type="checkbox"
              {...register("academics")}
              className="h-5 w-5"
            />
            <label htmlFor="academics" className="text-sm">
              Academics
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="others"
              type="checkbox"
              {...register("other")}
              className="h-5 w-5"
            />
            <label htmlFor="others" className="text-sm">
              Others
            </label>
          </div>
        </div>

        {/* <div>
          <textarea
            type="text"
            id="description"
            className=" w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
            placeholder="Write the description"
            {...register("description")}
          />
        </div> */}

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
