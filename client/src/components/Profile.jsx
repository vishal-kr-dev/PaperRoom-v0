import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Avatar from "react-avatar"

import HistoryCard from "./HistoryCard";
import dummy from "../assets/profile.webp";
import useUserDataStore from "../Store/dataStore";

const Profile = () => {
  const baseURL = import.meta.env.VITE_BACK_URL;
  const [data, setData] = useState([]);
  const { username, roomId } = useUserDataStore();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/history/${username}`);

      setData(response.data.historyEntries);
    } catch (error) {
      console.log(`Error while fetching the data: ${error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-primary-bg">
      {/* Profile section */}
      <section className="flex items-center justify-center text-white font-semibold text-2xl">
        <div>
          <div className="mt-7 flex items-center justify-center">
            {/* <img src={dummy} alt="" className="size-48 border rounded-full" /> */}
            <Avatar name={username} size="160" round={true} textSizeRatio={1.5} />
          </div>
          <div className="p-2">
            <p>Username: {username}</p>
            <p>RoomId: {roomId}</p>
            {/* <p>Socials</p> */}
          </div>
        </div>
      </section>

      {/* History section */}
      <section className="p-2">
        <h1 className="text-2xl font-bold text-center text-white">History</h1>
        {data.length === 0 ? (
          <span className="flex justify-center items-center p-4 text-red-600 font-semibold">
            No history found
          </span>
        ) : (
          <div>
            {data.map((history, index) => (
              <HistoryCard key={index} {...history} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Profile;
