import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogForm = ({ setIsModalOpen }) => {
  const baseURL = import.meta.env.VITE_BACK_URL;
  
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

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

  const data = ["dsa", "dev"]

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center mb-6">
        {formattedDate}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-2">
          {data.map((item, index) => {
            return (
              <div className="flex items-center gap-2" key={index}>
                <input
                  id={index}
                  type="checkbox"
                  {...register(`${item}`)}
                  className="size-4"
                />
                <label
                  htmlFor={index}
                  className=""
                  title={item}
                >
                  {item.length > 45 ? `${item.slice(0, 45)}...`: item }
                </label>
              </div>
            );
          })}
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
