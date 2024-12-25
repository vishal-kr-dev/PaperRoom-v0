import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

import UserCard from "../components/UserCard";
import useAuthStore from "../Store/authStore";
import LineGraph from "../components/LineGraph";
import useUserDataStore from "../Store/dataStore";
import ScoreBarChart from "../components/ScoreBarChart";
import axiosInstance from "../axiosInstance";

const Home = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const { setUser, setRoomId, setGoals, users, setUsers } = useUserDataStore();

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/home/");
      setData(response.data);
      
      const usersData = response.data.users.map(user => {
        const {points, ...other} = user
        return other
      })

      setUsers(usersData)
      setGoals(response.data.goals)
    } catch (error) {
      console.log(`Error at Home.jsx: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async (req, res) => {
    try {
      const userData = await axiosInstance.get('/user/details')

      if (userData.status === 200) {
        const { username, roomId } = userData.data;
        setUser(username);
        setRoomId(roomId);
      }
    } catch (error) {
      console.log("Error while fetching goals: ", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      fetchData();
      fetchUserData();
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className="flex flex-col min-h-screen bg-primary-bg">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <section className="flex flex-col lg:flex-row gap-3 p-3 w-full lg:fixed">
            <section className="lg:w-3/4 bg-secondary-bg rounded-lg py-6 pr-6">
              <h2 className="flex items-center justify-center text-xl font-bold text-white mb-4">
                Activity
              </h2>
              <LineGraph data={data} />
            </section>

            <section className="lg:w-1/4 bg-secondary-bg text-white shadow-lg rounded-lg py-5">
              <h2 className="flex items-center justify-center text-xl font-bold ">
                Ranks
              </h2>
              <ScoreBarChart data={users} />
            </section>
          </section>

          <section className="flex w-full overflow-x-auto bg-secondary-bg shadow-inner rounded-lg lg:fixed bottom-0">
            {data.users.map((user, index) => {
              return <UserCard key={index} user={user.username} />;
            })}
          </section>
        </>
      )}
    </main>
  );
};

export default Home;
